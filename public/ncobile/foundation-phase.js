// Foundation Phase JavaScript for Grade R-3 Learners
class FoundationPhase {
    constructor() {
        this.userData = {};
        this.currentActivity = null;
        this.points = 0;
        this.init();
    }

    init() {
        this.loadUserData();
        this.setupEventListeners();
        this.initAnimations();
        this.updateUI();
    }

    loadUserData() {
        const savedData = sessionStorage.getItem('penreachUserData');
        if (savedData) {
            this.userData = JSON.parse(savedData);
        } else {
            // Fallback for direct access
            this.userData = {
                name: 'Young Explorer',
                userType: 'learner',
                grade: 'foundation'
            };
        }

        // Load progress data
        const progressData = localStorage.getItem('foundationProgress');
        if (progressData) {
            const progress = JSON.parse(progressData);
            this.points = progress.points || 0;
        }
    }

    setupEventListeners() {
        // Subject cards
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.addEventListener('click', () => this.handleSubjectSelection(card));
        });

        // Activity start buttons
        const startButtons = document.querySelectorAll('.start-btn');
        startButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleActivityStart(e));
        });

        // Resource cards
        const resourceCards = document.querySelectorAll('.resource-card');
        resourceCards.forEach(card => {
            card.addEventListener('click', () => this.handleResourceClick(card));
        });

        // Modal controls
        const modalClose = document.getElementById('modalClose');
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }

        // Close modal on outside click
        const modal = document.getElementById('activityModal');
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

        // User avatar click
        const userAvatar = document.querySelector('.user-avatar');
        if (userAvatar) {
            userAvatar.addEventListener('click', () => this.showUserProfile());
        }
    }

    initAnimations() {
        // Animate floating elements
        this.animateFloatingElements();
        
        // Add scroll animations
        this.setupScrollAnimations();
        
        // Animate progress bars
        this.animateProgressBars();
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

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.action-card, .activity-card, .resource-card, .stat-card');
        
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

    animateProgressBars() {
        const progressFills = document.querySelectorAll('.progress-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetWidth = entry.target.style.width;
                    entry.target.style.width = '0%';
                    setTimeout(() => {
                        entry.target.style.width = targetWidth;
                    }, 200);
                    observer.unobserve(entry.target);
                }
            });
        });

        progressFills.forEach(fill => {
            observer.observe(fill);
        });
    }

    updateUI() {
        // Update learner name
        const learnerNameElement = document.getElementById('learnerName');
        if (learnerNameElement && this.userData.name) {
            learnerNameElement.textContent = this.userData.name;
        }

        // Update points
        const pointsElement = document.getElementById('pointsCount');
        if (pointsElement) {
            pointsElement.textContent = `${this.points} Points`;
        }
    }

    handleSubjectSelection(card) {
        const subject = card.getAttribute('data-subject');
        this.trackInteraction('subject_selected', { subject });
        
        // Add selection animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);

        // Navigate to subject-specific content
        this.showSubjectContent(subject);
    }

    showSubjectContent(subject) {
        const subjectContent = {
            mathematics: {
                title: 'Mathematics Adventure',
                activities: ['Counting Games', 'Shape Recognition', 'Simple Addition', 'Pattern Making']
            },
            language: {
                title: 'Language Journey',
                activities: ['Story Time', 'Word Building', 'Rhyming Games', 'Picture Reading']
            },
            science: {
                title: 'Science Discovery',
                activities: ['Plant Growing', 'Animal Homes', 'Weather Watch', 'Color Mixing']
            },
            art: {
                title: 'Creative Art Studio',
                activities: ['Drawing Fun', 'Color Exploration', 'Craft Making', 'Music & Movement']
            }
        };

        const content = subjectContent[subject];
        if (content) {
            this.showActivityModal(content.title, content.activities);
        }
    }

    handleActivityStart(e) {
        e.preventDefault();
        const button = e.target;
        const activityCard = button.closest('.activity-card');
        const activityTitle = activityCard.querySelector('h3').textContent;
        
        this.trackInteraction('activity_started', { activity: activityTitle });
        
        // Show loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        button.disabled = true;

        // Simulate loading activity
        setTimeout(() => {
            this.startActivity(activityTitle);
            button.innerHTML = 'Start Activity';
            button.disabled = false;
        }, 1500);
    }

    startActivity(activityTitle) {
        this.currentActivity = {
            title: activityTitle,
            startTime: new Date().toISOString()
        };

        // Create simple activity interface
        const activityContent = this.createActivityInterface(activityTitle);
        this.showActivityModal(activityTitle, activityContent);
    }

    createActivityInterface(activityTitle) {
        const activities = {
            'Shape Recognition': `
                <div class="activity-interface">
                    <h3>Find the Circles!</h3>
                    <div class="shapes-game">
                        <div class="shape circle" onclick="foundationPhase.checkAnswer('circle', this)">⭕</div>
                        <div class="shape square" onclick="foundationPhase.checkAnswer('square', this)">⬜</div>
                        <div class="shape circle" onclick="foundationPhase.checkAnswer('circle', this)">🔵</div>
                        <div class="shape triangle" onclick="foundationPhase.checkAnswer('triangle', this)">🔺</div>
                    </div>
                    <div class="activity-feedback">
                        <p id="feedbackText">Click on all the circles!</p>
                    </div>
                </div>
            `,
            'Word Building': `
                <div class="activity-interface">
                    <h3>Build the word: CAT</h3>
                    <div class="word-game">
                        <div class="letter-tiles">
                            <div class="letter-tile" draggable="true" data-letter="C">C</div>
                            <div class="letter-tile" draggable="true" data-letter="A">A</div>
                            <div class="letter-tile" draggable="true" data-letter="T">T</div>
                            <div class="letter-tile" draggable="true" data-letter="M">M</div>
                        </div>
                        <div class="word-slots">
                            <div class="word-slot" data-position="0"></div>
                            <div class="word-slot" data-position="1"></div>
                            <div class="word-slot" data-position="2"></div>
                        </div>
                    </div>
                    <div class="activity-feedback">
                        <p id="feedbackText">Drag the letters to spell CAT!</p>
                    </div>
                </div>
            `,
            'Plant Growing': `
                <div class="activity-interface">
                    <h3>Help the Plant Grow!</h3>
                    <div class="plant-game">
                        <div class="plant-container">
                            <div class="plant" id="plantStage1">🌱</div>
                        </div>
                        <div class="plant-actions">
                            <button onclick="foundationPhase.waterPlant()" class="action-btn">💧 Water</button>
                            <button onclick="foundationPhase.giveSunlight()" class="action-btn">☀️ Sunlight</button>
                            <button onclick="foundationPhase.addSoil()" class="action-btn">🌱 Soil</button>
                        </div>
                    </div>
                    <div class="activity-feedback">
                        <p id="feedbackText">Take care of your plant!</p>
                    </div>
                </div>
            `
        };

        return activities[activityTitle] || `
            <div class="activity-interface">
                <h3>${activityTitle}</h3>
                <p>Great job starting this activity!</p>
                <p>Keep up the excellent work!</p>
                <button onclick="foundationPhase.completeActivity()" class="complete-btn">Complete Activity</button>
            </div>
        `;
    }

    handleResourceClick(card) {
        const resourceType = card.querySelector('h3').textContent;
        this.trackInteraction('resource_accessed', { resource: resourceType });
        
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);

        // Show resource content
        this.showResourceContent(resourceType);
    }

    showResourceContent(resourceType) {
        const resources = {
            'Video Lessons': ['Math Videos', 'Story Time Videos', 'Science Experiments', 'Art Tutorials'],
            'Educational Games': ['Math Games', 'Word Games', 'Science Games', 'Puzzle Games'],
            'Audio Stories': ['Bedtime Stories', 'Adventure Stories', 'Learning Stories', 'Fun Stories'],
            'Worksheets': ['Math Worksheets', 'Writing Practice', 'Coloring Pages', 'Puzzle Sheets']
        };

        const content = resources[resourceType] || [];
        this.showActivityModal(resourceType, content.map(item => `<div class="resource-item">📚 ${item}</div>`).join(''));
    }

    showActivityModal(title, content) {
        const modal = document.getElementById('activityModal');
        const modalTitle = document.getElementById('activityTitle');
        const modalContent = document.getElementById('activityContent');

        if (modal && modalTitle && modalContent) {
            modalTitle.textContent = title;
            modalContent.innerHTML = Array.isArray(content) ? content.join('') : content;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Initialize drag and drop if needed
            this.initDragAndDrop();
        }
    }

    closeModal() {
        const modal = document.getElementById('activityModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    initDragAndDrop() {
        const letterTiles = document.querySelectorAll('.letter-tile');
        const wordSlots = document.querySelectorAll('.word-slot');

        if (letterTiles.length === 0 || wordSlots.length === 0) return;

        letterTiles.forEach(tile => {
            tile.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('letter', e.target.dataset.letter);
                e.target.style.opacity = '0.5';
            });

            tile.addEventListener('dragend', (e) => {
                e.target.style.opacity = '';
            });
        });

        wordSlots.forEach(slot => {
            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                slot.style.background = 'rgba(30, 58, 138, 0.1)';
            });

            slot.addEventListener('dragleave', (e) => {
                slot.style.background = '';
            });

            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                const letter = e.dataTransfer.getData('letter');
                slot.textContent = letter;
                slot.style.background = '';
                this.checkWord();
            });
        });
    }

    checkAnswer(expected, element) {
        const feedbackText = document.getElementById('feedbackText');
        if (element.classList.contains(expected)) {
            feedbackText.textContent = '🎉 Correct! Great job!';
            element.style.background = 'rgba(76, 175, 80, 0.2)';
            this.addPoints(10);
        } else {
            feedbackText.textContent = '😊 Try again! Look for circles!';
            element.style.background = 'rgba(227, 30, 36, 0.2)';
            setTimeout(() => {
                element.style.background = '';
            }, 1000);
        }
    }

    checkWord() {
        const wordSlots = document.querySelectorAll('.word-slot');
        const word = Array.from(wordSlots).map(slot => slot.textContent).join('');
        const feedbackText = document.getElementById('feedbackText');
        
        if (word === 'CAT') {
            feedbackText.textContent = '🎉 Excellent! You spelled CAT!';
            this.addPoints(20);
            setTimeout(() => this.completeActivity(), 2000);
        } else if (word.length === 3) {
            feedbackText.textContent = 'Almost there! Try again!';
        }
    }

    waterPlant() {
        const feedbackText = document.getElementById('feedbackText');
        feedbackText.textContent = '💧 Good! The plant likes water!';
        this.updatePlantStage();
    }

    giveSunlight() {
        const feedbackText = document.getElementById('feedbackText');
        feedbackText.textContent = '☀️ Perfect! Plants need sunlight!';
        this.updatePlantStage();
    }

    addSoil() {
        const feedbackText = document.getElementById('feedbackText');
        feedbackText.textContent = '🌱 Great! Rich soil helps plants grow!';
        this.updatePlantStage();
    }

    updatePlantStage() {
        const plant = document.getElementById('plantStage1');
        if (!plant) return;

        const stages = ['🌱', '🌿', '🌾', '🌻'];
        const currentStage = parseInt(plant.dataset.stage || '0');
        
        if (currentStage < stages.length - 1) {
            plant.dataset.stage = currentStage + 1;
            plant.textContent = stages[currentStage + 1];
            this.addPoints(5);
        }

        if (currentStage >= stages.length - 2) {
            setTimeout(() => this.completeActivity(), 2000);
        }
    }

    completeActivity() {
        if (this.currentActivity) {
            this.addPoints(50);
            this.trackInteraction('activity_completed', {
                activity: this.currentActivity.title,
                duration: Date.now() - new Date(this.currentActivity.startTime).getTime()
            });
            
            // Show success message
            const feedbackText = document.getElementById('feedbackText');
            if (feedbackText) {
                feedbackText.textContent = '🎉 Activity Complete! You earned 50 points!';
            }

            // Close modal after delay
            setTimeout(() => {
                this.closeModal();
                this.updateUI();
            }, 2000);
        }
    }

    addPoints(points) {
        this.points += points;
        this.saveProgress();
        this.updateUI();
        
        // Show points animation
        this.showPointsAnimation(points);
    }

    showPointsAnimation(points) {
        const pointsElement = document.getElementById('pointsCount');
        if (pointsElement) {
            pointsElement.style.transform = 'scale(1.2)';
            pointsElement.style.color = 'var(--accent-yellow)';
            setTimeout(() => {
                pointsElement.style.transform = '';
                pointsElement.style.color = '';
            }, 500);
        }
    }

    saveProgress() {
        const progressData = {
            points: this.points,
            lastActivity: this.currentActivity?.title,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('foundationProgress', JSON.stringify(progressData));
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    showUserProfile() {
        const profileContent = `
            <div class="user-profile">
                <h3>My Profile</h3>
                <div class="profile-info">
                    <p><strong>Name:</strong> ${this.userData.name || 'Young Explorer'}</p>
                    <p><strong>Grade:</strong> Foundation Phase (Grade R-3)</p>
                    <p><strong>Total Points:</strong> ${this.points}</p>
                    <p><strong>Activities Completed:</strong> ${Math.floor(this.points / 50)}</p>
                </div>
                <button onclick="foundationPhase.closeModal()" class="close-profile-btn">Close</button>
            </div>
        `;
        this.showActivityModal('My Profile', profileContent);
    }

    trackInteraction(event, data) {
        const interactionData = {
            event: event,
            userType: this.userData.userType,
            grade: this.userData.grade,
            data: data,
            timestamp: new Date().toISOString()
        };

        // Send analytics data
        this.sendAnalyticsData(interactionData);
    }

    async sendAnalyticsData(data) {
        try {
            const response = await fetch('/api/analytics/foundation-phase', {
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
}

// Add activity-specific styles
const activityStyles = `
    <style>
    .activity-interface {
        text-align: center;
        padding: 20px;
    }
    
    .shapes-game {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin: 20px 0;
    }
    
    .shape {
        font-size: 3rem;
        padding: 20px;
        border: 2px solid var(--light-bg);
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .shape:hover {
        transform: scale(1.1);
        border-color: var(--primary-blue);
    }
    
    .word-game {
        margin: 20px 0;
    }
    
    .letter-tiles {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;
    }
    
    .letter-tile {
        width: 60px;
        height: 60px;
        background: var(--primary-blue);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
        border-radius: 8px;
        cursor: grab;
    }
    
    .word-slots {
        display: flex;
        justify-content: center;
        gap: 10px;
    }
    
    .word-slot {
        width: 60px;
        height: 60px;
        border: 2px dashed var(--primary-blue);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
    }
    
    .plant-game {
        margin: 20px 0;
    }
    
    .plant-container {
        margin: 20px 0;
    }
    
    .plant {
        font-size: 5rem;
        transition: all 0.5s ease;
    }
    
    .plant-actions {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin: 20px 0;
    }
    
    .action-btn {
        background: var(--accent-yellow);
        border: none;
        border-radius: 25px;
        padding: 10px 20px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .action-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(244, 196, 48, 0.3);
    }
    
    .activity-feedback {
        margin-top: 20px;
        padding: 15px;
        background: var(--light-bg);
        border-radius: 10px;
    }
    
    .complete-btn {
        background: linear-gradient(135deg, var(--accent-yellow), var(--accent-red));
        color: white;
        border: none;
        border-radius: 25px;
        padding: 15px 30px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        margin-top: 20px;
    }
    
    .resource-item {
        padding: 15px;
        margin: 10px 0;
        background: var(--light-bg);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .resource-item:hover {
        background: var(--primary-blue);
        color: white;
    }
    
    .user-profile {
        text-align: center;
    }
    
    .profile-info {
        text-align: left;
        margin: 20px 0;
    }
    
    .profile-info p {
        margin: 10px 0;
        padding: 10px;
        background: var(--light-bg);
        border-radius: 5px;
    }
    
    .close-profile-btn {
        background: var(--primary-blue);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 20px;
        cursor: pointer;
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', activityStyles);

// Initialize the foundation phase
let foundationPhase;
document.addEventListener('DOMContentLoaded', () => {
    foundationPhase = new FoundationPhase();
});

// Error handling
window.addEventListener('error', (e) => {
    console.warn('Foundation phase error:', e.error);
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Foundation phase page loaded in ${loadTime.toFixed(2)}ms`);
});
