from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import List, Card

# Create your tests here.
class BoardTests(APITestCase):
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
        self.assertEqual(response_put.status_code, status.HTTP_200_OK)
        self.assertEqual(response_put.data['title'], new_title)

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
