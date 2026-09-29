let activeQuiz = null;
let currentIndex = 0;
let answers = [];
let timeLeft = 0;
let timerId = null;

function getQuizFromURL() {
    const courseId = new URLSearchParams(window.location.search).get("course");
    return quizzes.find(q => q.courseId === courseId);
}

function formatTime(seconds) {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
}

function showStartScreen() {
    const root = document.getElementById("quizRoot");
    const previous = loadProgress().quizResults[activeQuiz.id];

    root.innerHTML = `
        <div class="quiz-card quiz-center">
            <h1>${activeQuiz.title}</h1>
            <p>${activeQuiz.questions.length} questions &bull; ${formatTime(activeQuiz.timeLimitSeconds)} time limit</p>
            ${previous ? `<p class="quiz-muted">Last score: ${previous.score}/${previous.totalQuestions} on ${previous.takenAt}</p>` : ""}
            <button class="btn" onclick="startQuiz()">Start Quiz</button>
        </div>
    `;
}

function startQuiz() {
    currentIndex = 0;
    answers = new Array(activeQuiz.questions.length).fill(null);
    timeLeft = activeQuiz.timeLimitSeconds;

    renderQuestion();

    clearInterval(timerId);
    timerId = setInterval(() => {
        timeLeft--;
        const timerEl = document.getElementById("quizTimer");
        if (timerEl) {
            timerEl.textContent = formatTime(timeLeft);
            timerEl.classList.toggle("low", timeLeft <= 30);
        }
        if (timeLeft <= 0) submitQuiz();
    }, 1000);
}

function renderQuestion() {
    const root = document.getElementById("quizRoot");
    const question = activeQuiz.questions[currentIndex];
    const total = activeQuiz.questions.length;
    const isLast = currentIndex === total - 1;
    const percent = Math.round(((currentIndex + 1) / total) * 100);

    const optionsHTML = question.options.map((option, i) => `
        <button class="quiz-option ${answers[currentIndex] === i ? "selected" : ""}"
                onclick="selectAnswer(${i})">${option}</button>
    `).join("");

    root.innerHTML = `
        <div class="quiz-card">
            <div class="quiz-top">
                <span>Question ${currentIndex + 1} of ${total}</span>
                <span class="quiz-timer" id="quizTimer">${formatTime(timeLeft)}</span>
            </div>
            <div class="quiz-progress"><span style="width: ${percent}%"></span></div>
            <h2>${question.text}</h2>
            <div class="quiz-options">${optionsHTML}</div>
            <div class="quiz-nav">
                <button class="quiz-btn-secondary" onclick="prevQuestion()" ${currentIndex === 0 ? "disabled" : ""}>Previous</button>
                <button class="btn" onclick="nextQuestion()" ${answers[currentIndex] === null ? "disabled" : ""}>
                    ${isLast ? "Submit" : "Next"}
                </button>
            </div>
        </div>
    `;
}

function selectAnswer(optionIndex) {
    answers[currentIndex] = optionIndex;
    renderQuestion();
}

function nextQuestion() {
    if (currentIndex === activeQuiz.questions.length - 1) {
        submitQuiz();
    } else {
        currentIndex++;
        renderQuestion();
    }
}

function prevQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
    }
}

function submitQuiz() {
    clearInterval(timerId);
    timerId = null;

    const score = activeQuiz.questions.filter(
        (q, i) => answers[i] === q.correctAnswerIndex
    ).length;

    const progress = loadProgress();
    progress.quizResults[activeQuiz.id] = {
        score: score,
        totalQuestions: activeQuiz.questions.length,
        takenAt: new Date().toISOString().slice(0, 10)
    };
    saveProgress(progress);

    showResults(score);
}

function showResults(score) {
    const root = document.getElementById("quizRoot");
    const total = activeQuiz.questions.length;
    const percent = Math.round((score / total) * 100);

    const reviewHTML = activeQuiz.questions.map((q, i) => {
        const picked = answers[i];
        const correct = picked === q.correctAnswerIndex;
        return `
            <div class="review-item ${correct ? "correct" : "wrong"}">
                <p><strong>${i + 1}. ${q.text}</strong></p>
                <p>Your answer: ${picked === null ? "Not answered" : q.options[picked]}</p>
                ${correct ? "" : `<p>Correct answer: ${q.options[q.correctAnswerIndex]}</p>`}
            </div>
        `;
    }).join("");

    root.innerHTML = `
        <div class="quiz-card">
            <div class="quiz-center">
                <h1>${percent >= 70 ? "Great job!" : "Keep practicing!"}</h1>
                <p class="quiz-score">${score} / ${total}</p>
                <p class="quiz-muted">${percent}%</p>
            </div>
            <div class="quiz-review">${reviewHTML}</div>
            <div class="quiz-nav">
                <button class="quiz-btn-secondary" onclick="startQuiz()">Retake Quiz</button>
                <a class="btn" href="course-detail.html?id=${activeQuiz.courseId}">Back to Course</a>
            </div>
        </div>
    `;
}

function initQuiz() {
    const root = document.getElementById("quizRoot");
    if (!root) return;

    if (!getCurrentUser()) {
        requireLogin();
        return;
    }

    activeQuiz = getQuizFromURL();
    if (!activeQuiz) {
        root.innerHTML = `<div class="quiz-card quiz-center"><h1>Quiz not found</h1><a class="btn" href="courses.html">Browse Courses</a></div>`;
        return;
    }

    showStartScreen();
}

initQuiz();