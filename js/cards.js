addEventListener('DOMContentLoaded', ()=>{
  const cards = document.querySelectorAll('.card2')

  const options = {
    threshold: 0.2
  }
  const callback = (entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateX(0)'

      }

    })
  }

  const observer = new IntersectionObserver(callback, options)

  cards.forEach(card => {
    observer.observe(card);
  })


})
