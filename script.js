// Get DOM elements
const btn = document.getElementById('btn');
const content = document.getElementById('content');
const name = document.getElementById('name');
const va = document.getElementById('va');
const voicesGif = document.getElementById('voices');

// Initialize Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;

// Initialize Speech Synthesis
function speak(text) {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
}

// Show/hide the voice gif
function showListening(isListening) {
    voicesGif.style.display = isListening ? "inline" : "none";
}

// Handle button click
btn.onclick = () => {
    content.textContent = "Listening...";
    showListening(true);
    recognition.start();
};

// On recognition result
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    content.textContent = `You said: "${transcript}"`;
    showListening(false);
    respond(transcript);
};

// On recognition end (if nothing is said)
recognition.onend = () => {
    showListening(false);
};

// Respond to user
function respond(message) {
    let response = "Sorry, I didn't understand that. Can you repeat?";
    if (message.includes("hello") || message.includes("hi")) {
        response = "Hello! How can I help you today?";
    } else if (message.includes("your name")) {
        response = "I am Aizen, your virtual assistant.";
    } else if (message.includes("time")) {
        const now = new Date();
        response = `The current time is ${now.toLocaleTimeString()}`;
    } else if (message.includes("date")) {
        const now = new Date();
        response = `Today's date is ${now.toLocaleDateString()}`;
    } else if (message.includes("how are you")) {
        response = "I am always ready to assist you!";
    } else if (message.includes("open google")) {
        response = "Opening Google.";
        window.open("https://www.google.com", "_blank");
    } else if (message.includes("thank you")) {
        response = "You're welcome!";
    }
    speak(response);
    content.textContent = response;
}
