// Intermediate Phase JavaScript for Grade 4-6 Learners
class IntermediatePhase {
    constructor() {
        this.userData = {};
        this.currentProject = null;
        this.points = 850;
        this.level = 5;
        this.streak = 7;
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
            this.userData = {
                name: 'Intermediate Learner',
                userType: 'learner',
                grade: 'intermediate'
            };
        }

        // Load progress data
        const progressData = localStorage.getItem('intermediateProgress');
        if (progressData) {
            const progress = JSON.parse(progressData);
            this.points = progress.points || 850;
            this.level = progress.level || 5;
            this.streak = progress.streak || 7;
        }
    }

    setupEventListeners() {
        // Subject cards
        const subjectCards = document.querySelectorAll('.subject-card');
        subjectCards.forEach(card => {
            card.addEventListener('click', () => this.handleSubjectSelection(card));
        });

        // Project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', () => this.handleProjectSelection(card));
        });

        // Challenge cards
        const challengeCards = document.querySelectorAll('.challenge-card');
        challengeCards.forEach(card => {
            card.addEventListener('click', () => this.handleChallengeSelection(card));
        });

        // Start project buttons
        const startProjectBtns = document.querySelectorAll('.start-project-btn');
        startProjectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleProjectStart(e);
            });
        });

        // Join challenge buttons
        const joinChallengeBtns = document.querySelectorAll('.join-challenge-btn');
        joinChallengeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleChallengeJoin(e);
            });
        });

        // Modal controls
        const modalClose = document.getElementById('modalClose');
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }

        // Close modal on outside click
        const modal = document.getElementById('projectModal');
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
        
        // Animate circular progress
        this.animateCircularProgress();
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
        const animatedElements = document.querySelectorAll('.subject-card, .project-card, .challenge-card, .stat-item');
        
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

    animateCircularProgress() {
        const circularProgress = document.querySelector('.circular-progress');
        if (!circularProgress) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = entry.target.querySelector('.circle');
                    const percentage = entry.target.querySelector('.percentage');
                    
                    if (circle && percentage) {
                        const targetPercent = 68;
                        const circumference = 2 * Math.PI * 15.9155;
                        const offset = circumference - (targetPercent / 100) * circumference;
                        
                        circle.style.strokeDasharray = `${circumference} ${circumference}`;
                        circle.style.strokeDashoffset = circumference;
                        
                        setTimeout(() => {
                            circle.style.transition = 'stroke-dashoffset 1s ease-in-out';
                            circle.style.strokeDashoffset = offset;
                        }, 200);
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(circularProgress);
    }

    updateUI() {
        // Update stats
        const levelElement = document.getElementById('level');
        const streakElement = document.getElementById('streak');
        const pointsElement = document.getElementById('points');

        if (levelElement) levelElement.textContent = `Level ${this.level}`;
        if (streakElement) streakElement.textContent = `${this.streak} Days`;
        if (pointsElement) pointsElement.textContent = this.points;
    }

    handleSubjectSelection(card) {
        const subject = card.getAttribute('data-subject');
        this.trackInteraction('subject_selected', { subject });
        
        // Add selection animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);

        // Navigate to subject-specific content
        this.showSubjectContent(subject);
    }

    showSubjectContent(subject) {
        const subjectContent = {
            mathematics: {
                title: 'Mathematics - Intermediate Level',
                topics: ['Fractions and Decimals', 'Geometry and Measurement', 'Data Handling', 'Problem Solving'],
                activities: ['Interactive Math Games', 'Real-world Problems', 'Math Puzzles', 'Video Tutorials']
            },
            language: {
                title: 'Language Arts - Intermediate Level',
                topics: ['Reading Comprehension', 'Writing Skills', 'Grammar and Punctuation', 'Creative Writing'],
                activities: ['Story Writing', 'Reading Exercises', 'Grammar Games', 'Vocabulary Building']
            },
            science: {
                title: 'Natural Sciences - Intermediate Level',
                topics: ['Life Sciences', 'Physical Sciences', 'Earth Sciences', 'Scientific Method'],
                activities: ['Virtual Experiments', 'Science Projects', 'Nature Exploration', 'Research Tasks']
            },
            social: {
                title: 'Social Sciences - Intermediate Level',
                topics: ['History', 'Geography', 'Social Studies', 'Cultural Studies'],
                activities: ['Timeline Projects', 'Map Skills', 'Cultural Research', 'Current Events']
            },
            technology: {
                title: 'Technology - Intermediate Level',
                topics: ['Digital Literacy', 'Coding Basics', 'Internet Safety', 'Digital Citizenship'],
                activities: ['Coding Exercises', 'Digital Art', 'Research Projects', 'Online Safety Games']
            },
            arts: {
                title: 'Creative Arts - Intermediate Level',
                topics: ['Visual Arts', 'Music', 'Drama', 'Creative Movement'],
                activities: ['Art Projects', 'Music Composition', 'Drama Activities', 'Creative Expression']
            }
        };

        const content = subjectContent[subject];
        if (content) {
            this.showProjectModal(content.title, this.createSubjectInterface(content));
        }
    }

    createSubjectInterface(content) {
        return `
            <div class="subject-interface">
                <div class="topics-section">
                    <h3>Topics</h3>
                    <div class="topics-grid">
                        ${content.topics.map(topic => `
                            <div class="topic-item">
                                <i class="fas fa-book"></i>
                                <span>${topic}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="activities-section">
                    <h3>Activities</h3>
                    <div class="activities-grid">
                        ${content.activities.map(activity => `
                            <div class="activity-item">
                                <i class="fas fa-play-circle"></i>
                                <span>${activity}</span>
                                <button class="start-activity-btn" onclick="intermediatePhase.startActivity('${activity}')">Start</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    handleProjectSelection(card) {
        const projectTitle = card.querySelector('h3').textContent;
        this.trackInteraction('project_viewed', { project: projectTitle });
        
        // Add selection animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    }

    handleProjectStart(e) {
        e.preventDefault();
        const button = e.target;
        const projectCard = button.closest('.project-card');
        const projectTitle = projectCard.querySelector('h3').textContent;
        
        this.trackInteraction('project_started', { project: projectTitle });
        
        // Show loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        button.disabled = true;

        // Simulate loading project
        setTimeout(() => {
            this.startProject(projectTitle);
            button.innerHTML = 'Start Project';
            button.disabled = false;
        }, 1500);
    }

    startProject(projectTitle) {
        this.currentProject = {
            title: projectTitle,
            startTime: new Date().toISOString()
        };

        // Create project interface
        const projectContent = this.createProjectInterface(projectTitle);
        this.showProjectModal(projectTitle, projectContent);
    }

    createProjectInterface(projectTitle) {
        const projects = {
            'Build a Simple Robot': `
                <div class="project-interface">
                    <h3>Robot Building Project</h3>
                    <div class="project-steps">
                        <div class="step completed">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h4>Gather Materials</h4>
                                <p>Collect all necessary materials for your robot.</p>
                            </div>
                        </div>
                        <div class="step current">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h4>Build the Base</h4>
                                <p>Construct the base structure of your robot.</p>
                                <button class="step-complete-btn" onclick="intermediatePhase.completeStep(2)">Complete Step</button>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h4>Add Electronics</h4>
                                <p>Install the electronic components.</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">4</div>
                            <div class="step-content">
                                <h4>Test and Refine</h4>
                                <p>Test your robot and make improvements.</p>
                            </div>
                        </div>
                    </div>
                    <div class="project-resources">
                        <h4>Resources</h4>
                        <div class="resource-links">
                            <a href="#" class="resource-link"><i class="fas fa-video"></i> Video Tutorial</a>
                            <a href="#" class="resource-link"><i class="fas fa-file-pdf"></i> Project Guide</a>
                            <a href="#" class="resource-link"><i class="fas fa-tools"></i> Materials List</a>
                        </div>
                    </div>
                </div>
            `,
            'Science Investigation': `
                <div class="project-interface">
                    <h3>Science Investigation</h3>
                    <div class="investigation-interface">
                        <div class="investigation-steps">
                            <div class="inv-step">
                                <h4>🔍 Ask a Question</h4>
                                <p>What do you want to investigate?</p>
                                <input type="text" placeholder="Enter your question..." class="inv-input">
                            </div>
                            <div class="inv-step">
                                <h4>🔬 Conduct Research</h4>
                                <p>Gather information about your topic.</p>
                                <textarea placeholder="Write your research notes..." class="inv-textarea"></textarea>
                            </div>
                            <div class="inv-step">
                                <h4>📊 Record Observations</h4>
                                <p>Document what you observe.</p>
                                <textarea placeholder="Record your observations..." class="inv-textarea"></textarea>
                            </div>
                            <div class="inv-step">
                                <h4>📝 Draw Conclusions</h4>
                                <p>What did you learn?</p>
                                <textarea placeholder="Write your conclusions..." class="inv-textarea"></textarea>
                            </div>
                        </div>
                        <button class="submit-investigation-btn" onclick="intermediatePhase.submitInvestigation()">Submit Investigation</button>
                    </div>
                </div>
            `,
            'Mathematics Challenge': `
                <div class="project-interface">
                    <h3>Mathematics Challenge</h3>
                    <div class="math-challenge">
                        <div class="challenge-problem">
                            <h4>Problem 1: The Pizza Party</h4>
                            <p>Sarah is having a pizza party. She orders 3 large pizzas. Each pizza is cut into 8 slices. If each of her 12 friends eats 2 slices, how many slices are left for Sarah?</p>
                        </div>
                        <div class="answer-options">
                            <button class="answer-btn" onclick="intermediatePhase.checkAnswer('A')">A) 0 slices</button>
                            <button class="answer-btn" onclick="intermediatePhase.checkAnswer('B')">B) 2 slices</button>
                            <button class="answer-btn" onclick="intermediatePhase.checkAnswer('C')">C) 4 slices</button>
                            <button class="answer-btn" onclick="intermediatePhase.checkAnswer('D')">D) 6 slices</button>
                        </div>
                        <div class="challenge-feedback">
                            <p id="mathFeedback">Choose your answer!</p>
                        </div>
                        <button class="next-problem-btn" onclick="intermediatePhase.nextProblem()" style="display: none;">Next Problem</button>
                    </div>
                </div>
            `
        };

        return projects[projectTitle] || `
            <div class="project-interface">
                <h3>${projectTitle}</h3>
                <p>Great choice! This project will help you develop important skills.</p>
                <p>Click the button below to get started!</p>
                <button onclick="intermediatePhase.completeProject()" class="complete-project-btn">Start Project</button>
            </div>
        `;
    }

    handleChallengeSelection(card) {
        const challengeTitle = card.querySelector('h3').textContent;
        this.trackInteraction('challenge_viewed', { challenge: challengeTitle });
        
        // Add selection animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    }

    handleChallengeJoin(e) {
        e.preventDefault();
        const button = e.target;
        const challengeCard = button.closest('.challenge-card');
        const challengeTitle = challengeCard.querySelector('h3').textContent;
        
        this.trackInteraction('challenge_joined', { challenge: challengeTitle });
        
        // Show loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Joining...';
        button.disabled = true;

        // Simulate joining challenge
        setTimeout(() => {
            this.joinChallenge(challengeTitle);
            button.innerHTML = '✓ Joined';
            button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        }, 1500);
    }

    joinChallenge(challengeTitle) {
        this.addPoints(50);
        this.showNotification(`Successfully joined "${challengeTitle}" challenge! +50 points`);
    }

    completeStep(stepNumber) {
        const stepElement = document.querySelector(`.step.current .step-number`);
        if (stepElement) {
            stepElement.parentElement.classList.add('completed');
            stepElement.parentElement.classList.remove('current');
            
            // Move to next step
            const nextStep = stepElement.parentElement.nextElementSibling;
            if (nextStep && nextStep.classList.contains('step')) {
                nextStep.classList.add('current');
            }
            
            this.addPoints(25);
            this.showNotification('Step completed! +25 points');
        }
    }

    checkAnswer(answer) {
        const feedbackElement = document.getElementById('mathFeedback');
        const correctAnswer = 'A'; // Sarah gets 0 slices
        
        if (answer === correctAnswer) {
            feedbackElement.textContent = '🎉 Correct! Sarah gets 0 slices because 12 friends × 2 slices = 24 slices, and 3 pizzas × 8 slices = 24 slices total.';
            feedbackElement.style.color = '#4CAF50';
            this.addPoints(30);
            
            // Show next problem button
            const nextBtn = document.querySelector('.next-problem-btn');
            if (nextBtn) {
                nextBtn.style.display = 'block';
            }
            
            // Disable answer buttons
            const answerBtns = document.querySelectorAll('.answer-btn');
            answerBtns.forEach(btn => btn.disabled = true);
        } else {
            feedbackElement.textContent = '❌ Not quite right. Try again! Think about how many total slices there are and how many are eaten.';
            feedbackElement.style.color = '#e31e24';
        }
    }

    nextProblem() {
        // Load next problem (simplified for demo)
        const challengeProblem = document.querySelector('.challenge-problem');
        const answerOptions = document.querySelector('.answer-options');
        const feedbackElement = document.getElementById('mathFeedback');
        const nextBtn = document.querySelector('.next-problem-btn');
        
        challengeProblem.innerHTML = `
            <h4>Problem 2: The Book Club</h4>
            <p>A book club has 15 members. Each member reads 2 books per month. How many books does the club read in 3 months?</p>
        `;
        
        answerOptions.innerHTML = `
            <button class="answer-btn" onclick="intermediatePhase.checkAnswer2('A')">A) 60 books</button>
            <button class="answer-btn" onclick="intermediatePhase.checkAnswer2('B')">B) 75 books</button>
            <button class="answer-btn" onclick="intermediatePhase.checkAnswer2('C')">C) 90 books</button>
            <button class="answer-btn" onclick="intermediatePhase.checkAnswer2('D')">D) 105 books</button>
        `;
        
        feedbackElement.textContent = 'Choose your answer!';
        feedbackElement.style.color = '';
        nextBtn.style.display = 'none';
    }

    checkAnswer2(answer) {
        const feedbackElement = document.getElementById('mathFeedback');
        const correctAnswer = 'C'; // 15 × 2 × 3 = 90
        
        if (answer === correctAnswer) {
            feedbackElement.textContent = '🎉 Correct! 15 members × 2 books × 3 months = 90 books total.';
            feedbackElement.style.color = '#4CAF50';
            this.addPoints(30);
            this.showNotification('Math challenge completed! +30 points');
        } else {
            feedbackElement.textContent = '❌ Not quite right. Remember: members × books per month × months = total books.';
            feedbackElement.style.color = '#e31e24';
        }
    }

    submitInvestigation() {
        this.addPoints(100);
        this.showNotification('Investigation submitted! +100 points');
        this.closeModal();
    }

    startActivity(activity) {
        this.addPoints(20);
        this.showNotification(`Started "${activity}"! +20 points`);
    }

    completeProject() {
        if (this.currentProject) {
            this.addPoints(200);
            this.showNotification('Project completed! +200 points');
            this.closeModal();
        }
    }

    addPoints(points) {
        this.points += points;
        this.saveProgress();
        this.updateUI();
        
        // Show points animation
        this.showPointsAnimation(points);
        
        // Check for level up
        this.checkLevelUp();
    }

    showPointsAnimation(points) {
        const pointsElement = document.getElementById('points');
        if (pointsElement) {
            pointsElement.style.transform = 'scale(1.2)';
            pointsElement.style.color = 'var(--accent-yellow)';
            setTimeout(() => {
                pointsElement.style.transform = '';
                pointsElement.style.color = '';
            }, 500);
        }
    }

    checkLevelUp() {
        const newLevel = Math.floor(this.points / 200) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.showNotification(`🎉 Level Up! You're now Level ${this.level}!`);
        }
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--accent-yellow), var(--accent-red));
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 3000;
            animation: slideIn 0.3s ease;
            font-weight: 600;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    saveProgress() {
        const progressData = {
            points: this.points,
            level: this.level,
            streak: this.streak,
            lastActivity: this.currentProject?.title,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('intermediateProgress', JSON.stringify(progressData));
    }

    showProjectModal(title, content) {
        const modal = document.getElementById('projectModal');
        const modalTitle = document.getElementById('projectTitle');
        const modalContent = document.getElementById('projectContent');

        if (modal && modalTitle && modalContent) {
            modalTitle.textContent = title;
            modalContent.innerHTML = content;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
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
                <div class="profile-stats">
                    <div class="profile-stat">
                        <i class="fas fa-user"></i>
                        <div>
                            <span>${this.userData.name || 'Intermediate Learner'}</span>
                            <small>Name</small>
                        </div>
                    </div>
                    <div class="profile-stat">
                        <i class="fas fa-graduation-cap"></i>
                        <div>
                            <span>Grade 4-6</span>
                            <small>Grade Level</small>
                        </div>
                    </div>
                    <div class="profile-stat">
                        <i class="fas fa-trophy"></i>
                        <div>
                            <span>${this.points}</span>
                            <small>Total Points</small>
                        </div>
                    </div>
                    <div class="profile-stat">
                        <i class="fas fa-star"></i>
                        <div>
                            <span>Level ${this.level}</span>
                            <small>Current Level</small>
                        </div>
                    </div>
                </div>
                <button onclick="intermediatePhase.closeModal()" class="close-profile-btn">Close</button>
            </div>
        `;
        this.showProjectModal('My Profile', profileContent);
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
            const response = await fetch('/api/analytics/intermediate-phase', {
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

// Add interface-specific styles
const interfaceStyles = `
    <style>
    .subject-interface {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        padding: 20px;
    }
    
    .topics-section h3,
    .activities-section h3 {
        color: var(--primary-blue);
        margin-bottom: 20px;
        font-size: 1.3rem;
    }
    
    .topics-grid,
    .activities-grid {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .topic-item,
    .activity-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: var(--light-bg);
        border-radius: 10px;
        transition: all 0.3s ease;
    }
    
    .topic-item:hover,
    .activity-item:hover {
        background: var(--primary-blue);
        color: white;
        transform: translateX(5px);
    }
    
    .topic-item i,
    .activity-item i {
        color: var(--accent-purple);
        font-size: 1.2rem;
    }
    
    .activity-item:hover i {
        color: white;
    }
    
    .start-activity-btn {
        background: var(--accent-yellow);
        border: none;
        border-radius: 5px;
        padding: 5px 15px;
        cursor: pointer;
        font-weight: 600;
        margin-left: auto;
    }
    
    .project-interface {
        padding: 20px;
    }
    
    .project-steps {
        margin-bottom: 30px;
    }
    
    .step {
        display: flex;
        align-items: flex-start;
        gap: 20px;
        margin-bottom: 20px;
        padding: 20px;
        border-radius: 10px;
        transition: all 0.3s ease;
    }
    
    .step.completed {
        background: rgba(76, 175, 80, 0.1);
        border-left: 4px solid #4CAF50;
    }
    
    .step.current {
        background: rgba(30, 58, 138, 0.1);
        border-left: 4px solid var(--primary-blue);
    }
    
    .step-number {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--light-bg);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
    }
    
    .step.completed .step-number {
        background: #4CAF50;
        color: white;
    }
    
    .step.current .step-number {
        background: var(--primary-blue);
        color: white;
    }
    
    .step-content h4 {
        color: var(--primary-blue);
        margin-bottom: 5px;
    }
    
    .step-complete-btn {
        background: var(--accent-yellow);
        border: none;
        border-radius: 5px;
        padding: 8px 15px;
        cursor: pointer;
        font-weight: 600;
        margin-top: 10px;
    }
    
    .project-resources h4 {
        color: var(--primary-blue);
        margin-bottom: 15px;
    }
    
    .resource-links {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
    }
    
    .resource-link {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 15px;
        background: var(--light-bg);
        border-radius: 8px;
        text-decoration: none;
        color: var(--dark-text);
        transition: all 0.3s ease;
    }
    
    .resource-link:hover {
        background: var(--primary-blue);
        color: white;
    }
    
    .investigation-interface {
        padding: 20px;
    }
    
    .investigation-steps {
        display: flex;
        flex-direction: column;
        gap: 25px;
        margin-bottom: 30px;
    }
    
    .inv-step h4 {
        color: var(--primary-blue);
        margin-bottom: 10px;
    }
    
    .inv-input,
    .inv-textarea {
        width: 100%;
        padding: 12px;
        border: 2px solid rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        font-family: inherit;
        resize: vertical;
    }
    
    .inv-textarea {
        min-height: 100px;
    }
    
    .submit-investigation-btn {
        background: linear-gradient(135deg, var(--primary-blue), var(--accent-purple));
        color: white;
        border: none;
        border-radius: 8px;
        padding: 15px 30px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
    }
    
    .math-challenge {
        padding: 20px;
        text-align: center;
    }
    
    .challenge-problem {
        background: var(--light-bg);
        padding: 25px;
        border-radius: 15px;
        margin-bottom: 30px;
    }
    
    .challenge-problem h4 {
        color: var(--primary-blue);
        margin-bottom: 15px;
    }
    
    .answer-options {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-bottom: 20px;
    }
    
    .answer-btn {
        background: var(--white);
        border: 2px solid var(--primary-blue);
        border-radius: 8px;
        padding: 15px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .answer-btn:hover:not(:disabled) {
        background: var(--primary-blue);
        color: white;
    }
    
    .answer-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    .challenge-feedback {
        background: var(--light-bg);
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
    }
    
    .next-problem-btn {
        background: var(--accent-yellow);
        border: none;
        border-radius: 8px;
        padding: 12px 25px;
        font-weight: 600;
        cursor: pointer;
    }
    
    .complete-project-btn {
        background: linear-gradient(135deg, var(--accent-yellow), var(--accent-red));
        color: white;
        border: none;
        border-radius: 8px;
        padding: 15px 30px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        margin-top: 20px;
    }
    
    .user-profile {
        text-align: center;
        padding: 20px;
    }
    
    .profile-stats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin: 20px 0;
    }
    
    .profile-stat {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: var(--light-bg);
        border-radius: 10px;
    }
    
    .profile-stat i {
        font-size: 1.5rem;
        color: var(--primary-blue);
    }
    
    .profile-stat div {
        display: flex;
        flex-direction: column;
    }
    
    .profile-stat div span {
        font-weight: 600;
        color: var(--dark-text);
    }
    
    .profile-stat div small {
        color: var(--dark-text);
        opacity: 0.7;
    }
    
    .close-profile-btn {
        background: var(--primary-blue);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 20px;
        cursor: pointer;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .subject-interface {
            grid-template-columns: 1fr;
            gap: 20px;
        }
        
        .answer-options {
            grid-template-columns: 1fr;
        }
        
        .profile-stats {
            grid-template-columns: 1fr;
        }
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', interfaceStyles);

// Initialize intermediate phase
let intermediatePhase;
document.addEventListener('DOMContentLoaded', () => {
    intermediatePhase = new IntermediatePhase();
});

// Error handling
window.addEventListener('error', (e) => {
    console.warn('Intermediate phase error:', e.error);
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Intermediate phase page loaded in ${loadTime.toFixed(2)}ms`);
});
