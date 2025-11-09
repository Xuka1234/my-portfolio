// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Advanced Background Animation
class GeometricBackground {
    constructor() {
        this.shapes = document.querySelectorAll('.geometric-shape');
        this.orbs = document.querySelectorAll('.floating-orb');
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        this.addMouseInteraction();
        this.addRandomMovement();
        this.addColorShift();
    }

    addMouseInteraction() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX / window.innerWidth;
            this.mouseY = e.clientY / window.innerHeight;
            
            this.shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.5;
                const xMove = (this.mouseX - 0.5) * speed * 50;
                const yMove = (this.mouseY - 0.5) * speed * 50;
                
                shape.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${this.mouseX * 360}deg)`;
            });

            this.orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.3;
                const xMove = (this.mouseX - 0.5) * speed * 30;
                const yMove = (this.mouseY - 0.5) * speed * 30;
                
                orb.style.transform = `translate(${xMove}px, ${yMove}px) scale(${1 + this.mouseY * 0.2})`;
            });
        });
    }

    addRandomMovement() {
        setInterval(() => {
            this.shapes.forEach((shape) => {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                const currentTransform = shape.style.transform || '';
                
                if (!currentTransform.includes('translate')) {
                    shape.style.transform += ` translate(${randomX}px, ${randomY}px)`;
                }
            });
        }, 3000);
    }

    addColorShift() {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            const hero = document.querySelector('.hero');
            hero.style.background = `linear-gradient(135deg, 
                hsl(${240 + Math.sin(hue * 0.01) * 30}, 70%, 65%) 0%, 
                hsl(${280 + Math.cos(hue * 0.01) * 30}, 60%, 55%) 100%)`;
        }, 100);
    }
}

// Initialize custom background
const geometricBg = new GeometricBackground();

// Initialize Typed.js for hero subtitle
const typed = new Typed('#typed-text', {
    strings: [
        'Associate Manager, Operational Excellence',
        'Product Management Expert',
        'Digital Transformation Leader',
        'Innovation Driver'
    ],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|'
});

// Smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.minimal-header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
});

// Counter animation for hero stats
const statsObserverOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = counter.textContent;
                const numericValue = target.replace(/[^\d.]/g, '');
                const suffix = target.replace(/[\d.]/g, '');
                
                if (numericValue) {
                    animateCounter(counter, 0, parseFloat(numericValue), suffix, 2000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, statsObserverOptions);

const heroStatsSection = document.querySelector('.hero-stats');
if (heroStatsSection) {
    statsObserver.observe(heroStatsSection);
}

function animateCounter(element, start, end, suffix, duration) {
    const startTime = performance.now();
    const range = end - start;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (range * easeOutQuart);
        
        if (end < 100) {
            element.textContent = current.toFixed(1) + suffix;
        } else {
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end.toLocaleString() + suffix;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Skill bars animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, index * 200);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Initialize Skills Chart
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initSkillsChart();
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const chartSection = document.querySelector('.skills-chart-section');
if (chartSection) {
    chartObserver.observe(chartSection);
}

function initSkillsChart() {
    const ctx = document.getElementById('skillsChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Product Management', 'Data Analysis', 'Digital Transformation', 'Process Optimization', 'Technical Skills'],
            datasets: [{
                data: [95, 90, 85, 92, 80],
                backgroundColor: [
                    '#667eea',
                    '#764ba2',
                    '#48bb78',
                    '#ed8936',
                    '#38b2ac'
                ],
                borderWidth: 0,
                cutout: '60%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 2000
            }
        }
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.1;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add scroll-to-top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-3px) scale(1.1)';
    scrollToTopBtn.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
    scrollToTopBtn.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
});

// Project cards hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0deg)';
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src], img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Smooth reveal animations for sections
const revealSections = document.querySelectorAll('section');

const revealSection = function(entries, observer) {
    const [entry] = entries;
    
    if (!entry.isIntersecting) return;
    
    entry.target.classList.remove('section-hidden');
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

revealSections.forEach(function(section) {
    sectionObserver.observe(section);
    section.classList.add('section-hidden');
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .section-hidden {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s ease;
    }
    
    .hero-badge {
        animation: fadeInDown 0.8s ease-out 0.5s both;
    }
    
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .stat-item:nth-child(1) { animation-delay: 0.1s; }
    .stat-item:nth-child(2) { animation-delay: 0.2s; }
    .stat-item:nth-child(3) { animation-delay: 0.3s; }
    
    .project-card {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .skill-progress {
        position: relative;
        overflow: hidden;
    }
    
    .skill-progress::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        transition: left 0.5s ease;
    }
    
    .skill-item:hover .skill-progress::before {
        left: 100%;
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add some entrance animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 100);
});

// Add CSS for loading state
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) .hero-content > * {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
`;
document.head.appendChild(loadingStyle);