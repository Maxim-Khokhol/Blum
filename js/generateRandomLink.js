addEventListener('DOMContentLoaded', ()=>{
  const links = ['https://t.me/BlumCryptoBot/app?startapp=ref_79fIKiPdg6',
                          'https://t.me/BlumCryptoBot/app?startapp=ref_PrVmlJ4gVK',
                          'https://t.me/BlumCryptoBot/app?startapp=ref_snUUi25M3B',
                          'https://t.me/BlumCryptoBot/app?startapp=ref_sTcGIpWJii']
  const randomLink = links[Math.round(Math.random() * 3)]
  const refButtons = document.querySelectorAll('.button')

  refButtons.forEach(button => {
    button.addEventListener('click', ()=>{
      window.open(randomLink, '_blank')
    })
  })
})
