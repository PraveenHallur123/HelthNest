const chatContainer = document.getElementById("chat");
const inputField = document.getElementById("userInput");

// 🔐 Replace with your actual API key (store securely in production)
const API_KEY = "AIzaSyDhAeCowgJXikjO40LqLNMTiY78fD2fXik";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

async function sendMessage() {
  const userText = inputField.value.trim();
  if (!userText) return;

  appendMessage("user", userText);
  inputField.value = "";

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userText }] }]
      })
    });

    const data = await response.json();
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't understand that.";
    appendMessage("bot", botReply);
  } catch (error) {
    console.error("Error:", error);
    appendMessage("bot", "Something went wrong. Please try again.");
  }
}

function appendMessage(sender, message) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = `${sender === "user" ? "You" : "HealthBot"}: ${message}`;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
