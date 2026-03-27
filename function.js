document.addEventListener("DOMContentLoaded", function () {

  const THEME_STORAGE_KEY = "clic-theme";

  function applyTheme(theme) {
    document.body.classList.toggle("dark-theme", theme === "dark");
  }

  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      // ignorado quando o navegador bloqueia armazenamento
    }
  }

  const savedTheme = getSavedTheme();
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
  applyTheme(initialTheme);

  // mantém o efeito infinito do slider inferior
  const track = document.querySelector(".slider-track");
  if (track) {
    track.innerHTML += track.innerHTML;
  }

  // alternância das imagens da lateral
  const slides = document.querySelectorAll(".slider-patrocinador img");
  if (slides.length > 1) {
    let index = 0;
    setInterval(() => {
      slides[index].classList.remove("ativo");
      index = (index + 1) % slides.length;
      slides[index].classList.add("ativo");
    }, 4000);
  }

  // funcionamento do menu hamburguer
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const headerContent = document.querySelector(".header-content");

  if (headerContent) {
    let themeToggle = document.querySelector(".theme-toggle");

    if (!themeToggle) {
      themeToggle = document.createElement("button");
      themeToggle.type = "button";
      themeToggle.className = "theme-toggle";
      if (menuToggle && menuToggle.parentElement === headerContent) {
        headerContent.insertBefore(themeToggle, menuToggle);
      } else {
        headerContent.appendChild(themeToggle);
      }
    }

    function updateThemeButton() {
      const isDarkTheme = document.body.classList.contains("dark-theme");
      themeToggle.textContent = isDarkTheme ? "Light" : "Dark";
      themeToggle.setAttribute("aria-label", isDarkTheme ? "Ativar modo claro" : "Ativar modo escuro");
      themeToggle.setAttribute("aria-pressed", String(isDarkTheme));
    }

    updateThemeButton();

    themeToggle.addEventListener("click", function () {
      const isDarkTheme = document.body.classList.contains("dark-theme");
      const nextTheme = isDarkTheme ? "light" : "dark";
      applyTheme(nextTheme);
      saveTheme(nextTheme);
      updateThemeButton();
    });
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

});
