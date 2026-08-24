# Database Setup Guide

## 1. Install Node.js
Install the current Node.js LTS release from https://nodejs.org/. Confirm the installation with `node --version` and `npm --version`.

## 2. Install MongoDB
Choose one option:

- Install MongoDB Community Server and MongoDB Compass locally.
- Create a free MongoDB Atlas cluster at https://www.mongodb.com/atlas.

## 3. Create a database
For a local database, the name `collaborative_todo` is created automatically when the first task is saved. In Atlas, create a cluster and database user.

## 4. Obtain the connection string
Copy the local connection string or the Atlas connection string. Replace its username and password placeholders with your own private values.

## 5. Create `.env`
Create a file named `.env` in the project root. Copy the contents of `.env.example` into it.

## 6. Add `MONGODB_URI`
Set `MONGODB_URI` to your private connection string. Never publish the real string or password.

## 7. Add `PORT`
Use `PORT=5000`, or choose another available port.

## 8. Install dependencies
From the project folder, run:

```bash
npm install
```

## 9. Start the server
Run:

```bash
npm start
```

For development with automatic restart:

```bash
npm run dev
```

## 10. Test the connection
A successful startup prints `MongoDB connected successfully` and `Server running on port 5000`.

## 11. Test the API
Open Postman and import `postman/todo-api-collection.json`, or use the examples in `api.http`. Create a task first, copy its `_id`, and use that ID in the read, update, and delete requests.

## Common problems

- `MONGODB_URI is not defined`: confirm the file is named `.env` and is in the project root.
- Connection refused: start the local MongoDB service, or check the Atlas network access settings.
- Port already in use: change `PORT` in `.env` and update the Postman base URL.
