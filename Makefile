.EXPORT_ALL_VARIABLES:

APP_NAME = sisdash_front

build:
	docker compose up -d --build sisdash_front

run-dev:
	docker compose up -d sisdash_front

bash:
	docker exec -it sisdash_front /bin/bash

linter:
	docker exec -t sisdash_front npm run lint

create-deployment-file:
	chmod +x ./shell/create_deployment_file.sh
	./shell/create_deployment_file.sh

update-service-prod:
	chmod +x ./shell/update_service.sh
	./shell/update_service.sh
