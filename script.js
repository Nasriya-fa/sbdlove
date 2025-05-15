// Canvas heart animation
const canvas = document.getElementById('hearts');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const hearts = [];

function Heart() {
  this.x = Math.random() * canvas.width;
  this.y = canvas.height + Math.random() * 100;
  this.size = Math.random() * 10 + 10;
  this.speed = Math.random() * 2 + 1;
  this.opacity = Math.random();

  this.draw = function () {
    ctx.fillStyle = `rgba(255,105,180,${this.opacity})`;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x + this.size, this.y - this.size,
                      this.x + this.size * 2, this.y + this.size,
                      this.x, this.y + this.size * 2);
    ctx.bezierCurveTo(this.x - this.size * 2, this.y + this.size,
                      this.x - this.size, this.y - this.size,
                      this.x, this.y);
    ctx.fill();
  };

  this.update = function () {
    this.y -= this.speed;
    if (this.y < -10) {
      this.y = canvas.height + 10;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  };
}

function createHearts() {
  if (hearts.length < 100) {
    hearts.push(new Heart());
  }
}

function updateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(heart => heart.update());
  requestAnimationFrame(updateHearts);
}

createHearts();
setInterval(createHearts, 200);
updateHearts();

// Modal controls
function showLetter() {
  document.getElementById('loveModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function hideLetter() {
  document.getElementById('loveModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function showGallery() {
  document.getElementById('videoModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
  const video = document.querySelector('#videoModal video');
  if (video) {
    video.playbackRate = 0.75; // 25% slower
  }
}

function hideGallery() {
  document.getElementById('videoModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

window.addEventListener('load', () => {
  const bgm = document.getElementById('bgm');
  bgm.volume = 0.5; // You can adjust volume between 0.0 and 1.0

  // Try to autoplay
  const playPromise = bgm.play();

  // If autoplay fails (e.g., browser blocks it), show manual play button
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      const playBtn = document.createElement('button');
      playBtn.textContent = "Play Music 🎵";
      playBtn.style.position = "fixed";
      playBtn.style.bottom = "20px";
      playBtn.style.right = "20px";
      playBtn.style.padding = "12px 20px";
      playBtn.style.background = "#ff4081";
      playBtn.style.color = "white";
      playBtn.style.border = "none";
      playBtn.style.borderRadius = "8px";
      playBtn.style.fontSize = "1em";
      playBtn.style.zIndex = "1001";
      playBtn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";

      document.body.appendChild(playBtn);

      playBtn.addEventListener('click', () => {
        bgm.play();
        playBtn.remove(); // remove button once music starts
      });
    });
  }
});