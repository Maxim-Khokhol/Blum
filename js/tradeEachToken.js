addEventListener('DOMContentLoaded', ()=>{

  const text = document.querySelector('.trade-each-token')
  const textBlock = document.querySelector('.trade-each-token-block')


  const startMargin = Math.round(window.innerWidth / 3)
  text.style.marginLeft = startMargin + 'px'

  const options = {
    threshold: 0.75,
  }

  let isIntersecting = false;

  const callback = (entries) => {
    entries.forEach(entry => {
      isIntersecting = entry.isIntersecting;
    });
  }

  const observer = new IntersectionObserver(callback, options)
  observer.observe(textBlock)


  let prevScrollTop = 0

  addEventListener('scroll', ()=>{

    const currentScrollTop = window.scrollY

    if(isIntersecting && prevScrollTop !== 0){
      calculateMarginLeftForText(currentScrollTop, prevScrollTop, text)
    }


    prevScrollTop = window.scrollY
  })
})



const calculateMarginLeftForText = (currentMarginTop, prevMarginTop, text) => {
  const innerHeightPercent = (window.innerHeight) / 100
  const innerWidth = window.innerWidth;
  const textWidth = parseFloat(getComputedStyle(text).width)
  const marginLeftPercent = (textWidth - innerWidth) / 100
  const currentMarginLeft = parseFloat(text.style.marginLeft)
  const totalMarginTopAfterScroll = prevMarginTop - currentMarginTop

  let newCurrentMarginLeft = currentMarginLeft + totalMarginTopAfterScroll / innerHeightPercent * marginLeftPercent * 1.3
  const startMargin = Math.round(window.innerWidth / 3)
  let maxMarginLeft = (startMargin - textWidth) / 1.8
  if(innerWidth < 1490){
    maxMarginLeft *= 1.2
  }
  if(innerWidth < 1350){
    maxMarginLeft *= 1.1

  }
  if(innerWidth <= 930){
    maxMarginLeft *= 1.1

  }
  if(innerWidth <= 380){
    maxMarginLeft *= 1.05

  }

  if(newCurrentMarginLeft < maxMarginLeft){
    text.style.marginLeft = maxMarginLeft + 'px'
  } else if(newCurrentMarginLeft < startMargin){
    text.style.marginLeft = newCurrentMarginLeft + 'px'
  } else {
    text.style.marginLeft = startMargin + 'px'
  }

}
