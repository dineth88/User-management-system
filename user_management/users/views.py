from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission
from .models import CustomUser
from .serializers import CustomUserSerializer
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
    Custom permission to allow users to update their own profiles or admins to modify any user.
    """
    def has_object_permission(self, request, view, obj):
        # Allow if the user is updating their own profile or is an admin
        return obj == request.user or request.user.is_staff
    
class IsAdminOrReadOnly(BasePermission):
    """
    Allow full access to admin users and read-only access to others.
    """
    def has_permission(self, request, view):
        return request.method in ('GET', 'HEAD', 'OPTIONS') or request.user.is_staff
