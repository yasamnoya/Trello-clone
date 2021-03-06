from django.db import models, transaction

class CardManager(models.Manager):

    def create(self, **kwargs):
        instance = self.model(**kwargs)

        with transaction.atomic():
            # get the max order number + 1
            max_order = self.filter(
                to_list=instance.to_list
            ).aggregate(
                models.Max('order')
            )['order__max']

            if max_order == None:
                max_order = - 1

            new_order = max_order + 1
            instance.order = new_order
            instance.save()
            return instance


    def move(self, obj, new_list_obj, new_order):
        queryset = self.get_queryset()

        with transaction.atomic():
            if new_list_obj == obj.to_list:
                if obj.order > int(new_order):
                    queryset.filter(
                        to_list=obj.to_list,
                        order__lt=obj.order,
                        order__gte=new_order,
                    ).exclude(
                        pk=obj.pk
                    ).update(
                        order=models.F('order') + 1,
                    )
                else:
                    queryset.filter(
                        to_list=obj.to_list,
                        order__lte=new_order,
                        order__gt=obj.order,
                    ).exclude(
                        pk=obj.pk,
                    ).update(
                        order=models.F('order') - 1,
                    )
                obj.order = new_order
                obj.save()

            else:
                # decrese the order of old list
                queryset.filter(
                    to_list=obj.to_list,
                    order__gt=obj.order
                ).update(
                    order=models.F('order') - 1
                )

                # increse the order of new list
                queryset.filter(
                    to_list=new_list_obj,
                    order__gte=new_order
                ).update(
                    order=models.F('order') + 1
                )

                obj.to_list = new_list_obj
                obj.order = new_order
                obj.save()

    def delete(self, obj):
        queryset = self.get_queryset()

        with transaction.atomic():
            queryset.filter(
                to_list=obj.to_list,
                order__gt=obj.order
            ).update(
                order=models.F('order') - 1
            )

        obj.delete()

class ListManager(models.Manager):
    def create(self, **kwargs):
        queryset = self.get_queryset()
        instance = self.model(**kwargs)

        with transaction.atomic():
            # get the max order number + 1
            max_order = queryset.all().aggregate(
                models.Max('order')
            )['order__max']

            if max_order == None:
                max_order = - 1
            new_order = max_order + 1

            instance.order = new_order
            instance.save()
            return instance

    def cards(self, obj, **kwargs):
        print(obj.cards.all())
        return obj.cards.all()

    def move(self, obj, new_order):
        queryset = self.get_queryset()

        with transaction.atomic():
            if obj.order > int(new_order):
                queryset.filter(
                    order__lt=obj.order,
                    order__gte=new_order,
                ).exclude(
                    pk=obj.pk
                ).update(
                    order=models.F('order') + 1,
                )
            else:
                queryset.filter(
                    order__lte=new_order,
                    order__gt=obj.order,
                ).exclude(
                    pk=obj.pk,
                ).update(
                    order=models.F('order') - 1,
                )
            obj.order = new_order
            obj.save()

    def delete(self, obj):
        queryset = self.get_queryset()

        with transaction.atomic():
            # move the lists below the deleted one
            queryset.filter(
                order__gt=obj.order
            ).update(
                order=models.F('order') - 1
            )

            # delete the cards belong to the deleted list
            obj.cards.all().delete()


            obj.delete()
