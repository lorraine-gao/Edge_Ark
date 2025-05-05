## Run locally

Run the development server:

```bash
npm install

npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## View website 

Visit website [https://edgeark.vercel.app/](https://edgeark.vercel.app/)

## 🗄️ Database

This project uses **MongoDB Atlas**, a cloud-hosted NoSQL database, to store uploaded fixture data.

- When a user uploads a CSV file, the data is processed and stored in a MongoDB Atlas cluster.
- Database credentials are securely managed via environment variables and not exposed in the codebase.
- Remote database access is enabled through IP allowlisting and proper user role configuration.

