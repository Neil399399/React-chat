ROOT_DIR := $(CURDIR)
HOME_DIR := ${ROOT_DIR}

local-pg:
	source ${HOME_DIR}/scripts/.env_local; \
	docker-compose -f ${HOME_DIR}/deployment/docker-compose.yaml up -d postgres adminer
	@sleep 5

start-mongooseim:
	source ${HOME_DIR}/scripts/.env_local; \
	make local-pg; \
	diesel migration run --migration-dir ${HOME_DIR}/deployment/migrations; \
	docker-compose -f ${HOME_DIR}/deployment/docker-compose.yaml up -d mongooseim

stop-mongooseim:
	source ${HOME_DIR}/scripts/.env_local; \
	docker-compose -f ${HOME_DIR}/deployment/docker-compose.yaml down