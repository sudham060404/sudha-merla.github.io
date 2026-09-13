/**
 * main.js
 * General page interactivity: mobile nav toggle, publication abstract
 * accordions, and a lightweight image lightbox for gallery photos.
 */

(function () {
  function initNavToggle() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.classList.toggle("open", isOpen);
    });

    // Close the mobile menu after a link is clicked.
    nav.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.classList.remove("open");
      });
    });
  }

  function initAbstractToggles() {
    document.querySelectorAll("[data-toggle-abstract]").forEach(function (button) {
      button.addEventListener("click", function () {
        var targetId = button.getAttribute("data-toggle-abstract");
        var target = document.getElementById(targetId);
        if (!target) return;
        var isOpen = target.classList.toggle("open");
        button.textContent = isOpen ? "Hide abstract \u2212" : "Show abstract +";
      });
    });
  }

  function initCarousels() {
    document.querySelectorAll(".carousel").forEach(function (carousel) {
      var track = carousel.querySelector(".carousel-track");
      var prevBtn = carousel.querySelector(".carousel-prev");
      var nextBtn = carousel.querySelector(".carousel-next");
      if (!track) return;

      function scrollByDirection(direction) {
        var firstItem = track.querySelector(".media-item");
        var gap = 20;
        var amount = firstItem
          ? firstItem.getBoundingClientRect().width + gap
          : track.clientWidth * 0.8;
        track.scrollBy({ left: direction * amount, behavior: "smooth" });
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", function () {
          scrollByDirection(-1);
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", function () {
          scrollByDirection(1);
        });
      }
    });
  }

  function initLightbox() {
    var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML =
      '<span class="lightbox-close" aria-label="Close">&times;</span>' +
      '<img class="lightbox-img" src="" alt="" />';
    document.body.appendChild(lightbox);

    var lightboxImg = lightbox.querySelector(".lightbox-img");

    document.querySelectorAll("[data-lightbox]").forEach(function (img) {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", function () {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "";
        lightbox.classList.add("open");
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("open");
      lightboxImg.src = "";
    }

    lightbox.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }

  function initAll() {
    initNavToggle();
    initAbstractToggles();
    initCarousels();
    initLightbox();
  }

  // components.js injects the header asynchronously on DOMContentLoaded,
  // so wait for its "components:ready" signal before wiring up nav toggle.
  document.addEventListener("components:ready", initAll);
})();
