const projects = [
  {
    emoji: "🔧",
    title: "락앤락 데이터 파이프라인 구축",
    desc: "Raw 데이터부터 데이터 마트까지의 전처리 및 적재 파이프라인을 GCP 기반으로 설계·구축하고, 자동화를 통해 실시간 대시보드 기반을 마련.",
    tags: ["Python", "BigQuery", "GCP", "Data Pipeline"],
    partialUrl: "projects/project-1.html"
  },
  {
    emoji: "🏆",
    title: "천안시 데이터 분석 아이디어 경진대회",
    desc: "다양한 외부 데이터를 자동 수집·전처리 후 공간 정보 기반으로 통합 분석하여 사고 패턴을 도출. 머신러닝 기반 사고 심각도 예측 모델을 구축하고 정책 개선안을 제안해 대상을 수상.",
    tags: ["대상", "Python", "SQL", "Machine Learning", "Gradient Boosting"],
    partialUrl: "projects/project-2.html"
  },
  {
    emoji: "📚",
    title: "데이터톤 학술 논문 연구 트렌드 분석",
    desc: "사회과학 논문 메타데이터를 임베딩 기반으로 분석해 키워드 변화, 연구자 네트워크, 토픽 확산 패턴을 도출. 시계열 모델로 키워드 빈도를 예측하고 결과를 대시보드로 시각화.",
    tags: ["우수상", "Python", "NLP", "SBERT", "Machine Learning"],
    partialUrl: "projects/project-3.html"
  },
  {
    emoji: "🕷️",
    title: "현대 이노션 리치플래너 크롤링",
    desc: "현대이노션 마케팅 플랫폼 데이터를 자동 수집·저장하는 크롤링 파이프라인을 구축. OTP 인증 및 세션 충돌 문제를 해결하고, 병렬 크롤링과 GCP 기반 데이터 적재 자동화를 구현.",
    tags: ["Python", "Java", "SQL", "GCP", "Web Crawling"],
    partialUrl: "projects/project-4.html"
  },
  {
    emoji: "📡",
    title: "SNMP Test Tool",
    desc: "네트워크 장비 통신인 SNMP를 테스트하는 툴 개발. 장비 상태 점검 및 응답 결과 엑셀 저장 자동화로 반복적인 수작업을 대체.",
    tags: ["Python", "Network", "Automation"],
    partialUrl: "projects/project-5.html"
  },
  {
    emoji: "🖥️",
    title: "현대 이노션 관리 페이지 개발",
    desc: "사용자·권한·메뉴 관리 기능을 포함한 관리자 페이지 개발. 권한 기반 접근 제어와 계층형 메뉴 관리를 중심으로 설계해 보안성과 사용성을 동시에 개선.",
    tags: ["Java", "JavaScript", "SQL", "Backend", "Frontend"],
    partialUrl: "projects/project-6.html"
  }
];

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
      openDetail(p.partialUrl);
    });

    grid.appendChild(card);
  });
}

/* ===== Project Detail — fetch partial ===== */
async function openDetail(partialUrl) {
  var overlay = document.getElementById("projectOverlay");
  var inner = document.getElementById("detailInner");

  // 로딩 상태 먼저 보여주고 오버레이 열기
  inner.innerHTML = "<div class='detail-loading'>불러오는 중...</div>";
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";

  try {
    var res = await fetch(partialUrl);
    if (!res.ok) throw new Error("fetch failed");
    var html = await res.text();
    inner.innerHTML = html;
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