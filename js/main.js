// Shared functionality across all pages
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    setupMobileMenu();
    setupUserDropdown();
    updateActiveNavItems();
    setupTooltips();
    setupMockButtons();
    setupAnchorLinks();
});

// Mobile menu functionality
function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const closeSidebar = document.getElementById('closeSidebar');

    if (mobileMenuButton && mobileSidebar) {
        mobileMenuButton.addEventListener('click', () => {
            mobileSidebar.classList.add('open');
            sidebarOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        });

        const closeMenu = () => {
            mobileSidebar.classList.remove('open');
            sidebarOverlay.classList.remove('open');
            document.body.style.overflow = '';
        };

        if (closeSidebar) {
            closeSidebar.addEventListener('click', closeMenu);
        }

        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', closeMenu);
        }

        // Close when clicking a nav item
        document.querySelectorAll('.mobile-sidebar a').forEach(link => {
            link.addEventListener('click', () => {
                if (link.getAttribute('href').startsWith('#')) {
                    closeMenu();
                }
            });
        });
    }
}

// User dropdown menu functionality
function setupUserDropdown() {
    const userMenuButton = document.getElementById('userMenuButton');
    const userMenuDropdown = document.getElementById('userMenuDropdown');
    
    if (userMenuButton) {
        userMenuButton.addEventListener('click', function() {
            userMenuDropdown.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!userMenuButton.contains(event.target) && !userMenuDropdown.contains(event.target)) {
                userMenuDropdown.classList.add('hidden');
            }
        });
    }
}

// Update active navigation items
function updateActiveNavItems() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const sidebarLinks = document.querySelectorAll('.sidebar-item');
    
    sidebarLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Tooltip functionality
function setupTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipText = this.querySelector('.tooltip-text');
            tooltipText.style.visibility = 'visible';
            tooltipText.style.opacity = '1';
        });
        
        tooltip.addEventListener('mouseleave', function() {
            const tooltipText = this.querySelector('.tooltip-text');
            tooltipText.style.visibility = 'hidden';
            tooltipText.style.opacity = '0';
        });
    });
}

// Mock functionality for buttons
function setupMockButtons() {
    const mockButtons = [
        'upgradeBtn', 'mobileUpgradeBtn', 'desktopUpgradeBtn',
        'notificationsBtn', 'downloadReport', 'shareResults',
        'refreshMatches', 'viewAllMatches', 'viewAllAnalyses',
        'newAnalysisBtn'
    ];
    
    mockButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', function(e) {
                if (!e.target.closest('a')) {
                    e.preventDefault();
                    alert(`This ${btnId.replace('Btn', '')} functionality would be implemented in the full version`);
                }
            });
        }
    });
}

// Smooth scrolling for anchor links
function setupAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Helper function for file size formatting
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}