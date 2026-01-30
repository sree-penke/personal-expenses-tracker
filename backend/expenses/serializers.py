from rest_framework import serializers
from .models import Task, Spend


class SpendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spend
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Task 
        fields = '__all__'