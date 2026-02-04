// JavaScript Document
/*
TemplateMo 597 Neural Glass
*/

/* ============================
   NAVIGATION & HEADER
============================ */
// Mobile menu functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
    }
});

// Get header offset dynamically
function getHeaderOffset() {
    const header = document.querySelector('header');
    return header ? header.offsetHeight + 20 : 80; // fallback
}

// Smooth scrolling with header offset + gentle bounce
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const headerOffset = getHeaderOffset();
    const elementTop = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetTop = elementTop - headerOffset;

    const start = window.pageYOffset;
    const distance = offsetTop - start;
    const duration = 1000; // slower (1s)

    let startTime = null;

    function easeOutBack(t) {
      // gentler overshoot
      const c1 = 1.10158;  
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeOutBack(progress);

      window.scrollTo(0, start + distance * ease);

      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
  });
});

// Active menu item highlighting
function updateActiveMenuItem() {
    const headerOffset = getHeaderOffset();
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

    let currentSection = sections[0]?.id || '';
    const scrollPos = window.pageYOffset + headerOffset;

    for (const section of sections) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top - 50 && scrollPos < top + height - 50) {            currentSection = section.id;
        }
    }

    const nearBottom = (window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight - 60);
    if (nearBottom && sections.length) {
        currentSection = sections[sections.length - 1].id;
    }

    navLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        const id = href.startsWith('#') ? href.substring(1) : '';
        link.classList.toggle('active', id === currentSection);
    });
}

window.addEventListener('scroll', updateActiveMenuItem);
window.addEventListener('load', updateActiveMenuItem);
window.addEventListener('resize', updateActiveMenuItem);

// Shrink/glass header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    header.classList.toggle('scrolled', scrolled > 50);
});


/* ============================
   HERO / BACKGROUND EFFECTS
============================ */
// Neural lines pulse effect
const neuralLines = document.querySelectorAll('.neural-line');
setInterval(() => {
    neuralLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'scaleX(1.2)';
            setTimeout(() => {
                line.style.opacity = '0.2';
                line.style.transform = 'scaleX(0.5)';
            }, 200);
        }, index * 300);
    });
}, 2000);

// Enhanced particle generation
function createQuantumParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = Math.random() * 4 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = ['#00ffff', '#ff0080', '#8000ff'][Math.floor(Math.random() * 3)];
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100vh';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '-1';
    particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
    
    document.body.appendChild(particle);
    
    const duration = Math.random() * 3000 + 2000;
    const drift = (Math.random() - 0.5) * 200;
    
    particle.animate([
        { transform: 'translateY(0px) translateX(0px)', opacity: 0 },
        { transform: `translateY(-100vh) translateX(${drift}px)`, opacity: 1 }
    ], {
        duration: duration,
        easing: 'ease-out'
    }).onfinish = () => particle.remove();
}

// Generate quantum particles
setInterval(createQuantumParticle, 1500);


/* ============================
   SCROLL ANIMATIONS
============================ */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-content, .hexagon').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});


/* ============================
   FORMS
============================ */
const submitBtn = document.querySelector('.submit-btn');
if (submitBtn) {
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        this.innerHTML = 'TRANSMITTING...';
        this.style.background = 'linear-gradient(45deg, #8000ff, #00ffff)';
        
        setTimeout(() => {
            this.innerHTML = 'TRANSMISSION COMPLETE';
            this.style.background = 'linear-gradient(45deg, #00ff00, #00ffff)';
            
            setTimeout(() => {
                this.innerHTML = 'TRANSMIT TO MATRIX';
                this.style.background = 'linear-gradient(45deg, #00ffff, #ff0080)';
            }, 2000);
        }, 1500);
    });
}