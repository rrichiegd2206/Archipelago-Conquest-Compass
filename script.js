const needle = document.querySelector(".needle");
const container = document.querySelector(".container");
const sound = document.getElementById("spinSound");

let currentRotation = 0;
let spinning = false;
let showingResult = false;

container.onclick = function () {
  if (showingResult) {
    document.querySelector(".popup").classList.remove("show");
    showingResult = false;
    return;
  }

  if (spinning) return;
  spinning = true;

  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }

    if (navigator.vibrate) {
    navigator.vibrate(40);
  }

  const spin = 3600 + Math.random() * 360;
  currentRotation += spin;


  needle.style.transition = "transform 4s cubic-bezier(0.25,1,0.5,1)";
  needle.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;

  setTimeout(() => {

    let finalDeg = currentRotation % 360;

    let adjusted = finalDeg;

    let direction;

    if (adjusted >= 315 || adjusted < 45) direction = "N";
    else if (adjusted < 135) direction = "E";
    else if (adjusted < 225) direction = "S";
    else direction = "W";

    showPopup(direction);

    spinning = false;
    showingResult = true;

  }, 4000);
};

function showPopup(direction) {
  const popup = document.querySelector(".popup");
  popup.textContent = direction;
  popup.classList.add("show");
}