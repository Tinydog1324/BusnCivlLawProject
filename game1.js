const cases = [
    {
        text: "Smith Co. entered into a contract with Jones Manufacturing for the delivery of 1000 units of specialized equipment. Jones failed to deliver the units by the agreed-upon date, causing Smith Co. to lose a major client. Smith Co. is now seeking damages.",
        question: "What legal concept is most relevant to this case?",
        options: [
            { text: "Breach of Contract", correct: true },
            { text: "Tort of Negligence", correct: false },
            { text: "Unjust Enrichment", correct: false },
            { text: "Product Liability", correct: false }
        ]
    },
    {
        text: "ABC Corp's employee accidentally shared confidential client information with a competitor, resulting in significant financial losses for the client.",
        question: "Which legal principle applies here?",
        options: [
            { text: "Breach of Fiduciary Duty", correct: true },
            { text: "Strict Liability", correct: false },
            { text: "Adverse Possession", correct: false },
            { text: "Promissory Estoppel", correct: false }
        ]
    },
    {
        text: "XYZ Solutions published false statements about their competitor's product quality, leading to lost sales for the competitor.",
        question: "What type of business tort is this?",
        options: [
            { text: "Trade Libel", correct: true },
            { text: "Battery", correct: false },
            { text: "Conversion", correct: false },
            { text: "Trespass", correct: false }
        ]
    },
    {
            text: "Tech Innovations LLC agreed to develop custom software for Media Corp but used significant portions of copyrighted code without permission, which was discovered after deployment.",
            question: "What area of law is primarily concerned with this case?",
            options: [
                { text: "Intellectual Property Infringement", correct: true },
                { text: "Contract Termination", correct: false },
                { text: "Corporate Negligence", correct: false },
                { text: "Consumer Protection", correct: false }
            ]
        },
        {
            text: "GreenBuild Construction promised to complete an office building using eco-friendly materials, but used standard materials instead while charging premium prices.",
            question: "What legal principle best applies to this situation?",
            options: [
                { text: "Fraudulent Misrepresentation", correct: true },
                { text: "Contributory Negligence", correct: false },
                { text: "Assumption of Risk", correct: false },
                { text: "Agency Law", correct: false }
            ]
        },
        {
            text: "FastFood Chain acquired SmallBurger's secret recipe through a former employee who was bound by a confidentiality agreement.",
            question: "What type of business law violation occurred?",
            options: [
                { text: "Trade Secret Misappropriation", correct: true },
                { text: "Antitrust Violation", correct: false },
                { text: "Securities Fraud", correct: false },
                { text: "Partnership Dissolution", correct: false }
            ]
        },
        {
            text: "WebHost Pro continued charging customers after their service was terminated, claiming system delays in processing cancellations.",
            question: "What legal violation is most applicable?",
            options: [
                { text: "Unfair Business Practice", correct: true },
                { text: "Tortious Interference", correct: false },
                { text: "Corporate Veil Piercing", correct: false },
                { text: "Quantum Meruit", correct: false }
            ]
        },
        {
            text: "Retail Giant pressured smaller suppliers to accept reduced payments after goods were delivered, threatening to end future business relationships.",
            question: "What business law concept is violated here?",
            options: [
                { text: "Economic Duress", correct: true },
                { text: "Vicarious Liability", correct: false },
                { text: "Easement Rights", correct: false },
                { text: "Joint Venture", correct: false }
            ]
        },
        {
            text: "ConsultCo's partner made a significant business decision without consulting other partners, resulting in substantial losses.",
            question: "What legal principle is most relevant?",
            options: [
                { text: "Breach of Partnership Duty", correct: true },
                { text: "Corporate Immunity", correct: false },
                { text: "Statute of Frauds", correct: false },
                { text: "Respondeat Superior", correct: false }
            ]
        },
        {
            text: "Global Shipping failed to properly insure international cargo as promised, resulting in uncompensated losses during transit.",
            question: "Which legal concept applies to this situation?",
            options: [
                { text: "Professional Negligence", correct: true },
                { text: "Maritime Law", correct: false },
                { text: "Force Majeure", correct: false },
                { text: "Bailment", correct: false }
            ]
        },
        {
            text: "MegaCorp continued using a patented manufacturing process after their license expired, claiming they had developed similar technology independently.",
            question: "What is the primary legal issue in this case?",
            options: [
                { text: "Patent Infringement", correct: true },
                { text: "Contractual Ambiguity", correct: false },
                { text: "Corporate Succession", correct: false },
                { text: "Commercial Lease Dispute", correct: false }
            ]
        }
    ]


let currentScore = 0;
let currentLives = 3;
let currentCaseIndex = 0;

function goBack() {
    window.location.href = "index.html"; // Redirect to the home page
}

function updateScore() {
    document.getElementById('score').textContent = currentScore;
    document.getElementById('lives').textContent = currentLives;
}

function showFeedback(correct) {
    const feedback = document.getElementById('feedback');
    feedback.className = `feedback ${correct ? 'correct' : 'incorrect'}`;
    feedback.textContent = correct ? 
        "Correct! +10 points" : 
        "Incorrect! You lost a life";
    feedback.style.display = 'block';
}

function checkWinLose() {
    if (currentScore >= 100) {
        endGame(true);
    } else if (currentLives <= 0) {
        endGame(false);
    }
}

function endGame(won) {
    const caseText = document.getElementById('case-text');
    const options = document.getElementById('options');
    const feedback = document.getElementById('feedback');
    const restart = document.getElementById('restart');

    caseText.innerHTML = won ? 
        "<h2>Congratulations!</h2><p>You've won the case by reaching 100 points!</p>" :
        "<h2>Game Over</h2><p>You've lost all your lives. Better luck next time!</p>";
    
    options.style.display = 'none';
    feedback.style.display = 'none';
    restart.style.display = 'block';
}

function displayCase(caseIndex) {
    const currentCase = cases[caseIndex];
    const caseText = document.getElementById('case-text');
    const options = document.getElementById('options');
    
    caseText.innerHTML = `
        <p>${currentCase.text}</p>
        <p><strong>${currentCase.question}</strong></p>
    `;

    options.innerHTML = '';
    currentCase.options
        .sort(() => Math.random() - 0.5)
        .forEach(option => {
            const button = document.createElement('button');
            button.className = 'option';
            button.textContent = option.text;
            button.onclick = () => selectOption(option.correct);
            options.appendChild(button);
        });
}

function selectOption(correct) {
    if (correct) {
        currentScore += 10;
        showFeedback(true);
    } else {
        currentLives--;
        showFeedback(false);
    }
    
    updateScore();
    checkWinLose();

    if (currentLives > 0 && currentScore < 100) {
        setTimeout(() => {
            currentCaseIndex = (currentCaseIndex + 1) % cases.length;
            displayCase(currentCaseIndex);
            document.getElementById('feedback').style.display = 'none';
        }, 1500);
    }
}

function restartGame() {
    currentScore = 0;
    currentLives = 3;
    currentCaseIndex = 0;
    
    const options = document.getElementById('options');
    const restart = document.getElementById('restart');
    
    options.style.display = 'grid';
    restart.style.display = 'none';
    
    updateScore();
    displayCase(currentCaseIndex);
}

document.getElementById('restart').onclick = restartGame;

// Start the game
restartGame();



document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('rulesModal');
    const btn = document.getElementById('howToPlayBtn');
    const span = document.getElementsByClassName('close')[0];

    // Open modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // Close modal with X button
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === "block") {
            modal.style.display = "none";
        }
    });
});