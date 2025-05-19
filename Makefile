IMAGE_NAME=support-system-interface

.PHONY: build run

build:
	docker build -t $(IMAGE_NAME) .

run: build
	docker run -p 3000:80 $(IMAGE_NAME)
