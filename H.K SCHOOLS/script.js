// School Management System - JavaScript Features
class SchoolDashboard {
    constructor() {
        this.init();
    }

    init() {
        console.log('H.K Schools Dashboard Initialized');
        this.setupEventListeners();
        this.updateLiveStats();
        this.setupRealTimeUpdates();
        this.loadRecentActivities();
        this.createSearchBar();
    }

    // Create search bar in navbar
    createSearchBar() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search students, teachers, classes...';
        searchInput.className = 'search-bar';
        
        const navRight = document.querySelector('.nav-right');
        if (navRight) {
            // Insert search bar before the nav menu
            navRight.insertBefore(searchInput, navRight.firstChild);
            
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
    }

    // Event listeners setup
    setupEventListeners() {
        this.addCardAnimations();
        this.setupDropdowns();
    }

    // Search functionality
    handleSearch(query) {
        if (query.length > 2) {
            console.log('Searching for:', query);
            this.highlightSearchResults(query);
        } else {
            this.clearSearchHighlights();
        }
    }

    // Search results highlight
    highlightSearchResults(query) {
        const elements = document.querySelectorAll('.content-card, .activity-content, .stat-card');
        elements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                element.style.backgroundColor = '#fff3cd';
                element.style.borderColor = '#ffd700';
            } else {
                element.style.opacity = '0.6';
            }
        });
    }

    // Clear search highlights
    clearSearchHighlights() {
        const elements = document.querySelectorAll('.content-card, .activity-content, .stat-card');
        elements.forEach(element => {
            element.style.backgroundColor = '';
            element.style.borderColor = '';
            element.style.opacity = '1';
        });
    }

    // Card animations
    addCardAnimations() {
        const cards = document.querySelectorAll('.content-card, .stat-card');
        cards.forEach(card => {
            card.style.cursor = 'pointer';
            
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on a link
                if (e.target.tagName !== 'A') {
                    this.animateCardClick(card);
                }
            });
        });
    }

    // Card click animation
    animateCardClick(card) {
        card.style.transform = 'scale(0.98)';
        card.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
    }

    // Dropdown functionality
    setupDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                });
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });
    }

    // Live stats update with animation
    updateLiveStats() {
        const stats = {
            students: 1247,
            teachers: 68,
            classes: 24,
            attendance: 95
        };

        // Animate counters
        this.animateCounter('.stat-card:nth-child(1) h3', stats.students);
        this.animateCounter('.stat-card:nth-child(2) h3', stats.teachers);
        this.animateCounter('.stat-card:nth-child(3) h3', stats.classes);
        this.animateCounter('.stat-card:nth-child(4) h3', stats.attendance, '%');
    }

    // Counter animation
    animateCounter(selector, target, suffix = '') {
        const element = document.querySelector(selector);
        if (!element) return;
        
        let current = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }

    // Load recent activities
    loadRecentActivities() {
        const activities = [
            { icon: '✅', text: 'Fee payment received - Sara Khan', time: 'Just now' },
            { icon: '📚', text: 'New books added to library', time: '30 minutes ago' },
            { icon: '👥', text: 'Parent-teacher meeting scheduled', time: '1 hour ago' }
        ];

        const activityList = document.querySelector('.activity-list');
        if (activityList) {
            // Clear existing activities except the first few
            const existingItems = activityList.querySelectorAll('.activity-item');
            if (existingItems.length > 4) {
                for (let i = 4; i < existingItems.length; i++) {
                    existingItems[i].remove();
                }
            }
            
            // Add new activities
            activities.forEach(activity => {
                const activityItem = document.createElement('div');
                activityItem.className = 'activity-item';
                activityItem.innerHTML = `
                    <div class="activity-icon">${activity.icon}</div>
                    <div class="activity-content">
                        <p><strong>${activity.text}</strong></p>
                        <span class="activity-time">${activity.time}</span>
                    </div>
                `;
                activityList.appendChild(activityItem);
            });
        }
    }

    // Real-time updates
    setupRealTimeUpdates() {
        // Update time immediately
        this.updateCurrentTime();
        
        // Update time every second for smooth seconds display
        setInterval(() => {
            this.updateCurrentTime();
        }, 1000);

        // Simulate live notifications
        setInterval(() => {
            this.showRandomNotification();
        }, 30000);
    }

    // Update current time display
    updateCurrentTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        
        // Add time display to navbar if not exists
        let timeDisplay = document.querySelector('.current-time');
        if (!timeDisplay) {
            timeDisplay = document.createElement('div');
            timeDisplay.className = 'current-time';
            const navRight = document.querySelector('.nav-right');
            if (navRight) {
                navRight.appendChild(timeDisplay);
            }
        }
        
        timeDisplay.textContent = timeString;
    }

    // Show random notification
    showRandomNotification() {
        const notifications = [
            'New student application received',
            'Fee deadline approaching',
            'Staff meeting in 30 minutes',
            'System backup completed',
            'New teacher joined the staff',
            'Exam results published'
        ];

        const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];
        this.createToastNotification(randomNotif);
    }

    // Create toast notification
    createToastNotification(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-size: 14px;
            font-weight: 500;
        `;

        document.body.appendChild(toast);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 500);
        }, 3000);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SchoolDashboard();
    console.log('🚀 H.K Schools Dashboard Loaded Successfully!');
});

// Utility functions
const SchoolUtils = {
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    formatNumber: (number) => {
        return new Intl.NumberFormat().format(number);
    },

    // Local storage helper
    storage: {
        set: (key, value) => {
            localStorage.setItem(key, JSON.stringify(value));
        },
        get: (key) => {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        },
        remove: (key) => {
            localStorage.removeItem(key);
        }
    }
};