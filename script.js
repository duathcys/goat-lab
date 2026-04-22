/* ===== Render Project Cards ===== */
function renderProjects() {
  var grid = document.getElementById("projectGrid");
  if (!grid) return;

  projects.forEach(function(p, i) {
    var card = document.createElement("div");
    card.className = "project-card reveal";
    card.style.transitionDelay = (i * 0.08) + "s";

    var tagsHtml = p.tags.map(function(t) {
      return "<span class='card-tag'>" + t + "</span>";
    }).join("");

    card.innerHTML =
      "<div class='card-emoji'>" + p.emoji + "</div>" +
      "<div class='card-title'>" + p.title + "</div>" +
      "<div class='card-desc'>" + p.desc + "</div>" +
      "<div class='card-tags'>" + tagsHtml + "</div>" +
      "<span class='card-arrow'>&rarr;</span>";

    card.addEventListener("click", function() {
      window.location.href = p.pageUrl;
    });

    grid.appendChild(card);
  });
}

/* ===== Scroll Reveal ===== */
function setupScrollReveal() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(function(el) {
    observer.observe(el);
  });
}

/* ===== Header scroll shadow ===== */
function setupHeader() {
  var header = document.querySelector(".header");
  if (!header) return;
  window.addEventListener("scroll", function() {
    header.classList.toggle("scrolled", window.scrollY > 20);
  });
}

/* ===== Init ===== */
document.addEventListener("DOMContentLoaded", function() {
  renderProjects();
  setupScrollReveal();
  setupHeader();
});