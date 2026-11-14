const WHATSAPP_NUMBER = "905000000000";

const nav = document.querySelector(".nav");
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

const closeMenu = () => {
  burger.classList.remove("open");
  navLinks.classList.remove("open");
  nav.classList.remove("menu-open");
  burger.setAttribute("aria-expanded", "false");
};

burger.addEventListener("click", () => {
  const open = !navLinks.classList.contains("open");
  burger.classList.toggle("open", open);
  navLinks.classList.toggle("open", open);
  nav.classList.toggle("menu-open", open);
  burger.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(`tab-${tab.dataset.tab}`).classList.add("active");
  });
});

document.querySelectorAll(".faq-list details").forEach((d) => {
  d.addEventListener("toggle", () => {
    if (!d.open) return;
    document.querySelectorAll(".faq-list details").forEach((o) => { if (o !== d) o.open = false; });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el, i) => {
  if (el.classList.contains("step")) el.style.transitionDelay = `${(i % 4) * 0.12}s`;
  observer.observe(el);
});

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const text = [
    "Merhaba, randevu talebi oluşturmak istiyorum.",
    `Ad Soyad: ${data.get("name")}`,
    `Telefon: ${data.get("phone")}`,
    `Danışan: ${data.get("type")}`,
    data.get("message") ? `Mesaj: ${data.get("message")}` : "",
  ].filter(Boolean).join("\n");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
});

document.getElementById("year").textContent = new Date().getFullYear();
