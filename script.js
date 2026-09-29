function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("data-theme", theme);
}

const menuToggle = document.getElementById("menuToggle");
if (menuToggle) {
    menuToggle.addEventListener("click", function () {
        document.getElementById("navLinks").classList.toggle("open");
    });
}

function toggleTheme() {
    let current_theme = document.documentElement.getAttribute("data-theme");
    if (current_theme == "dark") {
        applyTheme("light");
    } else {
        applyTheme("dark");
    }
}
const savedTheme = localStorage.getItem("data-theme") || "dark";
applyTheme(savedTheme);

const registerBtn = document.querySelector(".register-btn");
if (registerBtn) {
    registerBtn.addEventListener("click", function () {
        const name = document.getElementById("user-name").value;
        const email = document.getElementById("user-mail").value;
        const password = document.getElementById("user-password").value;

        const success = registerUser(name, email, password);
        if (success) {
            window.location.href = "login.html";
        }
    });
}

const loginBtn = document.querySelector(".login-btn");
if (loginBtn) {
    loginBtn.addEventListener("click", function () {
        const email = document.getElementById("user-mail").value;
        const password = document.getElementById("user-password").value;

        const success = loginUser(email, password);
        if (success) {
            window.location.href = "dashboard.html";
        }
    });
}

function buildWelcomeMessages() {
    const user = getCurrentUser();
    const name = user && user.name ? user.name : "there";

    const progress = loadProgress();
    const totalDone = Object.values(progress.enrolledCourses)
        .reduce((sum, course) => sum + course.completedLessons.length, 0);

    return [
        `Welcome back, ${name}!`,
        `You've completed ${totalDone} lesson${totalDone === 1 ? "" : "s"} so far.`,
        "Ready to continue?"
    ];
}

function showWelcomeSequence() {
    const lines = document.querySelectorAll(".welcome-line");
    const messages = buildWelcomeMessages();

    messages.forEach((text, index) => {
        if (!lines[index]) return;
        lines[index].textContent = text;
        setTimeout(() => {
            lines[index].classList.add("visible");
        }, index * 800);
    });
}

if (document.querySelectorAll(".welcome-line").length > 0) {
    showWelcomeSequence();
}

const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        logoutUser();
    });
}

function setActiveSidebarLink() {
    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    if (!sidebarLinks.length) return;

    const currentPage = window.location.pathname.split("/").pop() || "dashboard.html";

    sidebarLinks.forEach(link => {
        const href = link.getAttribute("href") || "";
        const isCurrentPage = href.toLowerCase() === currentPage.toLowerCase();

        link.classList.toggle("active", isCurrentPage);

        link.addEventListener("click", () => {
            sidebarLinks.forEach(item => item.classList.remove("active"));
            link.classList.add("active");
        });
    });
}

setActiveSidebarLink();

function getCourseProgressPercent(courseId) {
    const progress = loadProgress();
    const enrollment = progress.enrolledCourses[courseId];
    const courseData = courses.find(course => course.id === courseId);

    if (!enrollment || !courseData || courseData.lessons.length === 0) return 0;

    const completedCount = enrollment.completedLessons.length;
    return Math.round((completedCount / courseData.lessons.length) * 100);
}

function renderDashboard() {
    requireLogin();

    const currentUser = getCurrentUser();
    const progress = loadProgress();

    const enrolledCount = Object.keys(progress.enrolledCourses).length;
    const quizzesTaken = Object.keys(progress.quizResults).length;

    const courseIds = Object.keys(progress.enrolledCourses);
    const percentages = courseIds.map(courseId => getCourseProgressPercent(courseId));
    const totalPercent = percentages.reduce((total, current) => total + current, 0);

    let averageProgress;
    if (courseIds.length === 0) {
        averageProgress = 0;
    } else {
        averageProgress = Math.round(totalPercent / courseIds.length);
    }

    document.getElementById("statEnrolled").textContent = enrolledCount;
    document.getElementById("statQuizzes").textContent = quizzesTaken;
    document.getElementById("statProgress").textContent = averageProgress + "%";

    let courseListHTML = "";
    courseIds.forEach(courseId => {
        const courseData = courses.find(course => course.id === courseId);
        if (!courseData) return; // skip stale course ids no longer in data.js

        const percent = getCourseProgressPercent(courseId);
        const done = progress.enrolledCourses[courseId].completedLessons.length;
        const total = courseData.lessons.length;

        courseListHTML += `
      <div class="progress-card">
        <div class="progress-head">
          <a href="course-detail.html?id=${courseId}" class="progress-title">${courseData.title}</a>
          <span class="progress-percent">${percent}%</span>
        </div>
        <div class="bar">
          <span style="width: ${percent}%"></span>
        </div>
        <p class="progress-meta">${done} of ${total} lessons completed</p>
      </div>
    `;
    });
    document.getElementById("courseList").innerHTML = courseListHTML;
}

if (document.getElementById("courseList")) {
    renderDashboard();
}

function renderAllCourses(courseArray) {
    let cardsHTML = "";

    courseArray.forEach(course => {
        const isBookmarked = loadProgress().bookmarkedCourses.includes(course.id);
        const iconClass = isBookmarked ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark";

        let lessonsHTML = "";
        course.lessons.forEach(lesson => {
            lessonsHTML += `<li>${lesson.title}</li>`;
        });

        cardsHTML += `
        <a href="course-detail.html?id=${course.id}" class="course-card-link">
            <div class="course-card">
                <div class="course-card-header">
                    <h3>${course.title}</h3>
                    <div class="course-header-actions">
                        <span class="difficulty-badge difficulty-${course.difficulty}">${course.difficulty}</span>
                        <button class="bookmark-btn" onclick="event.preventDefault(); event.stopPropagation(); toggleBookmarkCourse('${course.id}')">
                            <i class="${iconClass}"></i>
                        </button>
                    </div>
                </div>
                <p class="course-category"><i class="fa-solid fa-tag"></i> ${course.category}</p>
                <p class="course-description">${course.description}</p>
                <ul class="lesson-list">${lessonsHTML}</ul>
            </div>
        </a>
        `;
    });

    const courseList = document.getElementById("allCoursesList");
    if (courseList) {
        courseList.innerHTML = cardsHTML;
    }
}

if (
    window.location.pathname.endsWith("courses.html") &&
    document.getElementById("allCoursesList") &&
    document.getElementById("searchInput") &&
    document.getElementById("categoryFilter") &&
    document.getElementById("difficultyFilter")
) {
    renderAllCourses(courses);
}

function toggleBookmarkCourse(courseId) {
    if (!getCurrentUser()) {
        window.location.href = "login.html";
        return;
    }

    const progress = loadProgress();
    const alreadyBookmarked = progress.bookmarkedCourses.includes(courseId);

    if (alreadyBookmarked) {
        progress.bookmarkedCourses = progress.bookmarkedCourses.filter(id => id !== courseId);
    } else {
        progress.bookmarkedCourses.push(courseId);
    }

    saveProgress(progress);

    if (window.location.pathname.endsWith("bookmarks.html")) {
        renderBookmarkedCourses();
    } else if (document.getElementById("categoryFilter") && document.getElementById("difficultyFilter")) {
        applyFilters();
    }
}

/* ---------- Course detail + video player ---------- */

let currentLessonId = null;

function getCourseIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function toEmbedUrl(url) {
    if (url.includes("/embed/")) return url;
    const match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

function renderCourseDetail() {
    const courseId = getCourseIdFromURL();
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    if (!currentLessonId) currentLessonId = course.lessons[0].id;

    document.getElementById("courseHeader").innerHTML = `
    <h1>${course.title}</h1>
    <p>${course.description}</p>
  `;

    const progress = loadProgress();
    const completedLessons = progress.enrolledCourses[courseId]?.completedLessons || [];

    document.getElementById("lessonList").innerHTML = course.lessons.map(lesson => {
        const isDone = completedLessons.includes(lesson.id);
        const isActive = lesson.id === currentLessonId;
        return `
      <div class="lesson-row ${isActive ? "active" : ""}">
        <span class="lesson-title" onclick="playLesson('${lesson.id}')">
          <i class="fa-solid fa-circle-play"></i> ${lesson.title}
        </span>
        <button onclick="handleMarkComplete('${courseId}', '${lesson.id}')" ${isDone ? "disabled" : ""}>
          ${isDone ? "✓ Completed" : "Mark Complete"}
        </button>
      </div>
    `;
    }).join("");
}

function renderVideo() {
    const course = courses.find(c => c.id === getCourseIdFromURL());
    const player = document.getElementById("videoPlayer");
    const title = document.getElementById("nowPlaying");
    if (!course || !player || !currentLessonId) return;

    const lesson = course.lessons.find(l => l.id === currentLessonId);
    if (title) title.textContent = lesson.title;

    player.innerHTML = lesson.videoUrl
        ? `<iframe src="${toEmbedUrl(lesson.videoUrl)}" title="${lesson.title}" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
        : `<p class="no-video">No video for this lesson yet.</p>`;
}

function playLesson(lessonId) {
    currentLessonId = lessonId;
    renderVideo();
    renderCourseDetail();
}

function handleMarkComplete(courseId, lessonId) {
    if (!getCurrentUser()) {
        window.location.href = "login.html";
        return;
    }
    markLessonComplete(courseId, lessonId);
    renderCourseDetail();
}

if (document.getElementById("courseHeader") && document.getElementById("lessonList")) {
    renderCourseDetail();
    renderVideo();
    const quizBtn = document.getElementById("takeQuizBtn");
    if (quizBtn) quizBtn.href = `quiz.html?course=${getCourseIdFromURL()}`;
}


/* ---------- Profile page ---------- */

function renderProfile() {
    requireLogin();
    const user = getCurrentUser();
    if (!user) return;

    document.getElementById("profileAvatar").textContent = user.name.charAt(0).toUpperCase();
    document.getElementById("profileName").value = user.name;
    document.getElementById("profileEmail").value = user.email;

    const progress = loadProgress();
    const enrolledCount = Object.keys(progress.enrolledCourses).length;
    const quizzesTaken = Object.keys(progress.quizResults).length;
    document.getElementById("profileStats").textContent =
        `${enrolledCount} course${enrolledCount === 1 ? "" : "s"} enrolled · ${quizzesTaken} quiz${quizzesTaken === 1 ? "" : "zes"} taken`;
}

const saveProfileBtn = document.getElementById("saveProfileBtn");
if (saveProfileBtn) {
    saveProfileBtn.addEventListener("click", function () {
        const newName = document.getElementById("profileName").value.trim();
        if (!newName) return;

        updateCurrentUserName(newName);

        const savedMsg = document.getElementById("profileSaved");
        savedMsg.classList.add("visible");
        setTimeout(() => savedMsg.classList.remove("visible"), 1500);
    });
}

if (document.getElementById("profileName")) {
    renderProfile();
}


/* ---------- Auth-aware nav ---------- */

function renderAuthNav() {
    const authNav = document.getElementById("authNav");
    const homeLink = document.getElementById("homeLink");
    if (!authNav) return;

    const currentUser = getCurrentUser();

    if (currentUser) {
        if (homeLink) homeLink.style.display = "";
        authNav.innerHTML = `
            <span id="logout" class="logout-trigger">
                Logout <i class="fa-solid fa-right-from-bracket"></i>
            </span>
        `;
        document.getElementById("logout").addEventListener("click", function () {
            logoutUser();
            renderAuthNav();
        });
    } else {
        if (homeLink) homeLink.style.display = "none";
        authNav.innerHTML = `<a href="login.html" class="login-btn">Login/Register</a>`;
    }
}

renderAuthNav();