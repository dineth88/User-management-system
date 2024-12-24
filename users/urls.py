from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, QuestionViewSet, AnswerViewSet

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('questions', QuestionViewSet)
router.register('answers', AnswerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
