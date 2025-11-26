
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
