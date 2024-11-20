
// Get modal elements
const rulesModal = document.getElementById('rules-modal');
const howToPlayBtn = document.getElementById('how-to-play-btn');
const closeBtn = document.querySelector('.close-btn');

// Show modal
howToPlayBtn.onclick = function() {
    rulesModal.style.display = 'block';
}

// Close modal when clicking X
closeBtn.onclick = function() {
    rulesModal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == rulesModal) {
        rulesModal.style.display = 'none';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && rulesModal.style.display === 'block') {
        rulesModal.style.display = 'none';
    }
});




const departments = ['HR', 'Finance', 'Operations', 'Marketing', 'International Trade'];
        
const challenges = [
    {
        department: 'HR',
        text: 'An employee files a workplace discrimination complaint.',
        hint: 'Consider federal anti-discrimination laws: Documentation and immediate investigation are crucial for legal compliance. Dismissing or delaying action on discrimination complaints often results in increased liability.',
        choices: [
            { text: 'Immediately investigate and document all findings', correct: true },
            { text: 'Dismiss the complaint as unfounded', correct: false },
            { text: 'Wait to see if the situation resolves itself', correct: false }
        ]
    },
    {
        department: 'Finance',
        text: 'You discover a discrepancy in financial reporting.',
        hint: 'Under Sarbanes-Oxley Act, financial discrepancies must be investigated and reported. Companies are legally required to maintain accurate financial records, regardless of the discrepancy size.',
        choices: [
            { text: 'Adjust the numbers to match expectations', correct: false },
            { text: 'Conduct an internal audit and report findings', correct: true },
            { text: 'Ignore the discrepancy if it\'s minor', correct: false }
        ]
    },
    {
        department: 'Operations',
        text: 'A safety inspection reveals potential OSHA violations.',
        hint: 'OSHA regulations require immediate action on safety violations. Waiting to address known safety issues can result in increased fines and criminal penalties if accidents occur.',
        choices: [
            { text: 'Address violations immediately and document changes', correct: true },
            { text: 'Wait for the official report before acting', correct: false },
            { text: 'Only fix the most visible issues', correct: false }
        ]
    },
    {
        department: 'Marketing',
        text: 'Your advertising campaign might violate FTC guidelines.',
        hint: 'FTC guidelines require all advertising to be truthful and not misleading. Pre-launch legal review is much less costly than FTC fines and mandatory corrective advertising.',
        choices: [
            { text: 'Launch anyway and deal with issues later', correct: false },
            { text: 'Review and revise with legal team', correct: true },
            { text: 'Ignore as competitors do similar things', correct: false }
        ]
    },
    {
        department: 'International Trade',
        text: 'A shipment might contain restricted items.',
        hint: 'Export control laws carry severe penalties including fines and imprisonment. Customs violations cannot be undone once a shipment is sent, and "everyone else does it" is not a legal defense.',
        choices: [
            { text: 'Ship it anyway to meet deadline', correct: false },
            { text: 'Delay shipment for proper verification', correct: true },
            { text: 'Remove documentation of restricted items', correct: false }
        ]
    }
];


let gameState = {
    position: 0,
    score: 0,
    violations: 0,
    consultations: 2,
    time: 0,
    gameOver: false
};

// Initialize board
function initializeBoard() {
    const board = document.getElementById('board');
    departments.forEach((dept, index) => {
        const cell = document.createElement('div');
        cell.className = 'department';
        cell.textContent = dept;
        cell.dataset.index = index;
        board.appendChild(cell);
    });
    updateBoard();
}

// Update board state
function updateBoard() {
    const cells = document.querySelectorAll('.department');
    cells.forEach((cell, index) => {
        cell.classList.remove('active', 'player', 'violation');
        if (index === gameState.position) {
            cell.classList.add('player');
        }
    });
}

// Show challenge modal
function showChallenge() {
    const currentDept = departments[gameState.position];
    const challenge = challenges.find(c => c.department === currentDept);
    
    document.getElementById('challenge-text').textContent = challenge.text;
    
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
    
    challenge.choices.forEach((choice, index) => {
        const button = document.createElement('div');
        button.className = 'choice';
        button.textContent = choice.text;
        button.onclick = () => handleChoice(choice.correct);
        choicesContainer.appendChild(button);
    });

    document.getElementById('challenge-modal').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

// Handle player choice
function handleChoice(correct) {
    if (correct) {
        gameState.score += 100;
    } else {
        gameState.violations++;
    }
    
    document.getElementById('challenge-modal').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    
    updateStats();
    checkGameOver();
}

// Update game stats
function updateStats() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('violations').textContent = gameState.violations;
}

// Check if game is over
function checkGameOver() {
    if (gameState.violations >= 3) {
        alert(`Game Over! Final Score: ${gameState.score}`);
        gameState.gameOver = true;
    }
}

// Handle dice roll
document.getElementById('move-btn').onclick = () => {
    if (gameState.gameOver) return;
    
    const roll = Math.floor(Math.random() * departments.length);
    gameState.position = roll;
    updateBoard();
    showChallenge();
};

// Handle legal consultation
document.getElementById('consult-btn').onclick = () => {
    if (gameState.consultations <= 0) return;
    gameState.consultations--;
    document.getElementById('consult-btn').textContent = 
        `Legal Consultation (${gameState.consultations})`;
    alert('The correct answer is highlighted in blue!');
};

// Start game timer
setInterval(() => {
    if (gameState.gameOver) return;
    gameState.time++;
    const minutes = Math.floor(gameState.time / 60);
    const seconds = gameState.time % 60;
    document.getElementById('time').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
}, 1000);

function goBack() {
    window.location.href = "index.html"; // Redirect to the home page
}

function restartGame() {
    gameState = {
        position: 0,
        score: 0,
        violations: 0,
        consultations: 2,
        time: 0,
        gameOver: false
    };
    
    // Reset UI elements
    document.getElementById('restart-btn').style.display = 'none';
    document.getElementById('move-btn').disabled = false;
    document.getElementById('consult-btn').textContent = 'Legal Consultation (2)';
    document.getElementById('consult-btn').disabled = false;
    
    // Reset board and stats
    updateBoard();
    updateStats();
}

// Modify your existing checkGameOver function
function checkGameOver() {
    if (gameState.violations >= 3) {
        alert(`Game Over! Final Score: ${gameState.score}`);
        gameState.gameOver = true;
        
        // Disable game buttons and show restart
        document.getElementById('move-btn').disabled = true;
        document.getElementById('consult-btn').disabled = true;
        document.getElementById('restart-btn').style.display = 'block';
    }
}


document.getElementById('consult-btn').onclick = () => {
    if (gameState.consultations <= 0) return;
    
    gameState.consultations--;
    document.getElementById('consult-btn').textContent = 
        `Legal Consultation (${gameState.consultations})`;
    
    // Get current challenge and show hint
    const currentDept = departments[gameState.position];
    const currentChallenge = challenges.find(c => c.department === currentDept);
    
    // Create and show hint modal
    const hintModal = document.createElement('div');
    hintModal.className = 'modal active';
    hintModal.innerHTML = `
        <h2>Legal Consultation</h2>
        <div class="hint-content">
            <p>${currentChallenge.hint}</p>
        </div>
        <button class="button" onclick="this.parentElement.remove();document.getElementById('overlay').classList.remove('active')">
            Got it
        </button>
    `;
    
    document.body.appendChild(hintModal);
    document.getElementById('overlay').classList.add('active');
};


// Add event listener for restart button
document.getElementById('restart-btn').addEventListener('click', restartGame);

// Initialize game
initializeBoard();