// simple-navigation.js
document.addEventListener("DOMContentLoaded", function () {
  // Function to handle the actual scrolling
  function scrollToSection(hash) {
    if (!hash) return;
    const sectionId = hash.substring(1);
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Handle clicks on navigation links
  document.addEventListener("click", function (e) {
    const link = e.target.closest("a");

    if (link) {
      const href = link.getAttribute("href");

      // Only handle hash links when we're on the main index.html page
      if (href && href.startsWith("#")) {
        const currentPage = window.location.pathname;
        const isOnMainPage =
          currentPage.endsWith("index.html") ||
          currentPage === "/" ||
          currentPage === "";

        if (isOnMainPage) {
          e.preventDefault();
          const newUrl = window.location.pathname + href;
          history.pushState(null, null, newUrl);
          scrollToSection(href);
        }
        // If we're not on the main page, let the browser handle navigation normally
      }
    }
  });

  // Handle page load with hash
  if (window.location.hash) {
    const currentPage = window.location.pathname;
    const isOnMainPage =
      currentPage.endsWith("index.html") ||
      currentPage === "/" ||
      currentPage === "";

    if (isOnMainPage) {
      setTimeout(() => {
        scrollToSection(window.location.hash);
      }, 100);
    }
  }
});
