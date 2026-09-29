# LearnFlow — Learning Management System

A front-end LMS built as my internship major project. Users can browse courses, watch lesson videos, track progress, take quizzes, bookmark courses, and manage a profile — no backend, all data in `localStorage`.

**Live demo:** https://xmhwprdc-5500.inc1.devtunnels.ms/
**Repo:** https://github.com/Aditya011001/LMS-internship

## Tech Stack

HTML5, CSS3, vanilla JavaScript (ES6+), `localStorage` — no frameworks, no backend.

## Features

- **Auth** — register/login/logout; guests can browse courses, but bookmarks, progress, and quizzes require login
- **Courses** — search, filter by category/difficulty, bookmark, responsive grid
- **Course detail** — per-lesson YouTube video player, mark lessons complete
- **Dashboard** — real stats (enrolled courses, average progress, quizzes taken) and per-course progress
- **Quizzes** — timed, auto-scored, full answer review, retake option
- **Profile** — view/edit display name and stats

## Project Structure

```
index.html, login.html, register.html, dashboard.html,
courses.html, course-detail.html, quiz.html, bookmarks.html, profile.html
data.js       — static course & quiz content
storage.js    — localStorage, auth, progress helpers
script.js     — rendering & interaction logic
style.css
```

## Known Limitations

- No custom-styled dropdown for filters (native browser styling)
- No notifications
- No backend — data doesn't sync across devices
- Mobile polish is partial (grid and nav are responsive; not every page fully tested)