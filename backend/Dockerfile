FROM python:3.8
WORKDIR /
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
EXPOSE 8000
COPY . .
RUN python3 manage.py makemigrations fst_server
RUN python3 manage.py migrate
RUN python3 manage.py crontab add
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]