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

// 실제 문의 이메일이 정해지면 아래 주소를 입력하세요.
const CONTACT_EMAIL = "";
const contactLink = document.getElementById("contact-mail");
if (CONTACT_EMAIL) {
  contactLink.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("[시니 스튜디오] 프로젝트 문의")}`;
} else {
  contactLink.href = "mailto:";
  contactLink.addEventListener("click", (event) => {
    event.preventDefault();
    alert("문의 이메일 주소가 아직 연결되지 않았습니다. 운영 이메일을 정하면 이 버튼에 연결할 수 있습니다.");
  });
}
