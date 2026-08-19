# Task Management System

A full-stack MERN Task Management System with JWT authentication, bcrypt password hashing, task CRUD operations, status filtering, and deadlines.

## Features

* User registration and login
* JWT-based authentication
* Password hashing using bcrypt
* Create, read, update, and delete tasks
* Task status management
* Task filtering by status
* Task deadlines
* MongoDB database
* React.js dashboard
* REST APIs using Node.js and Express.js
* Protected task routes

## Technologies Used

* React.js
* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* HTML
* CSS
* JavaScript
* Thunder Client

## Project Structure

```text
cognevance_taskManagement/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
└── .gitignore
```

## REST API Documentation

### Authentication APIs

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| POST   | `/api/auth/register` | Register a new user         |
| POST   | `/api/auth/login`    | Login and receive JWT token |

### Task APIs

| Method | Endpoint                      | Description            |
| ------ | ----------------------------- | ---------------------- |
| GET    | `/api/tasks`                  | Get all tasks          |
| GET    | `/api/tasks?status=Completed` | Filter tasks by status |
| POST   | `/api/tasks`                  | Create a new task      |
| PUT    | `/api/tasks/:id`              | Update a task          |
| DELETE | `/api/tasks/:id`              | Delete a task          |

Protected task APIs require:

```text
Authorization: Bearer <JWT_TOKEN>
```

## MongoDB Schema

### User

```text
User
├── name: String
├── email: String
└── password: String
```

The password is securely hashed using bcrypt.

### Task

```text
Task
├── title: String
├── description: String
├── status: String
├── deadline: Date
└── user: ObjectId
```

The `user` field connects each task with its corresponding user.

## How to Run the Project

### Backend

Open a terminal inside the `backend` folder:

```bash
npm install
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### Frontend

Open another terminal inside the `frontend` folder:

```bash
npm install
npm run dev
```

The React frontend runs on the localhost address provided by Vite.

## Testing

The REST APIs were tested using Thunder Client.

The application was also tested through the React frontend for:

* Registration
* Login
* Logout
* Adding tasks
* Viewing tasks
* Updating task status
* Filtering tasks
* Deleting tasks
* Setting deadlines

## Authentication

JWT tokens are generated during login and used to access protected task routes. Passwords are hashed using bcrypt before being stored in MongoDB.

## Project Status

The Task Management System has been completed with authentication, CRUD functionality, MongoDB integration, REST APIs, and a React dashboard.

## Author

Sneha Dasgupta

