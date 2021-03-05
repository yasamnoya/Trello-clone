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

    def test_order_increment(self):

        url = reverse('list-list')
        data1 = {'title': 'old'}
        data2 = {'title': 'new'}
        response = self.client.post(url, data1, format='json')
        response = self.client.post(url, data2, format='json')
        self.assertEqual(List.objects.count(), 2)
        self.assertEqual(List.objects.get(title='new').order, 1)
