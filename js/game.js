var buttonContainer = document.getElementById("buttonContainer");
var startButton = document.getElementById('start');

var animationRunning = false;

var onPlay = new Audio("/Audio/mixkit-cinematic-horror-heartbeat-transition-489.wav");

function startGame() {
  onPlay.play();
  if (!animationRunning) {
    animationRunning = true;
    var block = document.querySelector("#block");
    block.style.display = "block";
    var object = document.querySelector("#object img");
    object.style.display = "block"
    startButton.textContent = "Pause";
  } else {
    onPlay.pause();
    gamePause();
  }
};

function gamePause() {
  animationRunning = false;
  var block = document.querySelector("#block");
  block.style.display = "none";
  var object = document.querySelector("#object img");
  object.style.display = "none";
  startButton.textContent = "Resume";
}
buttonContainer.addEventListener("click", function(event) {
  if (event.target === startButton) {
    startGame();
  }
});

var animationImages = [
  "/img/character_zombie_attack1.png",
  "/img/character_zombie_attack2.png",
  "/img/character_zombie_attackKick.png",
];
var character = document.getElementById("character");
var currentImageIndex = 0;

function jump() {
  character.style.backgroundImage = "url(" + animationImages[1] + ")";
}

function removeJump() {
  character.style.backgroundImage = "url(" + animationImages[2] + ")";
}

var onJump = new Audio("/Audio/footstep_grass_004.mp3");
function jump() {
  if (character.classList == "animate") {
    return;
  }
  onJump.play();
  character.classList.add("animate");
  setTimeout(removeJump, 300);
};

function removeJump() {
  character.classList.remove("animate");
}
var startJump = document.getElementById("jump");
buttonContainer.addEventListener("click", function(event) {
  if (event.target === startJump) {
    jump();
  }
});

var block = document.getElementById("block");

var onCollide = new Audio("/Audio/impactWood_heavy_003.ogg");
function checkDead() {
  let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
  if (blockLeft < 20 && blockLeft >-20 && characterTop >= 130) {
    onCollide.play();
    gameOver();
  }
  if (animationRunning) {
    reward(1);
  }
};

setInterval(checkDead, 10);

var images = ["/img/bush1.png", "/img/treeLong.png", "/img/tree.png", "/img/cactus1.png"];

function getRandomImage() {
  var randomImage = images[Math.floor(Math.random() * images.length)];
  var imageElement = document.createElement("img");
  imageElement.src = randomImage;
  imageElement.addEventListener("animationend", function() {
    this.parentNode.removeChild(this);
    getRandomImage();
  });

  var object = document.getElementById("object");
  object.appendChild(imageElement);

}

getRandomImage();

var score = 0;

function reward(points) {
  score += points;
  var scoreElement = document.getElementById("score");
  scoreElement.textContent = "score: " + score;
};

function resetScore() {
  score = 0;
  var scoreElement = document.getElementById("score");
  scoreElement.textContent = "Score: " + score;
}

function retry() {
  onPlay.play();
  var retVal = confirm ("exit?");
  if (retVal == true) {
    Redirect();
    return true;
  } else {
    resetScore();
    startGame();
    startButton.textContent = "Retry";
    return false;
  }
}

function Redirect() {
  window.location = "/html/gameOver.html";
}

function gameOver() {
  onPlay.pause();
  alert(`GameOver your score is ${score}`);
  retry();
};

var currentScoreElement = document.getElementById("currentScore");
var saveScoreButton = document.getElementById("saveScoreButton");
var highScoresList = document.getElementById("highScoresList");

function saveScore(score) {
  var scores = getScoresFromStorage();

  scores.push(score);
  scores.sort((a, b) => b - a);

  localStorage.setItem("scores", JSON.stringify(scores));
}

function getScoresFromStorage() {
  var scores = localStorage.getItem("scores");

  if (scores) {
    return JSON.parse(scores);
  } else {
    return [];
  }
}

function displayHighScores() {
  var scores = getScoresFromStorage();

  highScoresList.innerHTML = "";

  for (var i = 0; i < scores.length; i++) {
    var scoreItem = document.createElement("li");
    scoreItem.textContent = scores[i];
    highScoresList.appendChild(scoreItem);
  }
}

saveScoreButton.addEventListener("click", function() {
  var currentScore = parseInt(currentScoreElement.textContent);
  saveScore(currentScore);
  displayHighScores();
});

displayHighScores();
