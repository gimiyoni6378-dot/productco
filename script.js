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

const dialog = document.getElementById("video-dialog");
const dialogMedia = dialog.querySelector(".dialog-media");
const dialogContent = dialog.querySelector(".dialog-content");
let activePlayer = null;
let dialogTrigger = null;
const dialogTitle = document.getElementById("video-dialog-title");

const resetDialog = () => {
  if (activePlayer) {
    activePlayer.pause();
    activePlayer.removeAttribute("src");
    activePlayer.load();
    activePlayer.remove();
    activePlayer = null;
  }

  dialogMedia.classList.remove("has-video");
  dialogContent.hidden = false;
};

const closeDialog = () => {
  resetDialog();
  if (dialog.open) dialog.close();
};

document.querySelectorAll("[data-video]").forEach((card) => {
  card.addEventListener("click", () => {
    resetDialog();
    dialogTrigger = card;
    const workTitle = card.closest(".work-card").querySelector("h3").textContent;
    const videoUrl = card.dataset.video;
    dialogTitle.textContent = videoUrl ? workTitle : `${workTitle} 영상을 준비하고 있습니다.`;
    if (videoUrl) {
      const player = document.createElement("video");
      player.controls = true;
      player.autoplay = true;
      player.playsInline = true;
      player.src = videoUrl;
      player.setAttribute("aria-label", `${workTitle} 영상`);
      dialogContent.hidden = true;
      dialogMedia.classList.add("has-video");
      dialogMedia.append(player);
      activePlayer = player;
    }

    dialog.showModal();
  });
});

dialog.querySelector(".dialog-close").addEventListener("click", closeDialog);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeDialog();
});
dialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeDialog();
});
dialog.addEventListener("close", () => {
  resetDialog();
  dialogTrigger?.focus({ preventScroll: true });
});
