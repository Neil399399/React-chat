ROOT_DIR := $(CURDIR)
HOME_DIR := ${ROOT_DIR}

local-pg:
	source ${HOME_DIR}/scripts/.env_local; \
	docker-compose -f ${HOME_DIR}/deployment/docker-compose.yaml up -d postgres adminer
	@sleep 5

start-message-server:
	source ${HOME_DIR}/scripts/.env_local; \
	cd server; \
	cargo run --bin messager-rs

start-mongooseim:
	source ${HOME_DIR}/scripts/.env_local; \
	make local-pg; \
	diesel migration run --migration-dir ${HOME_DIR}/deployment/migrations; \
	docker-compose -f ${HOME_DIR}/deployment/docker-compose.yaml up -d mongooseim

stop-mongooseim:
	source ${HOME_DIR}/scripts/.env_local; \
	docker-compose -f ${HOME_DIR}/deployment/docker-compose.yaml down

start-web:
	cd web; \
	yarn install & yarn start