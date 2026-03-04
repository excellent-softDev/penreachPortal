// Landing Page JavaScript for Penreach STEAM Portal
class PenreachLanding {
    constructor() {
        this.selectedUserType = null;
        this.userData = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initAnimations();
        this.trackPageView();
        this.setupScrollEffects();
    }

    setupEventListeners() {
        // User type selection cards
        const userTypeCards = document.querySelectorAll('.user-type-card');
        userTypeCards.forEach(card => {
            card.addEventListener('click', (e) => this.handleUserTypeSelection(e));
        });

        // Modal controls
        const modalClose = document.getElementById('modalClose');
        const userInfoForm = document.getElementById('userInfoForm');
        
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }

        if (userInfoForm) {
            userInfoForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Close modal on outside click
        const modal = document.getElementById('userInfoModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });

        // Program cards click handlers
        const programCards = document.querySelectorAll('.program-card');
        programCards.forEach(card => {
            card.addEventListener('click', () => this.handleProgramClick(card));
        });
    }

    initAnimations() {
        // Animate floating elements
        this.animateFloatingElements();
        
        // Animate stats counters
        this.animateCounters();
        
        // Add scroll animations
        this.setupScrollAnimations();
    }

    animateFloatingElements() {
        const floatElements = document.querySelectorAll('.float-element');
        floatElements.forEach(element => {
            const icon = element.getAttribute('data-icon');
            element.textContent = icon;
            
            // Random initial positions
            const startX = Math.random() * 80 + 10; // 10% to 90%
            const startY = Math.random() * 80 + 10; // 10% to 90%
            element.style.left = `${startX}%`;
            element.style.top = `${startY}%`;
        });
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        const animateCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            const increment = target / speed;
            
            const updateCount = () => {
                const count = +counter.innerText;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            
            updateCount();
        };

        // Use Intersection Observer to trigger animation when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.about-card, .program-card, .section-header');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loading');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    setupScrollEffects() {
        let lastScroll = 0;
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add/remove background based on scroll
            if (currentScroll > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
            
            lastScroll = currentScroll;
        });
    }

    handleUserTypeSelection(e) {
        const card = e.currentTarget;
        const userType = card.getAttribute('data-type');
        
        // Remove previous selection
        document.querySelectorAll('.user-type-card').forEach(c => {
            c.classList.remove('selected');
        });
        
        // Add selection to clicked card
        card.classList.add('selected');
        this.selectedUserType = userType;
        
        // Track user type selection
        this.trackUserTypeSelection(userType);
        
        // Show modal after a short delay
        setTimeout(() => {
            this.showModal();
        }, 300);
    }

    showModal() {
        const modal = document.getElementById('userInfoModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modal = document.getElementById('userInfoModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        this.userData = {
            userType: this.selectedUserType,
            name: formData.get('userName'),
            school: formData.get('userSchool'),
            grade: formData.get('userGrade'),
            timestamp: new Date().toISOString()
        };
        
        // Store user data
        this.storeUserData();
        
        // Track form submission
        this.trackFormSubmission();
        
        // Redirect based on user type
        this.redirectUser();
    }

    storeUserData() {
        // Store in sessionStorage for session tracking
        sessionStorage.setItem('penreachUserData', JSON.stringify(this.userData));
        
        // Send to server for analytics (optional)
        this.sendAnalyticsData();
    }

    async sendAnalyticsData() {
        try {
            const response = await fetch('/api/analytics/visitor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.userData)
            });
            
            if (!response.ok) {
                console.warn('Analytics data not sent, but continuing...');
            }
        } catch (error) {
            console.warn('Analytics error:', error);
        }
    }

    redirectUser() {
        const redirects = {
            'learner': '/ncobile/learner-dashboard.html',
            'teacher': '/ncobile/teacher-dashboard.html',
            'general': '/ncobile/general-dashboard.html'
        };
        
        const targetUrl = redirects[this.selectedUserType] || '/';
        
        // Show loading state
        this.showLoadingState();
        
        // Redirect after a short delay
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 1500);
    }

    showLoadingState() {
        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Setting up your experience...';
            submitBtn.disabled = true;
        }
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    handleProgramClick(card) {
        const programName = card.querySelector('h3').textContent;
        this.trackProgramInteraction(programName);
        
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    }

    // Analytics tracking methods
    trackPageView() {
        const pageData = {
            page: 'ncobile-landing',
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            screen: {
                width: screen.width,
                height: screen.height
            }
        };
        
        // Store page view
        this.sendAnalyticsData(pageData);
    }

    trackUserTypeSelection(userType) {
        const selectionData = {
            event: 'user_type_selection',
            userType: userType,
            timestamp: new Date().toISOString()
        };
        
        this.sendAnalyticsData(selectionData);
    }

    trackFormSubmission() {
        const submissionData = {
            event: 'form_submission',
            userData: this.userData,
            timestamp: new Date().toISOString()
        };
        
        this.sendAnalyticsData(submissionData);
    }

    trackProgramInteraction(programName) {
        const interactionData = {
            event: 'program_interaction',
            programName: programName,
            timestamp: new Date().toISOString()
        };
        
        this.sendAnalyticsData(interactionData);
    }

    // Utility methods
    getDeviceType() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    }

    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour < 12) return 'morning';
        if (hour < 17) return 'afternoon';
        return 'evening';
    }

    // Initialize everything when DOM is loaded
    static init() {
        document.addEventListener('DOMContentLoaded', () => {
            new PenreachLanding();
        });
    }
}

// Initialize the landing page
PenreachLanding.init();

// Additional utility functions
window.PenreachLanding = PenreachLanding;

// Add some interactive polish
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.user-type-card, .about-card, .program-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            e.target.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', (e) => {
            e.target.style.transform = '';
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const floatingElements = document.querySelector('.floating-elements');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        if (floatingElements && scrolled < window.innerHeight) {
            floatingElements.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
});

// Error handling
window.addEventListener('error', (e) => {
    console.warn('Landing page error:', e.error);
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});
