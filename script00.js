document.addEventListener("DOMContentLoaded", function () {
  console.log("=== COMPREHENSIVE MENU DEBUG ===");

  // Load navigation from separate file
  fetch("navigation.html")
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response.text();
    })
    .then((html) => {
      // Insert navigation at the top of the body
      document.body.insertAdjacentHTML("afterbegin", html);
      console.log("✅ Navigation loaded");
      initializeMenu();
      initializeScrollReveal();
      initializeSwiper();
      initializeCart(); // ADDED: Initialize cart after navigation
    })
    .catch((error) => {
      console.error("❌ Failed to load navigation:", error);
      // Even if navigation fails, try to initialize cart
      initializeCart();
    });

  function initializeMenu() {
    console.log("=== INITIALIZING MENU ===");

    // Check if elements exist
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");

    console.log("1. Elements found:", { menuBtn, navLinks });

    if (!menuBtn || !navLinks) {
      console.error("❌ Missing elements - stopping");
      return;
    }

    // Check CSS classes and styles
    console.log(
      "2. Initial classes - menuBtn:",
      menuBtn.className,
      "navLinks:",
      navLinks.className
    );

    const navLinksStyle = window.getComputedStyle(navLinks);
    console.log("3. Nav links CSS:", {
      position: navLinksStyle.position,
      left: navLinksStyle.left,
      display: navLinksStyle.display,
      width: navLinksStyle.width,
      height: navLinksStyle.height,
    });

    // Check if menu button is clickable
    console.log("4. Menu button styles:", {
      display: window.getComputedStyle(menuBtn).display,
      cursor: window.getComputedStyle(menuBtn).cursor,
      pointerEvents: window.getComputedStyle(menuBtn).pointerEvents,
    });

    const menuBtnIcon = menuBtn.querySelector("i");
    console.log("5. Menu icon:", menuBtnIcon, "Class:", menuBtnIcon?.className);

    // Test event listener
    menuBtn.addEventListener("click", function testClick(e) {
      console.log("🎯 CLICK EVENT FIRED!");
      console.log("Event target:", e.target);
      console.log("Before toggle - navLinks classes:", navLinks.className);

      e.stopPropagation();
      navLinks.classList.toggle("open");

      console.log("After toggle - navLinks classes:", navLinks.className);
      console.log("Has 'open' class:", navLinks.classList.contains("open"));

      // Check CSS after toggle
      const newStyle = window.getComputedStyle(navLinks);
      console.log("CSS after click - left:", newStyle.left);

      // Change icon
      const isOpen = navLinks.classList.contains("open");
      menuBtnIcon.className = isOpen ? "ri-close-line" : "ri-menu-line";
      console.log("Icon changed to:", menuBtnIcon.className);
    });

    console.log("6. ✅ Event listener attached - CLICK THE MENU BUTTON NOW");

    // Also test if CSS is loaded
    const styleSheets = Array.from(document.styleSheets);
    console.log(
      "7. Loaded stylesheets:",
      styleSheets.map((s) => s.href)
    );

    // Rest of your menu functionality
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
        menuBtnIcon.className = "ri-menu-line";
      }
    });

    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        navLinks.classList.remove("open");
        menuBtnIcon.className = "ri-menu-line";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("open")) {
        console.log("⌨️ ESCAPE KEY - Closing menu");
        navLinks.classList.remove("open");
        menuBtnIcon.className = "ri-menu-line";
        document.body.style.overflow = "";
      }
    });
  }

  function initializeScrollReveal() {
    console.log("=== INITIALIZING SCROLL REVEAL ===");
    const scrollRevealOption = {
      distance: "50px",
      origin: "bottom",
      duration: 1000,
    };

    const headerTitle = document.querySelector(".header__container h1");
    const headerDesc = document.querySelector(
      ".header__container .section__description"
    );
    const headerLink = document.querySelector(".header__link");
    const shopCards = document.querySelectorAll(".shop__card");
    const aboutHeader = document.querySelector(
      ".about__content .section__header"
    );
    const aboutDesc = document.querySelectorAll(
      ".about__content .section__description"
    );
    const aboutStats = document.querySelector(".about__stats");
    const bannerText = document.querySelector(".banner__container p");

    if (headerTitle) {
      ScrollReveal().reveal(".header__container h1", {
        ...scrollRevealOption,
      });
    }

    if (headerDesc) {
      ScrollReveal().reveal(".header__container .section__description", {
        ...scrollRevealOption,
        delay: 500,
      });
    }

    if (headerLink) {
      ScrollReveal().reveal(".header__link", {
        ...scrollRevealOption,
        delay: 500,
      });
    }

    if (shopCards.length > 0) {
      ScrollReveal().reveal(".shop__card", {
        ...scrollRevealOption,
        interval: 500,
      });
    }

    if (aboutHeader) {
      ScrollReveal().reveal(".about__content .section__header", {
        ...scrollRevealOption,
      });
    }

    if (aboutDesc.length > 0) {
      ScrollReveal().reveal(".about__content .section__description", {
        ...scrollRevealOption,
        delay: 500,
        interval: 500,
      });
    }

    if (aboutStats) {
      ScrollReveal().reveal(".about__stats", {
        ...scrollRevealOption,
        delay: 1500,
      });
    }

    if (bannerText) {
      ScrollReveal().reveal(".banner__container p", {
        duration: 1000,
        interval: 500,
      });
    }
  }

  function initializeSwiper() {
    console.log("=== INITIALIZING SWIPER ===");
    const swiperElement = document.querySelector(".swiper");
    if (swiperElement) {
      const swiper = new Swiper(".swiper", {
        loop: true,
        slidesPerView: "auto",
        spaceBetween: 20,
      });
      console.log("✅ Swiper initialized");
    } else {
      console.log("ℹ️ No Swiper element found");
    }
  }

  // ADDED: Cart initialization function
  function initializeCart() {
    console.log("=== INITIALIZING CART ===");

    // Load products first, then cart
    import("/SPEEDMOTO/loadProducts.js")
      .then((module) => {
        console.log("✅ Products module loaded");
        return module.default();
      })
      .then(() => {
        console.log("✅ Products loaded, now loading cart");
        return import("/SPEEDMOTO/cart.js");
      })
      .then((module) => {
        console.log("✅ Cart module loaded");
        module.default();
        console.log("✅ Cart initialized successfully");
      })
      .catch((error) => {
        console.error("❌ Error initializing cart:", error);
      });
  }
});

