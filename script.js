console.log("Script loaded 🔥");

const loginBtn = document.getElementById("loginBtn");
const userInput = document.getElementById("user");
const passInput = document.getElementById("pass");

const BACKEND_URL = "https://insta-clone-made4practice.onrender.com";

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = userInput.value.trim();
  const password = passInput.value.trim();

  if (!email || !password) {
    alert("Fill both fields first 😤");
    return;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    // 🔥 catch HTTP errors properly
    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    console.log("Backend response:", data);

    if (data && data.redirect) {
      window.location.href = data.redirect;
    } else {
      alert("Invalid response from server 💀");
    }

  } catch (err) {
    console.error("Login failed:", err);
    alert("Server error bro 💀");
  }
});

// button debug logs
const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    console.log(btn.innerText + " clicked!");
  });
});