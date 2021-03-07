from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import List, Card

# Create your tests here.
class BoardTests(APITestCase):
    #########################
    # list helper functions #
    #########################

    def get_list_list(self):
        url = reverse('list-list')
        response = self.client.get(url, format='json')
        return response

    def get_list_detail(self, id):
        url = reverse('list-detail', args=(id,))
        response = self.client.get(url, format='json')
        return response

    def create_list(self, title):
        url = reverse('list-list')
        data = {'title': title}
        response = self.client.post(url, data, format='json')
        return response

    ##############
    # list tests #
    ##############

    def test_get_list_list(self):
        response = self.get_list_list()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_create_list(self):
        test_title = 'test'

        response_create = self.create_list(test_title)
        response_list = self.get_list_list()
        self.assertEqual(response_create.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(response_list.data), 1)
        self.assertEqual(response_create.data['title'], test_title)
        self.assertEqual(response_create.data['order'], 0)

    def test_list_order_increment(self):
        NUM_CREATE = 100
        for i in range(NUM_CREATE):
            response = self.create_list('test')
            self.assertEqual(response.data['order'], i)

        response_list_list = self.get_list_list()
        self.assertEqual(len(response_list_list.data), NUM_CREATE)

    def test_list_move(self):
        # old(id:1)     new(id:2)
        #           =>
        # new(id:2)     old(id:1)

        response_old = self.create_list('old')
        response_new = self.create_list('new')

        url = reverse('list-move', args=(response_new.data['id'],))
        data={'order': 0}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_moved = self.get_list_detail(response_new.data['id'])
        response_updated = self.get_list_detail(response_old.data['id'])
        self.assertEqual(response_moved.data['order'], 0)
        self.assertEqual(response_updated.data['order'], 1)

    def test_list_rename(self):
        response_create = self.create_list('old title')
        new_title = 'new title'

        url = reverse('list-detail', args=(response_create.data['id'], ))
        data = {'title': new_title}

        response_put = self.client.put(url, data, format='json')
        renamed_list_data = self.get_list_detail(response_create.data['id']).data
        self.assertEqual(response_put.status_code, status.HTTP_200_OK)
        self.assertEqual(response_put.data['title'], new_title)
        self.assertEqual(renamed_list_data['title'], new_title)

    def test_list_delete(self):
        # old(id:1)     new(id:2)
        #           =>
        # new(id:2)

        response_old = self.create_list('old')
        response_new = self.create_list('new')
        url = reverse('list-detail', args=(response_old.data['id'], ))
        response_delete = self.client.delete(url, format='json')
        self.assertEqual(response_delete.status_code, status.HTTP_204_NO_CONTENT)

        response_list_list = self.get_list_list()
        response_get_new = self.get_list_detail(response_new.data['id'])
        self.assertEqual(len(response_list_list.data), 1)
        self.assertEqual(response_get_new.status_code, status.HTTP_200_OK)
        self.assertEqual(response_get_new.data['order'], 0)

    #########################
    # card helper functions #
    #########################

    def get_card_list(self):
        url = reverse('card-list')
        response = self.client.get(url, format='json')
        return response

    def get_card_detail(self, id):
        url = reverse('card-detail', args=(id,))
        response = self.client.get(url, format='json')
        return response

    def create_card_in_list(self, card_title, to_list_id):
        url = reverse('card-list')
        data = {'to_list': to_list_id, 'title': card_title}
        res = self.client.post(url, data, format='json')
        return res

    def create_card_and_list(self, card_title, to_list_title):
        to_list_id = self.create_list(to_list_title).data['id']
        res = self.create_card_in_list(card_title, to_list_id)
        return res

    ##############
    # card tests #
    ##############

    def test_get_card_list(self):
        res = self.get_card_list()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 0)

    def test_create_card(self):
        CARD_TITLE = 'card_title'
        LIST_TITLE = 'list_title'

        res_create_card = self.create_card_and_list(CARD_TITLE, LIST_TITLE)
        card_list_data = self.get_card_list().data
        card_data = res_create_card.data
        self.assertEqual(res_create_card.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(card_list_data), 1)
        self.assertEqual(card_data['title'], CARD_TITLE)
        self.assertEqual(card_data['order'], 0)

    def test_create_multiple_cards_in_different_lists(self):
        NUM_TESTS = 100

        list_id_1 = self.create_list('list_title_1').data['id']
        list_id_2 = self.create_list('list_title_2').data['id']

        for i in range(NUM_TESTS):
            card_data = self.create_card_in_list('test1', list_id_1).data
            self.assertEqual(card_data['order'], i)
            self.assertEqual(card_data['to_list'], list_id_1)

        for i in range(NUM_TESTS):
            card_data = self.create_card_in_list('test2', list_id_2).data
            self.assertEqual(card_data['order'], i)
            self.assertEqual(card_data['to_list'], list_id_2)

        card_list_data = self.get_card_list().data
        self.assertEqual(len(card_list_data), 2 * NUM_TESTS)

    def test_move_card_in_same_list(self):
        NUM_CARDS = 100

        list_id = self.create_list('list_title').data['id']
        card_id_list = []
        for i in range(NUM_CARDS - 1):
            card_id_list.append(self.create_card_in_list('card_title', list_id).data['id'])

        moving_card_data = self.create_card_in_list('move_me', list_id).data

        url = reverse('card-move', args=(moving_card_data['id'], ))
        # move the card from tail(100) to 50
        data = {'list': list_id, 'order': 50}
        self.client.put(url, data, format='json')
        moved_card_data = self.get_card_detail(moving_card_data['id']).data
        self.assertEqual(moved_card_data['order'], 50)
        self.assertEqual(moved_card_data['to_list'], list_id)

        for i in range(50): #excluding id=50
            card_data = self.get_card_detail(card_id_list[i]).data
            self.assertEqual(card_data['order'], i)

        for i in range(50, NUM_CARDS - 1):
            card_data = self.get_card_detail(card_id_list[i]).data
            self.assertEqual(card_data['order'], i + 1)

        # move the card from 50 to 75
        data = {'list': list_id, 'order': 75}
        self.client.put(url, data, format='json')
        moved_card_data = self.get_card_detail(moving_card_data['id']).data
        self.assertEqual(moved_card_data['order'], 75)
        self.assertEqual(moved_card_data['to_list'], list_id)

        for i in range(75): #excluding id=50
            card_data = self.get_card_detail(card_id_list[i]).data
            self.assertEqual(card_data['order'], i)

        for i in range(75, NUM_CARDS - 1):
            card_data = self.get_card_detail(card_id_list[i]).data
            self.assertEqual(card_data['order'], i + 1)

    def test_move_card_to_other_list(self):
        NUM_LISTS = 2
        NUM_CARDS = 100

        list_id_list = []
        card_id_list_list = []
        for i in range(NUM_LISTS):
            list_id_list.append(self.create_list(f'list-{i}').data['id'])

            card_id_list = []
            for j in range(NUM_CARDS):
                card_id_list.append(self.create_card_in_list(f'card-{i}-{j}', list_id_list[i]).data['id'])

            card_id_list_list.append(card_id_list)

        moving_card_id = card_id_list_list[0][50]
        url = reverse('card-move', args=(moving_card_id,))
        # move the card from 0-50 to 1-75
        data = {'list': list_id_list[1], 'order': 75}
        self.client.put(url, data, format='json')
        moved_card_data = self.get_card_detail(moving_card_id).data
        self.assertEqual(moved_card_data['to_list'], list_id_list[1])
        self.assertEqual(moved_card_data['order'], 75)

        for i in range(50):
            card_data = self.get_card_detail(card_id_list_list[0][i]).data
            self.assertEqual(card_data['order'], i)

        for i in range(51, NUM_CARDS):
            card_data = self.get_card_detail(card_id_list_list[0][i]).data
            self.assertEqual(card_data['order'], i - 1)

        for i in range(75):
            card_data = self.get_card_detail(card_id_list_list[1][i]).data
            self.assertEqual(card_data['order'], i)

        for i in range(75, NUM_CARDS):
            card_data = self.get_card_detail(card_id_list_list[1][i]).data
            self.assertEqual(card_data['order'], i + 1)

    def test_card_rename(self):
        OLD_TITLE = 'old title'
        NEW_TITLE = 'new title'

        card_data = self.create_card_and_list(OLD_TITLE, 'list name').data

        url = reverse('card-detail', args=(card_data['id'], ))
        data = {'title': NEW_TITLE}
        renamed_card_res = self.client.patch(url, data, format='json')
        renamed_card_data = renamed_card_res.data

        self.assertEqual(renamed_card_res.status_code, status.HTTP_200_OK)
        self.assertEqual(renamed_card_data['to_list'], card_data['to_list'])
        self.assertEqual(renamed_card_data['order'], card_data['order'])
        self.assertEqual(renamed_card_data['title'], NEW_TITLE)

    def test_card_delete(self):
        NUM_CARDS = 100

        list_data = self.create_list('list title').data

        card_data_list = []
        for i in range(NUM_CARDS):
            card_data = self.create_card_in_list(f'card title {i}', list_data['id']).data
            card_data_list.append(card_data)

        url = reverse('card-list')
        card_list_data = self.client.get(url, format='json').data
        self.assertEqual(len(card_list_data), NUM_CARDS)

        # delete card[50]
        url = reverse('card-detail', args=(card_data_list[50]['id'], ))
        res_delete_card = self.client.delete(url, format='json')
        self.assertEqual(res_delete_card.status_code, status.HTTP_204_NO_CONTENT)

        url = reverse('card-list')
        card_list_data = self.client.get(url, format='json').data
        self.assertEqual(len(card_list_data), NUM_CARDS - 1)

        for i in range(50):
            card_data = self.get_card_detail(card_data_list[i]['id']).data
            self.assertEqual(card_data['order'], i)

        for i in range(51, NUM_CARDS):
            card_data = self.get_card_detail(card_data_list[i]['id']).data
            self.assertEqual(card_data['order'], i - 1)
