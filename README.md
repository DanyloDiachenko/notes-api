# Notes API Documentation

<img width="1800" alt="Screenshot 2025-02-17 at 10 04 21" src="https://github.com/user-attachments/assets/fd650bba-0d96-4f63-a8eb-76fdf23ab267" />

## Overview
Notes API is a RESTful service that allows users to manage their notes and tags. It supports authentication via JWT and interacts with a PostgreSQL database. Create for https://github.com/DanyloDiachenko/notes

## Tech Stack
- **Framework:** NestJS
- **Database:** PostgreSQL
- **Authentication:** JWT
- **ORM:** TypeORM
- **Validation:** Class-validator
- **Hashing:** Argon2 / Bcrypt

## Environment Variables (`.env`)
```env
JWT_SECRET=
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=notes
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/api/auth/login` | Login user to get a token |
| **GET**  | `/api/auth/profile` | Get all user information |

### Users
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/api/users/create` | Create a new user |

### Notes
| Method | Endpoint | Description |
|--------|---------|-------------|
| **GET**  | `/api/notes` | Get all user’s notes |
| **POST** | `/api/notes` | Create a note |
| **GET**  | `/api/notes/{id}` | Get one note by ID |
| **PUT**  | `/api/notes/{id}` | Update a note |
| **DELETE** | `/api/notes/{id}` | Delete a note |

### Tags
| Method | Endpoint | Description |
|--------|---------|-------------|
| **GET**  | `/api/tags` | Get all user’s tags |
| **POST** | `/api/tags` | Create a tag |
| **GET**  | `/api/tags/{id}` | Get one tag by ID |
| **PUT**  | `/api/tags/{id}` | Update a tag |
| **DELETE** | `/api/tags/{id}` | Delete a tag |

## Installation & Running
### Configure `.env` file with own secret keys:

### Install dependencies:
```sh
yarn install
```
### Run in development:
```sh
yarn start:dev
```
### Open documentation URL:
http://localhost:3001/api/docs#/

### Build for production:
```sh
yarn build
```

## Additional Info
- The API requires authentication for most endpoints.
- Ensure the `.env` file is correctly set up before running the application.
- Uses PostgreSQL as the database, so it must be installed and running.

