// ===== NAVIGATION & UI FUNCTIONS ===== //

// Navigation scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.background = 'var(--bg-primary)';
        nav.style.backdropFilter = 'none';
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Scroll to prediction section
function scrollToPredict() {
    document.getElementById('predict').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// ===== FORM & PREDICTION FUNCTIONS ===== //

// Symptom selection
const symptomItems = document.querySelectorAll('.symptom-item');
symptomItems.forEach(item => {
    item.addEventListener('click', () => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
        item.classList.toggle('selected', checkbox.checked);
    });
});

// Form submission
document.getElementById('predictionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const symptoms = [];
    formData.getAll('symptoms').forEach(symptom => symptoms.push(symptom));
    
    // Show loading state
    const predictButton = document.querySelector('.predict-button');
    const originalText = predictButton.innerHTML;
    predictButton.innerHTML = '<span class="loading"></span> Analyzing...';
    predictButton.disabled = true;
    
    // Simulate API call with timeout
    setTimeout(() => {
        // Generate mock predictions based on symptoms
        const predictions = generatePredictions(symptoms);
        displayResults(predictions);
        
        // Reset button
        predictButton.innerHTML = originalText;
        predictButton.disabled = false;
        
        // Scroll to results
        document.getElementById('results').style.display = 'block';
        document.getElementById('results').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 2000);
});

// Generate mock predictions based on symptoms
function generatePredictions(symptoms) {
    const diseaseDatabase = {
        'fever': ['Common Cold', 'Flu', 'COVID-19'],
        'cough': ['Common Cold', 'Bronchitis', 'Pneumonia'],
        'headache': ['Migraine', 'Tension Headache', 'Sinusitis'],
        'fatigue': ['Anemia', 'Hypothyroidism', 'Chronic Fatigue Syndrome'],
        'nausea': ['Gastroenteritis', 'Food Poisoning', 'Motion Sickness'],
        'breathing': ['Asthma', 'Pneumonia', 'COVID-19'],
        'chest-pain': ['Heartburn', 'Angina', 'Heart Attack'],
        'stomach-pain': ['Gastritis', 'Appendicitis', 'Kidney Stones']
    };
    
    let possibleDiseases = {};
    
    symptoms.forEach(symptom => {
        if (diseaseDatabase[symptom]) {
            diseaseDatabase[symptom].forEach(disease => {
                possibleDiseases[disease] = (possibleDiseases[disease] || 0) + 1;
            });
        }
    });
    
    // Convert to array and sort by probability
    const predictions = Object.entries(possibleDiseases)
        .map(([disease, count]) => ({
            disease,
            probability: Math.min(90, 30 + count * 20),
            description: getDiseaseDescription(disease),
            recommendations: generateRecommendations(disease)
        }))
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 3);
    
    // Add some default predictions if no symptoms selected
    if (predictions.length === 0) {
        predictions.push({
            disease: 'No specific condition detected',
            probability: 50,
            description: 'Please select more symptoms for better prediction.',
            recommendations: ['Monitor your symptoms', 'Stay hydrated', 'Get plenty of rest']
        });
    }
    
    return predictions;
}

// Get disease descriptions
function getDiseaseDescription(disease) {
    const descriptions = {
        'Common Cold': 'A viral infection of the upper respiratory tract.',
        'Flu': 'A contagious respiratory illness caused by influenza viruses.',
        'COVID-19': 'A respiratory illness caused by the SARS-CoV-2 virus.',
        'Bronchitis': 'Inflammation of the bronchial tubes in the lungs.',
        'Pneumonia': 'An infection that inflames air sacs in one or both lungs.',
        'Migraine': 'A neurological condition that causes severe headaches.',
        'Tension Headache': 'The most common type of headache, causing mild to moderate pain.',
        'Sinusitis': 'Inflammation or swelling of the tissue lining the sinuses.',
        'Anemia': 'A condition in which the blood lacks enough healthy red blood cells.',
        'Hypothyroidism': 'A condition where the thyroid gland doesn\'t produce enough hormones.',
        'Chronic Fatigue Syndrome': 'A complex disorder characterized by extreme fatigue.',
        'Gastroenteritis': 'An inflammation of the stomach and intestines.',
        'Food Poisoning': 'Illness caused by eating contaminated food.',
        'Motion Sickness': 'Feeling of sickness when traveling by car, boat, or plane.',
        'Asthma': 'A condition in which a person\'s airways become inflamed.',
        'Heartburn': 'A burning pain in the chest, just behind the breastbone.',
        'Angina': 'Chest pain caused by reduced blood flow to the heart.',
        'Heart Attack': 'A medical emergency where blood flow to the heart is blocked.',
        'Gastritis': 'Inflammation of the stomach lining.',
        'Appendicitis': 'Inflammation of the appendix.',
        'Kidney Stones': 'Hard deposits of minerals and salts in the kidneys.'
    };
    
    return descriptions[disease] || 'A medical condition requiring professional consultation.';
}

// Generate recommendations
function generateRecommendations(disease) {
    const commonRecommendations = [
        'Consult a healthcare provider for proper diagnosis',
        'Monitor your symptoms regularly',
        'Stay hydrated and get plenty of rest',
        'Avoid self-medication',
        'Seek immediate medical attention if symptoms worsen'
    ];
    
    const specificRecommendations = {
        'Common Cold': ['Drink warm fluids', 'Use throat lozenges', 'Get extra sleep'],
        'Flu': ['Take prescribed antiviral medication', 'Stay home to prevent spreading', 'Use fever reducers'],
        'COVID-19': ['Get tested immediately', 'Self-isolate', 'Monitor oxygen levels'],
        'Migraine': ['Rest in a dark, quiet room', 'Apply cold compress', 'Avoid trigger foods'],
        'Asthma': ['Use prescribed inhaler', 'Avoid allergens', 'Practice breathing exercises']
    };
    
    const specific = specificRecommendations[disease] || [];
    return [...specific, ...commonRecommendations.slice(0, 2)];
}

// Display results in the UI
function displayResults(predictions) {
    const resultsGrid = document.getElementById('resultsGrid');
    const recommendationsList = document.getElementById('recommendationsList');
    
    // Clear previous results
    resultsGrid.innerHTML = '';
    recommendationsList.innerHTML = '';
    
    // Display predictions
    predictions.forEach((prediction, index) => {
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card fade-in';
        resultCard.style.animationDelay = `${index * 0.2}s`;
        
        resultCard.innerHTML = `
            <h3>${prediction.disease}</h3>
            <div class="probability">${prediction.probability}%</div>
            <p class="description">${prediction.description}</p>
        `;
        
        resultsGrid.appendChild(resultCard);
    });
    
    // Display recommendations from highest probability prediction
    if (predictions.length > 0) {
        predictions[0].recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            recommendationsList.appendChild(li);
        });
    }
}

// Reset form function
function resetForm() {
    document.getElementById('predictionForm').reset();
    document.getElementById('results').style.display = 'none';
    
    // Clear symptom selections
    symptomItems.forEach(item => {
        item.classList.remove('selected');
    });
    
    // Scroll back to form
    document.getElementById('predict').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// ===== ANIMATIONS & ENHANCEMENTS ===== //

// Add input animations
const inputs = document.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Add scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.result-card, .feature-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// ===== UTILITY FUNCTIONS ===== //

// Form validation
function validateForm() {
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const symptoms = document.querySelectorAll('input[name="symptoms"]:checked');
    
    if (!age || !gender || symptoms.length === 0) {
        alert('Please fill in all required fields and select at least one symptom.');
        return false;
    }
    
    if (age < 1 || age > 120) {
        alert('Please enter a valid age between 1 and 120.');
        return false;
    }
    
    return true;
}

// Add loading animation CSS
const loadingCSS = document.createElement('style');
loadingCSS.textContent = `
    .loading {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .fade-in {
        animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(loadingCSS);
