const projects = [
  {
    emoji: "🔧",
    title: "락앤락 데이터 파이프라인 구축",
    desc: "데이터 대시보드 구축을 위해 Raw 데이터부터 데이터 마트까지의 전처리 및 적재 파이프라인을 설계·구축. 자동화를 통해 실시간 대시보드 기반 마련.",
    tags: ["Python", "SQL", "Pipeline"],
    notionUrl: "https://dawn-plant-78f.notion.site/1fa0b0e20db7804a8951cd842cce6ebe?pvs=74"
  },
  {
    emoji: "🏆",
    title: "천안시 데이터 경진대회",
    desc: "고령 운전자 면허 갱신 절차 강화 및 교통 정책 제안을 주제로 데이터 분석 진행. 사고 유형 및 심각도 분석·예측을 통해 구체적인 정책 제안 도출 — 대상 수상.",
    tags: ["Python", "Data Analysis", "대상"],
    notionUrl: "https://dawn-plant-78f.notion.site/1e274e28568a4ea2b0e3e5a1ffe7f289?pvs=74"
  },
  {
    emoji: "📚",
    title: "데이터톤 학술 논문 연구 트렌드 분석",
    desc: "사회과학 분야 학술 논문의 연구 트렌드를 정량 분석하고 키워드 중요도·예측·확산 패턴을 통합한 인터랙티브 대시보드 구현 — 2025 SSU 데이터톤 우수상 수상.",
    tags: ["Python", "NLP", "Dashboard", "우수상"],
    notionUrl: "https://dawn-plant-78f.notion.site/3160b0e20db78089a796ffe36875b2b8?pvs=74"
  },
  {
    emoji: "🕷️",
    title: "현대 이노션 리치플래너 크롤링",
    desc: "현대이노션 마케팅 플랫폼 데이터를 자동 수집·저장하는 크롤링 파이프라인 구축. OTP 인증 문제·세션 충돌을 해결하고 병렬 크롤링 및 데이터 저장 자동화 성공.",
    tags: ["Python", "Java", "SQL", "Crawling"],
    notionUrl: "https://dawn-plant-78f.notion.site/2480b0e20db780d19e89ff7bb41f9952?pvs=74"
  },
  {
    emoji: "📡",
    title: "SNMP Test Tool",
    desc: "네트워크 장비 통신인 SNMP를 테스트하는 툴 개발. 장비 상태 점검 및 응답 결과 엑셀 저장 자동화로 반복적인 수작업을 대체.",
    tags: ["Python", "Network", "Automation"],
    notionUrl: "https://dawn-plant-78f.notion.site/SNMP-Test-Tool-68e447900a7c4588a8e9c02425bb02ac?pvs=74"
  },
  {
    emoji: "🖥️",
    title: "현대 이노션 관리 페이지 개발",
    desc: "사용자·권한·메뉴 관리 기능을 포함한 관리자 페이지 개발. 권한 기반 접근 제어와 계층형 메뉴 관리를 중심으로 설계해 보안성과 UX를 동시에 개선.",
    tags: ["Java", "JavaScript", "SQL"],
    notionUrl: "https://dawn-plant-78f.notion.site/2010b0e20db78032a715cf8da113767d?pvs=74"
  }
];

function renderProjects() {
  var grid = document.getElementById("projectGrid");
  if (!grid) return;
  projects.forEach(function(p, i) {
    var card = document.createElement("a");
    card.className = "project-card reveal";
    card.href = p.notionUrl;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.style.transitionDelay = (i * 0.08) + "s";
    var tagsHtml = p.tags.map(function(t){ return "<span class='card-tag'>" + t + "</span>"; }).join("");
    card.innerHTML = "<div class='card-emoji'>" + p.emoji + "</div><div class='card-title'>" + p.title + "</div><div class='card-desc'>" + p.desc + "</div><div class='card-tags'>" + tagsHtml + "</div><span class='card-arrow'>&rarr;</span>";
    grid.appendChild(card);
  });
}

function setupScrollReveal() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e){ if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function(el){ observer.observe(el); });
}

function setupHeader() {
  var header = document.querySelector(".header");
  window.addEventListener("scroll", function(){
    header.classList.toggle("scrolled", window.scrollY > 20);
  });
}

document.addEventListener("DOMContentLoaded", function(){
  renderProjects();
  setupScrollReveal();
  setupHeader();
});