document.addEventListener('DOMContentLoaded', ()=>{
  const refBlock = document.querySelector('.referral2-block');


  const options ={
    threshold: 1
  }
  const callback = (entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        console.log('Block in View')
      }
    })
  }

  const observer = new IntersectionObserver(callback, options)
  observer.observe(refBlock)
})
