import os
import sys

from django.contrib import admin
from django.urls import path

sys.path.append(os.path.abspath('../'))
sys.path.append(os.path.abspath('..'))
from fst_server.views import fs_request, get_models, classify, settings, jobs, job_result, images, selector_settings,\
    classifier_settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('featureselection', fs_request),
    path('models', get_models),
    path('classify', classify),
    path('settings', settings),
    path('jobs', jobs),
    path('jobs/result/<str:job_id>', job_result),
    path('images/<str:image_id>', images),
    path('selector-settings', selector_settings),
    path('classifier-settings', classifier_settings),
]
