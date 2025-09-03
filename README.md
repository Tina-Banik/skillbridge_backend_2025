** HTTP & APT ( GET,POST,PUT,DELETE,Status Code), Authentication (Signup,login,password,hashing,JWT session), Database basics, Prisma-schema,migration and crud, Typescript (mandatory as it is used extensively).
Routes : **
**For users : /login → to login user
		/signup → signup user
	/me → to return current logged in user based on auth token (Role based auth)**
**Project Setup : **
	i. Make a directory, we can give any name. E.g. mkdir eduConnect
	ii. cd eduConnect
	iii. npm init -y
	iv. npm i install typescript –save-dev (--) as it will be a development dependency because when the code will go into the production we have to compile the typescript to javascript to upload on that production. So we need typescript only for the development. So we will write “-dev”.
	v. npx tsc –init(--) →  we initialize this project with typescript, so we use this command. TSC is a  typescript compiler. It holds all the configuration for all the typescript. 
	vi. Next we will install types for the nodes. The command is : npm install --save @types/node -dev → it will be a development dependency. So, it will give all the type safety for all the node apis like files process and operating system. 
	vii. After all these we write “mkdir src” .
	viii. Within the src folder, we write npm i express.
ix. After, we write the command “npm install @types/express --save-dev” 
Here, all the types are development dependency.
After, 
	Completing the above set of instructions, we create a file named “main.ts”, after we need another command to run the file that is : “npm i ts-node” for this typescript, we need an extra package to compile this to javascript and run that so. And we will also need nodemon for reloading and these all will be the development dependency. 
The command is : “npm i ts-node nodemon –save-dev”
Go to the directory (eduConnect): make a file “nodemon.json” 
Then we open the terminal in vs-code and write “npm start”. 
Here , we make a file “.env” and keep all our hidden properties such as PORT,keys,api/url etc.  
In tsconfig.json file we must do this "verbatimModuleSyntax": false” 


**Database connections:** 
**npm i prisma and npm i @prisma/client,**
After we run “npx prisma init”, 
What npx prisma init Sets Up
Creates a prisma/ folder in your project root
Inside it, you'll find:
schema.prisma: This is your data model file where you define tables, relations, and types
Generates a .env file if you don’t already have one, with a placeholder for your database URL:

 https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql 

**https://www.postgresql.org/download/windows/  → from this I download the postgres, and keep everything as it is and enter a password and we have to remember the password as everytime we login to the system we remember the password and password is : tinabanik
Working on the Relational Database using PostgreSQL **:
**USING PGADMIN4
USING SQLSHELL(PSQL**)--> Here, when we open the sql shell already there Server(localhost)has been written, and we just press enter until the password appears, then enter the password.
We write down the query, select version(); → this syntax gives us the current version in which we are working. 
Basic Commands : SELECT, DROP, CRATE, INSERT, UPDATE
Clauses : WHERE, ORDER BY, IS NULL, OFFSET, FETCH, LIKE 
For creating the database, the command is: 
//psql -U postgres -h localhost
-- enter your password
CREATE DATABASE skillbridge;
\l              -- list databases
\c skillbridge  -- connect to it
\dt             -- list tables (will be empty for now)


After I create a db/db.connections.ts
import { PrismaClient } from "../src/generated/prisma";
const prismaClient =new PrismaClient({
    log:["query"]
})
export default prismaClient;
**prisma/schema.prisma: Some codes are written are there, here we write our code for the admin model : **
enum Role{
  ADMIN
  USER
}
model User{
  id Int @id @default(autoincrement())
  username String
  email String @unique
  password String
  role Role @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@map("user")
}
After I write the command : npx prisma migrate dev --name create_user_schema(here we can give any name for our understanding purpose). It gives the sql file.


