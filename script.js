const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const dialog = document.getElementById("video-dialog");
document.querySelectorAll("[data-video]").forEach((card) => {
  card.addEventListener("click", () => {
    const videoUrl = card.dataset.video;
    if (videoUrl) {
      const player = document.createElement("video");
      player.controls = true;
      player.autoplay = true;
      player.playsInline = true;
      player.src = videoUrl;
      const content = dialog.querySelector(".dialog-content");
      content.replaceChildren(player);
      player.style.width = "100%";
      player.style.maxHeight = "70vh";
      dialog.showModal();
    } else {
      dialog.showModal();
    }
  });
});

dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
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
