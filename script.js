function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("data-theme", theme);
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
const messages = [
    "Welcome back, Alex!",
    "You've completed 3 lessons this week.",
    "Ready to continue?"
];

function showWelcomeSequence() {
    const lines = document.querySelectorAll(".welcome-line");

    messages.forEach((text, index) => {
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
        const percent = getCourseProgressPercent(courseId);

        courseListHTML += `
      <div class="progress-card">
        <p>${courseData.title}</p>
        <div class="bar">
          <span style="width: ${percent}%"></span>
        </div>
      </div>
    `;
    });
    document.getElementById("courseList").innerHTML = courseListHTML;
}

if (document.getElementById("courseList")) {
    renderDashboard();
}

function getCourseProgressPercent(courseId) {
    const progress = loadProgress();
    const enrollment = progress.enrolledCourses[courseId];
    const courseData = courses.find(course => course.id === courseId);

    const completedCount = enrollment.completedLessons.length;
    const totalCount = courseData.lessons.length;

    return Math.round((completedCount / totalCount) * 100);
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
            <div class="course-card">
                <div class="course-card-header">
                    <h3>${course.title}</h3>
                    <div class="course-header-actions">
                        <span class="difficulty-badge difficulty-${course.difficulty}">${course.difficulty}</span>
                        <button class="bookmark-btn" onclick="toggleBookmarkCourse('${course.id}')">
                            <i class="${iconClass}"></i>
                        </button>
                    </div>
                </div>
                <p class="course-category"><i class="fa-solid fa-tag"></i> ${course.category}</p>
                <p class="course-description">${course.description}</p>
                <ul class="lesson-list">${lessonsHTML}</ul>
            </div>
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
    const progress = loadProgress();

    const alreadyBookmarked = progress.bookmarkedCourses.includes(courseId);

    if (alreadyBookmarked) {
        progress.bookmarkedCourses = progress.bookmarkedCourses.filter(id => id !== courseId);
    } else {
        progress.bookmarkedCourses.push(courseId);
    }

    saveProgress(progress);

    if (document.getElementById("categoryFilter") && document.getElementById("difficultyFilter")) {
        applyFilters();
    } else if (window.location.pathname.endsWith("bookmarks.html")) {
        renderBookmarkedCourses();
    }
}

if (document.getElementById("searchInput") && document.getElementById("categoryFilter") && document.getElementById("difficultyFilter")) {
    applyFilters();
}