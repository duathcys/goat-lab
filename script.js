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
      openDetail(p);
    });

    grid.appendChild(card);
  });
}

/* ===== Project Detail — fetch partial ===== */
async function openDetail(project) {
  var overlay = document.getElementById("projectOverlay");
  var inner = document.getElementById("detailInner");

  inner.innerHTML = "<div class='detail-loading'>불러오는 중...</div>";
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";

  try {
    var res = await fetch(project.partialUrl);
    if (!res.ok) throw new Error("fetch failed");
    var bodyHtml = await res.text();

    var tagsHtml = project.tags.map(function(t) {
      var isAward = t === "대상" || t === "우수상" || t === "최우수상";
      return "<span class='detail-tag" + (isAward ? " award-tag" : "") + "'>" + t + "</span>";
    }).join("");

    inner.innerHTML =
      "<div class='detail-emoji'>" + project.emoji + "</div>" +
      "<div class='detail-title'>" + project.title + "</div>" +
      "<div class='detail-tags'>" + tagsHtml + "</div>" +
      "<hr class='detail-divider' />" +
      bodyHtml;

  } catch (e) {
    inner.innerHTML = "<p class='detail-error'>내용을 불러오지 못했습니다.</p>";
  }
}

function closeDetail() {
  var overlay = document.getElementById("projectOverlay");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
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

  document.getElementById("detailClose").addEventListener("click", closeDetail);

  document.getElementById("projectOverlay").addEventListener("click", function(e) {
    if (e.target === this) closeDetail();
  });

  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") closeDetail();
  });
});