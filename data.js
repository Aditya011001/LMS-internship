// data.js — static content, hardcoded for now
const courses = [
  {
    id: "js-fundamentals",
    title: "JavaScript Fundamentals",
    category: "Programming",
    difficulty: "Beginner",
    description: "Learn the core building blocks of JavaScript.",
    lessons: [
      { id: "js-1", title: "Variables and data types", videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk?si=0IMJKrQZgv1KGsCb" },
      { id: "js-2", title: "Functions and scope", videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk?si=0IMJKrQZgv1KGsCb" }
    ]
  },

  {
    id: "dsa-fundamentals",
    title: "DSA Fundamentals",
    category: "Data Structures",
    difficulty: "Beginner",
    description: "Learn how data is structured and how to organize it based on requirements.",
    lessons: [
      { id: "dsa-1", title: "Arrays and Lists", videoUrl: "https://www.youtube.com/embed/VTLCoHnyACE?si=4aPMY0yTy9N13VMZ" },
      { id: "dsa-2", title: "Linked List", videoUrl: "https://www.youtube.com/embed/VTLCoHnyACE?si=4aPMY0yTy9N13VMZ" },
      { id: "dsa-3", title: "Sorting Techniques", videoUrl: "https://www.youtube.com/embed/VTLCoHnyACE?si=4aPMY0yTy9N13VMZ" }
    ]
  },
  {
    id: "css-basics",
    title: "CSS Basics",
    category: "Web Designing",
    difficulty: "Intermediate",
    description: "Master the fundamentals of styling web pages — selectors, the box model, flexbox, and responsive layouts.",
    lessons: [
      { id: "css-1", title: "The Box Model", videoUrl: "https://www.youtube.com/embed/ESnrn1kAD4E?si=5Xg6E8E1NUEAB1tR" },
      { id: "css-2", title: "Colors, typography, and units (px, rem, %)", videoUrl: "https://www.youtube.com/embed/ESnrn1kAD4E?si=5Xg6E8E1NUEAB1tR" },
      { id: "css-3", title: "Responsive design and media queries", videoUrl: "https://www.youtube.com/embed/ESnrn1kAD4E?si=5Xg6E8E1NUEAB1tR" }
    ]
  }
  ,
  {
    id: "python-basics",
    title: "Python Basics",
    category: "Programming",
    difficulty: "Intermediate",
    description: "Get comfortable with Python syntax, data types, and control flow.",
    lessons: [
      { id: "py-1", title: "Variables, types and input/output", videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw" },
      { id: "py-2", title: "Conditionals and loops", videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw" },
      { id: "py-3", title: "Functions and modules", videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw" }
    ]
  },
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    category: "Web Development",
    difficulty: "Intermediate",
    description: "Learn components, props, state, and how React renders the UI.",
    lessons: [
      { id: "react-1", title: "Components and JSX", videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0" },
      { id: "react-2", title: "Props and state", videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0" },
      { id: "react-3", title: "Handling events and forms", videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0" }
    ]
  },
  {
    id: "advanced-javascript",
    title: "Advanced JavaScript",
    category: "Programming",
    difficulty: "Advanced",
    description: "Dive into closures, the event loop, prototypes, and async patterns.",
    lessons: [
      { id: "advjs-1", title: "Closures and higher-order functions", videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg" },
      { id: "advjs-2", title: "Promises, async/await and the event loop", videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg" },
      { id: "advjs-3", title: "Prototypes and the 'this' keyword", videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg" }
    ]
  },
  {
    id: "nodejs-express",
    title: "Node.js & Express",
    category: "Backend Development",
    difficulty: "Advanced",
    description: "Build a server-side API using Node.js and the Express framework.",
    lessons: [
      { id: "node-1", title: "Setting up a Node/Express server", videoUrl: "https://www.youtube.com/embed/Oe421EPjeBE" },
      { id: "node-2", title: "Routes, middleware and requests", videoUrl: "https://www.youtube.com/embed/Oe421EPjeBE" },
      { id: "node-3", title: "Connecting to a database", videoUrl: "https://www.youtube.com/embed/Oe421EPjeBE" }
    ]
  }
];

const quizzes = [
  {
    id: "quiz-js-fundamentals",
    courseId: "js-fundamentals",
    title: "JavaScript Fundamentals Quiz",
    timeLimitSeconds: 300,
    questions: [
      {
        id: "q1",
        text: "Which keyword declares a block-scoped variable?",
        options: ["var", "let", "function", "const"],
        correctAnswerIndex: 1
      },
      {
        id: "q2",
        text: "What will typeof '42' return",
        options: ["number", "boolean", "string", "undefined"],
        correctAnswerIndex: 2
      },
      {
        id: "q3",
        text: "What is a variable's 'scope'?",
        options: ["The value it currently holds", "Its data type", "Whether it was declared with let or const", "The region of code where it can be accessed"],
        correctAnswerIndex: 3
      },
      {
        id: "q4",
        text: "Which of these creates a function in JavaScript?",
        options: ["function greet() {}", "def greet():", "func greet() {}", "void greet() {}"],
        correctAnswerIndex: 0
      }

    ]
  },
  {
    id: "quiz-dsa-fundamentals",
    courseId: "dsa-fundamentals",
    title: "DSA Fundamentals Quiz",
    timeLimitSeconds: 300,
    questions: [
      {
        id: "q1",
        text: "What is the main advantage of a linked list over an array?",
        options: ["Faster access to any element by index", "Efficient insertion/deletion without shifting elements", "Uses less memory always", "Can only store numbers"],
        correctAnswerIndex: 1
      },
      {
        id: "q2",
        text: "In an array, how do you access the 3rd element (0-indexed)?",
        options: ["array[2]", "array[3]", "array.get(3)", "array[-1]"],
        correctAnswerIndex: 0
      },
      {
        id: "q3",
        text: "Which sorting technique repeatedly swaps adjacent elements if they're in the wrong order?",
        options: ["Merge sort", "Quick select", "Binary search", "Bubble sort"],
        correctAnswerIndex: 3
      },
      {
        id: "q4",
        text: "A node in a singly linked list typically stores:",
        options: ["Only its value", "Its value and a reference to the next node", "Its value and references to both the next and previous nodes", "Only a reference to the next node"],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: "quiz-css-basics",
    courseId: "css-basics",
    title: "CSS Basics Quiz",
    timeLimitSeconds: 300,
    questions: [
      {
        id: "q1",
        text: "With box-sizing: border-box, what does the browser include in the element's declared width?",
        options: ["Only content", "Content and padding only", "Content, padding, and border", "Content, padding, border, and margin"],
        correctAnswerIndex: 2
      },
      {
        id: "q2",
        text: "Which unit scales relative to the root element's font size, regardless of its parent's font size?",
        options: ["em", "rem", "%", "px"],
        correctAnswerIndex: 1
      },
      {
        id: "q3",
        text: "In a mobile-first responsive design, how should your media queries typically be written?",
        options: ["min-width, starting from the smallest screen", "max-width, starting from the largest screen", "Only using max-height", "You don't need media queries if you use %"],
        correctAnswerIndex: 0
      },
      {
        id: "q4",
        text: "Two elements have equal specificity and conflicting rules for the same property. Which one wins?",
        options: ["The one with the shorter selector", "The one defined last in the stylesheet", "Neither applies — the browser default is used", "The one defined first in the stylesheet"],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: "quiz-python-basics",
    courseId: "python-basics",
    title: "Python Basics Quiz",
    timeLimitSeconds: 300,
    questions: [
      { id: "q1", text: "Which keyword is used to define a function in Python?", options: ["func", "def", "function", "lambda"], correctAnswerIndex: 1 },
      { id: "q2", text: "What does len([1, 2, 3]) return?", options: ["2", "3", "1", "Error"], correctAnswerIndex: 1 },
      { id: "q3", text: "Which loop runs a fixed number of times using a range?", options: ["while loop", "do-while loop", "for loop", "repeat loop"], correctAnswerIndex: 2 },
      { id: "q4", text: "What is the correct way to write an if-else in Python?", options: ["if (x) { } else { }", "if x: ... else: ...", "if x then ... else ...", "if x => else =>"], correctAnswerIndex: 1 }
    ]
  },
  {
    id: "quiz-react-fundamentals",
    courseId: "react-fundamentals",
    title: "React Fundamentals Quiz",
    timeLimitSeconds: 300,
    questions: [
      { id: "q1", text: "What is JSX?", options: ["A database query language", "A syntax extension that lets you write HTML-like code in JavaScript", "A CSS framework", "A testing library"], correctAnswerIndex: 1 },
      { id: "q2", text: "Which hook is used to add state to a functional component?", options: ["useEffect", "useRef", "useState", "useContext"], correctAnswerIndex: 2 },
      { id: "q3", text: "How is data passed from a parent to a child component?", options: ["Through state", "Through props", "Through context only", "Through refs"], correctAnswerIndex: 1 },
      { id: "q4", text: "What triggers a React component to re-render?", options: ["Refreshing the whole page", "A change in state or props", "Calling console.log", "Adding a comment"], correctAnswerIndex: 1 }
    ]
  },
  {
    id: "quiz-advanced-javascript",
    courseId: "advanced-javascript",
    title: "Advanced JavaScript Quiz",
    timeLimitSeconds: 300,
    questions: [
      { id: "q1", text: "What is a closure?", options: ["A loop that never ends", "A function that remembers variables from its outer scope", "A way to close a browser tab", "A type of array method"], correctAnswerIndex: 1 },
      { id: "q2", text: "What does 'await' do inside an async function?", options: ["Stops the whole program", "Pauses execution until the Promise resolves", "Converts a function to synchronous forever", "Deletes the Promise"], correctAnswerIndex: 1 },
      { id: "q3", text: "In the browser, what handles queued callbacks like setTimeout?", options: ["The call stack directly", "The event loop", "The DOM", "The CSS engine"], correctAnswerIndex: 1 },
      { id: "q4", text: "What does 'this' refer to in a regular (non-arrow) method called as obj.method()?", options: ["The global object always", "undefined always", "obj", "The function itself"], correctAnswerIndex: 2 }
    ]
  },
  {
    id: "quiz-nodejs-express",
    courseId: "nodejs-express",
    title: "Node.js & Express Quiz",
    timeLimitSeconds: 300,
    questions: [
      { id: "q1", text: "What is Express primarily used for?", options: ["Styling web pages", "Building web servers and APIs in Node.js", "Managing databases directly", "Compiling JavaScript"], correctAnswerIndex: 1 },
      { id: "q2", text: "What does middleware do in Express?", options: ["Stores data permanently", "Runs code between the request and the final response", "Replaces the need for routes", "Only handles errors"], correctAnswerIndex: 1 },
      { id: "q3", text: "Which method defines a route that responds to GET requests?", options: ["app.post()", "app.get()", "app.listen()", "app.use()"], correctAnswerIndex: 1 },
      { id: "q4", text: "What does app.listen(3000) do?", options: ["Starts the server on port 3000", "Deletes port 3000", "Connects to a database on port 3000", "Sends a GET request to port 3000"], correctAnswerIndex: 0 }
    ]
  }
];