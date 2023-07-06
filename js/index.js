var images = [
  "img/backgroundColorGrass.png",
  "img/backgroundColorForest.png",
  "img/backgroundColorFall.png",
  "img/backgroundColorDesert.png",
  "img/backgroundDesert.png",
];

var index = 0;
var slideshowElement = document.getElementById("backgroundSlideshow");

function changeBackgroundImage() {
  slideshowElement.style.backgroundImage = "url(" + images[index] + ")";
  index = (index + 1) % images.length;
}

setInterval(changeBackgroundImage, 3000);

var words = [
  "You gotta be kidding, why are they after me??",
  "I hate this",
  "Wait!! Why am I running?",
  "Being chased by humans is like escaping wind",
  "Believe me I'm a good monster"
];

var captionElement = document.getElementById("caption");
function changeCaption(index) {
  captionElement.textContent = words[index];
  captionElement.style.animation = "fadeInOut 2s ease-in-out";
  captionElement.addEventListener("animationend", function() {
    captionElement.style.animation = "none";
    setTimeout(function() {
      if (index < words.length - 1) {
        changeCaption(index + 1);
      } else {
        restart();
      }
    }, 5000);
  });
}
changeCaption(0);

function restart() {
  index = 0;
  changeCaption(index);
}

var startButton = document.getElementById("begin");
var startSound = new Audio("Audio/click5.ogg");
function redirect() {
  window.location = "html/game.html";
}
var progressBar = document.getElementById("progressBar");

var animation = false;

function simulateProgress() {
  if (!animation) {
    animation = true;
    var progressBar = document.querySelector("#progressBar");
    progressBar.style.display = "block";
    var width = 0;
    var interval = setInterval(frame, 10);

    function frame() {
      if (width >= 100) {
        clearInterval(interval);
        redirect();
      } else {
        width++;
        progressBar.style.width = width + "%";
      }
    }
  }
}

startButton.addEventListener("click", function(event) {
  startSound.play();
  if (event.target === startButton) {
    simulateProgress();
  }
});
