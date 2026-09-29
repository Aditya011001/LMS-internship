// storage.js will read/write this whole object under one localStorage key
const userProgress = {
  enrolledCourses: {
    "js-fundamentals": {
      completedLessons: ["js-1"]
    },
    "dsa-fundamentals": {
      completedLessons: ["dsa-1"]
    },
    "css-basics": {
      completedLessons: []
    }
  },
  quizResults: {
    "quiz-js-fundamentals": {
      score: 3,
      totalQuestions: 4,
      takenAt: "2026-09-14"
    }
  },
  bookmarkedCourses: ["css-basics"],
  bookmarkedLessons: ["css-2"]
};

const STORAGE_KEY = "lms_userProgress";

function getDefaultProgress() {
  return {
    enrolledCourses: {},
    quizResults: {},
    bookmarkedCourses: [],
    bookmarkedLessons: []
  };
}

function markLessonComplete(courseId, lessonId) {
  const progress = loadProgress();

  if (progress.enrolledCourses[courseId] === undefined) {
    progress.enrolledCourses[courseId] = { completedLessons: [lessonId] };
  } else {
    let check = progress.enrolledCourses[courseId].completedLessons.includes(lessonId);
    if (!check) {
      progress.enrolledCourses[courseId].completedLessons.push(lessonId);
    }
  }
  saveProgress(progress);
}

function loadProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return getDefaultProgress();
  return JSON.parse(raw);
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

const USERS_KEY = "lms_users";
const CURRENT_USER_KEY = "lms_currentUser";

function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  return JSON.parse(raw);
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function registerUser(name, email, password) {
  const users = getUsers();

  const emailTaken = users.some(user => user.email === email);
  if (emailTaken) {
    alert("This E-mail is already used!");
    return false;
  }

  const newUser = {
    name,
    email,
    password
  };

  users.push(newUser);
  saveUsers(users);

  return true;
}

function loginUser(email, password) {
  const users = getUsers();

  // use .find() to locate a user matching BOTH email and password
  let registeredUser = users.find(user => user.email === email && user.password === password);
  if (registeredUser) {
    alert("Login successful. Welcome to Learnflow!")
  }
  // if no match found, alert and return false
  if (!registeredUser) {
    alert("Email or password does'nt match, try again");
    return false;
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(registeredUser));

  return true;
}

function logoutUser() {
  const shouldLogout = window.confirm("Are you sure you want to logout?");
  if (!shouldLogout) return;

  const currentProgress = loadProgress();
  saveProgress(currentProgress);
  localStorage.removeItem(CURRENT_USER_KEY);
  window.location.href = "index.html";
}

function getCurrentUser() {
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  if (!raw) return null;
  return JSON.parse(raw);
}

function requireLogin() {
  const user = getCurrentUser();
  if (user === null) {
    window.location.href = "login.html";
    return;
  }
}

function applyFilters() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const difficulty = document.getElementById("difficultyFilter").value;

  const filtered = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm);
    const matchesCategory = category === "all" || course.category === category;
    const matchesDifficulty = difficulty === "all" || course.difficulty === difficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;

  });

  renderAllCourses(filtered);
}

if (
  document.getElementById("searchInput") &&
  document.getElementById("categoryFilter") &&
  document.getElementById("difficultyFilter")
) {
  document.getElementById("searchInput").addEventListener("input", applyFilters);
  document.getElementById("categoryFilter").addEventListener("change", applyFilters);
  document.getElementById("difficultyFilter").addEventListener("change", applyFilters);
}

function updateCurrentUserName(newName) {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;

  const users = getUsers();
  const index = users.findIndex(u => u.email === currentUser.email);
  if (index === -1) return false;

  users[index].name = newName;
  saveUsers(users);

  currentUser.name = newName;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));

  return true;
}