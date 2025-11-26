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

function setupMenuToggle() {
  var buttons = document.getElementsByClassName("menu-toggle");
  if (!buttons || buttons.length === 0) {
    return;
  }

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
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
  if (!form) {
    return;
  }

  var nameInput = document.getElementById("jt-name");
  var emailInput = document.getElementById("jt-email");
  var photoInput = document.getElementById("jt-photo");
  var dobInput = document.getElementById("jt-dob");
  var expertiseSelect = document.getElementById("jt-expertise");
  var messageBox = document.getElementById("joinMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var errors = [];

    if (!nameInput || !emailInput || !photoInput || !dobInput) {
      return;
    }

    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var dobValue = dobInput.value.trim();

    if (!name) {
      errors.push("Name is required");
    }
    if (!email) {
      errors.push("Email is required");
    }
    if (!photoInput.value) {
      errors.push("Photo is required");
    }
    if (!dobValue) {
      errors.push("Date of birth is required");
    }
    if (expertiseSelect && !expertiseSelect.value) {
      errors.push("Area of expertise is required");
    }

    if (/^\d/.test(name)) {
      errors.push("Name cannot start with a number");
    }

    if (dobValue) {
      var dob = new Date(dobValue);
      if (!isNaN(dob.getTime())) {
        var maxDate = new Date("2008-12-31");
        if (dob > maxDate) {
          errors.push("Date of birth must not be after 2008");
        }
      }
    }

    if (errors.length > 0) {
      if (messageBox) {
        messageBox.textContent = errors.join(" - ");
        messageBox.style.color = "#b91c1c";
      } else {
        alert(errors.join(" - "));
      }
      return;
    }

    if (messageBox) {
      messageBox.textContent = "Thank you, " + name + ". Your application has been received.";
      messageBox.style.color = "#166534";
    } else {
      alert("Thank you, " + name + ". Your application has been received.");
    }

    form.reset();
  });
}

