# Kanban Board Frontend

This is the frontend of the Kanban Board application built with Angular.

## Technologies

- Angular
- Angular Material
- Angular CDK (Drag & Drop)
- Tailwind CSS
- TypeScript
- Reactive Forms

---

## Prerequisites

- Node.js
- Angular CLI

Install Angular CLI globally if needed.

```bash
npm install -g @angular/cli
```

---

## Installation

Navigate to the frontend folder.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

---

## Run the Application

```bash
ng serve
```

The application will be available at:

```
http://localhost:4200
```

---

## Features

- Display tasks in Kanban columns
- Create new task
- Edit existing task
- Drag and drop tasks between columns
- Automatically update task status
- Responsive user interface

---

## Backend API

The frontend communicates with the backend REST API.

Default API URL:

```
http://localhost:5000/api/tasks
```

Update the API URL in the service if running on a different host or port.