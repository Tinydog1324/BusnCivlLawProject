function goBack() {
    window.location.href = "index.html"; // Redirect to the home page
}




document.addEventListener('DOMContentLoaded', function() {
    const startScreen = document.getElementById('startScreen');
    const startButton = document.getElementById('startButton');
    const gameContent = document.getElementById('gameContent');
    
    // Initially hide the game content
    gameContent.style.display = 'none';

    // Start button click handler
    startButton.addEventListener('click', function() {
        startScreen.style.display = 'none';
        gameContent.style.display = 'block';
        startGame(); // This will initialize your game
    });
});



// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('howToPlayModal');
    const btn = document.getElementById('howToPlayBtn');
    const closeBtn = document.querySelector('.close-btn');

    // Open modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // Close modal with X button
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});


class ContractNegotiator {
    constructor() {
        this.score = 0;
        this.round = 1;
        this.timeRemaining = 100;
        this.negotiations = [];
        this.gameStarted = false;
        this.initializeGame();
    }

    

    initializeGame() {
        this.setupEventListeners();
        this.updateUI();
    }

    setupEventListeners() {

        const startButton = document.getElementById('startGameBtn');
        startButton.addEventListener('click', () => this.startGame());

        document.getElementById('propose').addEventListener('click', () => this.proposeTerm());
        document.getElementById('counter').addEventListener('click', () => this.makeCounterOffer());
        document.getElementById('analyze').addEventListener('click', () => this.analyzeContract());
        document.getElementById('nextRound').addEventListener('click', () => this.nextRound());
    }

    startGame() {
        if (!this.gameStarted) {
            this.gameStarted = true;
            this.startTimer();
            // Disable the start button
            const startButton = document.getElementById('startGameBtn');
            startButton.disabled = true;
            startButton.classList.add('disabled');
            startButton.textContent = 'Game In Progress';
        }
    }

    startTimer() {
        const timerInterval = setInterval(() => {
            this.timeRemaining -= 1;
            document.getElementById('timeBar').style.width = `${this.timeRemaining}%`;
            
            if (this.timeRemaining <= 0) {
                clearInterval(timerInterval);
                this.endRound();
            }
        }, 100);
    }

    proposeTerm() {
        const terms = this.getCurrentTerms();
        const response = this.evaluateProposal(terms);
        this.addNegotiationLog(`You proposed: ${response.message}`);
        this.updateScore(response.points);
    }

    makeCounterOffer() {
        const counterOffer = this.generateCounterOffer();
        this.addNegotiationLog(`Counter-offer: ${counterOffer.message}`);
        this.updateScore(counterOffer.points);
    }

    analyzeContract() {
        const analysis = this.performAnalysis();
        this.addNegotiationLog(`Analysis: ${analysis.message}`);
        this.updateScore(analysis.points);
    }

    getCurrentTerms() {
        return {
            payment: document.getElementById('paymentTerms').value,
            duration: document.getElementById('duration').value,
            liability: document.getElementById('liability').value
        };
    }

    evaluateProposal(terms) {
        let points = 0;
        let message = '';

        switch(terms.payment) {
            case 'upfront':
                points -= 10;
                message = 'Full upfront payment is risky for your company.';
                break;
            case 'split':
                points += 20;
                message = 'Balanced payment terms are favorable.';
                break;
            case 'milestone':
                points += 30;
                message = 'Milestone-based payments protect both parties.';
                break;
        }

        return { points, message };
    }

    generateCounterOffer() {
        const offers = [
            { message: 'We propose a 60/40 payment split with extended warranty.', points: 15 },
            { message: 'How about quarterly payments with reduced liability?', points: 20 },
            { message: 'We can offer better terms with a longer commitment.', points: 25 }
        ];
        return offers[Math.floor(Math.random() * offers.length)];
    }

    performAnalysis() {
        const terms = this.getCurrentTerms();
        let riskLevel = 'low';
        let points = 10;

        if (terms.liability === 'high' && terms.payment === 'upfront') {
            riskLevel = 'high';
            points = -10;
        }

        return {
            message: `Contract risk level: ${riskLevel}. Consider adjusting terms.`,
            points
        };
    }

    addNegotiationLog(message) {
        const log = document.getElementById('negotiationLog');
        const entry = document.createElement('p');
        entry.textContent = message;
        log.prepend(entry);
    }

    updateScore(points) {
        this.score += points;
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = this.score;
        scoreElement.classList.add('animated-score');
        setTimeout(() => scoreElement.classList.remove('animated-score'), 500);
    }

    endRound() {
        const modal = document.getElementById('resultModal');
        const content = document.getElementById('modalContent');
        content.innerHTML = `
            <p>Round ${this.round} Complete!</p>
            <p>Score: ${this.score}</p>
            <p>Key Achievements:</p>
            <ul class="list-disc list-inside">
                <li>Negotiation Style: ${this.score > 0 ? 'Excellent' : 'Needs Improvement'}</li>
                <li>Terms Secured: ${this.negotiations.length}</li>
                <li>Relationship Status: ${this.score > 50 ? 'Strong' : 'Moderate'}</li>
            </ul>
        `;
        modal.style.display = 'flex';
    }

    nextRound() {
        if (this.round < 4) {
            this.round++;
            this.timeRemaining = 100;
            this.gameStarted = false; // Reset game started flag
            document.getElementById('round').textContent = `${this.round}/4`;
            document.getElementById('resultModal').style.display = 'none';
            document.getElementById('negotiationLog').innerHTML = '';
            
            // Reset start button
            const startButton = document.getElementById('startGameBtn');
            startButton.disabled = false;
            startButton.classList.remove('disabled');
            startButton.textContent = 'Start Round';
        } else {
            alert('Game Complete! Final Score: ' + this.score);
            location.reload();
        }
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('round').textContent = `${this.round}/4`;
    }
}

// Start the game when the page loads
window.addEventListener('load', () => {
    new ContractNegotiator();
});