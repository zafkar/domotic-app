async function getIP() {
  return fetch("https://api.ipify.org?format=json")
    .then((result) => {
      return result.json()
    })
    .then((obj) => {
      return obj.ip
    });
}

function displayKnownWifi(currentip) {
  iptemplate = `<div>
                  <span class="{0}"></span>
                  <span>{1}</span>
                  <button id="delwifi{1}">Delete</button>
                </div>\n`
  ips = JSON.parse(localStorageSafeGet("ips","{}"));
  $("#knownwifis").empty();
  for(name in ips){
    dotclass = "dot";
    if(ips[name] == currentip){
      dotclass = "dot active";
    }
    $("#knownwifis").append(String.format(iptemplate,dotclass,name));
  }

//Set events for buttons
  $('[id^="delwifi"]').on("click",function(event){
    ips = JSON.parse(localStorageSafeGet("ips","{}"));
    console.log(event.target.id.substr(7));
    delete ips[event.target.id.substr(7)];
    localStorage.setItem("ips", JSON.stringify(ips));
    displayKnownWifi(localStorageSafeGet("ip",""));
  });
}

setInterval(() => {
  getIP().then((ip) => {
    displayKnownWifi(ip);
    $("#externalip").html(ip);
    localStorage.setItem("ip",ip);
  });
}, 1000);

$("#registerwifi").on("click", (e) => {
  getIP().then((ip) => {
    ips = JSON.parse(localStorageSafeGet("ips","{}"));
    ips[$("#wifiname").val()] = ip;
    localStorage.setItem("ips", JSON.stringify(ips));
    displayKnownWifi(localStorageSafeGet("ip",""));
  });
});
