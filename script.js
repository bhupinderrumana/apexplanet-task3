// ----- QUIZ SECTION -----
const questions = [
  {
    question: "Which language runs in a web browser?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    answers: ["Central Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
    correct: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    answers: ["Hyper Text Markup Language", "Hot Mail", "How To Make Lasagna", "HighText Machine Language"],
    correct: "Hyper Text Markup Language"
  },
  {
    question: "Which year was JavaScript created?",
    answers: ["1995", "2000", "2005", "2010"],
    correct: "1995"
  },
  {
    question: "What is the correct syntax to change content of an element?",
    answers: [
      "document.getElement('demo').innerHTML = 'Hello'",
      "document.getElementById('demo').innerHTML = 'Hello'",
      "#demo.innerHTML = 'Hello'",
      "document.demo.innerHTML = 'Hello'"
    ],
    correct: "document.getElementById('demo').innerHTML = 'Hello'"
  }
];

let current = 0;
let score = 0;

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question").textContent = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => {
      if (answer === q.correct) score++;
      nextQuestion();
    };
    answersDiv.appendChild(btn);
  });
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz").style.display = "none";
  alert(`🎉 You scored ${score}/${questions.length}!`);
  document.getElementById("result").innerHTML = `✅ Your Score: ${score}/${questions.length}`;

  // Show carousel and joke
  document.getElementById("carousel").style.display = "block";
  document.getElementById("joke-box").style.display = "block";

  fetchJoke();
}

// ----- IMAGE CAROUSEL SECTION -----
const images = [
  "img1.jpg",
  "img2.jpg",
  "img3.jpg"
];

let imageIndex = 0;

function showImage(index) {
  const img = document.getElementById("carousel-image");
  img.src = images[index];
  fetchJoke(); // New joke every time image changes
}

function nextImage() {
  imageIndex = (imageIndex + 1) % images.length;
  showImage(imageIndex);
}

function prevImage() {
  imageIndex = (imageIndex - 1 + images.length) % images.length;
  showImage(imageIndex);
}

// ----- JOKE FETCHING SECTION -----
function fetchJoke() {
  fetch("https://icanhazdadjoke.com/", {
    headers: { "Accept": "application/json" }
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("joke-text").textContent = data.joke;
  })
  .catch(() => {
    document.getElementById("joke-text").textContent = "Oops! Couldn't load a joke.";
  });
}

// Start quiz
loadQuestion();
