Math.Ran = function(max){
  let rn = Math.round(Math.random() * max);
  rn *= Math.random() > 0.5 ? -1 : 1;
  return rn
}

function generateRandomKeyFrames(dis, len, name){
  let keyframes = ``;
  for(let i = 0; i < len; i++){
    keyframes += `${(i / len) * 100}%{transform: translateX(${Math.Ran(dis)}px)}`
  }

  let style = document.createElement('style');
  style.innerHTML = `@keyframes ${name} { ${keyframes} }`;

  document.body.appendChild(style);
}
function generateRandomClipFrames( len, name){
  let keyframes = ``;
  let size = 100;
  for(let i = 0; i < len; i++){
    keyframes +=
      `${(i / len) * 100}%{
    clip-path: inset(${Math.Ran(size)}% ${Math.Ran(size)}% ${Math.Ran(size)}% ${Math.Ran(size)}%)
}`
  }

  let style = document.createElement('style');
  style.innerHTML = `@keyframes ${name} {
${keyframes}
}`;

  document.body.appendChild(style);
}

generateRandomKeyFrames(15, 16, "random1")
generateRandomKeyFrames(10, 10, "random2");
generateRandomClipFrames(200, "random-clip-1")
