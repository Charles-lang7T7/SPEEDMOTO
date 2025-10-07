document.addEventListener("DOMContentLoaded", () => {
  console.log("details.js loaded");

  // --- Ensure login state has a default ---
  if (localStorage.getItem("isLoggedIn") === null) {
    localStorage.setItem("isLoggedIn", "false");
  }

  // --- Tab functionality ---
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.target;

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");
      const targetEl = document.getElementById(target);
      if (targetEl) targetEl.classList.add("active");
    });
  });

  // --- Contact button ---
  const contactBtn = document.getElementById("contactBtn");
  if (!contactBtn) {
    console.warn("details.js: #contactBtn not found on this page.");
    return;
  }

  contactBtn.addEventListener("click", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    console.log("Contact clicked — isLoggedIn =", isLoggedIn);

    if (isLoggedIn) {
      // User is logged in - show success message
      alert("A dealer will contact you shortly!");
    } else {
      // User is NOT logged in - show message and redirect to signup
      alert('Please "Sign-up" or "Log-in" first');

      // Store the current page so we can return after login
      localStorage.setItem("redirectAfterLogin", window.location.href);

      // Redirect to signup page after a short delay
      setTimeout(() => {
        window.location.href = "Sign-up.html";
      }, 10);
    }
  });
});
