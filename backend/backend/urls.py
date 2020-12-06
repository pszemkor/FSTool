import os
import sys

from django.contrib import admin
from django.urls import path

sys.path.append(os.path.abspath('../'))
sys.path.append(os.path.abspath('..'))
from fst_server.views import fs_request, get_models, classify, settings, jobs, job_result, images, setup, selector_settings,\
    classifier_settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/featureselection', fs_request),
    path('api/v1/models', get_models),
    path('api/v1/classify', classify),
    path('api/v1/settings', settings),
    path('api/v1/jobs', jobs),
    path('api/v1/jobs/result/<str:job_id>', job_result),
    path('api/v1/images/<str:image_id>', images),
    path('api/v1/setup', setup),
    path('api/v1/selector-settings', selector_settings),
    path('api/v1/classifier-settings', classifier_settings),
]
