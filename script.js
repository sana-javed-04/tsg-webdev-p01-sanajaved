const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// load saved theme
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
  themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  } else {
    localStorage.setItem("theme", "dark");
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
});
/* ================= MOBILE MENU ================= */
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("active");

  const icon = menuBtn.querySelector("i");

  if (navbar.classList.contains("active")) {
    icon.className = "fa-solid fa-xmark";
  } else {
    icon.className = "fa-solid fa-bars";
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    menuBtn.querySelector("i").className = "fa-solid fa-bars";
  });
});

/* ================= ACTIVE NAV ================= */
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 180) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ===========PROJECT FILTER============

const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projectCards.forEach((card) => {
      if (filter === "all" || card.dataset.category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ======== BLOG =========

const blogBtns = document.querySelectorAll(".read-more");

const blogModal = document.getElementById("blogModal");
const closeBlog = document.querySelector(".close-blog");

blogBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("blogTitle").innerText = btn.dataset.title;

    document.getElementById("blogCategory").innerText = btn.dataset.category;

    document.getElementById("blogDate").innerText = btn.dataset.date;

    document.getElementById("blogImage").src = btn.dataset.image;

    document.getElementById("blogText").innerText = btn.dataset.content;

    blogModal.style.display = "block";
  });
});

closeBlog.addEventListener("click", () => {
  blogModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === blogModal) {
    blogModal.style.display = "none";
  }
});

/* ================= TESTIMONIAL SLIDER ================= */
const testimonials = document.querySelectorAll(".testimonial-card");

let index = 0;

function showTwo() {
  // sab hide
  testimonials.forEach((card) => card.classList.remove("show"));

  // sirf 2 show
  testimonials[index].classList.add("show");

  if (testimonials[index + 1]) {
    testimonials[index + 1].classList.add("show");
  }

  // move forward one by one
  index++;

  if (index >= testimonials.length - 1) {
    index = 0;
  }
}

showTwo();
setInterval(showTwo, 3000);

/* ================= CONTACT FORM ================= */
const form = document.querySelector(".contact-form");

const successPopup = document.getElementById("successPopup");
const okBtn = document.getElementById("okBtn");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector('input[type="text"]');
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector("textarea");

    if (!name.value.trim()) {
      alert("Please enter your name.");
      name.focus();
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      alert("Please provide a valid email address.");
      email.focus();
      return;
    }

    if (!message.value.trim()) {
      alert("Please write a message before submitting.");
      message.focus();
      return;
    }

    // SHOW POPUP
    successPopup.classList.add("show");
    form.reset();
  });
}

// OK BUTTON CLOSE
okBtn.addEventListener("click", () => {
  successPopup.classList.remove("show");
});

// ESC KEY CLOSE (extra professional touch)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    successPopup.classList.remove("show");
  }
});

// ============= PROJECT MODEL==========

const modal = document.getElementById("projectModal");
const closeModal = document.querySelector(".close-modal");

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    document.getElementById("modalTitle").innerText = card.dataset.title;

    document.getElementById("modalImage").src = card.dataset.image;

    document.getElementById("videoSource").src = card.dataset.video;

    document.getElementById("modalVideo").load();

    document.getElementById("modalDesc").innerText = card.dataset.description;

    modal.style.display = "block";
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// =========mini project model==========

const miniCards = document.querySelectorAll(".mini-card");

const miniModal = document.getElementById("miniProjectModal");
const closeMini = document.querySelector(".close-mini");

const miniImagesContainer = document.getElementById("miniImages");
const miniVideo = document.getElementById("miniVideo");
const miniVideoSource = document.getElementById("miniVideoSource");

miniCards.forEach((card) => {
  card.addEventListener("click", () => {
    document.getElementById("miniTitle").innerText = card.dataset.title;

    document.getElementById("miniDesc").innerText = card.dataset.desc;

    document.getElementById("miniLink").href = card.dataset.link;

    // RESET
    miniImagesContainer.innerHTML = "";
    miniVideo.style.display = "none";
    miniVideoSource.src = "";

    // IMAGES MULTIPLE LOAD
    const images = card.dataset.images.split(",");

    images.forEach((img) => {
      const imageEl = document.createElement("img");
      imageEl.src = img.trim();
      miniImagesContainer.appendChild(imageEl);
    });

    // VIDEO OPTIONAL
    if (card.dataset.video) {
      miniVideo.style.display = "block";
      miniVideoSource.src = card.dataset.video;
      miniVideo.load();
    }

    miniModal.style.display = "block";
  });
});

closeMini.addEventListener("click", () => {
  miniModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === miniModal) {
    miniModal.style.display = "none";
  }
});

/* ================= SCROLL ANIMATION ================= */
const animatedElements = document.querySelectorAll(
  ".skill-card, .project-card, .mini-card, .about-card, .contact-item",
);

function reveal() {
  animatedElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    const visible = window.innerHeight - 80;

    if (top < visible) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
}

animatedElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(50px)";
  el.style.transition = "all 0.8s ease";
});

window.addEventListener("scroll", reveal);
reveal();
