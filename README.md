# Welcome to Notes Taking App:

The Notes Taking App is a powerful tool built with React.js, Node.js (Express), and MongoDB, designed to empower you in efficiently managing your notes while providing a secure and personalized experience.

## Features:

1. **Add, Edit, and Delete Notes:** With user-friendly interface, you can effortlessly create new notes, update existing ones, and delete notes you no longer need. Stay organized and keep track of your thoughts, tasks, and ideas easily.

2. **Authentication for Enhanced Privacy:** The app utilizes robust authentication to ensure that only you can access and view your notes. Feel confident knowing that your sensitive information remains safe and secure.

3. **Effortless User Experience:** We've designed our app with simplicity in mind. Our intuitive interface allows you to focus on capturing your ideas without any distractions. Enjoy a seamless experience as you manage your notes effortlessly.

## Getting Started with the Project

To get started with the project, follow these steps:

1. **Setting up the Backend:**

   - Open a terminal or command prompt and navigate to the "backend" directory.
   - Build service image:
     ```
     docker build -t note-taking-service .
     ```
   - Build container:
     ```
     docker-compose up --build -d
     ```

2. **Setting up the Frontend:**
   - Open another terminal or command prompt and navigate to the "frontend" directory.
   - Install the required Node.js modules by running the command:
     ```
     npm install
     ```
   - Start the frontend development server using the command:
     ```
     npm run start
     ```

Make sure to provide the following configuration in an environment file:

- **MongoDB URL:** Replace `<DATABASE_URI>`, `<DATABASE_NAME>`, `<DATABASE_USERNAME>`, `<DATABASE_PASSWORD>` with the actual URL of your MongoDB database.

- **JWT Secret Token:** Set a secret token for JSON Web Token (JWT) authentication by replacing `<JWT_SECRET>`.

- **Backend Server Host Name:** Replace `<REACT_APP_API_BASE_URL>` with the hostname of your backend server. This is required to connect the front-end with the backend APIs.

**You are now ready to explore the project and begin your development journey!**
