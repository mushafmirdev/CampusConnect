// Campus Connect AI Assistant - Shared JavaScript
let chatOpen = false;

function toggleChatbot() {
    if (chatOpen) {
        closeChatbot();
    } else {
        openChatbot();
    }
}

function openChatbot() {
    document.getElementById('chatWindow').classList.add('open');
    document.getElementById('chatOverlay').classList.add('open');
    document.getElementById('chatInput').focus();
    chatOpen = true;
}

function closeChatbot() {
    document.getElementById('chatWindow').classList.remove('open');
    document.getElementById('chatOverlay').classList.remove('open');
    chatOpen = false;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (message) {
        addMessage(message, 'user');
        input.value = '';

        setTimeout(() => {
            const response = getAIResponse(message);
            addMessage(response, 'assistant');
        }, 1000);
    }
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getAIResponse(userMessage) {
    const message = userMessage.toLowerCase();

    if (message.includes('hello') || message.includes('hi')) {
        return "Hello! Welcome to Campus Connect! How can I help you today?";
    } else if (message.includes('about') || message.includes('vision') || message.includes('mission')) {
        return "Campus Connect's vision is to create a global network of empowered student leaders who drive positive change. Our mission is to provide students with tools, resources, and connections for leadership development.";
    } else if (message.includes('program') || message.includes('programs')) {
        return "Our programs include leadership development, networking opportunities, workshops, and exclusive internships. Would you like to know more about any specific program?";
    } else if (message.includes('event') || message.includes('events')) {
        return "We have amazing events coming up! Check out our Events page for Leadership Summit 2025, Tech Innovation Workshop, and Global Networking Mixer. Which event interests you?";
    } else if (message.includes('apply') || message.includes('application')) {
        return "To apply, simply click the 'Apply Now' button on any page or visit: https://docs.google.com/forms/d/1N0vkS7pntMIRdFDMC_gkQzai7879y5ne4k0zbgahCQo/ The process includes registration, interview, selection, and joining our community!";
    } else if (message.includes('ambassador') || message.includes('ambassadors')) {
        return "Our ambassadors are amazing student leaders from universities worldwide. They share their experiences and help new members. Would you like to become an ambassador?";
    } else if (message.includes('workshop') || message.includes('workshops')) {
        return "Our workshops cover various topics including leadership skills, networking, technology, and career development. Check out our Workshops page for upcoming sessions!";
    } else if (message.includes('contact') || message.includes('help')) {
        return "You can contact us at contact@campusconnect.org or visit our Contact page. We're here to help you succeed!";
    } else {
        return "That's a great question! I'd be happy to help you with information about Campus Connect. You can explore our programs, events, or contact us directly. What specific information are you looking for?";
    }
}
