const openButton = document.getElementById("open-heart");
const closeButton = document.getElementById("close-modal");
const modal = document.getElementById("photo-modal");
const sendLoveButton = document.getElementById("send-love");
const heartsContainer = document.getElementById("hearts-container");
const burstLayer = document.getElementById("burst-layer");
const toast = document.getElementById("toast");
const memoryPhoto = document.querySelector(".memory-photo");
const photoFallback = document.getElementById("photo-fallback");

function openModal() {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

openButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function createFloatingHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = ["💗", "💕", "💖", "💘", "♡"][Math.floor(Math.random() * 5)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${16 + Math.random() * 23}px`;
  heart.style.animationDuration = `${5 + Math.random() * 6}s`;
  heartsContainer.appendChild(heart);
  window.setTimeout(() => heart.remove(), 12000);
}

window.setInterval(createFloatingHeart, 650);

function sendLoveBurst() {
  const emojis = ["💗", "💖", "💕", "💘", "💝", "❤️"];
  for (let i = 0; i < 32; i++) {
    const heart = document.createElement("span");
    heart.className = "burst-heart";
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.setProperty("--dx", `${Math.random() * 560 - 280}px`);
    heart.style.setProperty("--dy", `${Math.random() * 560 - 280}px`);
    heart.style.setProperty("--rot", `${Math.random() * 720 - 360}deg`);
    burstLayer.appendChild(heart);
    window.setTimeout(() => heart.remove(), 1700);
  }
  showToast("Banyak cinta buat kamu! 💗");
}

sendLoveButton.addEventListener("click", sendLoveBurst);

memoryPhoto.addEventListener("error", () => {
  memoryPhoto.style.display = "none";
  photoFallback.style.display = "flex";
});

memoryPhoto.addEventListener("load", () => {
  memoryPhoto.style.display = "block";
  photoFallback.style.display = "none";
});

if (memoryPhoto.complete && memoryPhoto.naturalWidth === 0) {
  memoryPhoto.style.display = "none";
  photoFallback.style.display = "flex";
}
