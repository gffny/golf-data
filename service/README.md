# Service Skeleton
This is a service skeleton for Node / Express microservices and is intended to be used as a reference implementation. It contains:
- An API Router (`/api/examples`) along with its corresponding Data Transfer Object
- A database model as well as a migration file for creating the corresponding table
- An example `service` implementation for making calls to third parties
- A set of common middleware and utilities for: metrics (statsD), error handling, database, service-to-service auth (TODO)

## Maintainers
This project is maintained by:
- [Sim](https://gitlab.com/simbrar)
- [Kyle](https://gitlab.com/kyle_ian)

## Technologies
We use the following technology stack:
- Node JS
- Express
- MySQL (as example DB)
- Knex + Objection
- Swagger docs
- StatsD (`hot-shots` lib for dogStatsD)
- Jest + Supertest
- Docker

## Project Structure
```
├── __tests__           # All test related logic
│   ├── integration     # Integration tests
│   ├── mocks           # Test mocks
│   ├── unit            # Unit tests
│   └── utils           # Test utils
├── api                 # API endpoint logic
│   └── models          # Data Transfer Objects for API contracts
├── config              # Service configuration
├── constants           # Constants used within the codebase
├── db                  # DB logic
│   ├── migrations      # Knex migration files
│   └── models          # Objection models
├── middleware          # Server middleware
├── services            # Third-party service clients and logic
└── utils               # Project utils 
```

## How to run the project
### Required Environemnt variables
- `NPMJS_TOKEN` - available in SSM via path: `/gitlab/plastiq-devops/NPMJS_TOKEN`

### Local
#### Setup local DB
```
# Install MySQL
brew install mysql
brew services start mysql
# connect to local MySQL
mysql -u root
# Create DB / users 
CREATE DATABASE example;
CREATE USER 'example'@'localhost' IDENTIFIED BY 'example';
GRANT ALL ON example.* TO 'example'@'localhost';
```
#### Run service
```
npm install
npm start
```

### Docker
```
npm run start-docker
```
### API Docs
Start service, navigate to:
```
http://localhost:3000/api-docs
```

## Database
### Migrations - http://knexjs.org/#Migrations

```
knex migrate:make create_example_table --migrations-directory=./db/migrations
```
Running a migration manually (happens automatically on save / service restart via middleware):
```
knex migrate:latest --migrations-directory=./db/migrations
```
### Seeds
Creating a new seed:
```
# TODO
```

## Troubleshooting
### Docker
View docker logs:
```
docker ps                                 # list containers
docker logs -f --tail container_name      # view logs
```

## TODOs
- SSM var support
- Docker support
- E2E support
- Service-to-Service auth support
- Pull common middleware into NPM packages to better propagate updates rather than hardcoding / duplicating
- Add a `docs` folder and add a runbook or more troubleshooting steps to the readme
- Add caching, retry, circuit breaking support for outgoing service calls
- Add support for publishing API docs somewhere global (?)
- Templatize this project / create CLI so people can fill out a JSON config and get everything they need
- Write a TypeScript PR to compare
- Optimizely
