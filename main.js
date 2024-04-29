// inspired by: https://codepen.io/khanetmoi/pen/dydoaqP //

const canvas = window.document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const numOfParticle = 200;
const particleArray = [];
const randomMinMax = (min, max) => min + Math.random() * (max - min + 1);

/* ------------------
   | Particle Class |
   ------------------ */
class Particle {
  constructor() {
    this.radius = randomMinMax(1, 10);
    this.x = randomMinMax(this.radius, canvas.width - this.radius);
    this.y = randomMinMax(this.radius, canvas.height - this.radius);
    this.speedX = randomMinMax(0, 2);
    this.speedY = randomMinMax(0, 2);
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  }

  clampX(val) {
    return Math.min(Math.max(val, this.radius), canvas.width - this.radius);
  }
  clampY(val) {
    return Math.min(Math.max(val, this.radius), canvas.height - this.radius);
  }

  update() {
    this.x = this.clampX(this.x + this.speedX);
    this.y = this.clampY(this.y + this.speedY);

    if (this.x === this.radius || this.x === canvas.width - this.radius) {
      this.speedX *= -1;
    }
    if (this.y === this.radius || this.y === canvas.height - this.radius) {
      this.speedY *= -1;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath(); // for clarity, not strictly necessary here
  }
}

/*  --------------------- 
    | Network Animation |
    --------------------- */
function handleParticules() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();

    for (let j = 0; j < particleArray.length; j++) {
      const dx = particleArray[i].x - particleArray[j].x;
      const dy = particleArray[i].y - particleArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        ctx.beginPath();
        ctx.strokeStyle = particleArray[i].color;
        ctx.lineWidth = particleArray[i].radius / 20;
        ctx.moveTo(particleArray[i].x, particleArray[i].y);
        ctx.lineTo(particleArray[j].x, particleArray[j].y);
        ctx.stroke();
      }
    }
  }
}

/*  -----------------
    | Run Animation |
    ----------------- */
function start() {
  for (let i = 0; i < numOfParticle; i += 1) {
    particleArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticules();
  window.requestAnimationFrame(animate);
}

start();
animate();
