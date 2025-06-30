document.addEventListener('DOMContentLoaded', function() {
    // File upload handling
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('resumeUpload');
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const removeFile = document.getElementById('removeFile');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const uploadProgress = document.getElementById('uploadProgress');
    const analyzeText = document.getElementById('analyzeText');
    const analyzingText = document.getElementById('analyzingText');
    const analysisResults = document.getElementById('analysisResults');
    const analyzeForJob = document.getElementById('analyzeForJob');
    const jobDescriptionContainer = document.getElementById('jobDescriptionContainer');
    const jobDescription = document.getElementById('jobDescription');
    const reanalyzeBtn = document.getElementById('reanalyzeBtn');
    const autoImproveBtn = document.getElementById('autoImproveBtn');
    const rewriteSuggestion = document.getElementById('rewriteSuggestion');
    const keywordAnalysisSection = document.getElementById('keywordAnalysisSection');
    const missingKeywordsSection = document.getElementById('missingKeywordsSection');

    // Toggle job description field
    if (analyzeForJob) {
        analyzeForJob.addEventListener('change', function() {
            if (this.checked) {
                jobDescriptionContainer.classList.remove('hidden');
            } else {
                jobDescriptionContainer.classList.add('hidden');
            }
        });
    }

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        if (dropZone) dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop zone when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        if (dropZone) dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        if (dropZone) dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        dropZone.classList.add('border-indigo-500', 'bg-indigo-50');
        dropZone.classList.remove('border-gray-300');
    }

    function unhighlight() {
        dropZone.classList.remove('border-indigo-500', 'bg-indigo-50');
        dropZone.classList.add('border-gray-300');
    }

    // Handle dropped files
    if (dropZone) dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    // Handle selected files
    if (fileInput) fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            
            // Validate file type
            const validTypes = ['application/pdf', 'application/msword', 
                               'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                               'text/plain'];
            if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx|txt)$/)) {
                alert('Please upload a valid file type (PDF, DOC, DOCX, or TXT)');
                return;
            }
            
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                alert('File is too large. Maximum size is 5MB.');
                return;
            }
            
            // Display file info
            fileName.textContent = file.name;
            fileSize.textContent = formatFileSize(file.size);
            fileInfo.classList.remove('hidden');
            analyzeBtn.disabled = false;
            
            // Simulate upload progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += 5;
                uploadProgress.style.width = progress + '%';
                
                if (progress >= 100) {
                    clearInterval(interval);
                }
            }, 100);
        }
    }

    // Remove file
    if (removeFile) removeFile.addEventListener('click', function() {
        fileInput.value = '';
        fileInfo.classList.add('hidden');
        analyzeBtn.disabled = true;
        uploadProgress.style.width = '0%';
        jobDescriptionContainer.classList.add('hidden');
        analyzeForJob.checked = false;
    });

    // Analyze button click
    if (analyzeBtn) analyzeBtn.addEventListener('click', function() {
        // Show analyzing state
        analyzeText.classList.add('hidden');
        analyzingText.classList.remove('hidden');
        analyzeBtn.disabled = true;
        
        // Simulate analysis taking time
        setTimeout(function() {
            // Show results
            analysisResults.classList.remove('hidden');
            
            // Generate dynamic AI results based on whether job description was provided
            generateAIResults(jobDescription.value);
            
            // Reset button
            analyzeText.classList.remove('hidden');
            analyzingText.classList.add('hidden');
            analyzeBtn.disabled = false;
            
            // Scroll to results
            analysisResults.scrollIntoView({ behavior: 'smooth' });
        }, 3000);
    });

    // Generate dynamic AI results
    function generateAIResults(jobDesc = '') {
        // Randomize scores slightly for realism
        const baseScore = jobDesc ? 75 + Math.floor(Math.random() * 10) : 70 + Math.floor(Math.random() * 15);
        const contentScore = Math.min(100, baseScore - 10 + Math.floor(Math.random() * 20));
        const keywordScore = jobDesc ? Math.min(100, baseScore + 5 + Math.floor(Math.random() * 15)) : baseScore;
        const formatScore = Math.min(100, baseScore + Math.floor(Math.random() * 10));
        const impactScore = Math.min(100, baseScore - 15 + Math.floor(Math.random() * 20));
        
        // Update scores
        document.getElementById('overallScore').textContent = baseScore;
        document.getElementById('overallScoreBar').style.width = baseScore + '%';
        
        // Update detailed scores
        document.querySelectorAll('.skill-level')[0].style.width = contentScore + '%';
        document.querySelectorAll('.skill-level')[1].style.width = keywordScore + '%';
        document.querySelectorAll('.skill-level')[2].style.width = formatScore + '%';
        document.querySelectorAll('.skill-level')[3].style.width = impactScore + '%';
        
        // Update feedback based on score
        let feedback = '';
        if (baseScore >= 85) {
            feedback = 'Excellent resume! It\'s well-optimized and showcases your strengths effectively.';
        } else if (baseScore >= 70) {
            feedback = 'Good resume with room for improvement. Focus on adding more quantifiable achievements.';
        } else {
            feedback = 'Your resume needs significant improvement. Consider restructuring and adding more relevant keywords.';
        }
        document.getElementById('scoreFeedback').textContent = feedback;
        
        // Generate keyword analysis if job description was provided
        if (jobDesc) {
            keywordAnalysisSection.classList.remove('hidden');
            missingKeywordsSection.classList.remove('hidden');
            
            // Show rewrite suggestion
            rewriteSuggestion.classList.remove('hidden');
        } else {
            keywordAnalysisSection.classList.add('hidden');
            missingKeywordsSection.classList.add('hidden');
            rewriteSuggestion.classList.add('hidden');
        }
    }

    // Reanalyze button
    if (reanalyzeBtn) reanalyzeBtn.addEventListener('click', function() {
        analysisResults.classList.add('hidden');
        analyzeBtn.disabled = false;
    });

    // Auto-improve button
    if (autoImproveBtn) autoImproveBtn.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Improving...';
        
        // Simulate AI improvement process
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check mr-2"></i> Improved!';
            
            // Update scores to show improvement
            const currentScore = parseInt(document.getElementById('overallScore').textContent);
            const newScore = Math.min(100, currentScore + 8 + Math.floor(Math.random() * 5));
            
            document.getElementById('overallScore').textContent = newScore;
            document.getElementById('overallScoreBar').style.width = newScore + '%';
            
            // Reset button after delay
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-magic mr-2"></i> Auto-Improve';
            }, 2000);
        }, 2500);
    });

    // Copy rewrite suggestion
    const copyRewriteBtn = document.getElementById('copyRewriteBtn');
    if (copyRewriteBtn) {
        copyRewriteBtn.addEventListener('click', function() {
            const rewrittenText = document.getElementById('rewrittenText').textContent;
            navigator.clipboard.writeText(rewrittenText).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check mr-1"></i> Copied!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    }
});