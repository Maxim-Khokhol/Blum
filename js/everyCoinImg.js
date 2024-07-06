addEventListener('DOMContentLoaded', ()=>{
  const images = document.querySelectorAll(".every-coin-img2")

  const callback = (entries, observer) => {
     entries.forEach((entry) => {
       entry.isIntersecting ? entry.target.style.animation = 'anim .5s ease-in-out forwards' : undefined
     })
  }

  const options =  {
    threshold: 0.3
  }

  const observer = new IntersectionObserver(callback, options)

  images.forEach((img) => observer.observe(img));



})
