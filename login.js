function getCookies() {
  const cookie_now = document.cookie.split("; ");
  let dict = new Map();
  for (let i = 0; i < cookie_now.length; i++) {
    let str = cookie_now[i].split("=");
    let key = str[0];
    let value = str[1];
    if (!isNaN(Number(value))) {
      value = Number(value);
    }
    dict.set(key, value);
  }
  return dict;
}


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

function setCookie(key, value) {
  document.cookie = key.toString() + "=" + value;
}

const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
const cookiesessid = getCookie("session_id");
if (cookiesessid != null && cookiesessid != '') {
  // check if session is valid
  // redirect to somewhere else
  window.location.href = "/";
} else if (urlParams.get("sessionId") != null) {
  setCookie("session_id", urlParams.get("sessionId"));
  setCookie("email", urlParams.get("email"));
  
  window.location.href = "/";
}


