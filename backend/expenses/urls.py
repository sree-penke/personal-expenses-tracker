from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, SpendViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'spends', SpendViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
