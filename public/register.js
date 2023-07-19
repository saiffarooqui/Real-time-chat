const form = document.getElementById("register-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, username, password }),
  });

  if (response.ok) {
    // Registration successful, redirect to login page
    window.location.href = "/login.html";
  } else {
    // Registration failed, show error message
    const data = await response.json();
    alert(data.msg);
  }
});
