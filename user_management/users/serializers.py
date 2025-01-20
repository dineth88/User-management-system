from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.hashers import make_password

# serializers.py
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'fullname','password', 'status', 'emp_id', 'role', 'task']  # Ensure all fields are listed here
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},  # Make password optional
        }

    def create(self, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop('password', None)  # Exclude password from the response
        return representation
    
# class TaskSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Task
#         fields = ['id', 'title', 'status', 'assigned_to']





