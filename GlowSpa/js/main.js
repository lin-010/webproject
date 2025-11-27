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
  } else {
    if (!body.className) {
      body.className = "theme-light";
    }
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
  if (!btn) return;

  btn.style.display = "none";

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) btn.style.display = "block";
    else btn.style.display = "none";
  });

  btn.onclick = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

function startClock() {
  var clockElement = document.getElementById("clock");
  if (!clockElement) return;

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
  if (!buttons || buttons.length === 0) return;

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
      var nav = document.getElementById("site-nav");
      if (nav) nav.classList.toggle("open");
    };
  }
}

function getSpasFromStorage() {
  var stored = localStorage.getItem("glowspa-spas");
  if (stored) {
    try { return JSON.parse(stored); } 
    catch (e) { console.log("Error parsing stored spas:", e); return []; }
  }
  return [];
}

function saveSpasToStorage(spas) {
  localStorage.setItem("glowspa-spas", JSON.stringify(spas));
}

function setupAddServicePage() {
  var nameInput = document.getElementById("spaName");
  if (!nameInput) return;
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

  nameInput.value = "";
  minInput.value = "";
  maxInput.value = "";
  ratingInput.value = "0.5";
  descInput.value = "";
}

function setupManagingPage() {
  var dynamicSpasContainer = document.getElementById("dynamicSpas");
  var noSpasMessage = document.getElementById("noSpasMessage");
  if (!dynamicSpasContainer) return;

  var spas = getSpasFromStorage();
  renderSpasList(spas, dynamicSpasContainer, noSpasMessage);
}

function renderSpasList(spas, container, noSpasMessage) {
  container.innerHTML = "";
  if (!spas || spas.length === 0) { if (noSpasMessage) noSpasMessage.style.display = "block"; return; }
  if (noSpasMessage) noSpasMessage.style.display = "none";

  spas.forEach(function(spa) {
    var item = document.createElement("div");
    item.className = "service-item";

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
    details.textContent = spa.minPrice + "-" + spa.maxPrice + " SAR · " + spa.rating + "★";
    info.appendChild(details);
    info.appendChild(document.createElement("br"));

    var desc = document.createElement("small");
    desc.textContent = spa.description;
    info.appendChild(desc);

    item.appendChild(info);
    container.appendChild(item);
  });
}

// ====== JOIN FORM ======
function setupJoinForm() {
  setupAboutPage();
}

function setupAboutPage() {
  var form = document.getElementById("joinForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    submitJoinForm();
  });
}

function submitJoinForm() {
  var nameInput = document.getElementById("jt-name");
  var emailInput = document.getElementById("jt-email");
  var photoInput = document.getElementById("jt-photo");
  var dobInput = document.getElementById("jt-dob");
  var expertiseSelect = document.getElementById("jt-expertise");
  var messageBox = document.getElementById("joinMessage");

  if (!nameInput || !emailInput || !photoInput || !dobInput) return;

  var errors = [];
  var name = nameInput.value.trim();
  var email = emailInput.value.trim();
  var dobValue = dobInput.value.trim();

  if (!name) errors.push("Name is required");
  if (!email) errors.push("Email is required");
  if (!photoInput.value) errors.push("Photo is required");
  if (!dobValue) errors.push("Date of birth is required");
  if (expertiseSelect && !expertiseSelect.value) errors.push("Area of expertise is required");

  if (/^\d/.test(name)) errors.push("Name cannot start with a number");

  if (dobValue) {
    var dob = new Date(dobValue);
    if (!isNaN(dob.getTime())) {
      var maxDate = new Date("2008-12-31");
      if (dob > maxDate) errors.push("Date of birth must not be after 2008");
    }
  }

  if (errors.length > 0) {
    var text = errors.join(" - ");
    if (messageBox) { messageBox.textContent = text; messageBox.style.color = "#b91c1c"; } 
    else alert(text);
    return;
  }

  var successText = "Thank you, " + name + ". Your application has been received.";
  if (messageBox) { messageBox.textContent = successText; messageBox.style.color = "#166534"; } 
  else alert(successText);

  if (form) form.reset();
}

// ====== EXPLORE PAGE ======
function setupExplorePage() {
  var sortSelect = document.getElementById("sort");
  var spaList = document.getElementById("spaList");
  if (!sortSelect || !spaList) return;

  shuffleSpaCards(spaList);

  sortSelect.addEventListener("change", function () {
    applySpaSort(sortSelect.value, spaList);
  });
}

function shuffleSpaCards(spaList) {
  var cards = Array.from(spaList.getElementsByClassName("card"));
  cards.sort(function () { return Math.random() - 0.5; });
  cards.forEach(card => spaList.appendChild(card));
}

function applySpaSort(sortValue, spaList) {
  var cards = Array.from(spaList.getElementsByClassName("card"));
  cards.sort(function (a, b) {
    var nameA = (a.getAttribute("data-name") || "").toLowerCase();
    var nameB = (b.getAttribute("data-name") || "").toLowerCase();
    var priceA = parseFloat(a.getAttribute("data-price")) || 0;
    var priceB = parseFloat(b.getAttribute("data-price")) || 0;

    if (sortValue === "name-asc") return nameA.localeCompare(nameB);
    if (sortValue === "name-desc") return nameB.localeCompare(nameA);
    if (sortValue === "price-asc") return priceA - priceB;
    if (sortValue === "price-desc") return priceB - priceA;
    return 0;
  });
  cards.forEach(card => spaList.appendChild(card));
}

// ====== STAFF PAGE ADDITIONS ======
function getStaffFromStorage() {
  try { return JSON.parse(localStorage.getItem("glowspa-staff")) || []; }
  catch(e) { console.log("Error parsing stored staff:", e); return []; }
}

function saveStaffToStorage(arr) {
  localStorage.setItem("glowspa-staff", JSON.stringify(arr));
}

function setupStaffPage() {
  var staffBody = document.getElementById("staffBody");
  var noStaffMessage = document.getElementById("noStaffMessage");
  if(!staffBody) return;
  renderStaffList(getStaffFromStorage(), staffBody, noStaffMessage);
}

function renderStaffList(list, staffBody, noStaffMessage) {
  staffBody.innerHTML = "";
  if(!list || list.length === 0) { if(noStaffMessage) noStaffMessage.style.display = "block"; return; }
  if(noStaffMessage) noStaffMessage.style.display = "none";

  list.forEach(function(s, i){
    var row = document.createElement("tr");

    var nameCell = document.createElement("td"); nameCell.textContent = s.name; row.appendChild(nameCell);
    var roleCell = document.createElement("td"); roleCell.textContent = s.role; row.appendChild(roleCell);
    var contactCell = document.createElement("td"); contactCell.textContent = s.contact; row.appendChild(contactCell);

    var actionCell = document.createElement("td");
    var delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "btn-danger";
    delBtn.setAttribute("onclick", "deleteStaff(" + i + ")");
    actionCell.appendChild(delBtn);
    row.appendChild(actionCell);

    staffBody.appendChild(row);
  });
}

function addStaff() {
  var nameInput = document.getElementById("staffName");
  var roleInput = document.getElementById("staffRole");
  var contactInput = document.getElementById("staffContact");
  if(!nameInput || !roleInput || !contactInput) { alert("Form elements not found."); return; }

  var name = nameInput.value.trim();
  var role = roleInput.value.trim();
  var contact = contactInput.value.trim();
  if(!name || !role || !contact) { alert("Please fill in all fields."); return; }
  if(contact.length < 8) { alert("Please enter a valid contact number."); return; }

  var staffList = getStaffFromStorage();
  staffList.push({ id: new Date().getTime(), name, role, contact });
  saveStaffToStorage(staffList);

  alert("Staff member added successfully!");
  nameInput.value = roleInput.value = contactInput.value = "";

  renderStaffList(staffList, document.getElementById("staffBody"), document.getElementById("noStaffMessage"));
}

function deleteStaff(index) {
  var staffList = getStaffFromStorage();
  if(!staffList || index < 0 || index >= staffList.length) return;

  if(!confirm("Are you sure you want to remove " + staffList[index].name + " from the team?")) return;

  staffList.splice(index,1);
  saveStaffToStorage(staffList);
  renderStaffList(staffList, document.getElementById("staffBody"), document.getElementById("noStaffMessage"));
}
