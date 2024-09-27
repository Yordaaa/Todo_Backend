# Todo Application Backend

## Overview

The Todo Application Backend is a RESTful API built with **Node.js** and **Express**. It efficiently manages tasks and subtasks while supporting user authentication and task organization through collections.

## Features

- **User Authentication**: Register and log in users securely.
- **CRUD Operations**: Create, Read, Update, and Delete tasks and subtasks.
- **Organized Task Management**: Group tasks within collections for better organization.
- **Data Persistence**: Store data using **MongoDB** for reliable access and management.

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express.js**: Web framework for Node.js, designed for building APIs.
- **MongoDB**: NoSQL database for storing application data.
- **JWT**: JSON Web Tokens for secure user authentication.
- **bcrypt**: Library for hashing passwords to ensure user security.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**
- **MongoDB**
- **npm** 

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Yordaaa/Todo_Backend.git
   cd todo_backend

2. **Install dependencies**:
npm install

3. **Set up a .env file**:

- NODE_ENV=DEVELOPMENT
- PORT=5000
- Mongo_Uri=add your mongo uri
- JWT_SECRET=add your secret key

4. **Start the application**:
npm run dev
