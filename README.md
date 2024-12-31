# Scheduling-Calendar-Assistant-using-CoAgent


This repository demonstrates an **Scheduling-Calendar-Assistant-using-CoAgent** that integrates Google Calendar, uses CopilotKit’s **CoAgent** for conversational capabilities, and allows users to schedule and retrieve events. The project is split into two main parts:

1. **Backend** (Node.js / Express) — Handles OAuth2 authentication with Google, fetches calendar events, and provides an API interface.  
2. **Frontend** (React) — Demonstrates how to interact with the backend for authentication and event display, and includes a CoAgent-powered chat assistant.

Below is a comprehensive guide on setting up and running this project **locally**.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [How CoAgent is Used](#how-coagent-is-used)
- [Installation and Setup](#installation-and-setup)
  - [Prerequisites](#prerequisites)
  - [Google Cloud Console Configuration](#google-cloud-console-configuration)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Usage](#usage)
  - [Generating the Auth URL](#generating-the-auth-url)
  - [Completing OAuth2 Flow](#completing-oauth2-flow)
  - [Fetching Events](#fetching-events)
  - [Using the CoAgent Chat Assistant](#using-the-coagent-chat-assistant)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Project Overview

This AI-Driven Scheduling & Calendar Assistant:
- **Connects** to Google Calendar via OAuth2 to manage events.  
- **Retrieves** user events to display in a calendar view (or in JSON format).  
- **Uses** a conversational UI (chat assistant) to handle scheduling queries or general instructions, powered by **CoAgent** from CopilotKit.

By combining a simple Node.js/Express server, Google APIs, and a React-based frontend, this project demonstrates how AI can seamlessly integrate with a user’s schedule, retrieving and manipulating data in a conversational manner.

---

## Key Features

1. **Google Calendar Integration**: Secure OAuth2 flow to authenticate and fetch user events.  
2. **Conversational Scheduling**: A CoAgent-powered chat interface for scheduling inquiries (e.g., “What’s on my calendar tomorrow?”).  
3. **Secure Token Storage**: The project can store tokens in a file or database for future requests (in a production setting, a secure DB is recommended).  
4. **Local or Production**: Easily adaptable to run locally or on cloud platforms (Heroku, Vercel, etc.).  

---

## Tech Stack

1. **Backend**:
   - **Node.js** & **Express** for server and API routes  
   - **googleapis** library for integrating with Google Calendar  
   - **body-parser** and **cors** for handling requests/responses  
2. **Frontend**:
   - **React** for the web UI  
   - **react-toastify** for notifications  
   - **react-calendar** for displaying events (optional)  
   - **CopilotKit’s CoAgent** for conversational AI 
3. **Others**:
   - **dotenv** for environment variables  
   - **nodemon** for auto-restarting the backend server in development  

---

## How CoAgent is Used

**CoAgent** from CopilotKit allows you to quickly integrate AI-based conversational flows into your application. In this project:

- The **CoAgent** class is extended to handle user messages about scheduling or retrieving events.
- It acts as an **interface** between the user’s chat input and the backend logic, so you can **ask** CoAgent things like “What’s my next event?” or “Schedule a meeting for tomorrow at 10 AM,” and it can coordinate with your backend to fetch or manipulate calendar data.
- This approach **streamlines** adding new AI features, as CoAgent can easily integrate additional APIs, knowledge bases, or custom logic without major code rewrites.

---

## Installation and Setup

### Prerequisites

- **Node.js** (LTS recommended, e.g., Node 16.x)  
- **npm** or **yarn** for dependency management  
- A **Google account** with access to Google Cloud Console  
- (Optional) **nvm** (Node Version Manager) if you need to switch Node versions  

### Google Cloud Console Configuration

1. **Create a New Project** or select an existing one at [Google Cloud Console](https://console.cloud.google.com/).  
2. **Enable the Google Calendar API**:
   - Go to **APIs & Services** > **Library**.
   - Search for **Google Calendar API** and **enable** it.  
3. **Create OAuth 2.0 Credentials**:
   - Go to **APIs & Services** > **Credentials** > **Create Credentials** > **OAuth client ID**.
   - Choose **Web Application** as the application type.
   - Set **Authorized redirect URI** to `http://localhost:5001/oauth2callback` (or another port if you change it).
   - Copy your **Client ID** and **Client Secret**.

---
### Cloning the repository
```plaintext
       git clone https://github.com/sayantan007pal/Scheduling-Calendar-Assistant-using-CoAgent.git
  ```    
### Backend Setup

1. Open a terminal in the **`backend`** directory.
2. Create a **`.env`** file with your Google OAuth credentials. For example:
   ```plaintext
   CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
   CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
   REDIRECT_URI=http://localhost:5001/oauth2callback
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. (Optional) Install **nodemon** globally for auto-restarts:
   ```bash
   npm install -g nodemon
   ```
5. Start the backend server (port can be changed in `server.js` if desired):
   ```bash
   nodemon server.js
   ```
   or
   ```bash
   node server.js
   ```
6. You should see:
   ```
   Server running on port 5001
   ```

---

### Frontend Setup

1. Open a terminal in the **`scheduling-assistant`** (React) directory (the parent folder).
2. Create a **`.env`** if needed for any React environment variables.  
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the React app:
   ```bash
   npm start
   ```
5. The frontend will run on `http://localhost:3000` by default.  

*(If you integrated CopilotKit’s CoAgent in your React app, ensure the code references the `MyCoAgent` class and points to the backend’s API URL at `http://localhost:5001`.)*

---

## Running Locally

1. **Start the Backend**:
   ```bash
   cd backend
   nodemon server.js
   ```
   or
   ```bash
   node server.js
   ```
   Confirm your server is running at **`http://localhost:5001`**.

2. **Start the Frontend**:
   ```bash
   cd ..
   npm start
   ```
   Open **`http://localhost:3000`** in your browser to view the React app.

3. **Authenticate**:
   - In the frontend, click a “Login with Google” or similar button (depending on your setup), or manually visit **`http://localhost:5001/auth-url`** in a browser to generate the auth link.
   - Grant permissions in the Google sign-in screen.
   - Upon success, the server logs should show your tokens and the message **`Authentication successful! You can now close this window.`**

4. **Test**:
   - Check `http://localhost:5001/events` in your browser or via Postman to see a list of your Google Calendar events.

---

## Project Structure

```
scheduling-assistant/
├── backend/
│   ├── server.js
│   ├── .env
│   └── package.json
├── src/
│   ├── agents/
│   │   └── MyCoAgent.js
│   ├── components/
│   │   ├── Auth.js
│   │   ├── CalendarView.js
│   │   └── ChatAssistant.js
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   └── api.js
├── public/
│   └── index.html
├── package.json
└── README.md
```

---

## Usage

### Generating the Auth URL
1. In your browser, go to **`http://localhost:5001/auth-url`** to obtain the Google OAuth link.
2. Authenticate with your Google account.

### Completing OAuth2 Flow
- Google redirects to **`http://localhost:5001/oauth2callback?code=...`**.
- The server then exchanges the code for **access** and **refresh tokens**.

### Fetching Events
- **`GET http://localhost:5001/events`** returns the 10 upcoming events from your primary calendar.

### Using the CoAgent Chat Assistant
1. Open the React app at **`http://localhost:3000`**.
2. Look for the **Chat** or **Assistant** component.
3. Type scheduling queries like:
   - **“What’s on my calendar today?”**
   - **“When is my next meeting?”**
4. The **CoAgent** processes your query and interacts with the backend to fetch or manage events.

---

## Troubleshooting

- **Port Already in Use**: If `EADDRINUSE` occurs, free the port or pick a different one in `server.js`.
- **invalid_grant**: Ensure you’re using a **fresh** code, matching **redirect URIs**, and have the **correct** credentials in `.env`.
- **Tokens Not Saving**: Check file write permissions or adjust logic to store tokens in a DB for production.
- **Chat Assistant Not Working**: Verify that your CoAgent points to the correct backend URL (`http://localhost:5001`).

---

## License
This project is open-sourced under the MIT License. Please see the [LICENSE](LICENSE) file for details.

---

**Happy Scheduling!**

If you have questions or run into any issues, feel free to open an issue or reach out to contributors. This AI-driven approach, coupled with CopilotKit’s CoAgent, showcases how effortlessly you can integrate conversational AI into real-world applications like scheduling and calendar management. Enjoy!
