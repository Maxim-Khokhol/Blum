const canvases = document.getElementsByClassName('myCanvas');

function initializeCanvas2(c) {
  c.width = window.innerWidth;
  c.height = window.innerHeight;

  const ctx = c.getContext('2d');
  let id;
  let x_off;
  let y_off;

  const min_dist = 100;
  const max_dist = 30;
  const d = 350;
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
        ctx.strokeStyle = `hsl(0, 0%, ${percent * 70 + 30}%)`; // Less bright stars
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
    ctx.fillStyle = 'black'; // Black background
    ctx.fillRect(0, 0, c.width, c.height);
    elements.forEach(function (elem) {
      elem.dist -= 0.2;
      elem.draw();
    });
  }

  function restart() {
    ctx.strokeStyle = 'hsl(0, 0%, 70%)';
    ctx.fillStyle = 'black'; // Black background
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
}

// Initialize all canvases
for (let i = 0; i < canvases.length; i++) {
  initializeCanvas2(canvases[i]);
}
