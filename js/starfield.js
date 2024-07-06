const c = document.getElementById('myCanvas');
c.width = window.innerWidth;
c.height = window.innerHeight;

const ctx = c.getContext('2d');
let id;
let x_off;
let y_off;

const min_dist = 0;
const max_dist = 15;
const d = 150;
const n_stars = 200;

const Point = {
  x: 0,
  y: 0
};

let elements = [];

function project2d(point, dist) {
  const p = Object.create(Point);
  p.x = Math.round(d * point.x / (dist));
  p.y = Math.round(d * point.y / (dist));
  return p;
}

const StarElement = {
  p1: null,
  width: 3,
  dist: 0,

  draw: function () {
    const p2 = project2d(this.p1, this.dist);

    if (p2.x + x_off <= 0 || p2.x + x_off > c.width || p2.y + y_off <= 0 || p2.y + y_off > c.height) {
      this.dist = max_dist;
    } else {
      const percent = (1 - this.dist / max_dist);

      ctx.beginPath();
      ctx.strokeStyle = `hsl(0, 0%, ${percent * 70 + 30}%)`; // Менее яркие звезды
      this.width = percent * 3;
      ctx.rect(p2.x + x_off, p2.y + y_off, this.width, this.width);

      ctx.stroke();
      ctx.closePath();
    }
  }
};

function createElements() {
  for (let i = 0; i < n_stars; i++) {
    const elem = Object.create(StarElement);
    elem.p1 = Object.create(Point);
    elem.p1.x = randomRange(-50, 50);
    elem.p1.y = randomRange(-50, 50);
    elem.dist = randomRange(0, max_dist);
    elements.push(elem);
  }
}

function update() {
  ctx.fillStyle = 'black'; // Черный фон
  ctx.fillRect(0, 0, c.width, c.height);
  elements.forEach(function (elem) {
    elem.dist -= 0.2;
    elem.draw();
  });
}

function restart() {
  ctx.strokeStyle = 'hsl(0, 0%, 70%)';
  ctx.fillStyle = 'black'; // Черный фон
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.lineWidth = 2;
  ctx.moveTo(0, 0);

  x_off = c.width / 2;
  y_off = c.height / 2;

  elements = [];
  createElements();
  id = setInterval(update, 30);
}

restart();

window.onresize = function () {
  c.width = this.innerWidth;
  c.height = this.innerHeight;

  clearInterval(id);
  restart();
};

function randomRange(minVal, maxVal) {
  return Math.random() * (maxVal - minVal) + minVal;
}
document.addEventListener('DOMContentLoaded', function() {
  const topLine = document.querySelector('.top-line-coins');
  const bottomLine = document.querySelector('.bottom-line-coins');
  const cards = document.querySelectorAll('.card');

  if (topLine) {
    const observerOptions = {
      threshold: 1
    };

    const callbackTopLine = function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.innerHTML += `
            <img class="coin" alt="arbitrum" src="./img/coins/arbitrum.svg"/>
            <img class="coin" alt="avalanche" src="./img/coins/avalanche.svg"/>
            <img class="coin" alt="binance" src="./img/coins/binance.svg"/>
            <img class="coin" alt="cosmos" src="./img/coins/cosmos.svg"/>
            <img class="coin" alt="elrond" src="./img/coins/elrond.svg"/>
            <img class="coin" alt="ethereum" src="./img/coins/ethereum.svg"/>
          `
          observer.unobserve(entry.target);
        }
      })
    }

    const callbackBottomLine = function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.innerHTML += `
            <img class="coin" alt="gnosis" src="./img/coins/gnosis.svg"/>
            <img class="coin" alt="polygon" src="./img/coins/polygon.svg"/>
            <img class="coin" alt="solana" src="./img/coins/solana.svg"/>
            <img class="coin" alt="stacks" src="./img/coins/stacks.svg"/>
            <img class="coin" alt="ton.svg" src="./img/coins/ton.svg"/>
            <img class="coin" alt="tron" src="./img/coins/tron.svg"/>
          `
          observer.unobserve(entry.target);
        }
      })
    }

    const callback = function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transition = '0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 2s cubic-bezier(0.23, 1, 0.32, 1)'
          entry.target.style.boxShadow = 'rgba(255, 255, 255, 0.2) 0 0 40px 5px, rgba(255, 255, 255, 1) 0 0 0 1px, rgba(0, 0, 0, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px, inset white 0 0 0 6px'
        }
      })
    }

    const observerTopLine = new IntersectionObserver(callbackTopLine, observerOptions);
    const observerBottomLine = new IntersectionObserver(callbackBottomLine, observerOptions);
    const observer = new IntersectionObserver(callback, observerOptions);

    observerTopLine.observe(topLine);
    observerBottomLine.observe(bottomLine);
    cards.forEach(card => {
      observer.observe(card);
    })
  } else {
    console.error('Element .top-line-coins not found');
  }
});

function confetti() {
  document.querySelectorAll('.particletext.confetti').forEach(function(element) {
    const confettiCount = (element.offsetWidth / 50) * 10;
    for (let i = 0; i <= confettiCount; i++) {
      const span = document.createElement('span');
      span.className = 'particle c' + getRandomInt(1, 2);
      span.style.top = getRandomInt(10, 50) + '%';
      span.style.left = getRandomInt(0, 100) + '%';
      span.style.width = getRandomInt(6, 8) + 'px';
      span.style.height = getRandomInt(3, 4) + 'px';
      span.style.animationDelay = (getRandomInt(0, 30) / 10) + 's';
      element.appendChild(span);
    }
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
confetti()
