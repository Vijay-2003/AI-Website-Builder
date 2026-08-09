# 🤖 AI Website Builder

> Build complete websites using natural language — generate, edit, preview, and manage your projects with AI.

**AI Website Builder** is a full-stack AI-powered development platform that allows users to create websites simply by describing what they want.

Instead of starting from an empty code editor, users can enter a prompt such as:

```text
Create a modern portfolio website for a full-stack web developer
```

The AI plans the project structure, generates the required files, and provides a live website preview with an integrated code editor.

Users can then continue developing the website through AI prompts or manually edit the generated code directly in the browser.

---

## ✨ Features

### 🤖 AI Website Generation

Generate complete websites from natural-language prompts.

```text
Create a modern portfolio website for a web developer
```

The application creates a project and progressively generates the required files.

### 💬 AI-Powered Code Editing

Existing projects can be modified through conversational prompts.

For example:

```text
Add a testimonials section to the homepage.
```

or:

```text
Change the website theme to black and white.
```

The AI uses the existing project files to generate revisions.

### ⚡ Real-Time Generation

Projects are generated progressively instead of waiting for the entire project to finish.

The application tracks statuses such as:

```text
pending
generating
revising
completed
failed
```

Generated files are stored as they are completed.

### 👀 Live Preview

Generated websites are rendered directly inside the application using **Sandpack**.

This provides:

* Live website preview
* Instant code changes
* React rendering
* Error monitoring
* Preview refresh
* In-browser development experience

### 📝 Built-In Code Editor

Users can view and modify generated files directly inside the builder.

The editor supports:

* File explorer
* Syntax-aware editing
* Line numbers
* Inline errors
* Multiple files
* Live preview

### 💾 Automatic Saving

Changes made inside the code editor are automatically detected and saved to MongoDB using a debounced API request.

```text
Code Edit
    ↓
Sandpack File Watcher
    ↓
Detect Changes
    ↓
Debounced Save
    ↓
Express API
    ↓
MongoDB
```

### 📁 Project Management

Users can:

* Create projects
* View projects
* Open projects
* Delete projects
* Edit projects
* Track project versions
* Publish projects

### 🔐 Authentication

The application includes user authentication using:

* JWT
* HTTP-only cookies
* bcrypt password hashing
* Authentication middleware
* Protected project routes

### 🌐 Project Publishing

Projects can be marked as published and accessed through a public project endpoint.

---

# 🛠️ Tech Stack

## Frontend

| Technology      | Purpose                    |
| --------------- | -------------------------- |
| React           | User interface             |
| Vite            | Frontend tooling           |
| React Router    | Client-side routing        |
| Tailwind CSS    | Styling                    |
| Axios           | API communication          |
| Sandpack        | Live code editor & preview |
| Lucide React    | Icons                      |
| React Hot Toast | Notifications              |
| Moment.js       | Date formatting            |
| Lodash Debounce | Debounced auto-saving      |

## Backend

| Technology    | Purpose                |
| ------------- | ---------------------- |
| Node.js       | Runtime                |
| Express.js    | REST API               |
| MongoDB       | Database               |
| Mongoose      | MongoDB ODM            |
| JWT           | Authentication         |
| bcrypt        | Password hashing       |
| cookie-parser | Authentication cookies |
| CORS          | Cross-origin requests  |

## AI

The AI service is responsible for:

* Project planning
* File planning
* Code generation
* Code revision
* Natural-language project modification

---

# 🏗️ Architecture

The application follows a client-server architecture.

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      + Vite         │
                    └──────────┬──────────┘
                               │
                    REST API / Axios
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express Backend   │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌────────────┐   ┌─────────────┐   ┌────────────┐
       │  MongoDB   │   │  AI Service │   │    Auth    │
       │            │   │             │   │    JWT     │
       └────────────┘   └─────────────┘   └────────────┘
                               │
                               ▼
                       Generated Files
                               │
                               ▼
                     ┌──────────────────┐
                     │     Sandpack     │
                     │ Live Preview +   │
                     │   Code Editor    │
                     └──────────────────┘
```

---

# 🔄 AI Generation Flow

When a user submits a prompt:

```text
User enters prompt
        │
        ▼
POST /api/projects
        │
        ▼
Create project in MongoDB
        │
        ▼
Status = pending
        │
        ▼
AI starts background generation
        │
        ▼
AI creates project plan
        │
        ▼
Files are generated progressively
        │
        ├── App.js
        ├── components/...
        ├── styles/...
        └── other files
        │
        ▼
Files saved to MongoDB
        │
        ▼
Status = completed
        │
        ▼
Live preview rendered with Sandpack
```

The backend stores generated files together with their content and a content hash.

---

# 💬 AI Revision Flow

After a website has been generated, users can continue modifying it through the chat interface.

```text
User Prompt
     │
     ▼
"Add a contact section"
     │
     ▼
POST /api/projects/:id/chat
     │
     ▼
Load existing project
     │
     ▼
AI analyzes existing files
     │
     ▼
Generate revision
     │
     ▼
Update project
     │
     ▼
Update Sandpack
     │
     ▼
Live Preview
```

---

# 🖥️ Builder Interface

The builder is divided into several parts:

```text
┌─────────────────────────────────────────────────────────────┐
│                         Header                              │
├───────────────┬───────────────────────────────┬─────────────┤
│               │                               │             │
│ File Explorer │       Code / Preview          │ AI Chat     │
│               │                               │             │
│ App.js        │                               │ User        │
│ index.css     │       Live Website           │ AI          │
│ components/   │                               │             │
│               │                               │ Prompt      │
│               │                               │ Input       │
└───────────────┴───────────────────────────────┴─────────────┘
```

Users can switch between:

* Code
* Preview
* AI chat
* File explorer

---

# 📂 Project Structure

The application is separated into frontend and backend applications.

```text
AI-Website-Builder/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── ChatPanel.jsx
│   │   │   ├── FileExplorer.jsx
│   │   │   ├── FullPagePreview.jsx
│   │   │   ├── PreviewPanel.jsx
│   │   │   ├── PromptInput.jsx
│   │   │   └── SandpackErrorMonitor.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── PreviewPage.jsx
│   │   │   └── ...
│   │   │
│   │   └── utils/
│   │       └── sandpackUtils.js
│   │
│   └── package.json
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── chatController.js
│   │   └── projectController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Project.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── projectRoutes.js
│   │
│   ├── services/
│   │   └── ai.js
│   │
│   └── server.js
│
└── README.md
```

---

# 🔐 Authentication

Authentication is handled using JWT stored inside an HTTP-only cookie.

### Registration

```text
POST /api/auth/register
```

### Login

```text
POST /api/auth/login
```

### Current Session

```text
GET /api/auth/me
```

### Logout

```text
POST /api/auth/logout
```

Protected routes use authentication middleware to verify the user's session.

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Create a user     |
| POST   | `/api/auth/login`    | Authenticate user |
| GET    | `/api/auth/me`       | Get current user  |
| POST   | `/api/auth/logout`   | End session       |

## Projects

| Method | Endpoint                    | Description           |
| ------ | --------------------------- | --------------------- |
| POST   | `/api/projects`             | Create AI project     |
| GET    | `/api/projects`             | Get user's projects   |
| GET    | `/api/projects/:id`         | Get project           |
| PUT    | `/api/projects/:id/files`   | Save project files    |
| DELETE | `/api/projects/:id`         | Delete project        |
| POST   | `/api/projects/:id/chat`    | Send AI revision      |
| POST   | `/api/projects/:id/publish` | Publish project       |
| GET    | `/api/projects/public/:id`  | Get published project |

---

# 🗄️ Database

MongoDB is used to store users and projects.

### User

```text
User
├── name
├── email
├── password
├── createdAt
└── updatedAt
```

Passwords are hashed with bcrypt before being stored.

### Project

```text
Project
├── name
├── description
├── files
├── messages
├── version
├── owner
├── published
├── status
├── filesPlanned
├── filesGenerated
├── currentFile
├── error
├── createdAt
└── updatedAt
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB
* Git
* An API key for the AI service used by the project

---

## 1. Clone the repository

```bash
git clone https://github.com/Vijay-2003/AI-Website-Builder.git

cd AI-Website-Builder
```

---

## 2. Install frontend dependencies

```bash
cd frontend
npm install
```

---

## 3. Install backend dependencies

Open another terminal:

```bash
cd backend
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file in the backend directory.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

ORIGINS=http://localhost:5173

# AI API configuration
AI_API_KEY=your_ai_api_key
```

Use the actual environment variable names required by your AI service implementation.

> Never commit `.env` files or API keys to GitHub.

---

# ▶️ Run the Application

### Start backend

```bash
cd backend
npm run dev
```

### Start frontend

```bash
cd frontend
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🧑‍💻 Example Prompts

You can generate websites using prompts such as:

```text
Create a portfolio website for a web developer
```

```text
Create a modern landing page for a SaaS startup
```

```text
Create a responsive restaurant website with a menu and contact section
```

```text
Create an ecommerce landing page for a sneaker brand
```

After generation, you can modify the project:

```text
Add a testimonials section.
```

```text
Change the primary color to purple.
```

```text
Make the navigation responsive on mobile.
```

```text
Add animations to the hero section.
```

---

# 💾 Automatic Code Saving

The application monitors changes made in the Sandpack editor.

A debounced save mechanism prevents an API request from being sent for every keystroke.

```text
User types
    ↓
Sandpack detects change
    ↓
File watcher detects change
    ↓
Debounce
    ↓
PUT /api/projects/:id/files
    ↓
MongoDB
```

This keeps the database synchronized with the user's latest code.

---

# 🌐 Publishing

Once a project is ready, users can publish it.

Published projects can be accessed through a public project endpoint without requiring authentication.

```text
GET /api/projects/public/:id
```

---

# 📸 Screenshots

Add screenshots of the application here.

Recommended screenshots:

### Home Page

```markdown
![Home Page](./screenshots/home.png)
```

### AI Builder

```markdown
![AI Builder](./screenshots/builder.png)
```

### Live Preview

```markdown
![Live Preview](./screenshots/preview.png)
```

### Code Editor

```markdown
![Code Editor](./screenshots/editor.png)
```

---

# 🚧 Current Limitations

AI-generated code can occasionally contain syntax errors, invalid imports, or incomplete implementations.

The application provides:

* Sandpack error monitoring
* Live preview
* In-browser code editing
* AI-based revisions

These allow generated projects to be inspected and corrected without leaving the builder.

---

# 🔮 Future Improvements

Planned improvements can include:

* [ ] Improved AI error recovery
* [ ] More AI model support
* [ ] Project version history
* [ ] Undo/redo functionality
* [ ] ZIP project export
* [ ] Custom domain support
* [ ] One-click deployment
* [ ] Image generation
* [ ] More advanced dependency management
* [ ] Collaborative editing
* [ ] Improved mobile experience

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/new-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add new feature"
```

5. Push your branch.

```bash
git push origin feature/new-feature
```

6. Open a Pull Request.

---

# 👨‍💻 Author

**Vijay Kusekar**

GitHub:
https://github.com/Vijay-2003

---

# ⭐ Support

If you like this project, consider giving the repository a ⭐ on GitHub.

---

## Built With

**React · Vite · Tailwind CSS · Node.js · Express · MongoDB · Mongoose · JWT · Sandpack · AI**

> **Describe your idea → Let AI build it → Edit the code → Preview it live → Publish it**
