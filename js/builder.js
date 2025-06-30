// Live Preview Functionality
document.getElementById('resumeForm').addEventListener('input', function () {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const jobTitle = document.getElementById('jobTitle').value;

    const preview = document.getElementById('resumePreview');
    preview.innerHTML = `
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
    `;
});

// AI Suggestions Functionality
document.getElementById('generateSuggestions').addEventListener('click', function () {
    const jobTitle = document.getElementById('jobTitle').value.trim();
    const suggestionsContainer = document.getElementById('suggestionsContainer');
    const suggestionsList = suggestionsContainer.querySelector('ul');
    suggestionsList.innerHTML = '';

    // Simulate AI-powered suggestions based on job title
    const suggestions = jobTitle
        ? [
              `Include keywords related to "${jobTitle}" in your resume.`,
              'Highlight your most relevant skills and achievements.',
              'Use action verbs to describe your work experience.',
              'Ensure consistent formatting throughout your resume.',
          ]
        : [
              'Add quantifiable achievements to your work experience.',
              'Include relevant keywords for the job title.',
              'Ensure consistent formatting throughout your resume.',
              'Highlight your most impactful skills and accomplishments.',
          ];

    suggestions.forEach((suggestion) => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        suggestionsList.appendChild(li);
    });
    suggestionsContainer.classList.remove('hidden');
});

// Skill Section Functionality
document.getElementById('addSkill').addEventListener('click', function () {
    const skillInput = document.getElementById('skillInput');
    const skillList = document.getElementById('skillList');

    if (skillInput.value.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = skillInput.value;
        skillList.appendChild(li);
        skillInput.value = '';
    } else {
        alert('Please enter a skill before adding.');
    }
});

// Work Experience Section Functionality
document.getElementById('addExperience').addEventListener('click', function () {
    const workExperienceContainer = document.getElementById('workExperienceContainer');
    const experienceDiv = document.createElement('div');
    experienceDiv.className = 'mt-4';

    experienceDiv.innerHTML = `
        <input type="text" placeholder="Company Name" class="border border-gray-300 rounded-md px-4 py-2 w-full mb-2">
        <input type="text" placeholder="Role" class="border border-gray-300 rounded-md px-4 py-2 w-full mb-2">
        <input type="text" placeholder="Duration" class="border border-gray-300 rounded-md px-4 py-2 w-full mb-2">
        <textarea placeholder="Achievements" class="border border-gray-300 rounded-md px-4 py-2 w-full mb-2"></textarea>
    `;
    workExperienceContainer.appendChild(experienceDiv);
});

// Education Section Functionality
document.getElementById('addEducation').addEventListener('click', function () {
    const educationContainer = document.getElementById('educationContainer');
    const educationDiv = document.createElement('div');
    educationDiv.className = 'mt-4';

    educationDiv.innerHTML = `
        <input type="text" placeholder="Institution Name" class="border border-gray-300 rounded-md px-4 py-2 w-full mb-2">
        <input type="text" placeholder="Degree" class="border border-gray-300 rounded-md px-4 py-2 w-full mb-2">
        <input type="text" placeholder="Graduation Year" class="border border-gray-300 rounded-md px-4 py-2 w-full mb-2">
    `;
    educationContainer.appendChild(educationDiv);
});

// Download Resume as PDF
document.getElementById('downloadResume').addEventListener('click', function () {
    const doc = new jsPDF();
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const jobTitle = document.getElementById('jobTitle').value;

    doc.text('Resume', 10, 10);
    doc.text(`Name: ${fullName}`, 10, 20);
    doc.text(`Email: ${email}`, 10, 30);
    doc.text(`Phone: ${phone}`, 10, 40);
    doc.text(`Job Title: ${jobTitle}`, 10, 50);

    // Add skills
    const skillList = document.getElementById('skillList').querySelectorAll('li');
    doc.text('Skills:', 10, 60);
    skillList.forEach((skill, index) => {
        doc.text(`- ${skill.textContent}`, 10, 70 + index * 10);
    });

    // Save the PDF
    doc.save('resume.pdf');
});

// Validation for Required Fields
document.getElementById('resumeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const jobTitle = document.getElementById('jobTitle').value.trim();

    if (!fullName || !email || !phone || !jobTitle) {
        alert('Please fill out all required fields.');
    } else {
        alert('Resume saved successfully!');
    }
});

// Notification Bell Click Handler
document.getElementById('notificationsBtn').addEventListener('click', function () {
    alert('Notifications feature is under development.');
});

// Profile Dropdown Toggle
document.getElementById('userMenuButton').addEventListener('click', function () {
    const dropdown = document.getElementById('userMenuDropdown');
    dropdown.classList.toggle('hidden');
});

// Upgrade Button Click Handler
document.getElementById('upgradeBtn').addEventListener('click', function () {
    alert('Upgrade to Premium feature is under development.');
});

// Close Profile Dropdown When Clicking Outside
document.addEventListener('click', function (event) {
    const dropdown = document.getElementById('userMenuDropdown');
    const userMenuButton = document.getElementById('userMenuButton');
    if (!dropdown.contains(event.target) && !userMenuButton.contains(event.target)) {
        dropdown.classList.add('hidden');
    }
});