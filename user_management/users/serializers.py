from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.hashers import make_password

# serializers.py

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'status', 'emp_id', 'role', 'task']  # Ensure all fields are listed here
        extra_kwargs = {'password': {'write_only': True}}

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
        representation['password'] = instance.password  # Include hashed password
        return representation




