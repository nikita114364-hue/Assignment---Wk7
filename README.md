# Collaborative To-Do List REST API

## Project Description

This project is a modular REST API for creating and managing collaborative to-do tasks. It uses Express.js for HTTP routing and MongoDB for permanent data storage.

## Features

- Create, read, update, and delete tasks.
- Filter tasks with `?completed=true` or `?completed=false`.
- Validate titles, task IDs, data types, and query values.
- Maintain `createdAt` and `updatedAt` automatically.
- Return clean JSON errors without exposing stack traces.
- Include Postman and `.http` examples for demonstration.

## Technology Stack

Node.js, Express.js, MongoDB, Mongoose, JavaScript, dotenv, Postman, and Git.

## Project Structure

```text
config/db.js                 MongoDB connection
controllers/taskController.js CRUD behavior
middleware/errorHandler.js   Central error responses
models/Task.js               Mongoose schema
routes/taskRoutes.js         API route definitions
postman/                     Importable Postman collection
server.js                    Express startup
api.http                     Example HTTP requests
DATABASE_SETUP.md            Beginner database instructions
PROJECT_REPORT.md            Academic report template
TESTING_CHECKLIST.md         Positive and negative test table
```

## Database Schema

| Field | Type | Rules |
|---|---|---|
| `_id` | MongoDB ObjectId | Automatically generated |
| `title` | String | Required, trimmed, maximum 100 characters |
| `description` | String | Optional and trimmed |
| `isCompleted` | Boolean | Defaults to `false` |
| `dueDate` | Date | Optional |
| `createdAt` | Date | Automatically maintained |
| `updatedAt` | Date | Automatically maintained |

## API Endpoints

| Method | Endpoint | Purpose | Status |
|---|---|---|---|
| POST | `/api/tasks` | Create a task | 201, 400 |
| GET | `/api/tasks` | Get all tasks | 200 |
| GET | `/api/tasks?completed=true` | Get completed tasks | 200, 400 |
| GET | `/api/tasks/:id` | Get one task | 200, 400, 404 |
| PATCH | `/api/tasks/:id` | Partially update a task | 200, 400, 404 |
| DELETE | `/api/tasks/:id` | Delete a task | 200, 400, 404 |

## Installation

Install Node.js and MongoDB or create a MongoDB Atlas database. Then open a terminal in this folder and run:

```bash
npm install
```

## Environment Variables

Create a root-level `.env` file based on `.env.example`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/collaborative_todo
PORT=5000
```

Use your private Atlas connection string when applicable. Never commit `.env`; it is excluded by `.gitignore`.

## Running the Project

```bash
npm start
```

Development mode with automatic restart:

```bash
npm run dev
```

The API runs at `http://localhost:5000` by default.

## Testing with Postman

Import `postman/todo-api-collection.json`. Run **Create Task** first. Its test script stores the returned ID in the collection variable `taskId`, allowing the remaining requests to run in sequence. The same examples are available in `api.http`.

The persistence demonstration should show the POST response, the saved document in MongoDB Compass or Atlas, the changed document after PATCH, and the document removed after DELETE.

## Error Handling

The global error middleware handles Mongoose validation errors, invalid data formats, malformed JSON, invalid ObjectIds, and unexpected runtime errors. Clients receive clear JSON messages. Unexpected errors return `500 Internal Server Error` without a raw stack trace.

## HTTP Status Codes

- `201 Created`: a task was successfully created.
- `200 OK`: a read, update, or delete operation succeeded.
- `400 Bad Request`: submitted data, a query value, or an ID format is invalid.
- `404 Not Found`: the route or requested task does not exist.
- `500 Internal Server Error`: an unexpected server-side failure occurred.

## Testing Checklist

Complete the positive and negative cases in [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md), recording the actual result and Pass/Fail status.

## GitHub Repository

Replace this placeholder with the actual public repository URL:

`[ADD YOUR PUBLIC GITHUB URL HERE]`

```bash
git init
git add .
git commit -m "Initial REST API project"
git branch -M main
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

Do not upload `node_modules/`, `.env`, passwords, or private credentials.

## Academic Materials

Use [DATABASE_SETUP.md](DATABASE_SETUP.md) for setup instructions and [PROJECT_REPORT.md](PROJECT_REPORT.md) for the six-page report, screenshot captions, video plan, viva questions, and final submission checklist.