FROM python:latest

WORKDIR /app 

COPY requirements.txt .

COPY restaurant .

RUN pip install -r requirements.txt 

EXPOSE 8000 
