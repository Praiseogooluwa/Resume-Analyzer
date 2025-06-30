// templates.js

document.addEventListener('DOMContentLoaded', function() {
    // ========== Navigation Functionality ==========
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.createElement('div');
    sidebarOverlay.id = 'sidebarOverlay';
    sidebarOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-40 opacity-0 invisible transition-all duration-300';
    document.body.appendChild(sidebarOverlay);

    mobileMenuButton.addEventListener('click', function() {
        mobileSidebar.classList.add('translate-x-0');
        mobileSidebar.classList.remove('-translate-x-full');
        sidebarOverlay.classList.remove('invisible', 'opacity-0');
        sidebarOverlay.classList.add('visible', 'opacity-100');
        document.body.style.overflow = 'hidden';
    });

    // Close sidebar
    function closeSidebar() {
        mobileSidebar.classList.remove('translate-x-0');
        mobileSidebar.classList.add('-translate-x-full');
        sidebarOverlay.classList.remove('visible', 'opacity-100');
        sidebarOverlay.classList.add('invisible', 'opacity-0');
        document.body.style.overflow = '';
    }

    sidebarOverlay.addEventListener('click', closeSidebar);

    // User dropdown
    const userMenuButton = document.getElementById('userMenuButton');
    const userMenuDropdown = document.getElementById('userMenuDropdown');

    userMenuButton.addEventListener('click', function(e) {
        e.stopPropagation();
        userMenuDropdown.classList.toggle('scale-95', 'opacity-0', 'invisible');
        userMenuDropdown.classList.toggle('scale-100', 'opacity-100', 'visible');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        userMenuDropdown.classList.add('scale-95', 'opacity-0', 'invisible');
        userMenuDropdown.classList.remove('scale-100', 'opacity-100', 'visible');
    });

    // Prevent dropdown from closing when clicking inside
    userMenuDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Upgrade button
    const upgradeBtn = document.getElementById('upgradeBtn');
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', function() {
            window.location.href = 'pricing.html';
        });
    }

    // ========== Template Gallery Functionality ==========
    const templatesContainer = document.querySelector('section.grid');
    const templatesHeader = document.querySelector('header.gradient-bg');

    // Template data
    const templates = [
        { 
            id: 1, 
            name: 'Modern Template', 
            description: 'A clean and modern design suitable for all industries.', 
            image: 'images/template1.jpg', 
            category: 'Modern',
            premium: false,
            features: ['ATS-friendly', 'Clean layout', 'Modern typography']
        },
        { 
            id: 2, 
            name: 'Professional Template', 
            description: 'A polished design ideal for corporate roles.', 
            image: 'images/template2.jpg', 
            category: 'Professional',
            premium: false,
            features: ['Corporate style', 'Professional sections', 'Balanced design']
        },
        { 
            id: 3, 
            name: 'Creative Template', 
            description: 'A vibrant design perfect for creative professionals.', 
            image: 'images/template3.jpg', 
            category: 'Creative',
            premium: true,
            features: ['Unique layout', 'Color options', 'Creative sections']
        },
        { 
            id: 4, 
            name: 'Minimal Template', 
            description: 'A simple and elegant design for any role.', 
            image: 'images/template4.jpg', 
            category: 'Minimal',
            premium: true,
            features: ['Clean lines', 'Ample white space', 'Simple typography']
        },
        { 
            id: 5, 
            name: 'Classic Template', 
            description: 'A timeless design for traditional industries.', 
            image: 'images/template5.jpg', 
            category: 'Classic',
            premium: false,
            features: ['Traditional layout', 'Formal style', 'Section headings']
        },
        { 
            id: 6, 
            name: 'Executive Template', 
            description: 'A sophisticated design for senior-level professionals.', 
            image: 'images/template6.jpg', 
            category: 'Executive',
            premium: true,
            features: ['Premium design', 'Leadership focus', 'Detailed sections']
        }
    ];

    // Create search and filter controls
    function createControls() {
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'flex flex-col sm:flex-row gap-4 mb-6 animate-fade-in';
        
        // Search input
        const searchDiv = document.createElement('div');
        searchDiv.className = 'flex-1';
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search templates...';
        searchInput.className = 'border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200';
        searchInput.id = 'templateSearch';
        
        searchDiv.appendChild(searchInput);
        controlsDiv.appendChild(searchDiv);
        
        // Category filter
        const filterDiv = document.createElement('div');
        filterDiv.className = 'flex-1';
        
        const filterSelect = document.createElement('select');
        filterSelect.className = 'border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200';
        filterSelect.id = 'templateFilter';
        
        const categories = ['All Categories', ...new Set(templates.map(t => t.category))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category === 'All Categories' ? '' : category;
            option.textContent = category;
            filterSelect.appendChild(option);
        });
        
        filterDiv.appendChild(filterSelect);
        controlsDiv.appendChild(filterDiv);
        
        // Insert controls after header
        templatesHeader.insertAdjacentElement('afterend', controlsDiv);
        
        // Event listeners
        searchInput.addEventListener('input', () => {
            filterTemplates();
            animateTemplates();
        });
        filterSelect.addEventListener('change', () => {
            filterTemplates();
            animateTemplates();
        });
    }
    
    // Filter templates based on search and category
    function filterTemplates() {
        const searchTerm = document.getElementById('templateSearch').value.toLowerCase();
        const filterValue = document.getElementById('templateFilter').value;
        
        const filteredTemplates = templates.filter(template => {
            const matchesSearch = template.name.toLowerCase().includes(searchTerm) || 
                                 template.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !filterValue || template.category === filterValue;
            
            return matchesSearch && matchesCategory;
        });
        
        renderTemplates(filteredTemplates);
    }
    
    // Render templates to the page with animations
    function renderTemplates(templatesToRender) {
        templatesContainer.innerHTML = '';
        
        if (templatesToRender.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'col-span-full text-center py-8 animate-fade-in';
            noResults.innerHTML = `
                <i class="fas fa-file-alt text-4xl text-gray-300 mb-4 animate-bounce"></i>
                <h3 class="text-lg font-medium text-gray-800">No templates found</h3>
                <p class="text-gray-500">Try adjusting your search or filter criteria</p>
            `;
            templatesContainer.appendChild(noResults);
            return;
        }
        
        templatesToRender.forEach((template, index) => {
            const templateCard = document.createElement('div');
            templateCard.className = 'bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 opacity-0';
            templateCard.style.animationDelay = `${index * 0.1}s`;
            
            // Premium badge
            const premiumBadge = template.premium ? `
                <div class="absolute top-2 right-2 bg-yellow-400 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full flex items-center animate-pulse">
                    <i class="fas fa-crown mr-1"></i>
                    Premium
                </div>
            ` : '';
            
            templateCard.innerHTML = `
                <div class="relative h-48 overflow-hidden">
                    <img src="${template.image}" alt="${template.name}" 
                         class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
                    ${premiumBadge}
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-medium text-gray-800">${template.name}</h3>
                    <p class="text-sm text-gray-500 mt-1">${template.description}</p>
                    <div class="mt-4 flex justify-between items-center">
                        <span class="text-xs px-2 py-1 rounded-full ${getCategoryColor(template.category)}">
                            ${template.category}
                        </span>
                        <button class="template-preview-btn gradient-bg text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition transform hover:scale-105" 
                                data-template-id="${template.id}">
                            Preview
                        </button>
                    </div>
                </div>
            `;
            
            templatesContainer.appendChild(templateCard);
        });
        
        // Animate cards in
        animateTemplates();
        
        // Add event listeners to preview buttons
        document.querySelectorAll('.template-preview-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const templateId = parseInt(this.getAttribute('data-template-id'));
                showTemplateModal(templateId);
            });
        });
    }
    
    // Get color for category badge
    function getCategoryColor(category) {
        const colors = {
            'Modern': 'bg-blue-100 text-blue-800',
            'Professional': 'bg-purple-100 text-purple-800',
            'Creative': 'bg-pink-100 text-pink-800',
            'Minimal': 'bg-gray-100 text-gray-800',
            'Classic': 'bg-yellow-100 text-yellow-800',
            'Executive': 'bg-indigo-100 text-indigo-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    }
    
    // Animate templates when they come into view
    function animateTemplates() {
        const cards = document.querySelectorAll('.bg-white.shadow.rounded-lg');
        cards.forEach((card, index) => {
            // Reset animation for filtered results
            card.classList.remove('opacity-0');
            card.classList.add('animate-fade-in-up');
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // Show template preview modal with animations
    function showTemplateModal(templateId) {
        const template = templates.find(t => t.id === templateId);
        if (!template) return;
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-0 flex items-center justify-center z-50 p-4 transition-opacity duration-300 opacity-0';
        modal.innerHTML = `
            <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95">
                <div class="sticky top-0 bg-white p-4 border-b flex justify-between items-center shadow-sm">
                    <h3 class="text-xl font-bold text-gray-800">${template.name}</h3>
                    <button class="text-gray-500 hover:text-gray-700 text-2xl transition-transform hover:rotate-90" id="closeModal">
                        &times;
                    </button>
                </div>
                
                <div class="p-6">
                    <img src="${template.image}" alt="${template.name}" class="w-full rounded-lg mb-6 border hover:shadow-lg transition-shadow duration-300">
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-medium text-gray-800 mb-2">Template Details</h4>
                            <ul class="text-sm text-gray-600 space-y-2">
                                <li class="flex items-center">
                                    <i class="fas fa-tag text-gray-400 mr-2 w-4"></i>
                                    Category: <span class="${getCategoryColor(template.category)} px-2 py-1 rounded-full ml-2 text-xs">${template.category}</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas ${template.premium ? 'fa-crown text-yellow-500' : 'fa-check-circle text-green-500'} mr-2 w-4"></i>
                                    ${template.premium ? 'Premium Template' : 'Free Template'}
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-file-alt text-gray-400 mr-2 w-4"></i>
                                    Format: PDF, DOCX
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 class="font-medium text-gray-800 mb-2">Key Features</h4>
                            <ul class="text-sm text-gray-600 space-y-2">
                                ${template.features.map(feature => `
                                    <li class="flex items-center animate-fade-in">
                                        <i class="fas fa-check text-green-500 mr-2 w-4"></i>
                                        ${feature}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="mt-8 flex flex-col sm:flex-row gap-4">
                        <button class="gradient-bg text-white px-6 py-3 rounded-md font-medium hover:opacity-90 transition flex-1 flex items-center justify-center transform hover:scale-105"
                                id="useTemplateBtn" data-template-id="${template.id}">
                            <i class="fas fa-magic mr-2"></i>
                            Use This Template
                        </button>
                        
                        <button class="border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition flex-1 flex items-center justify-center transform hover:scale-105"
                                id="downloadSampleBtn">
                            <i class="fas fa-download mr-2"></i>
                            Download Sample
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Animate modal in
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
            modal.querySelector('.bg-white').classList.remove('scale-95');
            modal.querySelector('.bg-white').classList.add('scale-100');
        }, 10);
        
        // Close modal
        document.getElementById('closeModal').addEventListener('click', () => {
            closeModal();
        });
        
        // Use template button
        document.getElementById('useTemplateBtn').addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-template-id'));
            useTemplate(id);
        });
        
        // Download sample button
        document.getElementById('downloadSampleBtn').addEventListener('click', function() {
            animateDownloadButton(this);
            // Simulate download delay
            setTimeout(() => {
                alert('Sample download would start here for template: ' + template.name);
            }, 1000);
        });
    }
    
    // Animate download button
    function animateDownloadButton(button) {
        button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Preparing...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check mr-2"></i> Download Ready';
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-download mr-2"></i> Download Sample';
                button.disabled = false;
            }, 2000);
        }, 1000);
    }
    
    // Close modal with animation
    function closeModal() {
        const modal = document.querySelector('.fixed.inset-0');
        if (modal) {
            modal.classList.remove('opacity-100');
            modal.classList.add('opacity-0');
            modal.querySelector('.bg-white').classList.remove('scale-100');
            modal.querySelector('.bg-white').classList.add('scale-95');
            
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    }
    
    // Use template function with animation
    function useTemplate(templateId) {
        const template = templates.find(t => t.id === templateId);
        if (!template) return;
        
        if (template.premium) {
            // Show upgrade modal for premium templates
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-0 flex items-center justify-center z-50 p-4 transition-opacity duration-300 opacity-0';
            modal.innerHTML = `
                <div class="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300 scale-95">
                    <div class="p-6 text-center">
                        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 animate-pulse">
                            <i class="fas fa-crown text-yellow-500"></i>
                        </div>
                        <h3 class="mt-3 text-lg font-medium text-gray-900">Premium Template</h3>
                        <div class="mt-2 text-sm text-gray-500">
                            <p>This template is only available to premium members.</p>
                            <p class="mt-2">Upgrade your account to access all premium templates.</p>
                        </div>
                        <div class="mt-6">
                            <button class="gradient-bg text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition mr-3 transform hover:scale-105"
                                    id="goToUpgrade">
                                Upgrade Now
                            </button>
                            <button class="border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition transform hover:scale-105"
                                    id="closeUpgradeModal">
                                Maybe Later
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Animate modal in
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modal.classList.add('opacity-100');
                modal.querySelector('.bg-white').classList.remove('scale-95');
                modal.querySelector('.bg-white').classList.add('scale-100');
            }, 10);
            
            // Upgrade button
            document.getElementById('goToUpgrade').addEventListener('click', function() {
                window.location.href = 'pricing.html';
            });
            
            // Close button
            document.getElementById('closeUpgradeModal').addEventListener('click', function() {
                modal.classList.remove('opacity-100');
                modal.classList.add('opacity-0');
                modal.querySelector('.bg-white').classList.remove('scale-100');
                modal.querySelector('.bg-white').classList.add('scale-95');
                
                setTimeout(() => {
                    modal.remove();
                }, 300);
            });
        } else {
            // For free templates, animate button and proceed
            const button = document.querySelector(`#useTemplateBtn[data-template-id="${templateId}"]`);
            button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Loading...';
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check mr-2"></i> Template Selected';
                setTimeout(() => {
                    // In a real app, redirect to editor
                    alert(`Opening editor with template: ${template.name}`);
                    closeModal();
                }, 500);
            }, 1000);
        }
    }
    
    // Initialize the page
    createControls();
    renderTemplates(templates);
    
    // Close modal when clicking outside content
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('fixed') && event.target.classList.contains('inset-0')) {
            closeModal();
        }
    });
});

// CSS for animations (add to your styles.css)
const animationStyles = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeInUp {
        from { 
            opacity: 0;
            transform: translateY(20px);
        }
        to { 
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    .animate-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
    }
    
    .animate-fade-in-up {
        animation: fadeInUp 0.5s ease-out forwards;
    }
    
    .animate-bounce {
        animation: bounce 1s infinite;
    }
    
    .animate-pulse {
        animation: pulse 2s infinite;
    }
    
    .transition-transform {
        transition-property: transform;
    }
    
    .mobile-sidebar {
        transform: translateX(-100%);
        transition: transform 0.3s ease-out;
    }
    
    .translate-x-0 {
        transform: translateX(0);
    }
    
    .-translate-x-full {
        transform: translateX(-100%);
    }
    
    .scale-95 {
        transform: scale(0.95);
    }
    
    .scale-100 {
        transform: scale(1);
    }
`;

// Add styles to the head
const styleElement = document.createElement('style');
styleElement.innerHTML = animationStyles;
document.head.appendChild(styleElement);