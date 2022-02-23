async function getIP() {
  return fetch("https://api.ipify.org?format=json")
    .then((result) => {
      return result.json()
    })
    .then((obj) => {
      return obj.ip
    });
}

setInterval(() => {
  getIP().then((ip) => {
    $("#externalip").html(ip);
    if (localStorage.getItem("ip") == ip) {
      $("#externalip").css({
        backgroundColor: 'green'
      });
    } else {
      $("#externalip").css({
        backgroundColor: 'red'
      });
    }
  });
}, 1000);

$("#registerwifi").on("click", (e) => {
  getIP().then((ip) => {
    console.log(ip);
    localStorage.setItem("ip", ip);
  });
});
