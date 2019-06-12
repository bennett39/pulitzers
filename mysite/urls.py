from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView
from .views import register

urlpatterns = [
    path('', TemplateView.as_view(template_name='frontend/index.html'), name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('register/', register),
]
