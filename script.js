// --- Screen Manager ---
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    document.getElementById(screenId).scrollTop = 0;
}

// 1. Loader screen timer
window.addEventListener('load', () => {
    setTimeout(() => {
        showScreen('welcome-screen');
    }, 2500);
});

// UI Navigation Matrix Hooks
document.getElementById('start-btn').addEventListener('click', () => {
    showScreen('balloon-screen');
    const music = document.getElementById('bg-music');
    if(music) {
        music.play().then(() => {
            updateMusicButtonIcon(true);
        }).catch(() => console.log("Audio waiting for user tap."));
    }
});

document.getElementById('balloon-next-btn').addEventListener('click', () => showScreen('proposal-screen'));
document.getElementById('yes-btn').addEventListener('click', () => showScreen('celebration-screen'));

document.getElementById('final-trigger-btn').addEventListener('click', () => {
    showScreen('final-screen');
    triggerHeartRain();
});

document.getElementById('end-btn').addEventListener('click', () => showScreen('thank-you-screen'));

document.getElementById('restart-btn').addEventListener('click', () => {
    // Resets dynamic state properties for clean loops
    document.querySelectorAll('.balloon').forEach(b => { 
        b.classList.remove('popped'); 
        b.style.opacity = '1'; 
        b.style.transform = 'scale(1)'; 
    });
    document.getElementById('balloon-text-display').innerText = '...';
    document.getElementById('balloon-next-btn').classList.add('hidden');
    document.getElementById('cake-container').classList.add('hidden');
    document.getElementById('gift-box-stage').classList.remove('hidden');
    document.getElementById('gift-box').classList.remove('hidden');
    document.getElementById('meter-fill').style.width = '0%';
    document.getElementById('meter-status').innerText = '0%';
    document.getElementById('test-love-btn').disabled = false;
    document.getElementById('jar-message').innerText = '';
    poppedCount = 0; // Reset counter accurately
    
    const candle = document.getElementById('candle');
    if (!candle.querySelector('.flame')) {
        const flame = document.createElement('span');
        flame.className = 'flame';
        flame.innerText = '🔥';
        candle.appendChild(flame);
    }
    const smoke = candle.querySelector('.smoke');
    if (smoke) smoke.remove();
    document.getElementById('wish-btn').innerText = "Blow Candle 🕯️💨";
    document.getElementById('wish-btn').disabled = false;

    showScreen('welcome-screen');
});

// --- Stars Generator Matrix ---
const starsContainer = document.getElementById('stars-container');
const shootingStarsContainer = document.getElementById('shooting-stars-container');

for (let i = 0; i < 70; i++) {
    let star = document.createElement('div');
    star.className = 'star';
    star.style.width = star.style.height = `${Math.random() * 3}px`;
    star.style.top = `${Math.random() * 75}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    starsContainer.appendChild(star);
}

for (let i = 0; i < 3; i++) {
    let sStar = document.createElement('div');
    sStar.className = 'shooting-star';
    sStar.style.top = `${Math.random() * 35}%`;
    sStar.style.left = `${Math.random() * 60}%`;
    sStar.style.animationDelay = `${i * 4}s`;
    shootingStarsContainer.appendChild(sStar);
}

// --- Dynamic Canvas Particle Engine ---
const animLayer = document.getElementById('animation-layer');

function spawnParticle(emoji, duration = 4, customClass = '') {
    const el = document.createElement('div');
    el.className = `falling-element ${customClass}`;
    el.innerText = emoji;
    el.style.left = `${Math.random() * 100}vw`;
    el.style.fontSize = `${Math.random() * 22 + 16}px`;
    el.style.animationDuration = `${Math.random() * 2 + duration}s`;
    el.style.opacity = Math.random() * 0.6 + 0.4;
    animLayer.appendChild(el);
    setTimeout(() => el.remove(), (duration + 2) * 1000);
}

setInterval(() => spawnParticle('🌹', 5), 1000);
setInterval(() => spawnParticle('❤️', 6), 1500);

// --- 🎈 Balloon Surprise Pop Core Logic ---
let poppedCount = 0;
function popBalloon(id, text) {
    const b = document.getElementById(id);
    if (!b.classList.contains('popped')) {
        b.classList.add('popped');
        document.getElementById('balloon-text-display').innerText = text;
        
        // Spawn mini heart splash explosion bursts on impact coordinates
        for(let i=0; i<6; i++) { spawnParticle('❤️', 2); }
        
        poppedCount++;
        if (poppedCount >= 4) {
            document.getElementById('balloon-next-btn').classList.remove('hidden');
        }
    }
}

// --- 😂 Trick Running NO Button Mechanics ---
const noBtn = document.getElementById('no-btn');
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', moveNoButton);

function moveNoButton() {
    const card = noBtn.parentElement.parentElement;
    const rect = card.getBoundingClientRect();
    
    // Confines calculations within active glass card grid box safely
    const maxX = rect.width - noBtn.offsetWidth - 30;
    const maxY = rect.height - noBtn.offsetHeight - 50;
    
    const randomX = Math.floor(Math.random() * maxX) - (maxX / 2);
    const randomY = Math.floor(Math.random() * maxY) - (maxY / 2) + 40;
    
    noBtn.style.left = `${randomX + (rect.width/2) - (noBtn.offsetWidth/2)}px`;
    noBtn.style.top = `${randomY + (rect.height/2) - 20}px`;
}

// --- 🎁 Box Opening & 🎂 Candle Smoke Routine ---
document.getElementById('gift-box').addEventListener('click', function() {
    document.getElementById('gift-box-stage').classList.add('hidden');
    document.getElementById('cake-container').classList.remove('hidden');
    triggerConfetti();
});

document.getElementById('wish-btn').addEventListener('click', function() {
    const flame = document.querySelector('.flame');
    if (flame) {
        flame.remove(); 
        const smoke = document.createElement('span');
        smoke.className = 'smoke';
        smoke.innerText = '💨';
        document.getElementById('candle').appendChild(smoke);
        
        this.innerText = "Wish Shared with Stars! 🌠";
        this.disabled = true;
        
        triggerFireworks();
        setTimeout(() => showScreen('main-dashboard'), 2800);
    }
});

// --- 💖 100 Reasons Data Loop Array ---
const reasons = [
    "You have the most beautiful smile. ✨",
    "You make my worst days feel infinitely better. 💖",
    "Your kindness towards everyone inspires me every day. 🌸",
    "The way you look at me makes my heart race. 💓",
    "You are my absolute best friend and biggest supporter. 👑",
    "Your laugh is my absolute favorite sound in the world. 🎵",
    "The way you care for the little things is incredibly beautiful. 🥺",
    "You understand me like nobody else ever could. 🏡"
];
let currentReasonIndex = 0;
const reasonCard = document.getElementById('reason-card');
const reasonText = document.getElementById('reason-text');

reasonCard.addEventListener('click', () => { reasonCard.classList.toggle('flipped'); });

document.getElementById('next-reason-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    reasonCard.classList.remove('flipped');
    setTimeout(() => {
        currentReasonIndex = (currentReasonIndex + 1) % reasons.length;
        document.querySelector('.card-front').innerText = `Click to see Reason #${currentReasonIndex + 1}`;
        reasonText.innerText = reasons[currentReasonIndex];
    }, 300);
});

// --- ❤️ Love Meter Calculation Loop ---
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
            status.innerHTML = "✨ <strong>INFINITY ❤️</strong> ✨";
            triggerFireworks();
        }
    }, 30);
});

// --- 🫙 Memory Jar Storage Engine ---
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

// --- 🌳 Wish Tree Spark Event Handler ---
document.getElementById('wish-tree').addEventListener('click', function() {
    this.style.transform = 'scale(1.2)';
    setTimeout(() => this.style.transform = 'scale(1)', 300);
    for(let i=0; i<15; i++) {
        setTimeout(() => spawnParticle('✨', 3), i * 70);
    }
});

// --- 🎵 Floating Music Toggle Controller Logic ---
const musicToggleBtn = document.getElementById('music-toggle');
if(musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
        const music = document.getElementById('bg-music');
        if(music) {
            if(music.paused) {
                music.play();
                updateMusicButtonIcon(true);
            } else {
                music.pause();
                updateMusicButtonIcon(false);
            }
        }
    });
}

function updateMusicButtonIcon(isPlaying) {
    const musicToggleBtn = document.getElementById('music-toggle');
    if(musicToggleBtn) {
        musicToggleBtn.innerText = isPlaying ? "🎵" : "🔇";
    }
}

// --- FX Celebration Triggers ---
function triggerFireworks() {
    for (let i = 0; i < 25; i++) {
        setTimeout(() => spawnParticle('🎆', 2), i * 90);
    }
}

function triggerConfetti() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => spawnParticle('🎉', 2), i * 50);
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
