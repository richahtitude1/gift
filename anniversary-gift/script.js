// Create floating hearts
function createHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 1000);
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Gallery image hover effects
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createHearts();
    
    // Personalization prompt
    setTimeout(() => {
        const yearsCount = document.getElementById('yearsCount');
        const personalYears = prompt('How many years are you celebrating?', '1');
        if (personalYears && personalYears !== '1') {
            yearsCount.textContent = personalYears;
        }
    }, 1000);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Create confetti effect for celebration
function createConfetti() {
    const colors = ['#e91e63', '#f06292', '#fce4ec', '#ff69b4', '#ff1493'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = Math.random() * 0.8 + 0.2;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.transition = `all ${Math.random() * 3 + 2}s ease-out`;
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.style.top = '100%';
            confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
            confetti.style.opacity = '0';
        }, 100);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Trigger confetti on scroll to final message
const finalMessage = document.querySelector('.final-message');
if (finalMessage) {
    const finalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                createConfetti();
                finalObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    finalObserver.observe(finalMessage);
}
