# Book Manager

Simple Full stack project demo.

## Running the project

### Prerequisites

- [Docker](https://www.docker.com/) with [Compose](https://docs.docker.com/compose/)
- Avaiable ports `3000` and `8080`

### Launching

The app can be started by running the command `docker compose up` in the project root folder. After the build stabilizes, it can be accessed at [http://localhost:3000/]().

## Setting up development environment

### Prerequisites

- Frontend:
  - [Node 18](https://nodejs.org/en/)
- Backend:
  - JDK 17 or newer e.g. [OpenJDK 19](https://openjdk.org/projects/jdk/19/)
  - [Docker](https://www.docker.com/) for running the PostgreSQL image

### Installation steps

1. First setup the project by running `npm run ci-all` in the project root folder. This installs required npm dependencies and sets up commit hooks.
2. Start up PostgeSQL server by running `docker run -p 5432:5432 -e POSTGRES_USER=bookmanager -e POSTGRES_PASSWORD=password postgres`
3. Run `npm start` to start frontend and backend services. The frontend can be accessed at [http://localhost:3000/]()

## License

This project is licensed under MIT license.
