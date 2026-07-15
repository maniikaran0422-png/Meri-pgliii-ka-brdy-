// --- Screen Control & Audio Engine ---
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    // Auto-scrolls card panel views to the top if they overflow mobile layouts
    document.getElementById(screenId).scrollTop = 0;
}

// 1. Initial Site Entry Timer (Loading Screen)
window.addEventListener('load', () => {
    setTimeout(() => {
        showScreen('welcome-screen');
    }, 2500);
});

// Primary Site Flow Handlers
document.getElementById('start-btn').addEventListener('click', () => {
    showScreen('proposal-screen');
    // Starts audio playback immediately upon user interaction context trigger
    const music = document.getElementById('bg-music');
    if(music) music.play().catch(() => console.log("Audio waiting for explicit click gesture."));
});

document.getElementById('yes-btn').addEventListener('click', () => showScreen('celebration-screen'));

document.getElementById('final-trigger-btn').addEventListener('click', () => {
    showScreen('final-screen');
    triggerHeartRain();
});

document.getElementById('end-btn').addEventListener('click', () => showScreen('thank-you-screen'));

// --- Celestial Matrix Generator (Stars) ---
const starsContainer = document.getElementById('stars-container');
const shootingStarsContainer = document.getElementById('shooting-stars-container');

for (let i = 0; i < 80; i++) {
    let star = document.createElement('div');
    star.className = 'star';
    star.style.width = star.style.height = `${Math.random() * 3}px`;
    star.style.top = `${Math.random() * 80}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    starsContainer.appendChild(star);
}

for (let i = 0; i < 3; i++) {
    let sStar = document.createElement('div');
    sStar.className = 'shooting-star';
    sStar.style.top = `${Math.random() * 40}%`;
    sStar.style.left = `${Math.random() * 60}%`;
    sStar.style.animationDelay = `${i * 4.5}s`;
    shootingStarsContainer.appendChild(sStar);
}

// --- Dynamic Environmental Particle Engine ---
const animLayer = document.getElementById('animation-layer');

function spawnParticle(emoji, duration = 4, customClass = '') {
    const el = document.createElement('div');
    el.className = `falling-element ${customClass}`;
    el.innerText = emoji;
    el.style.left = `${Math.random() * 100}vw`;
    el.style.fontSize = `${Math.random() * 20 + 16}px`;
    el.style.animationDuration = `${Math.random() * 2 + duration}s`;
    el.style.opacity = Math.random() * 0.6 + 0.4;
    animLayer.appendChild(el);
    setTimeout(() => el.remove(), (duration + 2) * 1000);
}

// Global natural fall generation loops
setInterval(() => spawnParticle('🌹', 5), 900);
setInterval(() => spawnParticle('❤️', 6), 1400);

// --- Trick 'NO' Button Interface Mechanism ---
const noBtn = document.getElementById('no-btn');
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', moveNoButton);

function moveNoButton() {
    const card = noBtn.parentElement.parentElement;
    const rect = card.getBoundingClientRect();
    
    const maxX = rect.width - noBtn.offsetWidth - 20;
    const maxY = rect.height - noBtn.offsetHeight - 40;
    
    const randomX = Math.floor(Math.random() * maxX) - (maxX / 2);
    const randomY = Math.floor(Math.random() * maxY) - (maxY / 2);
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX + (rect.width/2) - (noBtn.offsetWidth/2)}px`;
    noBtn.style.top = `${randomY + (rect.height/2) - 20}px`;
}

// --- Birthday Box & Candle Smoke Logic ---
document.getElementById('gift-box').addEventListener('click', function() {
    this.classList.add('hidden');
    document.getElementById('cake-container').classList.remove('hidden');
});

document.getElementById('wish-btn').addEventListener('click', function() {
    const flame = document.querySelector('.flame');
    if (flame) {
        flame.remove(); 
        const smoke = document.createElement('span');
        smoke.className = 'smoke';
        smoke.innerText = '💨';
        document.getElementById('candle').appendChild(smoke);
        
        this.innerText = "Wish Sent to Stars! 🌌";
        this.disabled = true;
        
        triggerFireworks();
        setTimeout(() => showScreen('main-dashboard'), 2800);
    }
});

// --- 100 Reasons Array Database & Loop Logic ---
const reasons = [
    "You have the most beautiful smile. ✨",
    "You make my worst days feel infinitely better. 💖",
    "Your kindness towards everyone inspires me every day. 🌸",
    "The way you look at me makes my heart race. 💓",
    "You are my absolute best friend and biggest supporter. 👑",
    // Feel free to expand this array list right here up to 100!
];
let currentReasonIndex = 0;
const reasonCard = document.getElementById('reason-card');
const reasonText = document.getElementById('reason-text');

reasonCard.addEventListener('click', () => {
    reasonCard.classList.toggle('flipped');
});

document.getElementById('next-reason-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    reasonCard.classList.remove('flipped');
    setTimeout(() => {
        currentReasonIndex = (currentReasonIndex + 1) % reasons.length;
        document.querySelector('.card-front').innerText = `Click to see Reason #${currentReasonIndex + 1}`;
        reasonText.innerText = reasons[currentReasonIndex];
    }, 300);
});

// --- Asynchronous Love Calculation Meter ---
document.getElementById('test-love-btn').addEventListener('click', function() {
    const fill = document.getElementById('meter-fill');
    const status = document.getElementById('meter-status');
    fill.style.width = '100%';
    this.disabled = true;
    
    let count = 0;
    let counter = setInterval(() => {
        count += 2;
        if(count <= 100) {
            status.innerText = `${count}%`;
        } else {
            clearInterval(counter);
            status.innerHTML = "✨ <strong>INFINITY %</strong> ✨";
        }
    }, 35);
});

// --- Memory Storage Random Text Core ---
const memoryNotes = [
    "Remember when we talked late until 4 AM? 🌙",
    "Every day spent laughing with you is my new favorite memory. 🧸",
    "I still remember the butterflies I got the first time we connected. 🦋",
    "You are my safe haven in a messy world. 🏡"
];
document.getElementById('memory-jar').addEventListener('click', () => {
    const popup = document.getElementById('jar-message');
    const randomNote = memoryNotes[Math.floor(Math.random() * memoryNotes.length)];
    popup.innerText = `✨ "${randomNote}"`;
});

// --- Luminous Interaction System (Wish Tree) ---
document.getElementById('wish-tree').addEventListener('click', function() {
    this.style.transform = 'scale(1.2)';
    setTimeout(() => this.style.transform = 'scale(1)', 300);
    for(let i=0; i<15; i++) {
        setTimeout(() => spawnParticle('✨', 3), i * 80);
    }
});

// --- Grand Final Celebration Handlers ---
function triggerFireworks() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => spawnParticle('🎆', 2), i * 80);
    }
}

function triggerHeartRain() {
    let rainCount = 0;
    let rainInterval = setInterval(() => {
        spawnParticle('💞', 3);
        spawnParticle('❤️', 3);
        rainCount++;
        if (rainCount > 60) clearInterval(rainInterval);
    }, 80);
}
