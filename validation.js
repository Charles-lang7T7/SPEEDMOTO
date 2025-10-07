document.addEventListener("DOMContentLoaded", () => {
  console.log("validation.js loaded");

  const form = document.getElementById("form");
  const firstname_input = document.getElementById("firstname-input");
  const email_input = document.getElementById("email-input");
  const password_input = document.getElementById("password-input");
  const repeat_password_input = document.getElementById(
    "repeat-password-input"
  );
  const error_message = document.getElementById("error-message");

  // --- Sign up validation ---
  function getSignupFormErrors(firstname, email, password, repeatPassword) {
    let errors = [];

    if (!firstname) {
      errors.push("Firstname is required");
      firstname_input?.parentElement?.classList.add("incorrect");
    }
    if (!email) {
      errors.push("Email is required");
      email_input?.parentElement?.classList.add("incorrect");
    }
    if (!password) {
      errors.push("Password is required");
      password_input?.parentElement?.classList.add("incorrect");
    }
    if (password && password.length < 8) {
      errors.push("Password must have at least 8 characters");
      password_input?.parentElement?.classList.add("incorrect");
    }
    if (password !== repeatPassword) {
      errors.push("Password does not match repeated password");
      password_input?.parentElement?.classList.add("incorrect");
      repeat_password_input?.parentElement?.classList.add("incorrect");
    }

    return errors;
  }

  // --- Log in validation ---
  function getLoginFormErrors(email, password) {
    let errors = [];
    if (!email) {
      errors.push("Email is required");
      email_input?.parentElement?.classList.add("incorrect");
    }
    if (!password) {
      errors.push("Password is required");
      password_input?.parentElement?.classList.add("incorrect");
    }
    return errors;
  }

  // --- Remove error when typing ---
  const allInputs = [
    firstname_input,
    email_input,
    password_input,
    repeat_password_input,
  ].filter(Boolean);
  allInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.parentElement?.classList.contains("incorrect")) {
        input.parentElement.classList.remove("incorrect");
        if (error_message) error_message.innerText = "";
      }
    });
  });

  // --- Form submit ---
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let errors = [];

      if (firstname_input) {
        errors = getSignupFormErrors(
          firstname_input.value,
          email_input.value,
          password_input.value,
          repeat_password_input.value
        );
      } else {
        errors = getLoginFormErrors(email_input.value, password_input.value);
      }

      // NEW REDIRECT LOGIC:
      if (errors.length > 0) {
        if (error_message) error_message.innerText = errors.join(". ");
      } else {
        localStorage.setItem("isLoggedIn", "true");
        console.log("User logged in — isLoggedIn set to true");

        const redirectTo =
          localStorage.getItem("redirectAfterLogin") || "index.html";
        localStorage.removeItem("redirectAfterLogin");
        window.location.href = redirectTo;
      }
    });
  } else {
    console.warn("validation.js: form not found on this page.");
  }
});
