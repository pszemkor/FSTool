"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
import sys

from django.contrib import admin
from django.urls import path

sys.path.append(os.path.abspath('../'))
sys.path.append(os.path.abspath('..'))
from fst_server.views import fs_request, get_models, classify

urlpatterns = [
    path('admin/', admin.site.urls),
    path('featureselection', fs_request),
    path('models', get_models),
    path('classify', classify)
]
