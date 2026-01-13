// ===== Scroll reveal (subtle, no cringe animations) =====
const revealEls = document.querySelectorAll("[data-reveal]");

const obs = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("reveal-show");
        obs.unobserve(e.target);
      }
    }
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => {
  el.classList.add("reveal-base");
  obs.observe(el);
});

// ===== Year =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Toast =====
function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove("hidden");
  toast.style.opacity = "1";
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.classList.add("hidden"), 300);
  }, 2200);
}

// ===== Waitlist form (front-end only) =====
const form = document.getElementById("waitlistForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email")?.value?.trim();
    if (!email || !email.includes("@") || email.length < 6) {
      showToast("Drop a real email 😭");
      return;
    }
    showToast("You’re in. Early access soon 🔥");
    form.reset();
  });
}

// ===== Mobile menu =====
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}