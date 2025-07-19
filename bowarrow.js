const bow = document.getElementById("bow");
const arrow = document.getElementById("arrow");
const target = document.getElementById("target");
const scoreDisplay = document.getElementById("score");

let bowY = 160;
let score = 0;

// Move bow up/down
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && bowY > 10) bowY -= 10;
  if (e.key === "ArrowDown" && bowY < 310) bowY += 10;
  bow.style.top = bowY + "px";
});

// Shoot arrow
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") shootArrow();
});

function shootArrow() {
  let arrowX = 40;
  let arrowY = bowY + 35;

  arrow.style.top = arrowY + "px";
  arrow.style.left = arrowX + "px";
  arrow.style.display = "block";

  let move = setInterval(() => {
    arrowX += 10;
    arrow.style.left = arrowX + "px";

    // Collision detection
    let targetRect = target.getBoundingClientRect();
    let arrowRect = arrow.getBoundingClientRect();

    if (
      arrowRect.right >= targetRect.left &&
      arrowRect.top >= targetRect.top &&
      arrowRect.bottom <= targetRect.bottom
    ) {
      score++;
      scoreDisplay.innerText = score;
      clearInterval(move);
      arrow.style.display = "none";
    }

    if (arrowX > 800) {
      clearInterval(move);
      arrow.style.display = "none";
    }
  }, 20);
}

// Move target diagonally (left-right & up-down)
let targetX = 750;
let targetY = 100;
let dirX = -3;
let dirY = 2;

function moveTarget() {
  targetX += dirX;
  targetY += dirY;

  if (targetX <= 500 || targetX >= 750) dirX *= -1;
  if (targetY <= 0 || targetY >= 300) dirY *= -1;

  target.style.right = (800 - targetX) + "px";
  target.style.top = targetY + "px";

  requestAnimationFrame(moveTarget);
}

moveTarget();
