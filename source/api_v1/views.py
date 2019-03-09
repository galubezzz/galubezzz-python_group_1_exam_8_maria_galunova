from rest_framework import viewsets
from webapp.models import Task
from api_v1.serializers import TaskSerializer


# Create your views here.

class NoAuthModelViewSet(viewsets.ModelViewSet):
    authentication_classes = []


class TaskViewSet(NoAuthModelViewSet):
    queryset = Task.objects.active().order_by('status', '-due_date')
    serializer_class = TaskSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()
