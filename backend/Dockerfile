FROM python:3.8
WORKDIR /
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
EXPOSE 8000
RUN apt-get update
RUN apt-get install -y cron
RUN chmod 644 /etc/crontab
COPY . .
RUN python3 manage.py makemigrations fst_server
RUN python3 manage.py migrate
RUN python3 manage.py crontab add
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi"]