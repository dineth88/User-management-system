from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import CustomUser, Question, Answer
from .serializers import CustomUserSerializer, QuestionSerializer, AnswerSerializer
from rest_framework.permissions import BasePermission

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'DELETE']:
            return [IsAdminUser()]
        return [IsAuthenticated()]

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        # Ensure created_by is explicitly cast as a CustomUser instance
        serializer.save(created_by=self.request.user)
        
class IsOwner(BasePermission):
    """
    Custom permission to allow only the owner of an object to edit or delete it.
    """
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        # Filter answers to show only the ones created by the logged-in user
        return self.queryset.filter(user=self.request.user)
