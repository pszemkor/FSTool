FROM python:3.8
WORKDIR /
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
EXPOSE 8000
RUN apt-get update
RUN apt-get install -y cron
RUN apt-get install -y vim
RUN apt-get -y install rsyslog
COPY . .
RUN chmod 777 /etc/crontab
RUN chmod 777 run.sh
COPY crontab-file /etc/cron.d/crontab-file
RUN chmod 0600 /etc/cron.d/crontab-file
RUN echo "\n" >> /etc/cron.d/crontab-file
ENV PYTHONPATH=.
ENV DJANGO_SETTINGS_MODULE=backend.settings
RUN touch /etc/crontab /etc/cron.*/*
RUN python3 manage.py makemigrations fst_server
RUN python3 manage.py migrate
RUN crontab /etc/cron.d/crontab-file
CMD cron -L15 && gunicorn --bind 0.0.0.0:8000 --timeout 200 backend.wsgi
