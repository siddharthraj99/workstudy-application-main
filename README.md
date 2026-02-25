# FSAD-PS42: WorkStudy Portal

A web-based system for managing student work-study programs.

## 📁 Folder Structure

```
workstudy/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx              ← App entry point
    ├── App.jsx               ← Root component + page router
    ├── index.css             ← Tailwind base styles
    ├── context/
    │   └── AppContext.jsx    ← Global state (users, jobs, apps, logs)
    ├── data/
    │   └── mockData.js       ← All mock/dummy data
    ├── components/
    │   ├── Sidebar.jsx       ← Left navigation sidebar
    │   ├── Navbar.jsx        ← Top navigation bar
    │   ├── Modal.jsx         ← Reusable modal wrapper
    │   ├── JobCard.jsx       ← Job listing card
    │   └── ApplicationCard.jsx ← Application card (with approve/reject)
    └── pages/
        ├── LoginPage.jsx     ← Mock role-based login
        ├── AdminDashboard.jsx ← Admin overview
        ├── StudentDashboard.jsx ← Student overview
        ├── JobList.jsx       ← Browse/post jobs
        ├── Applications.jsx  ← View/manage applications
        ├── WorkHours.jsx     ← Log and view work hours
        └── Feedback.jsx      ← Student feedback viewer
```

## 🚀 How to Run

### Step 1 – Install dependencies
```bash
npm install
```

### Step 2 – Start development server
```bash
npm run dev
```

### Step 3 – Open in browser
```
http://localhost:5173
```

## 👥 Test Accounts (Mock Login)

| Name | Role |
|------|------|
| Dr. Sarah Williams | Admin |
| Alex Johnson | Student |
| Maria Garcia | Student |

## ✅ Features

### Admin
- View dashboard with stats and summaries
- Post new job opportunities (modal form)
- View all student applications
- Approve or reject applications with feedback
- View total logged hours per student

### Student
- View dashboard with personal stats
- Browse available jobs and apply
- Track application statuses
- Log work hours (only for approved jobs)
- View admin feedback on applications

## 🛠 Tech Stack
- **React 18** with functional components and hooks
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Context API** for state management
- **No backend** – all state is in-memory mock data
