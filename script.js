// ===== DOM ELEMENTS =====
const stages = {
    envelope: document.getElementById('envelopeStage'),
    letter: document.getElementById('letterStage'),
    card: document.getElementById('cardStage'),
    celebration: document.getElementById('celebrationStage'),
    memories: document.getElementById('memoriesStage')
};

const envelope = document.getElementById('envelope');
const continueToCard = document.getElementById('continueToCard');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const cardSubtitle = document.getElementById('cardSubtitle');
const showSurprises = document.getElementById('showSurprises');
const restartBtn = document.getElementById('restartBtn');
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
const heartsBg = document.getElementById('heartsBg');
const confettiContainer = document.getElementById('confettiContainer');

// ===== STATE =====
let noClickCount = 0;
let yesBtnScale = 1;
let noBtnScale = 1;
let isMusicPlaying = false;

// ===== NO BUTTON MESSAGES =====
const noMessages = [
    "Are you sure? 🥺",
    "Please reconsider... 💔",
    "Think again! 🙏",
    "Pretty please? 🥹",
    "I'll be sad... 😢",
    "Don't do this to me! 💕",
    "One more chance? 🌹",
    "My heart can't take it! 💗",
    "Really really sure? 😭",
    "Last chance... 💝",
    "Okay fine... just kidding, SAY YES! 😤",
    "I'm not giving up! 💪",
    "You know you want to! 😏",
    "Come onnn! 🥺💕",
    "Please please please! 🙏✨"
];

// ===== YES BUTTON MESSAGES =====
const yesMessages = [
    "Yes! 💕",
    "YES! 💖",
    "YESSS! 💗",
    "YES PLEASE! 💝",
    "ABSOLUTELY YES! 💘",
    "YES YES YES! 🥰",
    "YAAAS! 💕✨"
];

// ===== FLOATING HEARTS =====
let heartsInterval = null;

function createFloatingHearts() {
    const hearts = ['💕', '💗', '💖', '💓', '❤️', '💘', '💝'];

    // Don't create hearts on envelope stage (keep it clean)
    if (document.getElementById('envelopeStage').classList.contains('active')) {
        return;
    }

    heartsInterval = setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heartsBg.appendChild(heart);

        setTimeout(() => heart.remove(), 7000);
    }, 500);
}

function stopFloatingHearts() {
    if (heartsInterval) {
        clearInterval(heartsInterval);
        heartsInterval = null;
    }
}

// ===== SPARKLES (disabled for clean design) =====
function createSparkles() {
    // Disabled for elegant envelope design
    return;
    const sparklesContainer = document.getElementById('sparkles');
    if (!sparklesContainer) return;
    const sparkleEmojis = ['✨', '💫', '⭐', '🌟'];

    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparklesContainer.appendChild(sparkle);
    }
}

// ===== STAGE TRANSITIONS =====
function showStage(stageName) {
    Object.values(stages).forEach(stage => stage.classList.remove('active'));
    stages[stageName].classList.add('active');

    // Start floating hearts after leaving envelope
    if (stageName !== 'envelope' && !heartsInterval) {
        createFloatingHearts();
    }
}

// ===== ENVELOPE CLICK =====
envelope.addEventListener('click', () => {
    envelope.classList.add('open');

    setTimeout(() => {
        showStage('letter');
    }, 1200);
});

// ===== CONTINUE TO CARD =====
continueToCard.addEventListener('click', () => {
    showStage('card');
});

// ===== NO BUTTON CLICK =====
noBtn.addEventListener('click', () => {
    noClickCount++;

    // Shrink No button
    noBtnScale = Math.max(0.2, noBtnScale - 0.15);
    noBtn.style.transform = `scale(${noBtnScale})`;
    noBtn.style.opacity = Math.max(0.3, 1 - noClickCount * 0.1);

    // Grow Yes button
    yesBtnScale += 0.15;
    yesBtn.style.transform = `scale(${yesBtnScale})`;

    // Update messages
    const messageIndex = Math.min(noClickCount - 1, noMessages.length - 1);
    cardSubtitle.textContent = noMessages[messageIndex];

    const yesIndex = Math.min(Math.floor(noClickCount / 2), yesMessages.length - 1);
    yesBtn.textContent = yesMessages[yesIndex];

    // Make No button run away after many clicks
    if (noClickCount > 5) {
        const randomX = (Math.random() - 0.5) * 200;
        const randomY = (Math.random() - 0.5) * 100;
        noBtn.style.position = 'relative';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
    }

    // Eventually hide No button completely
    if (noClickCount >= 10) {
        noBtn.style.visibility = 'hidden';
        cardSubtitle.textContent = "There's only one option now! 💕";
    }
});

// ===== YES BUTTON CLICK =====
yesBtn.addEventListener('click', () => {
    createConfetti();
    showStage('celebration');
});

// ===== CONFETTI =====
function createConfetti() {
    const colors = ['#F1B5FF', '#FFFFC5', '#CEC4FF', '#F4C4FF', '#754480', '#E8D5FF', '#FFE4F0', '#D4B8FF'];
    const shapes = ['circle', 'square', 'heart'];

    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';

            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];

            if (shape === 'heart') {
                confetti.innerHTML = '💕';
                confetti.style.fontSize = (Math.random() * 15 + 10) + 'px';
                confetti.style.background = 'transparent';
            } else {
                confetti.style.background = color;
                confetti.style.borderRadius = shape === 'circle' ? '50%' : '2px';
                confetti.style.width = (Math.random() * 10 + 5) + 'px';
                confetti.style.height = (Math.random() * 10 + 5) + 'px';
            }

            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';

            confettiContainer.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }, i * 20);
    }
}

// ===== SHOW SURPRISES =====
showSurprises.addEventListener('click', () => {
    showStage('memories');
    initMemoryCards();
});

// ===== MEMORY CARDS =====
function initMemoryCards() {
    const memoryCards = document.querySelectorAll('.memory-card');

    memoryCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}

// ===== RESTART =====
restartBtn.addEventListener('click', () => {
    // Reset state
    noClickCount = 0;
    yesBtnScale = 1;
    noBtnScale = 1;

    // Reset buttons
    yesBtn.style.transform = 'scale(1)';
    yesBtn.textContent = 'Yes! 💕';
    noBtn.style.transform = 'scale(1)';
    noBtn.style.opacity = '1';
    noBtn.style.visibility = 'visible';
    noBtn.style.position = 'static';
    noBtn.style.left = '0';
    noBtn.style.top = '0';
    cardSubtitle.textContent = 'Please say yes... 🥺';

    // Reset envelope
    envelope.classList.remove('open');

    // Reset memory cards
    document.querySelectorAll('.memory-card').forEach(card => {
        card.classList.remove('flipped');
    });

    // Clear confetti
    confettiContainer.innerHTML = '';

    // Show first stage
    showStage('envelope');
});

// ===== MUSIC CONTROL =====
musicBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        musicBtn.title = 'Play Music';
    } else {
        bgMusic.play().catch(() => {
            console.log('Autoplay prevented - user needs to interact first');
        });
        musicBtn.classList.add('playing');
        musicBtn.title = 'Pause Music';
    }
    isMusicPlaying = !isMusicPlaying;
});

// Set volume
bgMusic.volume = 0.5;

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    createSparkles();
});

// ===== EXTRA TOUCH: Double-tap protection for mobile =====
let lastTap = 0;
document.addEventListener('touchend', (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 500 && tapLength > 0) {
        e.preventDefault();
    }
    lastTap = currentTime;
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M') {
        musicBtn.click();
    }
    if (e.key === 'Enter') {
        const activeStage = document.querySelector('.stage.active');
        if (activeStage === stages.envelope) {
            envelope.click();
        } else if (activeStage === stages.letter) {
            continueToCard.click();
        } else if (activeStage === stages.card) {
            yesBtn.click();
        } else if (activeStage === stages.celebration) {
            showSurprises.click();
        }
    }
});
