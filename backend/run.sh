#!/bin/bash
cd /
export PYTHONPATH=.
export DJANGO_SETTINGS_MODULE=backend.settings
/usr/local/bin/python3 /fst_server/cron.py &>/tmp/logs.txt
echo $? >> /tmp/py_res.txt
