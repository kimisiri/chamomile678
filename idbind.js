
const inpbox = document.getElementById('student-id');

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
    root.querySelector(".accept")?.addEventListener("click", () => popup.hide());
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

