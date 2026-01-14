// ArenaAnywhere: minimal, business-style interactions (no gimmicks)

const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => navMenu.classList.toggle("active"));
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => navMenu.classList.remove("active"));
  });
}

// FAQ accordion
document.querySelectorAll(".faq-question").forEach((q) => {
  q.addEventListener("click", () => {
    const item = q.parentElement;
    const wasActive = item.classList.contains("active");
    document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("active"));
    if (!wasActive) item.classList.add("active");
  });
});

// FAQ category filter
const faqCategories = document.querySelectorAll(".faq-category");
const faqLists = document.querySelectorAll(".faq-list");

faqCategories.forEach((category) => {
  category.addEventListener("click", () => {
    const targetCategory = category.getAttribute("data-category");
    faqCategories.forEach((c) => c.classList.remove("active"));
    category.classList.add("active");

    faqLists.forEach((list) => {
      list.classList.toggle("hidden", list.getAttribute("data-category") !== targetCategory);
    });
  });
});

// Beta / waitlist form (front-end only)
const betaForm = document.getElementById("betaForm");
if (betaForm) {
  betaForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = betaForm.querySelector('input[type="email"]').value.trim();

    if (!email || !email.includes("@")) {
      window.alert("Please enter a valid email address.");
      return;
    }

    window.alert("Thanks — you’re on the list. We’ll email you when early access opens.");
    betaForm.reset();
  });
}

// Simple reveal (subtle)
if ("IntersectionObserver" in window) {
  const revealTargets = document.querySelectorAll(".feature-card, .step, .download-card, .req-card, .feature-section");
  revealTargets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(12px)";
    el.style.transition = "opacity 420ms ease, transform 420ms ease";
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        io.unobserve(el);
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((el) => io.observe(el));
}

// Mark active nav link
const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-menu a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) link.classList.add("active");
});
