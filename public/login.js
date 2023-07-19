const form = document.getElementById("login-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    // Login successful, save token and redirect to chat page
    const data = await response.json();
    localStorage.setItem("token", data.token);
    window.location.href = "/chat.html";
  } else {
    // Login failed, show error message
    const data = await response.json();
    alert(data.msg);
  }
});
