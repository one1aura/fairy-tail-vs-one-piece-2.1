```javascript

// ⚠️ IMPORTANT: Replace this with your actual Groq API key

const API_KEY = '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';

const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const chatBox = document.getElementById('chat-box');

const userInput = document.getElementById('user-input');

const sendBtn = document.getElementById('send-btn');

const clearBtn = document.getElementById('clear-btn');

const statusEl = document.getElementById('status');

// Store conversation history

let messages = [

{

role: 'system',

content: 'You are a helpful, friendly AI assistant. Keep responses concise and engaging.'

}

];

// Add message to chat display

function addMessage(content, sender) {

const messageDiv = document.createElement('div');

messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');

messageDiv.textContent = content;

chatBox.appendChild(messageDiv);

chatBox.scrollTop = chatBox.scrollHeight;

}

// Call Groq API

async function getAIResponse(userMessage) {

statusEl.textContent = 'Thinking... 🤔';

sendBtn.disabled = true;

// Add user message to history

messages.push({ role: 'user', content: userMessage });

try {

const response = await fetch(API_URL, {

method: 'POST',

headers: {

'Content-Type': 'application/json',

'Authorization': `Bearer ${API_KEY}`

},

body: JSON.stringify({

model: 'mixtral-8x7b-32768', // or 'llama3-70b-8192'

messages: messages,

temperature: 0.7,

max_tokens: 1024

})

});

if (!response.ok) {

throw new Error(`HTTP error! status: ${response.status}`);

}

const data = await response.json();

const aiResponse = data.choices[0].message.content;

// Add AI response to history

messages.push({ role: 'assistant', content: aiResponse });

return aiResponse;

} catch (error) {

console.error('API Error:', error);

return `⚠️ Error: ${error.message}. Check your API key and try again.`;

} finally {

statusEl.textContent = 'Ready';

sendBtn.disabled = false;

}

}

// Handle sending message

async function handleSend() {

const message = userInput.value.trim();

if (!message) return;

addMessage(message, 'user');

userInput.value = '';

const aiResponse = await getAIResponse(message);

addMessage(aiResponse, 'ai');

}

// Event listeners

sendBtn.addEventListener('click', handleSend);

userInput.addEventListener('keypress', (e) => {

if (e.key === 'Enter' && !e.shiftKey) {

e.preventDefault();

handleSend();

}

});

// Clear chat

clearBtn.addEventListener('click', () => {

chatBox.innerHTML = '';

messages = [

{

role: 'system',

content: 'You are a helpful, friendly AI assistant. Keep responses concise and engaging.'

}

];

statusEl.textContent = 'Chat cleared';

});

// Initial greeting

addMessage('Hello! I\'m your AI assistant powered by Groq. How can I help you today? 🚀', 'ai');

```

---
