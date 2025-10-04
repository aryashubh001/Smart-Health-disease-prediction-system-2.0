// ===== NAVIGATION & UI ===== //
function scrollToPredict() {
  document.getElementById('predict').scrollIntoView({ behavior: 'smooth' });
}

// ===== SYMPTOM SELECTION ===== //
document.querySelectorAll('.symptom-item').forEach(item => {
  item.addEventListener('click', () => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
    item.style.background = checkbox.checked ? 'rgba(0, 210, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)';
  });
});

// ===== FORM SUBMISSION ===== //
document.getElementById('predictionForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const symptoms = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

  if (symptoms.length === 0) {
    alert('Please select at least one symptom.');
    return;
  }

  const resultsSection = document.getElementById('results');
  const resultsGrid = document.getElementById('resultsGrid');
  const recommendationsList = document.getElementById('recommendationsList');

  // Show loading
  const button = document.querySelector('.predict-glow');
  const originalText = button.innerHTML;
  button.innerHTML = '<span class="loading"></span> Analyzing...';
  button.disabled = true;

  setTimeout(() => {
    const predictions = generatePredictions(symptoms);
    displayResults(predictions);

    button.innerHTML = originalText;
    button.disabled = false;

    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
  }, 2000);
});

// ===== PREDICTION LOGIC ===== //
const diseaseDatabase = {
  fever: ['Common Cold', 'Flu', 'COVID-19'],
  cough: ['Common Cold', 'Bronchitis', 'Pneumonia'],
  headache: ['Migraine', 'Tension Headache', 'Sinusitis'],
  fatigue: ['Anemia', 'Hypothyroidism', 'Chronic Fatigue'],
  nausea: ['Gastroenteritis', 'Food Poisoning', 'Motion Sickness'],
  breathing: ['Asthma', 'Pneumonia', 'COVID-19'],
  'chest-pain': ['Heartburn', 'Angina', 'Heart Attack'],
  'stomach-pain': ['Gastritis', 'Appendicitis', 'Kidney Stones']
};

function generatePredictions(symptoms) {
  const counts = {};
  symptoms.forEach(symptom => {
    if (diseaseDatabase[symptom]) {
      diseaseDatabase[symptom].forEach(disease => {
        counts[disease] = (counts[disease] || 0) + 1;
      });
    }
  });

  const predictions = Object.entries(counts)
    .map(([disease, count]) => ({
      disease,
      probability: Math.min(90, 30 + count * 20),
      description: getDiseaseDescription(disease),
      recommendations: generateRecommendations(disease)
    }))
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 3);

  return predictions.length ? predictions : [
    {
      disease: 'No specific condition detected',
      probability: 50,
      description: 'Please select more symptoms for better prediction.',
      recommendations: ['Monitor symptoms', 'Stay hydrated', 'Rest well']
    }
  ];
}

function getDiseaseDescription(disease) {
  const map = {
    'Common Cold': 'Mild viral infection of the upper respiratory tract.',
    'Flu': 'Contagious respiratory illness caused by influenza viruses.',
    'COVID-19': 'Respiratory illness caused by SARS-CoV-2 virus.',
    'Bronchitis': 'Inflammation of the bronchial tubes.',
    'Pneumonia': 'Infection that inflames air sacs in the lungs.',
    'Migraine': 'Neurological condition causing severe headaches.',
    'Tension Headache': 'Most common type of headache.',
    'Sinusitis': 'Inflammation of the sinuses.',
    'Anemia': 'Low red blood cell count.',
    'Hypothyroidism': 'Underactive thyroid gland.',
    'Chronic Fatigue': 'Extreme fatigue lasting over 6 months.',
    'Gastroenteritis': 'Stomach and intestine inflammation.',
    'Food Poisoning': 'Illness from contaminated food.',
    'Motion Sickness': 'Nausea from movement.',
    'Asthma': 'Airway inflammation and narrowing.',
    'Heartburn': 'Burning chest pain from acid reflux.',
    'Angina': 'Chest pain from reduced blood flow.',
    'Heart Attack': 'Blocked blood flow to the heart.',
    'Gastritis': 'Stomach lining inflammation.',
    'Appendicitis': 'Inflammation of the appendix.',
    'Kidney Stones': 'Hard mineral deposits in kidneys.'
  };
  return map[disease] || 'Consult a healthcare provider for accurate diagnosis.';
}

function generateRecommendations(disease) {
  const base = [
    'Consult a healthcare provider for proper diagnosis',
    'Monitor your symptoms regularly',
    'Avoid self-medication'
  ];

  const specific = {
    'Common Cold': ['Drink warm fluids', 'Rest', 'Use lozenges'],
    'Flu': ['Take antiviral meds', 'Rest', 'Isolate yourself'],
    'COVID-19': ['Get tested', 'Self-isolate', 'Monitor oxygen'],
    'Migraine': ['Rest in dark room', 'Avoid screens', 'Use cold compress'],
    'Asthma': ['Use inhaler', 'Avoid allergens', 'Practice breathing']
  };

  return [...(specific[disease] || []), ...base.slice(0, 2)];
}

// ===== DISPLAY RESULTS ===== //
function displayResults(predictions) {
  const grid = document.getElementById('resultsGrid');
  const list = document.getElementById('recommendationsList');

  grid.innerHTML = predictions.map((p, i) => `
    <div class="result-card" style="animation-delay: ${i * 0.2}s">
      <h3>${p.disease}</h3>
      <div class="probability">${p.probability}%</div>
      <p>${p.description}</p>
    </div>
  `).join('');

  list.innerHTML = predictions[0].recommendations.map(r => `<li>${r}</li>`).join('');
}

// ===== RESET ===== //
function resetForm() {
  document.getElementById('predictionForm').reset();
  document.querySelectorAll('.symptom-item').forEach(item => {
    item.style.background = 'rgba(255, 255, 255, 0.05)';
  });
  document.getElementById('results').style.display = 'none';
  document.getElementById('predict').scrollIntoView({ behavior: 'smooth' });
}

// ===== LOADING ANIMATION ===== //
const loadingCSS = document.createElement('style');
loadingCSS.textContent = `
  .loading {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 3px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;
document.head.appendChild(loadingCSS);
