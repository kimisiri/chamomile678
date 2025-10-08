

function getCookie(query) {
  const cookie_now = document.cookie.split("; ");
  for (let i = 0; i < cookie_now.length; i++) {
    let str = cookie_now[i].split("=");
    let key = str[0];
    let value = str[1];
    if (key === query) {
      if (!isNaN(Number(value))) {
        value = Number(value);
      }
      return value;
    }
  }
  return null;
}


let storedCookie = getCookie("session_id");

function unhide(key) {
  document.getElementById(key).classList = ["stamp"];
}

if (storedCookie != "" && storedCookie != null) {
  loggedin = false;
  let payload = {"sessionId": storedCookie}
  let loadingToast = Toastify({
    text: "Loading data...",
    duration: -1,
    close: false,
    gravity: "bottom",
    position: "center",
    backgroundColor: "#6464649a"
  });

  loadingToast.showToast()
  fetch("https://script.google.com/macros/s/AKfycbzP-MM7Z7DUGFCmF3Ol_HWYhmPWAD6nx0Iik0_BQ7aukr-wdtm7aAbIM-tRCGLQZtg-/exec", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
    },
    body: JSON.stringify({
      sessionId: getCookie("session_id")
    })
  }).then((result) => {
    loadingToast.hideToast();
    if (!result.ok) {
      Toastify({
        text: "Server Error : Endpoint error " + result.statusText,
        duration: 3000,
        close: false,
        gravity: "bottom",
        position: "center",
        backgroundColor: "#ff00009a"
      }).showToast();
      throw new Error('Server response error: ' + result.statusText);
    }
    return result.json();
  }).then((retjson) => {
    if (!retjson.success) {
      document.cookie = "session_id='';expires=Thu, 01 Jan 1970 00:00:01 GMT";
      window.location.href = "login.html";
      return;
    }
    const data = retjson.stamps;
    for (let i = 0; i < data.length; i++) {
      unhide(data[i]);
    }
    unhide("OneFunDay");
    unhide("Rubnong");
    unhide("SecretHug");
    
    Toastify({
      text: "Loaded!",
      duration: 1200,
      close: false,
      gravity: "bottom",
      position: "center",
      backgroundColor: "#00ff009a"
    }).showToast();
  }).catch((reason) => {
    console.log(reason);
  });

} else {
  window.location.href = "login.html";
}