# Task Tracker API

A REST API built with **Node.js** and **Express.js** that allows users to create, retrieve, update, and delete tasks.

This project was built as a hands-on exercise to practise backend development and REST API fundamentals.

## Features

- Create a task
- Retrieve all tasks
- Retrieve a task by ID
- Update a task's title and completion status
- Delete a task
- Validate incoming data
- Handle common errors using HTTP status codes
- Store tasks in a JSON file

## Tech Stack

- **Node.js** — JavaScript runtime
- **Express.js** — Web framework
- **File System (`fs`)** — File operations
- **JSON** — Task data storage

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- npm installed

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/soumyadipgayen777-beep/task-tracker-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-tracker-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server using the command configured in `package.json`:

   ```bash
   npm start
   ```

The API should run at `http://localhost:3000`, assuming your server uses port `3000`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/tasks` | Create a task |
| `GET` | `/api/tasks` | Retrieve all tasks |
| `GET` | `/api/tasks/:id` | Retrieve a task by ID |
| `PATCH` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

## Request Examples

### Create a Task

**POST** `/api/tasks`

```json
{
  "title": "Learn Express"
}
```

### Update a Task

**PATCH** `/api/tasks/:id`

```json
{
  "completed": true
}
```

### Delete a Task

**DELETE** `/api/tasks/:id`

Replace `:id` with the ID of the task you want to delete.

## Data Storage

Tasks are stored in a local JSON file.

Each task contains a unique ID, a title, and a completion status.

Example:

```json
{
  "id": "example-id",
  "title": "Learn Express",
  "completed": false
}
```

## Error Handling

The API uses HTTP status codes to indicate request results.

- `200 OK` — Request successful
- `201 Created` — Task created successfully
- `400 Bad Request` — Invalid input
- `404 Not Found` — Task not found
- `500 Internal Server Error` — Server-side error

## What I Learned

- Building REST API endpoints with Express.js
- Handling HTTP requests and responses
- Working with route parameters and request bodies
- Using array methods such as `find()` and `filter()`
- Reading and writing JSON files with Node.js
- Validating input and handling errors

## Future Improvements

- Add automated tests
- Improve error handling and code organization
- Replace JSON-file storage with a database
- Deploy the API online

## License

No license has been added yet.
