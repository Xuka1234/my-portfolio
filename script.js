// Loading Manager
class LoadingManager {
    constructor() {
        this.loadingSteps = [
            { name: 'Initializing fonts...', progress: 15 },
            { name: 'Loading animations...', progress: 40 },
            { name: 'Setting up background...', progress: 65 },
            { name: 'Loading charts...', progress: 85 },
            { name: 'Finalizing setup...', progress: 100 }
        ];
        this.currentStep = 0;
        this.loadingScreen = document.getElementById('loading-screen');
        this.loadingText = document.getElementById('loading-text');
        this.progressFill = document.getElementById('progress-fill');
        this.progressPercentage = document.getElementById('progress-percentage');
        
        this.librariesLoaded = {
            aos: false,
            chart: false,
            fonts: false
        };
        
        this.init();
    }
    
    init() {
        // Start loading sequence
        this.updateProgress();
        this.checkLibraries();
    }
    
    updateProgress() {
        if (this.currentStep < this.loadingSteps.length) {
            const step = this.loadingSteps[this.currentStep];
            this.loadingText.textContent = step.name;
            this.progressFill.style.width = step.progress + '%';
            this.progressPercentage.textContent = step.progress + '%';
            
            setTimeout(() => {
                this.currentStep++;
                if (this.currentStep < this.loadingSteps.length) {
                    this.updateProgress();
                } else {
                    this.checkAllLoaded();
                }
            }, 200); // Faster progress since fewer steps
        }
    }
    
    checkLibraries() {
        // Check if AOS is loaded
        if (typeof AOS !== 'undefined') {
            this.librariesLoaded.aos = true;
        }
        
        // Check if Chart.js is loaded
        if (typeof Chart !== 'undefined') {
            this.librariesLoaded.chart = true;
        }
        
        // Check if fonts are loaded
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                this.librariesLoaded.fonts = true;
                this.checkAllLoaded();
            });
        } else {
            // Fallback for older browsers
            setTimeout(() => {
                this.librariesLoaded.fonts = true;
                this.checkAllLoaded();
            }, 500);
        }
        
        // Recheck libraries periodically
        const checkInterval = setInterval(() => {
            if (typeof AOS !== 'undefined') this.librariesLoaded.aos = true;
            if (typeof Chart !== 'undefined') this.librariesLoaded.chart = true;
            
            if (this.allLibrariesLoaded()) {
                clearInterval(checkInterval);
                this.checkAllLoaded();
            }
        }, 100);
        
        // Timeout fallback - reduced to 3 seconds since we have fewer libraries
        setTimeout(() => {
            clearInterval(checkInterval);
            this.finishLoading();
        }, 3000);
    }
    
    allLibrariesLoaded() {
        return Object.values(this.librariesLoaded).every(loaded => loaded);
    }
    
    checkAllLoaded() {
        if (this.allLibrariesLoaded() && this.currentStep >= this.loadingSteps.length) {
            setTimeout(() => {
                this.finishLoading();
            }, 500);
        }
    }
    
    finishLoading() {
        this.loadingText.textContent = 'Welcome!';
        this.progressFill.style.width = '100%';
        this.progressPercentage.textContent = '100%';
        
        setTimeout(() => {
            this.loadingScreen.classList.add('hidden');
            document.body.classList.add('loaded');
            
            // Initialize all components after loading
            this.initializeComponents();
            
            // Remove loading screen from DOM after transition
            setTimeout(() => {
                if (this.loadingScreen.parentNode) {
                    this.loadingScreen.parentNode.removeChild(this.loadingScreen);
                }
            }, 500);
        }, 500); // Reduced delay
    }
    
    initializeComponents() {
        // Initialize AOS with error handling
        try {
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 1000,
                    easing: 'ease-in-out',
                    once: true,
                    mirror: false
                });
            }
        } catch (error) {
            console.warn('AOS initialization failed:', error);
        }
        
        // Initialize other components
        this.initializeBackground();
        this.initializeTyped();
        this.initializeScrollEffects();
        this.initializeObservers();
    }
    
    initializeBackground() {
        try {
            window.geometricBg = new GeometricBackground();
        } catch (error) {
            console.warn('Background initialization failed:', error);
        }
    }
    
    initializeTyped() {
        // Typed.js effect removed - using static text instead
        const typedElement = document.getElementById('typed-text');
        if (typedElement) {
            typedElement.textContent = 'Associate Manager, Operational Excellence';
        }
    }
    
    initializeScrollEffects() {
        // Initialize all scroll-based effects
        this.initializeHeader();
        this.initializeParallax();
        this.initializeScrollToTop();
    }
    
    initializeObservers() {
        this.initializeStatsObserver();
        this.initializeSkillsObserver();
        this.initializeChartObserver();
        this.initializeSectionObserver();
    }
    
    initializeHeader() {
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
    }
    
    initializeParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                const rate = scrolled * -0.1;
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    initializeScrollToTop() {
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

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        scrollToTopBtn.addEventListener('mouseenter', () => {
            scrollToTopBtn.style.transform = 'translateY(-3px) scale(1.1)';
            scrollToTopBtn.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
        });

        scrollToTopBtn.addEventListener('mouseleave', () => {
            scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
            scrollToTopBtn.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
        });
    }
    
    initializeStatsObserver() {
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
    }
    
    initializeSkillsObserver() {
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
    }
    
    initializeChartObserver() {
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
    }
    
    initializeSectionObserver() {
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
    }
}

// Initialize loading manager
const loadingManager = new LoadingManager();

// Initialize AOS (Animate On Scroll) - will be called by LoadingManager

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
        // this.addColorShift(); // Disabled to prevent flickering
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
        // Subtle color animation - much slower and less noticeable
        let hue = 0;
        setInterval(() => {
            hue = (hue + 0.1) % 360; // Very slow change
            const hero = document.querySelector('.hero');
            if (hero) {
                const transition = 'background 2s ease-in-out'; // Add smooth transition
                hero.style.transition = transition;
                hero.style.background = `linear-gradient(135deg, 
                    hsl(${240 + Math.sin(hue * 0.002) * 10}, 70%, 65%) 0%, 
                    hsl(${280 + Math.cos(hue * 0.002) * 10}, 60%, 55%) 100%)`;
            }
        }, 2000); // Much slower - every 2 seconds
    }
}

// Smooth scrolling for any anchor links - Initialize after loading
document.addEventListener('DOMContentLoaded', () => {
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
});

// Counter animation for hero stats
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

// Initialize Skills Chart
function initSkillsChart() {
    const ctx = document.getElementById('skillsChart');
    if (!ctx) return;

    try {
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
    } catch (error) {
        console.warn('Chart.js initialization failed:', error);
    }
}

// Project cards hover effects - Initialize after loading
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg)';
        });
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

    // Initialize after DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('img[data-src], img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    });
}

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