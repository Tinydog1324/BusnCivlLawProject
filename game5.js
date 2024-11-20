// Game State
const gameState = {
    legalScore: 0,
    efficiencyScore: 0,
    structure: [],
    progress: 0
};

// Building Components
const buildingComponents = [
    { type: 'Entity', name: 'LLC', score: 10, efficiency: 8 },
    { type: 'Entity', name: 'Corporation', score: 15, efficiency: 6 },
    { type: 'Tax', name: 'S-Corp Election', score: 8, efficiency: 12 },
    { type: 'Management', name: 'Board Structure', score: 12, efficiency: 10 },
    { type: 'Protection', name: 'Liability Shield', score: 14, efficiency: 7 },
    { type: 'Rights', name: 'Shareholder Agreement', score: 11, efficiency: 9 }
];

// Event Cards
const eventCards = [
    {
        title: 'Market Shift',
        description: 'New competitor enters the market. Efficient management structure provides advantage.',
        effect: (state) => {
            if (state.structure.some(item => item.type === 'Management')) {
                state.efficiencyScore += 5;
                return 'Management structure proves beneficial!';
            }
            state.efficiencyScore -= 3;
            return 'Lack of management structure impacts efficiency.';
        }
    },
    {
        title: 'Regulatory Change',
        description: 'New compliance requirements introduced.',
        effect: (state) => {
            if (state.structure.some(item => item.type === 'Protection')) {
                state.legalScore += 5;
                return 'Liability protection proves valuable!';
            }
            state.legalScore -= 3;
            return 'Lack of protection exposes to risks.';
        }
    },
    {
        title: 'Tax Reform',
        description: 'New tax legislation affects business structures.',
        effect: (state) => {
            if (state.structure.some(item => item.type === 'Tax')) {
                state.efficiencyScore += 7;
                return 'Tax structure optimization pays off!';
            }
            state.efficiencyScore -= 5;
            return 'Missed tax optimization opportunities.';
        }
    }
];

// Initialize Game
function initializeGame() {
    renderComponents();
    updateScores();
}

// Render Available Components
function renderComponents() {
    const componentsContainer = document.getElementById('availableComponents');
    componentsContainer.innerHTML = '';

    buildingComponents.forEach(component => {
        const element = document.createElement('div');
        element.className = 'game-element';
        element.innerHTML = `
            <h3>${component.name}</h3>
            <p>Type: ${component.type}</p>
            <p>Legal Score: ${component.score}</p>
            <p>Efficiency: ${component.efficiency}</p>
        `;
        element.addEventListener('click', () => addToStructure(component));
        componentsContainer.appendChild(element);
    });
}

// Add Component to Structure
function addToStructure(component) {
    gameState.structure.push(component);
    gameState.legalScore += component.score;
    gameState.efficiencyScore += component.efficiency;
    gameState.progress = Math.min(100, gameState.progress + 16.67); // 100% / 6 components

    updateStructure();
    updateScores();
    updateProgress();
}

// Update Structure Display
function updateStructure() {
    const structureContainer = document.getElementById('structureElements');
    structureContainer.innerHTML = '';

    gameState.structure.forEach(component => {
        const element = document.createElement('div');
        element.className = 'game-element fade-in';
        element.innerHTML = `
            <h3>${component.name}</h3>
            <p>Type: ${component.type}</p>
        `;
        structureContainer.appendChild(element);
    });
}

// Update Scores
function updateScores() {
    document.getElementById('legalScore').textContent = gameState.legalScore;
    document.getElementById('efficiencyScore').textContent = gameState.efficiencyScore;
}

// Update Progress Bar
function updateProgress() {
    document.getElementById('progressBar').style.width = `${gameState.progress}%`;
}

// Draw Event Card
function drawEvent() {
    const eventCard = document.getElementById('eventCard');
    const randomEvent = eventCards[Math.floor(Math.random() * eventCards.length)];
    
    const result = randomEvent.effect(gameState);
    
    eventCard.innerHTML = `
        <h3>${randomEvent.title}</h3>
        <p>${randomEvent.description}</p>
        <p><strong>${result}</strong></p>
    `;
    eventCard.style.display = 'block';
    
    updateScores();
    
    setTimeout(() => {
        eventCard.style.display = 'none';
    }, 5000);
}

// Event Listeners
document.getElementById('drawEventCard').addEventListener('click', drawEvent);

// Initialize the game
initializeGame();



function goBack() {
    window.location.href = "index.html"; // Redirect to the home page
}



function checkGameCompletion() {
    if (gameState.progress >= 100) {
        showCompletionModal();
    }
}

function showCompletionModal() {
    const modal = document.getElementById('completionModal');
    document.getElementById('finalLegalScore').textContent = gameState.legalScore;
    document.getElementById('finalEfficiencyScore').textContent = gameState.efficiencyScore;
    modal.style.display = 'block';
}

function restartGame() {
    // Reset game state
    gameState.legalScore = 0;
    gameState.efficiencyScore = 0;
    gameState.structure = [];
    gameState.progress = 0;

    // Reset UI
    document.getElementById('structureElements').innerHTML = '';
    document.getElementById('completionModal').style.display = 'none';
    updateScores();
    updateProgress();
}

// Add event listener for restart button
document.getElementById('restartButton').addEventListener('click', restartGame);

// Modify your addToStructure function to include completion check
function addToStructure(component) {
    gameState.structure.push(component);
    gameState.legalScore += component.score;
    gameState.efficiencyScore += component.efficiency;
    gameState.progress = Math.min(100, gameState.progress + 16.67);

    updateStructure();
    updateScores();
    updateProgress();
    checkGameCompletion(); // Add this line
}


const modal = document.getElementById('howToPlayModal');
const howToPlayBtn = document.querySelector('.how-to-play-btn');
const closeBtn = document.querySelector('.close-btn');

howToPlayBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Close on escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});