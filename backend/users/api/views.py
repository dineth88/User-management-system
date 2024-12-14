from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializer import UserSerializer

# Create your views here.
#endpoints
@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    serializedData = UserSerializer(users, many=True).data
    return Response(serializedData)


@api_view(['POST'])
def create_user(request):
    data = request.data
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        #Save the data comng from frontend
        serializer.save()
        return Response(serializer.data, status= status.HTTP_201_CREATED)
    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

