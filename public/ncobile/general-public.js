// General Public Resource Hub JavaScript
class GeneralPublicHub {
    constructor() {
        this.currentFilters = {
            level: 'all',
            term: 'all',
            contentType: 'all',
            subject: 'all',
            search: ''
        };
        this.resources = [];
        this.currentPage = 1;
        this.resourcesPerPage = 12;
        this.init();
    }

    init() {
        this.loadResources();
        this.setupEventListeners();
        this.initAnimations();
        this.updateResourceDisplay();
    }

    loadResources() {
        // Mock resource data - in production, this would come from an API
        this.resources = [
            {
                id: 1,
                title: 'Introduction to Algebra',
                description: 'Comprehensive guide to basic algebraic concepts for Grade 8-9 students',
                type: 'tutorial',
                term: 2,
                subject: 'mathematics',
                level: 'senior',
                thumbnail: 'fa-calculator',
                duration: '45 min'
            },
            {
                id: 2,
                title: 'Physics Lab: Mechanics',
                description: 'Hands-on experiments demonstrating fundamental physics principles',
                type: 'lab-demonstration',
                term: 3,
                subject: 'physics',
                level: 'advanced',
                thumbnail: 'fa-atom',
                duration: '30 min'
            },
            {
                id: 3,
                title: 'Creative Writing Workshop',
                description: 'Develop your narrative skills with practical exercises and examples',
                type: 'video',
                term: 1,
                subject: 'language',
                level: 'intermediate',
                thumbnail: 'fa-pen',
                duration: '60 min'
            },
            {
                id: 4,
                title: 'Grade 12 Mathematics Exam Papers',
                description: 'Past examination papers with memoranda and marking guidelines',
                type: 'exam-papers',
                term: 4,
                subject: 'mathematics',
                level: 'advanced',
                thumbnail: 'fa-file-alt',
                duration: '120 min'
            },
            {
                id: 5,
                title: 'Chemistry: Organic Compounds',
                description: 'Understanding organic chemistry structures and reactions',
                type: 'video',
                term: 2,
                subject: 'chemistry',
                level: 'advanced',
                thumbnail: 'fa-flask',
                duration: '55 min'
            },
            {
                id: 6,
                title: 'Biology: Ecosystems',
                description: 'Explore different ecosystems and biodiversity in South Africa',
                type: 'tutorial',
                term: 1,
                subject: 'biology',
                level: 'senior',
                thumbnail: 'fa-leaf',
                duration: '40 min'
            },
            {
                id: 7,
                title: 'Computer Science: Python Basics',
                description: 'Introduction to programming with Python for beginners',
                type: 'tutorial',
                term: 3,
                subject: 'computer-science',
                level: 'intermediate',
                thumbnail: 'fa-laptop-code',
                duration: '90 min'
            },
            {
                id: 8,
                title: 'Teacher Development: Assessment Strategies',
                description: 'Effective assessment methods for modern classrooms',
                type: 'webinar',
                term: 2,
                subject: 'professional-development',
                level: 'teachers',
                thumbnail: 'fa-chalkboard-teacher',
                duration: '75 min'
            },
            {
                id: 9,
                title: 'STEAM Careers Guide',
                description: 'Career opportunities in STEAM fields for students',
                type: 'guide',
                term: 1,
                subject: 'careers',
                level: 'general',
                thumbnail: 'fa-briefcase',
                duration: '30 min'
            },
            {
                id: 10,
                title: 'Mathematics Problem Solving Techniques',
                description: 'Advanced problem-solving strategies for Grade 11-12',
                type: 'tutorial',
                term: 3,
                subject: 'mathematics',
                level: 'advanced',
                thumbnail: 'fa-brain',
                duration: '50 min'
            },
            {
                id: 11,
                title: 'Science Fair Project Ideas',
                description: 'Innovative project ideas for school science fairs',
                type: 'guide',
                term: 2,
                subject: 'science',
                level: 'senior',
                thumbnail: 'fa-lightbulb',
                duration: '25 min'
            },
            {
                id: 12,
                title: 'Digital Art Fundamentals',
                description: 'Introduction to digital art tools and techniques',
                type: 'video',
                term: 4,
                subject: 'arts',
                level: 'intermediate',
                thumbnail: 'fa-palette',
                duration: '45 min'
            }
        ];
    }

    setupEventListeners() {
        // Level cards
        const levelCards = document.querySelectorAll('.level-card');
        levelCards.forEach(card => {
            card.addEventListener('click', () => this.handleLevelSelection(card));
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch(e.target.value);
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.handleSearch(searchInput.value);
            });
        }

        // Filter pills
        const termFilters = document.querySelectorAll('#termFilter .filter-pill');
        termFilters.forEach(pill => {
            pill.addEventListener('click', () => this.handleTermFilter(pill));
        });

        // Dropdown filters
        const contentTypeFilter = document.getElementById('contentTypeFilter');
        const subjectFilter = document.getElementById('subjectFilter');

        if (contentTypeFilter) {
            contentTypeFilter.addEventListener('change', (e) => this.handleContentTypeFilter(e.target.value));
        }

        if (subjectFilter) {
            subjectFilter.addEventListener('change', (e) => this.handleSubjectFilter(e.target.value));
        }

        // Clear filters
        const clearFiltersBtn = document.getElementById('clearFilters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => this.clearAllFilters());
        }

        // Load more
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreResources());
        }

        // Modal controls
        const modalClose = document.getElementById('modalClose');
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }

        // Close modal on outside click
        const modal = document.getElementById('resourceModal');
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

        // Scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                document.getElementById('resources').scrollIntoView({ behavior: 'smooth' });
            });
        }

        // User avatar
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
        
        // Initialize countdown timers
        this.initCountdownTimers();
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
        const animatedElements = document.querySelectorAll('.level-card, .resource-card, .webinar-card, .scholarship-card, .event-card');
        
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

    initCountdownTimers() {
        const countdowns = document.querySelectorAll('.countdown');
        countdowns.forEach(countdown => {
            const deadline = countdown.getAttribute('data-deadline');
            if (deadline) {
                this.updateCountdown(countdown, deadline);
                setInterval(() => this.updateCountdown(countdown, deadline), 1000 * 60 * 60); // Update every hour
            }
        });
    }

    updateCountdown(element, deadline) {
        const now = new Date();
        const target = new Date(deadline);
        const diff = target - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            element.textContent = `${days} days left`;
        } else {
            element.textContent = 'Expired';
            element.style.color = 'var(--accent-red)';
        }
    }

    handleLevelSelection(card) {
        const level = card.getAttribute('data-level');
        this.currentFilters.level = level;
        
        // Update active state
        document.querySelectorAll('.level-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        // Track interaction
        this.trackInteraction('level_selected', { level });
        
        // Scroll to resources
        document.getElementById('resources').scrollIntoView({ behavior: 'smooth' });
        
        // Update display
        this.updateResourceDisplay();
    }

    handleSearch(searchTerm) {
        this.currentFilters.search = searchTerm.toLowerCase();
        this.currentPage = 1;
        this.updateResourceDisplay();
        
        // Track search
        if (searchTerm.length > 2) {
            this.trackInteraction('search_performed', { searchTerm });
        }
    }

    handleTermFilter(pill) {
        // Update active state
        document.querySelectorAll('#termFilter .filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        
        const term = pill.getAttribute('data-term');
        this.currentFilters.term = term;
        this.currentPage = 1;
        this.updateResourceDisplay();
        
        // Track filter
        this.trackInteraction('term_filter', { term });
    }

    handleContentTypeFilter(contentType) {
        this.currentFilters.contentType = contentType;
        this.currentPage = 1;
        this.updateResourceDisplay();
        
        // Track filter
        this.trackInteraction('content_type_filter', { contentType });
    }

    handleSubjectFilter(subject) {
        this.currentFilters.subject = subject;
        this.currentPage = 1;
        this.updateResourceDisplay();
        
        // Track filter
        this.trackInteraction('subject_filter', { subject });
    }

    clearAllFilters() {
        this.currentFilters = {
            level: 'all',
            term: 'all',
            contentType: 'all',
            subject: 'all',
            search: ''
        };
        
        // Reset UI
        document.getElementById('searchInput').value = '';
        document.getElementById('contentTypeFilter').value = 'all';
        document.getElementById('subjectFilter').value = 'all';
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        document.querySelector('.filter-pill[data-term="all"]').classList.add('active');
        document.querySelectorAll('.level-card').forEach(c => c.classList.remove('active'));
        
        this.currentPage = 1;
        this.updateResourceDisplay();
        
        // Track action
        this.trackInteraction('filters_cleared', {});
    }

    getFilteredResources() {
        return this.resources.filter(resource => {
            // Level filter
            if (this.currentFilters.level !== 'all' && resource.level !== this.currentFilters.level) {
                return false;
            }
            
            // Term filter
            if (this.currentFilters.term !== 'all' && resource.term !== parseInt(this.currentFilters.term)) {
                return false;
            }
            
            // Content type filter
            if (this.currentFilters.contentType !== 'all' && resource.type !== this.currentFilters.contentType) {
                return false;
            }
            
            // Subject filter
            if (this.currentFilters.subject !== 'all' && resource.subject !== this.currentFilters.subject) {
                return false;
            }
            
            // Search filter
            if (this.currentFilters.search && !resource.title.toLowerCase().includes(this.currentFilters.search) && 
                !resource.description.toLowerCase().includes(this.currentFilters.search)) {
                return false;
            }
            
            return true;
        });
    }

    updateResourceDisplay() {
        const filteredResources = this.getFilteredResources();
        const startIndex = (this.currentPage - 1) * this.resourcesPerPage;
        const endIndex = startIndex + this.resourcesPerPage;
        const resourcesToShow = filteredResources.slice(startIndex, endIndex);
        
        // Update results count
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = `Showing ${filteredResources.length} resource${filteredResources.length !== 1 ? 's' : ''}`;
        }
        
        // Render resources
        this.renderResources(resourcesToShow);
        
        // Update load more button
        this.updateLoadMoreButton(filteredResources.length);
    }

    renderResources(resources) {
        const resourcesGrid = document.getElementById('resourcesGrid');
        if (!resourcesGrid) return;
        
        if (resources.length === 0) {
            resourcesGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No resources found</h3>
                    <p>Try adjusting your filters or search terms</p>
                </div>
            `;
            return;
        }
        
        resourcesGrid.innerHTML = resources.map(resource => `
            <div class="resource-card" data-id="${resource.id}">
                <div class="resource-thumbnail">
                    <i class="fas ${resource.thumbnail}"></i>
                    <span class="resource-tag">${this.formatContentType(resource.type)}</span>
                </div>
                <div class="resource-content">
                    <h3>${resource.title}</h3>
                    <p>${resource.description}</p>
                    <div class="resource-meta">
                        <span class="term-label">Term ${resource.term}</span>
                        <span class="grade-level">${this.formatLevel(resource.level)}</span>
                    </div>
                    <button class="view-resource-btn" onclick="generalPublicHub.viewResource(${resource.id})">
                        View Resource
                    </button>
                </div>
            </div>
        `).join('');
    }

    formatContentType(type) {
        const formats = {
            'video': 'Video',
            'tutorial': 'Tutorial',
            'lab-demonstration': 'Lab Demo',
            'test-papers': 'Test Papers',
            'exam-papers': 'Exam Papers',
            'webinar': 'Webinar',
            'events': 'Event',
            'scholarships': 'Scholarship',
            'past-papers': 'Past Papers',
            'guide': 'Guide'
        };
        return formats[type] || type;
    }

    formatLevel(level) {
        const formats = {
            'foundation': 'Grade R-3',
            'intermediate': 'Grade 4-6',
            'senior': 'Grade 7-9',
            'advanced': 'Grade 10-12',
            'teachers': 'Teachers',
            'general': 'General'
        };
        return formats[level] || level;
    }

    updateLoadMoreButton(totalResources) {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const hasMore = this.currentPage * this.resourcesPerPage < totalResources;
        
        if (loadMoreBtn) {
            loadMoreBtn.style.display = hasMore ? 'inline-flex' : 'none';
        }
    }

    loadMoreResources() {
        this.currentPage++;
        const filteredResources = this.getFilteredResources();
        const startIndex = (this.currentPage - 1) * this.resourcesPerPage;
        const endIndex = startIndex + this.resourcesPerPage;
        const resourcesToShow = filteredResources.slice(startIndex, endIndex);
        
        // Append new resources
        const resourcesGrid = document.getElementById('resourcesGrid');
        const newResourcesHTML = resourcesToShow.map(resource => `
            <div class="resource-card" data-id="${resource.id}">
                <div class="resource-thumbnail">
                    <i class="fas ${resource.thumbnail}"></i>
                    <span class="resource-tag">${this.formatContentType(resource.type)}</span>
                </div>
                <div class="resource-content">
                    <h3>${resource.title}</h3>
                    <p>${resource.description}</p>
                    <div class="resource-meta">
                        <span class="term-label">Term ${resource.term}</span>
                        <span class="grade-level">${this.formatLevel(resource.level)}</span>
                    </div>
                    <button class="view-resource-btn" onclick="generalPublicHub.viewResource(${resource.id})">
                        View Resource
                    </button>
                </div>
            </div>
        `).join('');
        
        resourcesGrid.insertAdjacentHTML('beforeend', newResourcesHTML);
        
        // Update load more button
        this.updateLoadMoreButton(filteredResources.length);
        
        // Track pagination
        this.trackInteraction('load_more', { page: this.currentPage });
    }

    viewResource(resourceId) {
        const resource = this.resources.find(r => r.id === resourceId);
        if (!resource) return;
        
        // Track resource view
        this.trackInteraction('resource_viewed', { resourceId, resourceType: resource.type });
        
        // Show resource modal
        this.showResourceModal(resource);
    }

    showResourceModal(resource) {
        const modal = document.getElementById('resourceModal');
        const modalTitle = document.getElementById('resourceTitle');
        const modalContent = document.getElementById('resourceContent');

        if (modal && modalTitle && modalContent) {
            modalTitle.textContent = resource.title;
            modalContent.innerHTML = `
                <div class="resource-detail">
                    <div class="resource-header">
                        <div class="resource-icon">
                            <i class="fas ${resource.thumbnail}"></i>
                        </div>
                        <div class="resource-info">
                            <h3>${resource.title}</h3>
                            <div class="resource-meta-detail">
                                <span class="meta-tag"><i class="fas fa-tag"></i> ${this.formatContentType(resource.type)}</span>
                                <span class="meta-tag"><i class="fas fa-layer-group"></i> ${this.formatLevel(resource.level)}</span>
                                <span class="meta-tag"><i class="fas fa-calendar"></i> Term ${resource.term}</span>
                                <span class="meta-tag"><i class="fas fa-book"></i> ${resource.subject}</span>
                            </div>
                        </div>
                    </div>
                    <div class="resource-description">
                        <h4>Description</h4>
                        <p>${resource.description}</p>
                    </div>
                    <div class="resource-actions">
                        <button class="action-btn primary" onclick="generalPublicHub.downloadResource(${resource.id})">
                            <i class="fas fa-download"></i> Download Resource
                        </button>
                        <button class="action-btn secondary" onclick="generalPublicHub.shareResource(${resource.id})">
                            <i class="fas fa-share"></i> Share
                        </button>
                        <button class="action-btn secondary" onclick="generalPublicHub.saveResource(${resource.id})">
                            <i class="fas fa-bookmark"></i> Save for Later
                        </button>
                    </div>
                    <div class="resource-stats">
                        <h4>Resource Information</h4>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <i class="fas fa-clock"></i>
                                <span>Duration: ${resource.duration}</span>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-eye"></i>
                                <span>Views: ${Math.floor(Math.random() * 1000) + 100}</span>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-download"></i>
                                <span>Downloads: ${Math.floor(Math.random() * 500) + 50}</span>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-star"></i>
                                <span>Rating: ${(Math.random() * 2 + 3).toFixed(1)}/5</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modal = document.getElementById('resourceModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    downloadResource(resourceId) {
        const resource = this.resources.find(r => r.id === resourceId);
        if (!resource) return;
        
        // Track download
        this.trackInteraction('resource_downloaded', { resourceId, resourceType: resource.type });
        
        // Show notification
        this.showNotification(`Downloading "${resource.title}"...`);
        
        // Simulate download
        setTimeout(() => {
            this.showNotification(`"${resource.title}" downloaded successfully!`);
        }, 2000);
    }

    shareResource(resourceId) {
        const resource = this.resources.find(r => r.id === resourceId);
        if (!resource) return;
        
        // Track share
        this.trackInteraction('resource_shared', { resourceId, resourceType: resource.type });
        
        // Show notification (in production, this would open share dialog)
        this.showNotification(`Share link for "${resource.title}" copied to clipboard!`);
    }

    saveResource(resourceId) {
        const resource = this.resources.find(r => r.id === resourceId);
        if (!resource) return;
        
        // Track save
        this.trackInteraction('resource_saved', { resourceId, resourceType: resource.type });
        
        // Get saved resources from localStorage
        const savedResources = JSON.parse(localStorage.getItem('savedResources') || '[]');
        
        // Add if not already saved
        if (!savedResources.find(r => r.id === resourceId)) {
            savedResources.push(resource);
            localStorage.setItem('savedResources', JSON.stringify(savedResources));
            this.showNotification(`"${resource.title}" saved for later!`);
        } else {
            this.showNotification(`"${resource.title}" is already saved!`);
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
            background: linear-gradient(135deg, var(--primary-blue), var(--accent-purple));
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 3000;
            animation: slideIn 0.3s ease;
            font-weight: 600;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
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
        const savedResources = JSON.parse(localStorage.getItem('savedResources') || '[]');
        const profileContent = `
            <div class="user-profile">
                <h3>My Profile</h3>
                <div class="profile-sections">
                    <div class="profile-section">
                        <h4>Saved Resources</h4>
                        <div class="saved-resources">
                            ${savedResources.length > 0 ? savedResources.map(resource => `
                                <div class="saved-resource">
                                    <i class="fas ${resource.thumbnail}"></i>
                                    <span>${resource.title}</span>
                                    <button onclick="generalPublicHub.viewResource(${resource.id})">View</button>
                                </div>
                            `).join('') : '<p>No saved resources yet</p>'}
                        </div>
                    </div>
                    <div class="profile-section">
                        <h4>Quick Actions</h4>
                        <div class="quick-actions">
                            <button onclick="generalPublicHub.clearSavedResources()">Clear Saved Resources</button>
                            <button onclick="generalPublicHub.exportSavedResources()">Export Saved List</button>
                        </div>
                    </div>
                </div>
                <button onclick="generalPublicHub.closeModal()" class="close-profile-btn">Close</button>
            </div>
        `;
        this.showResourceModal('My Profile', profileContent);
    }

    clearSavedResources() {
        localStorage.removeItem('savedResources');
        this.showNotification('Saved resources cleared!');
        this.closeModal();
    }

    exportSavedResources() {
        const savedResources = JSON.parse(localStorage.getItem('savedResources') || '[]');
        const dataStr = JSON.stringify(savedResources, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'penreach-saved-resources.json';
        link.click();
        URL.revokeObjectURL(url);
        this.showNotification('Saved resources exported!');
    }

    trackInteraction(event, data) {
        const interactionData = {
            event: event,
            userType: 'general_public',
            filters: this.currentFilters,
            data: data,
            timestamp: new Date().toISOString()
        };

        // Send analytics data
        this.sendAnalyticsData(interactionData);
    }

    async sendAnalyticsData(data) {
        try {
            const response = await fetch('/api/analytics/general-public', {
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

// Add additional styles for dynamic content
const additionalStyles = `
    <style>
    .no-results {
        text-align: center;
        padding: 60px 20px;
        color: var(--dark-text);
        opacity: 0.7;
    }
    
    .no-results i {
        font-size: 4rem;
        color: var(--primary-blue);
        margin-bottom: 20px;
    }
    
    .no-results h3 {
        font-size: 1.5rem;
        margin-bottom: 10px;
    }
    
    .resource-detail {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    
    .resource-header {
        display: flex;
        gap: 20px;
        align-items: flex-start;
    }
    
    .resource-icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, var(--primary-blue), var(--accent-purple));
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 2rem;
        flex-shrink: 0;
    }
    
    .resource-info h3 {
        color: var(--primary-blue);
        margin-bottom: 15px;
        font-size: 1.3rem;
    }
    
    .resource-meta-detail {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .meta-tag {
        display: flex;
        align-items: center;
        gap: 5px;
        background: var(--light-bg);
        padding: 5px 12px;
        border-radius: 15px;
        font-size: 0.85rem;
        color: var(--dark-text);
    }
    
    .resource-description h4 {
        color: var(--primary-blue);
        margin-bottom: 10px;
        font-size: 1.1rem;
    }
    
    .resource-actions {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
    }
    
    .action-btn {
        border: none;
        border-radius: 8px;
        padding: 12px 20px;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .action-btn.primary {
        background: linear-gradient(135deg, var(--primary-blue), var(--accent-purple));
        color: white;
    }
    
    .action-btn.secondary {
        background: var(--light-bg);
        color: var(--primary-blue);
        border: 2px solid var(--primary-blue);
    }
    
    .action-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    .resource-stats h4 {
        color: var(--primary-blue);
        margin-bottom: 15px;
        font-size: 1.1rem;
    }
    
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }
    
    .stat-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 15px;
        background: var(--light-bg);
        border-radius: 8px;
    }
    
    .stat-item i {
        color: var(--primary-blue);
    }
    
    .user-profile {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    
    .profile-sections {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 30px;
    }
    
    .profile-section h4 {
        color: var(--primary-blue);
        margin-bottom: 15px;
        font-size: 1.2rem;
    }
    
    .saved-resources {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 300px;
        overflow-y: auto;
    }
    
    .saved-resource {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: var(--light-bg);
        border-radius: 8px;
    }
    
    .saved-resource i {
        color: var(--primary-blue);
    }
    
    .saved-resource span {
        flex: 1;
        font-size: 0.9rem;
    }
    
    .saved-resource button {
        background: var(--primary-blue);
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 0.8rem;
        cursor: pointer;
    }
    
    .quick-actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .quick-actions button {
        background: var(--accent-red);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 15px;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .quick-actions button:hover {
        background: #c91a1f;
    }
    
    .close-profile-btn {
        background: var(--primary-blue);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 12px 25px;
        font-size: 1rem;
        cursor: pointer;
        align-self: flex-start;
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
        .resource-header {
            flex-direction: column;
            text-align: center;
        }
        
        .resource-meta-detail {
            justify-content: center;
        }
        
        .resource-actions {
            justify-content: center;
        }
        
        .stats-grid {
            grid-template-columns: 1fr;
        }
        
        .profile-sections {
            grid-template-columns: 1fr;
        }
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Initialize general public hub
let generalPublicHub;
document.addEventListener('DOMContentLoaded', () => {
    generalPublicHub = new GeneralPublicHub();
});

// Error handling
window.addEventListener('error', (e) => {
    console.warn('General public hub error:', e.error);
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`General public hub loaded in ${loadTime.toFixed(2)}ms`);
});
