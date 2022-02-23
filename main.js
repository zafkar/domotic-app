
async function getIP(){
  return fetch("https://api.ipify.org?format=json")
      .then((result) => {return result.json()})
      .then((obj) => {return obj.ip});
}

setInterval(() => {
  getIP().then((ip) => {
    $("#externalip").html(ip);
  });
}, 5000);
