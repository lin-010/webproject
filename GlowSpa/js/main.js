
// Wait until HTML is loaded
document.addEventListener("DOMContentLoaded", function () {
  setupTheme();
  setupBackToTop();
  startClock();
  setupMenuToggle();

});

//THEME TOGGLE 

function setupTheme() {
  var body = document.body;
  var btn = document.getElementById("themeToggle");

  // Load saved theme if exists
  var savedTheme = localStorage.getItem("glowspa-theme");
  if (savedTheme === "theme-dark" || savedTheme === "theme-light") {
    body.className = savedTheme;
  }

  if (btn) {
    updateThemeButtonText(btn, body);
    btn.onclick = function () {
      if (body.classList.contains("theme-dark")) {
        body.classList.remove("theme-dark");
        body.classList.add("theme-light");
        localStorage.setItem("glowspa-theme", "theme-light");
      } else {
        body.classList.remove("theme-light");
        body.classList.add("theme-dark");
        localStorage.setItem("glowspa-theme", "theme-dark");
      }
      updateThemeButtonText(btn, body);
    };
  }
}

function updateThemeButtonText(btn, body) {
  if (body.classList.contains("theme-dark")) {
    btn.textContent = "Light theme";
  } else {
    btn.textContent = "Dark theme";
  }
}

//  BACK TO TOP BUTTON (homepage)

function setupBackToTop() {
  var btn = document.getElementById("backToTopBtn");
  if (!btn) {
    return; 
  }

  btn.style.display = "none";

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });

  btn.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
}

//  CLOCK (footer) 

function startClock() {
  var clockElement = document.getElementById("clock");
  if (!clockElement) {
    return; 
  }

  function updateClock() {
    var now = new Date();
    var text =
      now.getFullYear() +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0") +
      " " +
      String(now.getHours()).padStart(2, "0") +
      ":" +
      String(now.getMinutes()).padStart(2, "0") +
      ":" +
      String(now.getSeconds()).padStart(2, "0");

    clockElement.textContent = text;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// MOBILE MENU TOGGLE (for pages with .menu-toggle)

function setupMenuToggle() {
  var buttons = document.getElementsByClassName("menu-toggle");
  if (!buttons || buttons.length === 0) {
    return;
  }

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
      // Each button is inside <nav id="site-nav">
      var nav = document.getElementById("site-nav");
      if (nav) {
        nav.classList.toggle("open");
      }
    };
  }
}
document.addEventListener("DOMContentLoaded", function () {
  setupJoinForm();
});

function setupJoinForm() {
  var form = document.getElementById("joinForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    var nameInput = document.getElementById("jt-name");
    var emailInput = document.getElementById("jt-email");
    var photoInput = document.getElementById("jt-photo");
    var dobInput = document.getElementById("jt-dob");

    if (!nameInput || !emailInput || !photoInput || !dobInput) return;

    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var dobValue = dobInput.value;
    var file = photoInput.files[0];

    if (!name || !email || !dobValue || !photoInput.value) {
      alert("Please fill in all required fields.");
      e.preventDefault();
      return;
    }

    if (/^\d/.test(name)) {
      alert("Name cannot start with a number.");
      e.preventDefault();
      return;
    }

    if (!file || !file.type || file.type.indexOf("image/") !== 0) {
      alert("Photo must be an image file.");
      e.preventDefault();
      return;
    }

    var dob = new Date(dobValue);
    var maxDate = new Date("2008-12-31");
    if (dob > maxDate) {
      alert("Date of birth must not be after 2008.");
      e.preventDefault();
      return;
    }

    alert("Thank you, " + name + ". Your request has been submitted.");
  });
}

