"use strict";

const $themeBtn = document.querySelector("[data-theme-btn]");
const $HTML = document.documentElement;

const setTheme = (theme) => {
  $HTML.dataset.theme = theme;
  sessionStorage.setItem("theme", theme);
};

const savedTheme = sessionStorage.getItem("theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

setTheme(savedTheme || preferredTheme);

if ($themeBtn) {
  $themeBtn.addEventListener("click", () => {
    const nextTheme = $HTML.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });
}

const $tabBtn = document.querySelectorAll("[data-tab-btn]");
let [lastActiveTab] = document.querySelectorAll("[data-tab-content]");
let [lastActiveTabBtn] = $tabBtn;

$tabBtn.forEach((item) => {
  item.addEventListener("click", function () {
    if (!lastActiveTab || !lastActiveTabBtn) return;

    lastActiveTab.classList.remove("active");
    lastActiveTabBtn.classList.remove("active");

    const $tabContent = document.querySelector(`[data-tab-content="${item.dataset.tabBtn}"]`);
    if (!$tabContent) return;

    $tabContent.classList.add("active");
    this.classList.add("active");

    lastActiveTab = $tabContent;
    lastActiveTabBtn = this;
  });
});

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));
