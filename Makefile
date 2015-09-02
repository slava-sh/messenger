.PHONY: development deploy clean

development:
	docker-compose build
	docker-compose up -d
	docker-compose ps

deploy:
	$(MAKE) -C client
	docker-compose build
	docker-compose up -d
	docker-compose run --rm web python manage.py migrate
	#docker-compose run --rm web python manage.py collectstatic --noinput

clean:
	$(MAKE) -C client clean
	$(MAKE) -C realtime clean
