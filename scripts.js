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

/* ============================
   SHARED LUXURY SCROLL ENGINE
============================ */
// 1. The reusable function (The Engine)
function smoothScrollTo(targetSelector) {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    // --- TUNING KNOBS ---
    const headerOffset = 45; // Reduced from 60 -> 45 (Closer gap!)
    const duration = 2000;   // 2.0s (Slower than before for maximum smoothness)
    // --------------------

    const elementTop = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetTop = elementTop - headerOffset;
    const start = window.pageYOffset;
    const distance = offsetTop - start;
    let startTime = null;

    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const ease = easeOutExpo(progress);
        window.scrollTo(0, start + distance * ease);

        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}

// 2. Attach it to your Navbar Links (Manual Clicks)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        // Handle "../index.html#section" links
        const cleanId = targetId.includes('#') ? '#' + targetId.split('#')[1] : targetId;
        
        e.preventDefault();
        smoothScrollTo(cleanId); // <--- Call the engine
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
        if (scrollPos >= top - 50 && scrollPos < top + height - 50) {currentSection = section.id;
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

/* ============================
   NEW: CHATBOT & NAVIGATOR BRAIN
============================ */
let welcomeSent = false;

function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.classList.toggle('hidden');
    
    if (!chatContainer.classList.contains('hidden') && !welcomeSent) {
        const msgArea = document.getElementById('chat-messages');
        msgArea.innerHTML += `
            <div class="bot-msg">
                Hello! I'm Azar's AI assistant. 🤖 <br><br>
                How can I help you explore my work today?
                <div class="action-buttons-container">
                    <button class="action-btn" onclick="quickAsk('Tell me about yourself')">👨‍💻 About Me</button>
                    <button class="action-btn" onclick="quickAsk('Tell me about the EGO-Optimizer')">🚀 EGO-Optimizer</button>
                    <button class="action-btn" onclick="quickAsk('What are your technical skills?')">💻 Tech Skills</button>
                </div>
            </div>`;
        welcomeSent = true;
        msgArea.scrollTo({ top: msgArea.scrollHeight, behavior: 'smooth' });
    }

    if (!chatContainer.classList.contains('hidden')) {
        const input = document.getElementById('user-input');
        if (input) input.focus();
    }
}

function quickAsk(question) {
    const input = document.getElementById('user-input');
    if (input) {
        input.value = question;
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById('user-input');
    const msgArea = document.getElementById('chat-messages');
    
    if (!input || !msgArea) return;

    const text = input.value.trim();
    if (!text) return;

    // --- AI NAVIGATOR: Connected to Luxury Engine ---
    const lowerText = text.toLowerCase();
    
    // 1. Contact
    if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('reach') || lowerText.includes('hire')) {
        setTimeout(() => smoothScrollTo('#contact'), 500); // Uses the slow engine
    }
    
    // 2. Projects
    if (lowerText.includes('project') || lowerText.includes('work') || lowerText.includes('portfolio') || lowerText.includes('showcase') || lowerText.includes('ego')) {
        setTimeout(() => smoothScrollTo('#showcase'), 500);
    }

    // 3. Journey
    if (lowerText.includes('journey') || lowerText.includes('experience') || lowerText.includes('history') || lowerText.includes('education') || lowerText.includes('about')) {
        setTimeout(() => smoothScrollTo('#timeline'), 500);
    }

    // 4. Skills
    if (lowerText.includes('skill') || lowerText.includes('tech') || lowerText.includes('stack') || lowerText.includes('coding')) {
        setTimeout(() => smoothScrollTo('#features'), 500);
    }
    // ------------------------------------------------

    msgArea.innerHTML += `<div class="user-msg">${text}</div>`;
    input.value = '';
    msgArea.scrollTo({ top: msgArea.scrollHeight, behavior: 'smooth' });

    const loadingId = "loading-" + Date.now();
    msgArea.innerHTML += `<div class="bot-msg" id="${loadingId}"><i class="fas fa-circle-notch fa-spin"></i> Thinking...</div>`;
    msgArea.scrollTo({ top: msgArea.scrollHeight, behavior: 'smooth' });

    try {
        const response = await fetch("https://portfolio-backend-mn66.onrender.com/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: text })
        });
        
        const data = await response.json();
        const botMsgDiv = document.getElementById(loadingId);
        
        let botText = data.answer;
        let resumeButtonHtml = ""; 
        
        if (botText.includes("||RESUME||")) {
            botText = botText.replace("||RESUME||", "");
            resumeButtonHtml = `
                <div style="margin-top: 15px;">
                    <a href="assets/Azar_Adham_CV.pdf" download class="resume-btn" style="display: inline-flex; align-items: center; gap: 8px; background-color: #EF4444; color: white; padding: 10px 16px; border-radius: 8px; text-decoration: none; font-weight: bold; font-family: sans-serif;">
                        <i class="fas fa-file-pdf"></i> Download Official Resume
                    </a>
                </div>
            `;
        }

        if (typeof marked !== 'undefined') {
             botMsgDiv.innerHTML = marked.parse(botText) + resumeButtonHtml;
        } else {
             botMsgDiv.innerHTML = botText + resumeButtonHtml;
        }
        
    } catch (err) {
        const botMsgDiv = document.getElementById(loadingId);
        if (botMsgDiv) botMsgDiv.innerText = "System offline. Please try again later.";
    }
    
    setTimeout(() => {
        msgArea.scrollTo({ top: msgArea.scrollHeight, behavior: 'smooth' });
    }, 100);
}

// Health Check & Initializers
async function checkServerStatus() {
    const dot = document.getElementById('status-dot');
    if (!dot) return; 

    try {
        const response = await fetch('https://portfolio-backend-mn66.onrender.com/health', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-store'
        });
        
        if (response.ok) {
            dot.className = 'dot-online';
        } else {
            dot.className = 'dot-offline';
        }
    } catch (error) {
        dot.className = 'dot-offline';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('user-input');
    if (input) {
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') sendMessage();
        });
        input.addEventListener('focus', () => {
            const chatMessages = document.getElementById('chat-messages');
            if (chatMessages) {
                setTimeout(() => {
                    chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
                }, 300);
            }
        });
    }

    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        chatMessages.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && !link.classList.contains('resume-btn')) {
                setTimeout(() => toggleChat(), 300);
            }
        });
    }

    checkServerStatus();
    setInterval(checkServerStatus, 30000); 
});

/* ============================
   VOICE RECOGNITION (The Ears)
============================ */
function setupVoiceMode() {
    const voiceBtn = document.getElementById('voice-btn');
    const chatInput = document.getElementById('user-input');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!voiceBtn || !chatInput || !SpeechRecognition) {
        if (voiceBtn) voiceBtn.style.display = 'none';
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false; 
    recognition.lang = 'en-US'; 

    voiceBtn.addEventListener('click', () => {
        if (voiceBtn.classList.contains('listening')) {
            recognition.stop(); // This triggers onend
        } else {
            try {
                recognition.start();
            } catch (e) {
                console.error("Speech recognition already started:", e);
            }
        }
    });

    recognition.onstart = () => {
        voiceBtn.classList.add('listening');
        voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
        chatInput.placeholder = "Listening...";
    };

    // THE FIX: Ensure the mic shuts down completely
    recognition.onend = () => {
        voiceBtn.classList.remove('listening');
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        chatInput.placeholder = "Type or speak...";
        
        // Force the browser to release the microphone hardware
        if (recognition.stream) {
            recognition.stream.getTracks().forEach(track => track.stop());
        }
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        chatInput.value = transcript;
        
        // Immediately stop recognition to trigger the 'onend' hardware release
        recognition.stop();

        setTimeout(() => {
            if (typeof sendMessage === "function") {
                sendMessage();
            }
        }, 600);
    };

    recognition.onerror = (event) => {
        console.error("Voice Error:", event.error);
        voiceBtn.classList.remove('listening');
        voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
        chatInput.placeholder = "Error: " + event.error;
    };
}

// Initialize on load
document.addEventListener('DOMContentLoaded', setupVoiceMode);

// admin.html - Final JS
async function fetchStats() {
    const passInput = document.getElementById('admin-pass').value;
    const outputDiv = document.getElementById('stats-output');
    
    try {
        // We use the exact name FastAPI expects
        const response = await fetch('https://portfolio-backend-mn66.onrender.com/admin-stats', {
            method: 'GET',
            headers: { 
                'x-admin-token': passInput // Sending it lowercase is safer
            }
        });

        if (!response.ok) {
            throw new Error("Invalid password or unauthorized access.");
        }

        const logs = await response.json();
        
        if (logs.length === 0) {
            outputDiv.innerHTML = "<p>Database is connected, but no chats recorded yet!</p>";
            return;
        }

        // Build the table manually to avoid "Not Defined" errors
        let tableHtml = `
            <table class="stats-table">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Company</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>`;
        
        logs.forEach(log => {
            tableHtml += `
                <tr>
                    <td>${log.timestamp}</td>
                    <td style="color: #10B981">${log.location}</td>
                    <td style="color: #F59E0B">${log.company}</td>
                    <td>"${log.query}"</td>
                </tr>`;
        });

        tableHtml += `</tbody></table>`;
        outputDiv.innerHTML = tableHtml;

    } catch (err) {
        alert(err.message);
        console.error("Fetch error:", err);
    }
}

// dot matrix code JS

'use client';
import { useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

import './DotGrid.css';

gsap.registerPlugin(InertiaPlugin);

const throttle = (func, limit) => {
  let lastCall = 0;
  return function (...args) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

function hexToRgb(hex) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

const DotGrid = ({
  dotSize = 16,
  gap = 32,
  baseColor = '#5227FF',
  activeColor = '#5227FF',
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = '',
  style
}) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null;

    const p = new window.Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    if (!circlePath) return;

    let rafId;
    const proxSq = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;

      for (const dot of dotsRef.current) {
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let style = baseColor;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          style = `rgb(${r},${g},${b})`;
        }

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;
        ctx.fill(circlePath);
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath]);

  useEffect(() => {
    buildGrid();
    let ro = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(buildGrid);
      wrapperRef.current && ro.observe(wrapperRef.current);
    } else {
      window.addEventListener('resize', buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    const onMove = e => {
      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }
      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      const rect = canvasRef.current.getBoundingClientRect();
      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const pushX = dot.cx - pr.x + vx * 0.005;
          const pushY = dot.cy - pr.y + vy * 0.005;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.75)'
              });
              dot._inertiaApplied = false;
            }
          });
        }
      }
    };

    const onClick = e => {
      const rect = canvasRef.current.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (dot.cx - cx) * shockStrength * falloff;
          const pushY = (dot.cy - cy) * shockStrength * falloff;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.75)'
              });
              dot._inertiaApplied = false;
            }
          });
        }
      }
    };

    const throttledMove = throttle(onMove, 50);
    window.addEventListener('mousemove', throttledMove, { passive: true });
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', throttledMove);
      window.removeEventListener('click', onClick);
    };
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);

  return (
    <section className={`dot-grid ${className}`} style={style}>
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  );
};

export default DotGrid;
