from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('guitars/', views.GuitarList.as_view(), name='guitar-list'),
    path('guitars/<int:pk>/', views.GuitarDetail.as_view(), name='guitar-detail'),
    path('guitars/<int:pk>/setup/', views.GuitarSetup.as_view(), name='guitar-setup'),
    path('guitars/<int:pk>/photos/', views.GuitarPictures.as_view(), name='guitar-pictures'),
]