FROM python:3.4-slim

RUN apt-get update \
    && apt-get install -y \
        postgresql-client libpq-dev \
        gcc \
        --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app
WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 80
CMD ["serve"]
