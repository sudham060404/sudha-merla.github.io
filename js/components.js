/**
 * components.js
 * Injects the shared site header (nav bar) and footer into every page.
 * Works when opening files directly via file:// (no fetch/CORS issues)
 * because everything is generated with plain JS template strings.
 *
 * Each page must include:
 *   <div id="site-header"></div>  ... page content ...  <div id="site-footer"></div>
 *   <body data-page="about">   (data-page value used to highlight the active nav link)
 */

(function () {
  var NAV_LINKS = [
    { href: "index.html", label: "About Me", page: "about" },
    { href: "education.html", label: "Education", page: "education" },
    { href: "skills.html", label: "Skills", page: "skills" },
    { href: "achievements.html", label: "Achievements", page: "achievements" },
    { href: "publications.html", label: "Publications", page: "publications" },
    { href: "research.html", label: "Research Experience", page: "research" },
    { href: "conferences.html", label: "Conferences", page: "conferences" },
    { href: "workshops.html", label: "Workshops", page: "workshops" },
    { href: "contact.html", label: "Contact Me", page: "contact" }
  ];

  var SITE_NAME = "Sudha Merla";

  function renderHeader(activePage) {
    var container = document.getElementById("site-header");
    if (!container) return;

    var linksHtml = NAV_LINKS.map(function (link) {
      var activeClass = link.page === activePage ? " active" : "";
      return (
        '<li><a class="nav-link' +
        activeClass +
        '" href="' +
        link.href +
        '">' +
        link.label +
        "</a></li>"
      );
    }).join("");

    container.innerHTML =
      '<header class="site-header">' +
      '<div class="header-inner">' +
      '<a class="brand" href="index.html">' +
      '<span class="brand-name">' + SITE_NAME + "</span>" +
      "</a>" +
      '<button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">' +
      '<span></span><span></span><span></span>' +
      "</button>" +
      '<nav class="site-nav" id="site-nav">' +
      '<ul class="nav-list">' +
      linksHtml +
      "</ul>" +
      "</nav>" +
      "</div>" +
      "</header>";
  }

  function renderFooter() {
    var container = document.getElementById("site-footer");
    if (!container) return;

    var year = new Date().getFullYear();

    container.innerHTML =
      '<footer class="site-footer">' +
      '<div class="footer-inner">' +
      '<div class="footer-social">' +
      '<a href="mailto:sudhamerla46@gmail.com" aria-label="Email">Email</a>' +
      '<a href="https://www.linkedin.com/in/sudha-merla" target="_blank" rel="noopener">LinkedIn</a>' +
      '<a href="https://scholar.google.com/citations?user=PwxzJtMAAAAJ&hl=en" target="_blank" rel="noopener">Google Scholar</a>' +
      '<a href="https://orcid.org/0009-0002-0385-0177" target="_blank" rel="noopener">ORCID</a>' +
      "</div>" +
      '<p class="footer-copy">&copy; ' + year + " " + SITE_NAME + ". All rights reserved.</p>" +
      "</div>" +
      "</footer>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var activePage = document.body.getAttribute("data-page") || "";
    renderHeader(activePage);
    renderFooter();

    // Dispatch a custom event so main.js can wire up nav-toggle behavior
    // after the header has actually been injected into the DOM.
    document.dispatchEvent(new CustomEvent("components:ready"));
  });
})();
