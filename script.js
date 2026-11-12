// Reveal complete Korean characters once, preserving the headline markup and layout.
const typingHeading = document.querySelector('[data-typewriter]');
if (typingHeading && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  typingHeading.setAttribute('aria-label', typingHeading.innerText.replace(/\n/g, ' '));
  const walker = document.createTreeWalker(typingHeading, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  let characterIndex = 0;
  nodes.forEach(node => {
    const fragment = document.createDocumentFragment();
    Array.from(node.textContent).forEach(character => {
      const span = document.createElement('span');
      span.className = 'typewriter-char';
      span.setAttribute('aria-hidden', 'true');
      span.style.setProperty('--type-delay', `${350 + characterIndex++ * 65}ms`);
      span.textContent = character;
      fragment.append(span);
    });
    node.replaceWith(fragment);
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

let activePlayer = null;

const mountWorkPlayer = (card) => {
  const work = card.closest(".work-card");
  const workTitle = work.querySelector("h3").textContent;
  const player = document.createElement("video");
  player.className = "work-inline-player";
  player.controls = true;
  player.playsInline = true;
  player.preload = "metadata";
  const thumbnail = card.querySelector("img");
  player.poster = card.dataset.videoThumbnail || thumbnail?.currentSrc || thumbnail?.src || "";
  player.src = card.dataset.video;
  player.setAttribute("aria-label", `${workTitle} 영상 플레이어`);
  player.addEventListener("play", () => {
    if (activePlayer && activePlayer !== player) activePlayer.pause();
    activePlayer = player;
  });
  card.hidden = true;
  work.insertBefore(player, card.nextElementSibling);
  return player;
};

document.querySelectorAll("[data-video]").forEach((card) => {
  // When a video URL is supplied, expose the player in the page immediately.
  if (card.dataset.video) mountWorkPlayer(card);

  card.addEventListener("click", () => {
    const work = card.closest(".work-card");
    if (work.querySelector(".work-inline-player, .work-video-status")) return;

    activePlayer?.pause();
    const workTitle = card.closest(".work-card").querySelector("h3").textContent;
    card.hidden = true;

    const status = document.createElement("p");
    status.className = "work-video-status";
    status.textContent = `${workTitle} 영상은 준비 중입니다.`;
    status.setAttribute("role", "status");
    work.insertBefore(status, card.nextElementSibling);
  });
});
