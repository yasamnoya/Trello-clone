from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import List, Card

# Create your tests here.
class BoardTests(APITestCase):
    def test_create_list(self):
        test_title = 'test'

        url = reverse('list-list')
        data = {'title': test_title}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(List.objects.count(), 1)
        self.assertEqual(List.objects.get().title, test_title)
        self.assertEqual(List.objects.get().order, 0)

    def test_list_order_increment(self):
        url = reverse('list-list')
        data1 = {'title': 'old'}
        data2 = {'title': 'new'}
        response = self.client.post(url, data1, format='json')
        response = self.client.post(url, data2, format='json')
        self.assertEqual(List.objects.count(), 2)
        self.assertEqual(List.objects.get(title='new').order, 1)

    def test_list_move(self):
        self.test_list_order_increment()

        to_be_moved = List.objects.get(title='new')
        url = reverse('list-move', args=(to_be_moved.id,))
        data={'order': 0}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        moved = List.objects.get(title='new')
        updated = List.objects.get(title='old')
        self.assertEqual(moved.order, 0)
        self.assertEqual(updated.order, 1)

    def test_list_rename(self):
        self.test_create_list()
        to_be_renamed = List.objects.get()
        new_title = 'new title'

        url = reverse('list-detail', args=(to_be_renamed.id, ))
        data = {'title': new_title}

        response = self.client.put(url, data, format='json')
        renamed = List.objects.get()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(renamed.title, new_title)

    def test_list_delete(self):
        self.test_list_order_increment()

        to_be_deleted = List.objects.get(title='old')
        url = reverse('list-detail', args=(to_be_deleted.id, ))
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(List.objects.count(), 1)
        self.assertEqual(List.objects.get().order, 0)
