
const msgnerForm = get(".msgner-input");
const msgnerInput = get(".text-space");
const msgnerChat = get(".msgner-chat");
const BOT_IMG = "bot2.png";
const PERSON_IMG = "user.png";
const BOT_NAME = "BOT";
const PERSON_NAME = "Coder";
const prompts = [
    ["hi", "hey", "hello", "Good Morning", "Good Afternoon"],
    ["how are you", "how is life", "how are things"],
    ["what are you doing", "what is going on", "what is up"],
    ["how old are you"],
    ["who are you", "are you human", "are you a bot", "are you a human or a bot"],
    ["who created you", "who made you"],
    [
        "your name please",
        "your name",
        "may i know your name",
        "what is your name",
        "what you call yourself"
    ],
    ["i love you"],
    ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
    ["bad","bored", "tired"],
    ["help me", "tell me a story", "tell a joke"],
    ["ah", "yes", "ok", "okay","nice"],
    ["bye", "good bye", "goodbye", "see you later"],
    ["what should i eat today"],
    ["bro"],
    ["what", "why", "how", "where", "when"],
    ["no", "not sure", "maybe", "no thanks"],
    [" "],
    ["haha", "ha", "lol", "hehe", "funny", "joke"]
];

const replies = [
    ["Hello!", "Hi!", "Hey!", "Hi there!", "Howdy"],
    [
        "Fine...how are you?",
        "Pretty well, how are you?",
        "Fantastic, how are you?"
    ],
    [
        "Nothing much",
        "About to go to sleep",
        "Can you guess?",
        "I don't know actually"
    ],
    ["I am infinte"],
    ["I am just a bot", "I am a bot. What are you?"],
    ["The one true God, JavaScript"], 
    ["I am nameless", "I don't have a name"],
    ["I love you too", "Me too"],
    ["Have you ever felt bad?", "Glad to hear that"],
    ["Why", "Why? Yopu shouldn't!", "Try watching TV"],
    ["What about?", "Once upon a time..."],
    ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
    ["Bye", "Goodbye", "See you later"], ["Sushi", "Pizza"],
    ["Bro!"],
    ["Great Question"],
    ["That's OK", "I understand", "What do you want to talk about"],
    ["Please say something"],
    ["haha!", "Good One"]

];

const alternative = [
    "same", 
    "Go on...",
    "Bro...",
    "Try again",
    "I'm listening",
    "I don't understand ;("
];

const robot = [
    "how do you do, fellow human", "I am not a bot"
];

msgnerForm.addEventListener("submit", e => {
    e.preventDefault();
    const msgText = msgnerInput.value;
    if (!msgText) return;
    msgnerInput.value = "";
    addChat(PERSON_NAME, PERSON_IMG, "right", msgText);
    output(msgText);
});

function output(input) {
    let product;
    let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
    text = text 
    .replace(/a /g, " ")
    .replace(/i feel /g, " ")
    .replace(/whats/g, "what is")
    .replace(/please /g, " ")
    .replace(/ please /g, " ")
    .replace(/r u/g, "are you");

    if (compare(prompts, replies, text)) {
        product = compare(prompts, replies, text);
    } else if (text.match(/thank/gi)) {
        product = "You're welcome!"
    } else if (text.match(/(robot|bot|robo)/gi)) {
        product = robot[Math.floor(Math.random() * robot.length)];
    } else {
        product = alternative[Math.floor(Math.random() * alternative.length)];
    }
    const delay = input.split(" ").length * 100;
    setTimeout(() => {
        addChat(BOT_NAME, BOT_IMG, "left", product);
    }, delay);
};

function compare( promptsArray, repliesArray, string) {
    let reply;
    let replyFound = false;
    for ( let x = 0; x < promptsArray.length; x++) {
        for (let y = 0; y < promptsArray[x].length; y++) {
            if (promptsArray[x][y] === string) {
                let replies = repliesArray[x];
                reply = replies[Math.floor(Math.random() * replies.length)];
                replyFound = true;
                break;
            }
        }
        if (replyFound) {
            break;
        }
    }
    return reply;
}

function addChat(name, img, side, text) {
    const msgHTML = `
    <div class="msg ${side}-msg">
        <div class="icon-img" style="background-image: url(${img})"></div>
        <div class="msg-bubble">
        <div class="msg-info">
            <div class="msg-name">${name}</div>
            <div class="msg-time">${formatDate(new Date())}</div>
        </div>
        <div class="msg-text">${text}</div>
        </div>
        </div>
    `;
    msgnerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgnerChat.scrollTop += 500;
}

function get(selector, root = document) {
    return root.querySelector(selector);
}
function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)+ min);
    
}