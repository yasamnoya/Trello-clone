from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from . import models
from . import serializers

# Create your views here.

class ListViewSet(viewsets.ModelViewSet):
    queryset = models.List.objects.all().order_by('order')
    serializer_class = serializers.ListSerializer
    # lookup_field = models.List.pk
    # filter_backends = (DjangoFilterBackend, )

    @action(methods=['put'], detail=True)
    def move(self, request, *args, **kwargs):
        obj = self.get_object()
        new_order = request.data.get('order', None)

        if new_order is None:
            return Response(
                    data={'error': 'No order given'},
                    status=status.HTTP_400_BAD_REQUEST,
                    )

        if int(new_order) < 0:
            return Response(
                    data={'error': 'Order cannnot be below 0'},
                    status=status.HTTP_400_BAD_REQUEST,
                    )


        models.List.objects.move(obj, new_order)
        return Response({'success': True, 'order': new_order})

class CardViewSet(viewsets.ModelViewSet):
    queryset = models.Card.objects.all().order_by('order')
    serializer_class = serializers.CardSerializer
    # filter_backends = (DjangoFilterBackend, )
    # filter_fields = ('to_list',)

    def create(self, request, *args, **kwargs):
        obj = self.get_object()
        new_order = request.data.get('order', None)
        new_list = request.data.get('to_list')
        models.Card.objects.move(obj, new_list, new_order)
        return Response({'success': True, 'list': new_list, 'order': new_order})
