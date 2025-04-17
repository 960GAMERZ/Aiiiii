const apiKey = "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";

async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userText = input.value;
  if (!userText.trim()) return;

  chatBox.innerHTML += `<div><b>You:</b> ${userText}</div>`;
  input.value = "";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userText }]
    })
  });

  const data = await response.json();
  const botReply = data.choices[0].message.content;
  chatBox.innerHTML += `<div><b>Bot:</b> ${botReply}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

function startVoice() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById("user-input").value = transcript;
  };
}