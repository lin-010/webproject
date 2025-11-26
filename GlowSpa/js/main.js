document.addEventListener("DOMContentLoaded", function () {
  setupTheme();
  setupBackToTop();
  startClock();
  setupMenuToggle();
  setupJoinForm();
  setupExplorePage();
  setupCustomerPage();
  setupAddServicePage();   
  setupManagingPage();     
  setupStaffPage();
  setupAboutPage();
});

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

function setupJoinForm() {
  var form = document.getElementById("joinForm");
  if (!form) {
    return;
  }


function getSpasFromStorage() {
  var stored = localStorage.getItem("glowspa-spas");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.log("Error parsing stored spas:", e);
      return [];
    }
  }
  return [];
}

function saveSpasToStorage(spas) {
  localStorage.setItem("glowspa-spas", JSON.stringify(spas));
}

  // ADD SERVICE PAGE (addservice.html) 

function setupAddServicePage() {
  var nameInput = document.getElementById("spaName");
  var minInput = document.getElementById("spaPriceMin");

  // If these don't exist, we're not on addservice.html
  if (!nameInput || !minInput) {
    return;
  }

 
}

function addSpa() {
  var nameInput = document.getElementById("spaName");
  var minInput = document.getElementById("spaPriceMin");
  var maxInput = document.getElementById("spaPriceMax");
  var ratingInput = document.getElementById("spaRating");
  var descInput = document.getElementById("spaDescription");

  if (!nameInput || !minInput || !maxInput || !ratingInput || !descInput) {
    alert("Form elements not found. Please check addservice.html ids.");
    return;
  }

  var name = nameInput.value.trim();
  var minPrice = minInput.value.trim();
  var maxPrice = maxInput.value.trim();
  var rating = ratingInput.value.trim();
  var desc = descInput.value.trim();

  if (name === "" || minPrice === "" || maxPrice === "" || rating === "" || desc === "") {
    alert("Please fill in all fields before adding a spa.");
    return;
  }

  var minNumber = parseFloat(minPrice);
  var maxNumber = parseFloat(maxPrice);
  var ratingNumber = parseFloat(rating);

  if (isNaN(minNumber) || isNaN(maxNumber) || minNumber < 0 || maxNumber < 0 || minNumber > maxNumber) {
    alert("Please enter a valid price range (Min <= Max, both ≥ 0).");
    return;
  }

  if (isNaN(ratingNumber) || ratingNumber <= 0 || ratingNumber > 5) {
    alert("Please enter a rating between 0.5 and 5.");
    return;
  }

  var spas = getSpasFromStorage();

  var newSpa = {
    id: new Date().getTime(),
    name: name,
    minPrice: minNumber,
    maxPrice: maxNumber,
    rating: ratingNumber,
    description: desc
  };

  spas.push(newSpa);
  saveSpasToStorage(spas);

  alert("New spa added successfully!");

  // Clear form
  nameInput.value = "";
  minInput.value = "";
  maxInput.value = "";
  ratingInput.value = "0.5";
  descInput.value = "";

  
}
  // MANAGING PAGE (managing.html)

function setupManagingPage() {
  var dynamicSpasContainer = document.getElementById("dynamicSpas");
  var noSpasMessage = document.getElementById("noSpasMessage");

  // If not on managing.html, stop
  if (!dynamicSpasContainer) {
    return;
  }

  var spas = getSpasFromStorage();
  renderSpasList(spas, dynamicSpasContainer, noSpasMessage);
}

function renderSpasList(spas, container, noSpasMessage) {
  container.innerHTML = "";

  if (!spas || spas.length === 0) {
    if (noSpasMessage) {
      noSpasMessage.style.display = "block";
    }
    return;
  }

  if (noSpasMessage) {
    noSpasMessage.style.display = "none";
  }

  for (var i = 0; i < spas.length; i++) {
    var spa = spas[i];

    var item = document.createElement("div");
    item.className = "service-item";

    // image (we just use a generic image.png)
    var img = document.createElement("img");
    img.src = "images/image.png";
    img.alt = "";
    item.appendChild(img);

    var info = document.createElement("div");

    var title = document.createElement("strong");
    title.textContent = spa.name;
    info.appendChild(title);
    info.appendChild(document.createElement("br"));

    var details = document.createElement("small");
    details.textContent =
      spa.minPrice + "-" + spa.maxPrice + " SAR · " + spa.rating + "★";
    info.appendChild(details);
    info.appendChild(document.createElement("br"));

    var desc = document.createElement("small");
    desc.textContent = spa.description;
    info.appendChild(desc);

    item.appendChild(info);

    container.appendChild(item);
  }
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
