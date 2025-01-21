from rest_framework import serializers
from .models import CustomUser, Task
from django.contrib.auth.hashers import make_password

# serializers.py
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'fullname','password', 'status', 'emp_id', 'role']  # Ensure all fields are listed here
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
    
class TaskSerializer(serializers.ModelSerializer):
    # Optionally include user details in the serialized response
    assigned_to_username = serializers.ReadOnlyField(source='assigned_to.username')
    assigned_to_fullname = serializers.ReadOnlyField(source='assigned_to.fullname')

    class Meta:
        model = Task
        fields = [
            'id',  # Include the task ID
            'task_title',
            'task_status',
            'assigned_to',  # ID of the user this task is assigned to
            'assigned_to_username',  # Read-only username
            'assigned_to_fullname',  # Read-only fullname
        ]
        # Use optional `read_only_fields` for fields that shouldn't be edited.
        read_only_fields = ['id']

    def validate_assigned_to(self, value):
        """
        Ensure the assigned user exists and is active.
        """
        if not value.is_active:
            raise serializers.ValidationError("Cannot assign a task to an inactive user.")
        return value






