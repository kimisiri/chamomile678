

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


if (storedCookie != "" && storedCookie != null) {
  loggedin = false;
  let payload = {"sessionId": storedCookie}
  let loadingToast = Toastify({
    text: "Logging you in...",
    duration: -1,
    close: false,
    gravity: "bottom",
    position: "center",
    backgroundColor: "#6464649a"
  });

  loadingToast.showToast()
  fetch("https://script.google.com/macros/s/AKfycbzYWYSCgk3HgMvctU0rDjm8_8tCIzXBVPRAg9hDRduezIfEpl73fGgOy-6yFFDjYLgS/exec", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "text/plain"
    }
  }).then((result) => {
    loadingToast.hideToast()
    if (!result.ok) {
      Toastify({
        text: "Server Error : Endpoint error " + result.statusText,
        duration: 3000,
        close: false,
        gravity: "bottom",
        position: "center",
        backgroundColor: "#ff00009a"
      }).showToast();
      storedCookie = "";
      window.location.href = "login.html";
      throw new Error('Server response error: ' + result.statusText);
    }
    return result.json();
  }).then((json) => {
    let isvalid = json.valid;
    let reason = json.reason;
    let reasoning = "";
    let color = "#ff0000";
    console.log(isvalid, reason);
    if (!isvalid) {
      document.cookie = "session_id='';expires=Thu, 01 Jan 1970 00:00:01 GMT";
      reasoning = "Session expired, try logging in again.";
      storedCookie = "";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1250);
    } else {
      color = "#00ff00";
      reasoning = "Logged in successfully!";
    }

    Toastify({
      text: reasoning,
      duration: 1200,
      close: false,
      stopOnFocus: false,
      gravity: "bottom",
      position: "center",
      backgroundColor: color+"9a",
      onClick: function() {console.log("waw"); if (!isvalid) {window.location.href = "login.html"}}
    }).showToast();
  }).catch((reason) => {
    console.log("Unhandled error", reason);
  })

} else {
  window.location.href = "login.html";
}