# TechPro Manager

## Overview
   I developed a web application focused on managing technicians, their specializations, and project assignments. Users can easily add, update, view, and remove technicians, categorize them by specialization, and assign them to specific projects. The app tracks each technician’s skills, making it simple to match them with relevant projects.
   Additionally, users can monitor the progress of ongoing projects and manage deadlines, ensuring the right technician is assigned to the right task. With built-in error handling, the app provides clear feedback on actions, preventing mistakes like duplicate entries or incomplete data. This makes the management of technicians and projects streamlined and efficient.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Express.js
- **Database**: MySQL
- **Styling**: CSS

## Features
### Technician Management
- **Add Technician**: Users can add new technicians to the system, providing details such as name, email, age, and gender.
- **Edit Technician**: Existing technician details can be updated, including their name, email, age, and gender.
- **Delete Technician**: Technicians can be removed from the system if they are no longer relevant.

### Project Management
- **Add Project**: Users can create new projects, specifying the name, technician assigned, specialization, duration, and city.
- **Edit Project**: Project details can be modified, including the project name, technician assigned, specialization, duration, and city.
- **Delete Project**: Projects can be deleted if they are no longer active or relevant.

### Error Handling
- **Validation**: Input data is validated to ensure accuracy and prevent errors.
- **Error Messages**: Informative error messages are displayed to users in case of invalid input or other issues.

### User Interface
- **Intuitive Design**: The interface is designed to be user-friendly and easy to navigate.

### Backend Management
- **Express.js Server**: The backend is powered by an Express.js server, handling API requests and database operations.
- **MySQL Database**: Data is stored and managed in a MySQL database, ensuring reliability and scalability.

## Installation and Setup
1. Clone the repository: `git clone <URL_REPO>`
2. Install dependencies in the `server` directory: 
   - npm init -y (initialize a Node.js project by running this command in your terminal in the `server` dir)
   - npm install express
   - npm install mysql2
   - npm install cors
4. Configure the MySQL database: Update database details in the `db.js` file
5. Start the server: Run `npm start` in the `server` directory
6. Start the client: Run `npm start` in the `client` directory
   
