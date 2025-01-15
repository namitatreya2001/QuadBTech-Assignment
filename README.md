# Advanced React To-Do Application with API Integration

## Overview
This repository contains an advanced To-Do application developed using React with API integration, Redux for state management, and responsive design principles. The application is designed to provide a seamless and user-friendly experience across all devices.

---

## Features

### Core Functionality
- **Add Task:** Users can add tasks via an input field and a button or by pressing Enter.
- **View Tasks:** Displays all added tasks in a structured list format.
- **Delete Task:** Each task has a delete button for removal.
- **Task Prioritization:** Users can assign priorities (High, Medium, Low) to tasks and view them accordingly.
- **Persistent Storage:** Utilizes local storage for saving tasks and authentication status across sessions.

### Advanced State Management
- Uses Redux for managing global state and Redux Thunk for handling asynchronous API calls.
- Simulates user authentication with mock login/logout functionality and protects the To-Do list behind authentication.

### API Integration
- Integrates the [Spoonacular Food API](https://spoonacular.com/food-api) to fetch relevant data for tasks.
- Includes robust error handling for API requests, ensuring errors are displayed gracefully in the UI.

### Responsive Design
- Fully responsive design implemented using CSS Grid, Flexbox, and a mobile-first approach.
- Compatible with mobile, tablet, and desktop devices.

### User Experience Enhancements
- Displays contextual API data .
- Ensures a clean and intuitive user interface using Material-UI.

---

## Screenshots

### Login Page
![Login Page]("https://ibb.co/kSN39Q2")

### Task List View
![Task List]("C:\Users\sharm\Downloads\Screenshot 2025-01-15 101300.png")

### Add Task Feature
![Add Task]("C:\Users\sharm\Downloads\Screenshot 2025-01-15 101421.png")

### Responsive Design
![Responsive View]("C:\Users\sharm\Downloads\Screenshot 2025-01-15 101605.png")

---

## Setup Instructions

### Prerequisites
Ensure the following are installed on your system:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Clone the Repository
```bash
git clone https://github.com/namitatreya2001/QuadBTech-Assignment.git
cd QuadBTech-Assignment

```
###Install Dependecies
```bash
npm install
```
###Run the application
```bash
npm run dev
```
Application will run on http://localhost:5173/

###How to Use
##Adding a Task
-Enter the task description in the input field.
-Optionally, set the task's priority (High, Medium, Low).
-Press Enter or click the "+" button to add the task.

##Viewing Tasks
Tasks are displayed in a list format. Tasks with higher priority are highlighted.

##Deleting a Task
Click the delete button next to a task to remove it from the list.

##Authentication
-Login to access the To-Do list
-Logout to clear session data.

###Technologies Used
-Frontend: React, Redux, Redux Thunk, Material-UI, CSS (Flexbox, Grid)
-API Integration: Spoonacular Food API
-State Management: Redux
-Package Management: npm

###License
This project is licensed under the MIT License.

###Author
https://github.com/namitatreya2001
Feel free to contribute to this project by submitting issues or pull requests!

###Additional Notes
-Ensure you update the .env file with your API key for the Spoonacular Food API:
```bash
REACT_APP_API_KEY=your_api_key_here
```
-For any issues, please create an issue in the GitHub repository.

