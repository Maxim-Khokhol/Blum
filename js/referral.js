document.addEventListener('DOMContentLoaded', () => {
  const referralBlock = document.querySelector('.referral-block');
  const scrollProgress = document.querySelector('.scroll-progress');
  const loader = document.querySelector('.load-wrapp');
  const tiktok = document.querySelector('.tiktok');
  let visibilityChangeSecond = false
  let interval = null;
  const activeSlides = [];
  let reversedDirection = false;
  let wasTriggeredFirst = true;
  let duration = 4500; // Animation duration

  const options = {
    threshold: 0.2,
  };

  const callback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && wasTriggeredFirst) {
        wasTriggeredFirst = false;
        animateForward();
        interval = setInterval(() => {
          if (activeSlides.length < 4 && !reversedDirection) {
            animateForward();
          } else if (activeSlides.length > 0 && reversedDirection){
            animateBackward();
          }
        }, duration);
      }
    });
  };

  document.addEventListener('visibilitychange', ()=>{
    if(!visibilityChangeSecond){
      visibilityChangeSecond = true
      scrollProgress.style.opacity = '0'
      loader.style.opacity = '1'
    } else {
      visibilityChangeSecond = false
      setTimeout(()=>{
        scrollProgress.style.opacity = '1'
        loader.style.opacity = '0'
      }, 5000)
    }
  })

  const observer = new IntersectionObserver(callback, options);
  observer.observe(referralBlock);

  function animateForward() {
    const progressId = `.progress${activeSlides.length + 1}-bg`;
    const currentProgressId = document.querySelector(progressId);

    if (currentProgressId) {
      currentProgressId.style.width = '100%';
      activeSlides.push('active');

      const nextSlideId = `.referral${activeSlides.length}-block`;
      const nextSlide = document.querySelector(nextSlideId);
      if (nextSlide) {
        nextSlide.style.height = '100%';
      }
      if(nextSlideId === '.referral2-block'){
        setTimeout(()=>{
          tiktok.style.transform = 'scale(1.8)';
        }, 100)
      }
    }

    reversedDirection = activeSlides.length === 4;
  }

  function animateBackward() {
    const progressId = `.progress${activeSlides.length}-bg`;
    const currentProgress = document.querySelector(progressId);

    if (currentProgress) {
      currentProgress.style.width = '0%';
      activeSlides.pop();

      const prevSlideId = `.referral${activeSlides.length + 2}-block`;
      const prevSlide = document.querySelector(prevSlideId);
      if (prevSlide) {
        prevSlide.style.height = '0%';
      }
    }

    reversedDirection = activeSlides.length !== 0;
  }
});




