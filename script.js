// Loading Manager
class LoadingManager {
    constructor() {
        this.loadingSteps = [
            { name: 'Initializing...', progress: 30 },
            { name: 'Loading animations...', progress: 60 },
            { name: 'Finalizing...', progress: 100 }
        ];
        this.currentStep = 0;
        this.loadingScreen = document.getElementById('loading-screen');
        this.loadingText = document.getElementById('loading-text');
        this.progressFill = document.getElementById('progress-fill');
        this.progressPercentage = document.getElementById('progress-percentage');
        
        this.librariesLoaded = {
            aos: false,
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
            }, 300);
        }
        
        // Recheck libraries periodically
        const checkInterval = setInterval(() => {
            if (typeof AOS !== 'undefined') this.librariesLoaded.aos = true;
            
            if (this.allLibrariesLoaded()) {
                clearInterval(checkInterval);
                this.checkAllLoaded();
            }
        }, 100);
        
        // Timeout fallback
        setTimeout(() => {
            clearInterval(checkInterval);
            this.finishLoading();
        }, 2000);
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
                    duration: 800,
                    easing: 'ease-in-out',
                    once: true,
                    mirror: false,
                    offset: 100
                });
            }
        } catch (error) {
            console.warn('AOS initialization failed:', error);
        }
        
        // Initialize other components
        this.initializeScrollEffects();
        this.initializeObservers();
    }
    
    initializeBackground() {
        // Background removed for simpler design
    }
    
    initializeTyped() {
        // Static text - no typing animation needed
    }
    
    initializeScrollEffects() {
        // Initialize all scroll-based effects
        this.initializeHeader();
        this.initializeScrollToTop();
    }
    
    initializeObservers() {
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
        // Parallax removed for simpler design
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
        // Stats animation removed
    }
    
    initializeSkillsObserver() {
        // Skills bars removed
    }
    
    initializeChartObserver() {
        // Chart removed
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

// Smooth scrolling for anchor links
// Smooth scrolling for anchor links
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

// Project cards hover effects
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
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

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('img[data-src], img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    });
}