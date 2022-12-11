const image = document.getElementById('img')
const statusSpan = document.querySelector('span');

setInterval(()=>{
  fetch('http://localhost:3333/status').then(data=>{
    return data.json();
})
.then(result => {
  statusSpan.textContent=result.status
  switch(result.status){
    case 'inChat':
    case 'isLogged':
    case 'qrReadSuccess':
      image.setAttribute('src', './images/qrReadSuccess.jpg');
      break;

    case 'browserClose':
    case 'qrReadFail':
    case 'autocloseCalled':
    case 'desconnectedMobile':
    case 'serverClose':
    case 'deleteToken':
      image.setAttribute('src', './images/fails.png');
      break;
    default:
      image.setAttribute('src', 'out.png');
      break;
  }


});
},5000);

function reestart(){
  fetch('http://localhost:3333/reestart').then((data)=>{console.log(data)})
}
