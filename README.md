**EduConnect**
EduConnect is a comprehensive backend application built to manage user authentication, authorization, and data using a modern stack. This project demonstrates best practices for setting up a Node.js server with TypeScript, Express, and Prisma for database interactions with PostgreSQL.

**Features**
User Authentication: Secure signup and login functionality.
Role-Based Authorization: Differentiates between ADMIN and USER roles.
Token-Based Sessions: Utilizes JSON Web Tokens (JWT) for secure session management.
**API Endpoints:**
- POST /signup: Creates a new user.
-  POST /login: Authenticates an existing user and returns an auth token.
- GET /me: Returns the profile of the currently logged-in user based on their auth token.
- Database Management: Implements Prisma for efficient database schema management and CRUD operations.

**Tech Stack**
- Backend: Node.js, Express.js, TypeScript
- Database: PostgreSQL
- ORM: Prisma
- Authentication: JWT
- Development Tools: Nodemon, ts-node

**Project Setup**
1. Prerequisites
2. Node.js
3. PostgreSQL
Set up the database:

**Ensure PostgreSQL is running.**
- Create a new database for the project (e.g., skillbridge).
- Update the DATABASE_URL in the .env file with your PostgreSQL connection string.
**DATABASE_URL="postgresql://[USER]:[PASSWORD]@localhost:5432/skillbridge?schema=public"**

  




DATABASE_URL="postgresql://[USER]:[PASSWORD]@localhost:5432/skillbridge?schema=p
