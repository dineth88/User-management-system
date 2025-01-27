from rest_framework import viewsets, status, generics, permissions
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission
from .models import CustomUser, Task
from .serializers import CustomUserSerializer, TaskSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return [IsSelfOrAdmin()]  # Custom permission
        return [IsAuthenticated()]  # Default permission

    @action(detail=False, methods=['get', 'put'], permission_classes=[IsAuthenticated])
    def me(self, request):
        if request.method == 'GET':
            serializer = self.get_serializer(request.user)
            return Response(serializer.data)
        elif request.method == 'PUT':
            # Handle the update
            serializer = self.get_serializer(request.user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        
        # Remove password if it's not intended to be updated
        if 'password' in request.data:
            request.data.pop('password')

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)
        
    def destroy(self, request, *args, **kwargs):
        """Override the destroy method to add custom logic if needed."""
        instance = self.get_object()
        # Check if the user is allowed to delete this object
        self.check_object_permissions(request, instance)
        instance.delete()
        return Response({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

        
class IsOwner(BasePermission):
    """
    Custom permission to allow only the owner of an object to edit or delete it.
    """
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

class RegisterUserView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class IsSelfOrAdmin(BasePermission):
    """
    Custom permission to allow users to update their own profiles or admins to modify or delete any user.
    """
    def has_object_permission(self, request, view, obj):
        # Allow if the user is updating/deleting their own profile or is an admin
        if request.method in ['PUT', 'PATCH', 'DELETE']:
            return obj == request.user or request.user.is_staff
        return request.user.is_staff or obj == request.user
    
class IsAdminOrReadOnly(BasePermission):
    """
    Allow full access to admin users and read-only access to others.
    """
    def has_permission(self, request, view):
        return request.method in ('GET', 'HEAD', 'OPTIONS') or request.user.is_staff

# List all tasks and create a new task
class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        """
        Custom behavior during task creation.
        """
        serializer.save()

# Retrieve, update, or delete a specific task
class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated