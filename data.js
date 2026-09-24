// data.js — static content, hardcoded for now
const courses = [
  {
    id: "js-fundamentals",
    title: "JavaScript Fundamentals",
    category: "Programming",
    difficulty: "Beginner",
    description: "Learn the core building blocks of JavaScript.",
    lessons: [
      { id: "js-1", title: "Variables and data types", videoUrl: "..." },
      { id: "js-2", title: "Functions and scope", videoUrl: "..." }
    ]
  },

  {
    id: "dsa-fundamentals",
    title: "DSA Fundamentals",
    category: "Data Structures",
    difficulty: "Beginner",
    description: "Learn how the datas are structure and structure them based on requirements.",
    lessons: [
        { id:"dsa-1", title: "Arrays and Lists", videoUrl:"..."},
        { id:"dsa-2", title: "Linked List", videoUrl:"..."},
        { id:"dsa-3", title: "Sorting Techniques", videoUrl:"..."}
    ]
  },
  {
    id: "css-basics",
    title: "CSS Basics",
    category: "Web Designing",
    difficulty: "Intermediate",
    description: "Master the fundamentals of styling web pages — selectors, the box model, flexbox, and responsive layouts.",
    lessons: [
        { id:"css-1", title: "The Box Model", videoUrl:"..."},
        { id:"css-2", title: "Colors, typography, and units (px, rem, %)", videoUrl:"..."},
        { id:"css-3", title: "Responsive design and media queries", videoUrl:"..."}
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
        options: ["The value it currently holds" , "Its data type", "Whether it was declared with let or const","The region of code where it can be accessed"],
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
        options: ["min-width, starting from the smallest screen", "max-width, starting from the largest screen",  "Only using max-height", "You don't need media queries if you use %"],
        correctAnswerIndex: 0
      },
      {
        id: "q4",
        text: "Two elements have equal specificity and conflicting rules for the same property. Which one wins?",
        options: ["The one with the shorter selector", "The one defined last in the stylesheet", "Neither applies — the browser default is used", "The one defined first in the stylesheet"],
        correctAnswerIndex: 1
      }
    ]
  }
];