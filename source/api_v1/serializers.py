from webapp.models import Task
from rest_framework import serializers


class TaskSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:task-detail')
    status_display = serializers.CharField(source="get_status_display", read_only=True)

    class Meta:
        model = Task
        fields = ("url", "id", "summary", "description", "due_date", "status", "time_planned", "status_display")
