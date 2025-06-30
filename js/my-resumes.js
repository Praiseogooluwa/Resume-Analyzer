// main.js

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const closeSidebar = document.getElementById('closeSidebar');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileSidebar.classList.add('sidebar-open');
        sidebarOverlay.classList.add('overlay-visible');
    });
    
    closeSidebar.addEventListener('click', function() {
        mobileSidebar.classList.remove('sidebar-open');
        sidebarOverlay.classList.remove('overlay-visible');
    });
    
    sidebarOverlay.addEventListener('click', function() {
        mobileSidebar.classList.remove('sidebar-open');
        sidebarOverlay.classList.remove('overlay-visible');
    });
    
    // User dropdown functionality
    const userMenuButton = document.getElementById('userMenuButton');
    const userMenuDropdown = document.getElementById('userMenuDropdown');
    
    userMenuButton.addEventListener('click', function() {
        userMenuDropdown.classList.toggle('hidden');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!userMenuButton.contains(event.target) && !userMenuDropdown.contains(event.target)) {
            userMenuDropdown.classList.add('hidden');
        }
    });
    
    // File upload functionality
    const dropZone = document.getElementById('dropZone');
    const resumeUpload = document.getElementById('resumeUpload');
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const removeFile = document.getElementById('removeFile');
    const analysisResults = document.getElementById('analysisResults');
    
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });
    
    // Highlight drop zone when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });
    
    // Handle dropped files
    dropZone.addEventListener('drop', handleDrop, false);
    
    // Handle file selection via button
    resumeUpload.addEventListener('change', handleFiles, false);
    
    // Remove file button
    removeFile.addEventListener('click', function() {
        resumeUpload.value = '';
        fileInfo.classList.add('hidden');
        analysisResults.classList.add('hidden');
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function highlight() {
        dropZone.classList.add('border-indigo-500', 'bg-indigo-50');
    }
    
    function unhighlight() {
        dropZone.classList.remove('border-indigo-500', 'bg-indigo-50');
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles({ target: { files: files } });
    }
    
    function handleFiles(e) {
        const files = e.target.files;
        
        if (files.length > 0) {
            const file = files[0];
            
            // Check if file is PDF or DOC/DOCX
            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            
            if (!validTypes.includes(file.type)) {
                alert('Please upload a PDF or Word document.');
                return;
            }
            
            // Display file info
            fileName.textContent = file.name;
            fileSize.textContent = formatFileSize(file.size);
            fileInfo.classList.remove('hidden');
            
            // Process the file (in a real app, you would upload to server)
            processResume(file);
        }
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    function processResume(file) {
        // In a real application, you would upload the file to a server for processing
        // For this demo, we'll simulate processing with a timeout
        
        // Show loading state
        dropZone.innerHTML = '<p class="text-gray-500">Processing your resume...</p>';
        
        // Simulate processing delay
        setTimeout(function() {
            // Show analysis results
            analysisResults.classList.remove('hidden');
            
            // Generate random scores for demo purposes
            const overallScore = Math.floor(Math.random() * 40) + 60; // 60-100
            const contentScore = Math.floor(Math.random() * 30) + 70;
            const keywordScore = Math.floor(Math.random() * 40) + 60;
            const formatScore = Math.floor(Math.random() * 50) + 50;
            const impactScore = Math.floor(Math.random() * 30) + 70;
            
            // Update scores
            document.getElementById('overallScore').textContent = overallScore;
            document.getElementById('overallScoreBar').style.width = overallScore + '%';
            
            // Update skill meters
            const skillMeters = document.querySelectorAll('.skill-level');
            skillMeters[0].style.width = contentScore + '%';
            skillMeters[1].style.width = keywordScore + '%';
            skillMeters[2].style.width = formatScore + '%';
            skillMeters[3].style.width = impactScore + '%';
            
            // Provide feedback based on score
            const feedback = document.getElementById('scoreFeedback');
            
            if (overallScore >= 85) {
                feedback.textContent = 'Excellent! Your resume is well-optimized and should perform well with recruiters and ATS systems.';
                feedback.className = 'mt-4 text-green-600';
            } else if (overallScore >= 70) {
                feedback.textContent = 'Good job! Your resume is decent but could use some improvements to be more competitive.';
                feedback.className = 'mt-4 text-blue-600';
            } else if (overallScore >= 50) {
                feedback.textContent = 'Your resume needs work. Consider revising content, keywords, and formatting to improve your chances.';
                feedback.className = 'mt-4 text-yellow-600';
            } else {
                feedback.textContent = 'Your resume needs significant improvement. Consider using our resume builder or templates to create a stronger resume.';
                feedback.className = 'mt-4 text-red-600';
            }
            
            // Reset drop zone
            dropZone.innerHTML = `
                <p class="text-gray-500">Drag and drop your resume here, or click to upload.</p>
                <input type="file" id="resumeUpload" class="hidden">
                <button onclick="document.getElementById('resumeUpload').click()" class="gradient-bg text-white px-4 py-2 rounded-md text-sm font-medium mt-4 hover:opacity-90 transition">
                    Upload Resume
                </button>
            `;
            
            // Reattach event listeners
            const newUpload = document.getElementById('resumeUpload');
            newUpload.addEventListener('change', handleFiles, false);
        }, 2000);
    }
    
    // Upgrade button functionality
    const upgradeBtn = document.getElementById('upgradeBtn');
    const mobileUpgradeBtn = document.getElementById('mobileUpgradeBtn');
    
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', function() {
            window.location.href = 'pricing.html';
        });
    }
    
    if (mobileUpgradeBtn) {
        mobileUpgradeBtn.addEventListener('click', function() {
            window.location.href = 'pricing.html';
        });
    }
});