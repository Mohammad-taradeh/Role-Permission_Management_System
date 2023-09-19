# User and Role-Permission Management System

A User and Role-Permission Management System is a web application designed to manage users, their roles, and associated permissions. This system allows you to create and manage users, roles, permissions, and assign roles to users with ease.

## Table of Contents
- [Entities](#entities)
  - [User](#user)
  - [Role](#role)
  - [Permission](#permission)
  - [Profile](#profile)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Entities

### User

- **Attributes**: id (primary key), username, password, email, etc.
- **Relationships**: Many-to-Many with Role entity, One-to-One with Profile entity.

### Role

- **Attributes**: id (primary key), name (e.g., "admin," "user," "editor").
- **Relationships**: Many-to-Many with User entity and Many-to-Many with Permission entity.

### Permission

- **Attributes**: id (primary key), name (e.g., "create_post," "edit_user," "delete_comment").
- **Relationships**: Many-to-Many with Role entity.

### Profile

- **Attributes**: id (primary key), firstName, lastName, dateOfBirth, etc.
- **Relationships**: One-to-One with User entity.

## API Endpoints

- **Create User**: Create a new user.
- **Create Permission**: Create a new permission.
- **Create Role**: Create a new role and set permissions for it.
- **Assign Role to User**: Assign a role to a user.
- **Get User (with his roles and permissions)**: Retrieve user information along with associated roles and permissions.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository.
   ```bash
   cd your-repo
   git clone https://github.com/your-username/your-repo.git
2. Install project dependencies.
   ``` npm init ```

### Run The Code
to start running the code and test it if you want, Just run this command ```npm run dev```
