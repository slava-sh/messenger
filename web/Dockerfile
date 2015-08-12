FROM python:3.4-slim

RUN apt-get update \
    && apt-get install -y \
        postgresql-client libpq-dev \
        gcc \
        --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /usr/src/app

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
