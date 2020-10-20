#!/usr/bin/env bash

cd backend
python3 manage.py runserver &
python3 manage.py crontab add &
cd ../feature-selection-tool
ng serve &