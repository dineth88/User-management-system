from rest_framework import serializers
from .models import CustomUser, Question, Answer
from django.contrib.auth.hashers import make_password

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'text', 'created_by']
        extra_kwargs = {'created_by': {'read_only': True}}


class AnswerSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    question = serializers.SerializerMethodField()

    class Meta:
        model = Answer
        fields = ['id', 'question', 'user', 'text']
        extra_kwargs = {
            'user': {'read_only': True},  # User should be set automatically
        }

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['user'] = request.user

        # Retrieve the question from the request data and validate it
        question_id = request.data.get('question')
        if not question_id:
            raise serializers.ValidationError({"question": "This field is required."})
        
        try:
            question = Question.objects.get(id=question_id)
        except Question.DoesNotExist:
            raise serializers.ValidationError({"question": "Invalid question ID."})
        
        validated_data['question'] = question
        return super().create(validated_data)

    def get_user(self, obj):
        return {"id": obj.user.id, "username": obj.user.username}

    def get_question(self, obj):
        return {"id": obj.question.id, "text": obj.question.text}



