
const inpbox = document.getElementById('student-id');

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
let stid = getCookie("student_id");
if (stid != null && stid != "" && stid != 0) {
  window.location.href = "./";
}
let cookieid = getCookie("session_id");
if (cookieid === null || stid === "") {
  window.location.href = "./";
}

function queryServer(userid) {
  fetch("https://script.google.com/macros/s/AKfycby-QILzuttyKoPwVPwS_jhGvDc7um4pc-TwXpH3zkGRI96_TKXuNy0QLJbxxKTiGNYK/exec", {
      method: "POST",
      body: JSON.stringify({
        sessionId: getCookie("session_id"),
        studentId: userid
      }),
      headers: {
        "Content-Type": "application/json"
    }
  }).then((result) => {
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
  }).then((json) => {
    if (json.success) {
      document.cookie = "student_id="+userid+";";
      window.location.href = "./";
    } else {
      // something is wrong so just relogin lmao
      document.cookie = "session_id='';expires=Thu, 01 Jan 1970 00:00:01 GMT";
      reasoning = "Session expired, try logging in again.";
      window.location.href = "./login.html";
    }
  })
}

let studentidrn = null;


const popup = new Popup({
  id: "confirmationpopup",
  title: "Confirm your student id.",
  content: `
    Is your student ID .REPLACEME?
    ID binding process can only be done {red}[once]!
    Please review your student ID carefully.
    {btn-accept}[Confirm]   {btn-refuse}[Wait a minute!]`,
  allowClose: false,
  loadCallback: function() {
    const root = document;
    root.querySelector(".refuse")?.addEventListener("click", () => popup.hide());
    root.querySelector(".accept")?.addEventListener("click", () => {
      Toastify({
        text: "Processing request...",
        duration: -1,
        close: false,
        gravity: "bottom",
        position: "center",
        backgroundColor: "#6464649a"
      }).showToast();
      queryServer(studentidrn);
    });
  }
});
function makepopup(userin) {
  document.querySelector("body > div.popup.confirmationpopup > div > div.popup-body").firstChild.innerHTML = "Is your student ID <span style='color: blue'>.REPLACEME</span>?".replace(".REPLACEME", userin);
  popup.show();
}

function handleInput() {
  const pattern = /^6\d8\d{4}$/;
  const userin = inpbox.value;
  console.log(userin);
  if (pattern.test(userin)) {
    studentidrn = userin;
    makepopup(userin)
  } else {
    Toastify({
      text: "Invalid student id!",
      duration: 1000,
      close: false,
      gravity: "bottom",
      position: "center",
      backgroundColor: "#ff00009a"
    }).showToast();
  }
  
}

inpbox.addEventListener('submit', function(event) {
  event.preventDefault();
  handleInput();
});
inpbox.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleInput();
  }
});

