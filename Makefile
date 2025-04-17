.PHONY: build up down test

IMAGE_NAME = flask-app

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	docker-compose run --rm backend pytest