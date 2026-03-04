// Admin Login JavaScript for Penreach STEAM Portal
class AdminLogin {
    constructor() {
        this.isLoading = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initAnimations();
        this.checkRememberedUser();
    }

    setupEventListeners() {
        // Form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Password toggle
        const passwordToggle = document.getElementById('passwordToggle');
        if (passwordToggle) {
            passwordToggle.addEventListener('click', () => this.togglePassword());
        }

        // Input validation
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        if (emailInput) {
            emailInput.addEventListener('blur', () => this.validateEmail());
            emailInput.addEventListener('input', () => this.clearError('email'));
        }

        if (passwordInput) {
            passwordInput.addEventListener('blur', () => this.validatePassword());
            passwordInput.addEventListener('input', () => this.clearError('password'));
        }

        // Modal close button
        const errorModalBtn = document.getElementById('errorModalBtn');
        if (errorModalBtn) {
            errorModalBtn.addEventListener('click', () => this.closeErrorModal());
        }

        // Enter key handling
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !this.isLoading) {
                const activeElement = document.activeElement;
                if (activeElement.id === 'email' || activeElement.id === 'password') {
                    this.handleLogin(e);
                }
            }
        });
    }

    initAnimations() {
        // Animate floating elements
        this.animateFloatingElements();
        
        // Add hover effects to form elements
        this.addInteractiveEffects();
    }

    animateFloatingElements() {
        const floatElements = document.querySelectorAll('.float-element');
        floatElements.forEach(element => {
            const icon = element.getAttribute('data-icon');
            element.textContent = icon;
            
            // Random initial positions
            const startX = Math.random() * 80 + 10;
            const startY = Math.random() * 80 + 10;
            element.style.left = `${startX}%`;
            element.style.top = `${startY}%`;
        });
    }

    addInteractiveEffects() {
        // Add ripple effect to login button
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                loginBtn.appendChild(ripple);
                
                const rect = loginBtn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                setTimeout(() => ripple.remove(), 600);
            });
        }
    }

    checkRememberedUser() {
        const rememberedEmail = localStorage.getItem('adminEmail');
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        
        if (rememberedEmail && rememberMe) {
            const emailInput = document.getElementById('email');
            const rememberMeCheckbox = document.getElementById('rememberMe');
            
            if (emailInput) emailInput.value = rememberedEmail;
            if (rememberMeCheckbox) rememberMeCheckbox.checked = true;
        }
    }

    togglePassword() {
        const passwordInput = document.getElementById('password');
        const passwordToggle = document.getElementById('passwordToggle');
        const icon = passwordToggle.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    validateEmail() {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const email = emailInput.value.trim();
        
        if (!email) {
            this.showError('email', 'Email is required');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showError('email', 'Please enter a valid email address');
            return false;
        }
        
        this.clearError('email');
        return true;
    }

    validatePassword() {
        const passwordInput = document.getElementById('password');
        const passwordError = document.getElementById('passwordError');
        const password = passwordInput.value;
        
        if (!password) {
            this.showError('password', 'Password is required');
            return false;
        }
        
        if (password.length < 6) {
            this.showError('password', 'Password must be at least 6 characters');
            return false;
        }
        
        this.clearError('password');
        return true;
    }

    showError(field, message) {
        const input = document.getElementById(field);
        const errorElement = document.getElementById(`${field}Error`);
        
        if (input) {
            input.classList.add('error');
        }
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    clearError(field) {
        const input = document.getElementById(field);
        const errorElement = document.getElementById(`${field}Error`);
        
        if (input) {
            input.classList.remove('error');
        }
        
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        if (this.isLoading) return;
        
        // Validate inputs
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        
        if (!isEmailValid || !isPasswordValid) {
            return;
        }
        
        // Get form data
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Show loading state
        this.showLoading();
        
        try {
            // Simulate API call (replace with actual authentication)
            const response = await this.authenticateUser(email, password);
            
            if (response.success) {
                // Handle successful login
                await this.handleSuccessfulLogin(email, rememberMe);
            } else {
                // Handle failed login
                this.handleFailedLogin(response.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            this.handleFailedLogin('An unexpected error occurred. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    async authenticateUser(email, password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock authentication (replace with actual API call)
        const validCredentials = [
            { email: 'admin@penreach.org', password: 'admin123' },
            { email: 'ncobile@penreach.org', password: 'steam2024' }
        ];
        
        const isValid = validCredentials.some(
            cred => cred.email === email && cred.password === password
        );
        
        return {
            success: isValid,
            message: isValid ? 'Login successful' : 'Invalid email or password',
            user: isValid ? { email, role: 'admin' } : null
        };
    }

    async handleSuccessfulLogin(email, rememberMe) {
        // Store session data
        const sessionData = {
            email: email,
            loginTime: new Date().toISOString(),
            role: 'admin'
        };
        
        sessionStorage.setItem('adminSession', JSON.stringify(sessionData));
        
        // Handle remember me
        if (rememberMe) {
            localStorage.setItem('adminEmail', email);
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('adminEmail');
            localStorage.setItem('rememberMe', 'false');
        }
        
        // Track successful login
        this.trackLoginEvent('success', email);
        
        // Show success modal
        this.showSuccessModal();
        
        // Redirect to admin dashboard
        setTimeout(() => {
            window.location.href = '/adminDashboard.html';
        }, 2000);
    }

    handleFailedLogin(message) {
        // Track failed login
        const email = document.getElementById('email').value.trim();
        this.trackLoginEvent('failed', email, message);
        
        // Show error modal
        this.showErrorModal(message);
        
        // Shake animation for form
        const formContainer = document.querySelector('.login-form-container');
        formContainer.style.animation = 'shake 0.5s';
        setTimeout(() => {
            formContainer.style.animation = '';
        }, 500);
    }

    showLoading() {
        this.isLoading = true;
        const loadingOverlay = document.getElementById('loadingOverlay');
        const loginBtn = document.getElementById('loginBtn');
        
        if (loadingOverlay) {
            loadingOverlay.classList.add('active');
        }
        
        if (loginBtn) {
            loginBtn.classList.add('loading');
            loginBtn.querySelector('.btn-text').textContent = 'Signing In...';
            loginBtn.querySelector('.btn-icon').className = 'fas fa-spinner fa-spin btn-icon';
        }
    }

    hideLoading() {
        this.isLoading = false;
        const loadingOverlay = document.getElementById('loadingOverlay');
        const loginBtn = document.getElementById('loginBtn');
        
        if (loadingOverlay) {
            loadingOverlay.classList.remove('active');
        }
        
        if (loginBtn) {
            loginBtn.classList.remove('loading');
            loginBtn.querySelector('.btn-text').textContent = 'Sign In';
            loginBtn.querySelector('.btn-icon').className = 'fas fa-arrow-right btn-icon';
        }
    }

    showSuccessModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    showErrorModal(message) {
        const modal = document.getElementById('errorModal');
        const errorMessage = document.getElementById('errorMessage');
        
        if (modal) {
            modal.classList.add('active');
        }
        
        if (errorMessage) {
            errorMessage.textContent = message;
        }
    }

    closeErrorModal() {
        const modal = document.getElementById('errorModal');
        if (modal) {
            modal.classList.remove('active');
        }
        
        // Focus back to email input
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.focus();
        }
    }

    trackLoginEvent(status, email, error = null) {
        const loginData = {
            event: 'admin_login_attempt',
            status: status,
            email: email,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            error: error
        };
        
        // Send analytics data
        this.sendAnalyticsData(loginData);
    }

    async sendAnalyticsData(data) {
        try {
            const response = await fetch('/api/analytics/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                console.warn('Analytics data not sent');
            }
        } catch (error) {
            console.warn('Analytics error:', error);
        }
    }

    // Utility methods
    getDeviceType() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    }

    getSecurityInfo() {
        return {
            hasTouch: 'ontouchstart' in window,
            cookieEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack,
            language: navigator.language
        };
    }
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the login page
document.addEventListener('DOMContentLoaded', () => {
    new AdminLogin();
});

// Error handling
window.addEventListener('error', (e) => {
    console.warn('Admin login error:', e.error);
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Admin login page loaded in ${loadTime.toFixed(2)}ms`);
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
