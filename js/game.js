document.addEventListener('DOMContentLoaded', () => {
  const gameDesk = document.querySelector('.game-img');
  let wasClosedPage = false;
  let intervalStarted = false;
  let interval = null;

  if (!gameDesk) {
    console.error('Element .game-img not found!');
    return;
  }

  const options = {
    threshold: 0,
    root: null,
    rootMargin: '0px 0px 2000px 0px'
  };

  const callback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !intervalStarted) {
        intervalStarted = true;
        logic();
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  observer.observe(gameDesk);

  function logic() {
    console.log('Interval started');
    interval = setInterval(() => {
      const timestamp = new Date().getTime();
      const left = Math.round(Math.random() * 95);

      const snowflake = document.createElement('img');
      snowflake.className = 'snowflake';
      snowflake.id = timestamp.toString();
      snowflake.src = './img/snowflake.png';
      snowflake.alt = 'blum snowflake';
      snowflake.style.top = '-10%';
      snowflake.style.left = `${left}%`;
      snowflake.style.animation = 'fall 5s linear';
      gameDesk.appendChild(snowflake);

      const allSnowflakes = document.querySelectorAll('.snowflake');
      allSnowflakes.forEach(snowflake => {
        if (timestamp - parseInt(snowflake.id) > 8000) {
          snowflake.parentNode.removeChild(snowflake);
        }
      });

    }, 500);
  }

  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      wasClosedPage = true;
      clearInterval(interval);
      intervalStarted = false;
      gameDesk.innerHTML = '';
    } else if (wasClosedPage) {
      wasClosedPage = false;
      if (!intervalStarted) {
        intervalStarted = true;
        logic();
      }
    }
  });

  gameDesk.addEventListener('click', (event) => {
    if (event.target.className === 'snowflake') {
      event.target.style.display = 'none';
    }
  });
});



