document.addEventListener('DOMContentLoaded', function() {
    // Create floating hearts
    createFloatingHearts();
    
    // Initialize confetti
    const canvas = document.getElementById('confetti-canvas');
    const confettiSettings = { target: canvas, max: 150, size: 1.5, clock: 25 };
    const confetti = new ConfettiGenerator(confettiSettings);
    
    // Surprise button
    const surpriseBtn = document.getElementById('surprise-btn');
    surpriseBtn.addEventListener('click', function() {
        // Show confetti
        confetti.render();
        
        // Create more hearts
        createHeartBurst();
        
        // Change button text
        surpriseBtn.textContent = "I Love You!";
        surpriseBtn.classList.add('animate-pulse');
        
        // Reset after 5 seconds
        setTimeout(() => {
            confetti.clear();
            surpriseBtn.textContent = "Click for a Surprise!";
            surpriseBtn.classList.remove('animate-pulse');
        }, 5000);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

function createFloatingHearts() {
    const container = document.getElementById('hearts-container');
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'absolute text-rose-400 opacity-60';
        heart.innerHTML = '❤️';
        
        // Random position and size
        const size = Math.random() * 20 + 10;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${left}%`;
        heart.style.top = '-50px';
        heart.style.animation = `float ${animationDuration}s linear ${delay}s infinite`;
        
        container.appendChild(heart);
    }
    
    // Add floating animation to styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.6;
            }
            100% {
                transform: translateY(calc(100vh + 50px)) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function createHeartBurst() {
    const container = document.getElementById('hearts-container');
    const burstCount = 30;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < burstCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'absolute text-rose-500';
        heart.innerHTML = '❤️';
        
        // Random size
        const size = Math.random() * 30 + 20;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        
        // Start from center
        heart.style.left = `${centerX}px`;
        heart.style.top = `${centerY}px`;
        
        // Random angle and distance
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 200 + 100;
        const duration = Math.random() * 1 + 0.5;
        
        // Animate outwards
        heart.style.transition = `all ${duration}s ease-out`;
        heart.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
        heart.style.opacity = '0';
        
        container.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
}