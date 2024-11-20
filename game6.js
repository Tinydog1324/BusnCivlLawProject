const legalTerms = [
    { term: "Tort", definition: "A civil wrong that causes harm or injury to another person or their property" },
    { term: "Contract", definition: "A legally binding agreement between two or more parties" },
    { term: "Negligence", definition: "Failure to exercise reasonable care, resulting in damage or injury to another" },
    { term: "Breach of Contract", definition: "Violation of a binding agreement's terms or obligations" },
    { term: "Liability", definition: "Legal responsibility for one's acts or omissions" },
    { term: "Due Diligence", definition: "Reasonable steps taken to satisfy legal requirements" },
    { term: "Damages", definition: "Monetary compensation for legal injury or loss" },
    { term: "Force Majeure", definition: "Unforeseeable circumstances preventing contract fulfillment" }
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let attempts = 0;
let startTime = null;
let timerInterval = null;

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    const allCards = [...legalTerms, ...legalTerms].map((item, index) => ({
        ...item,
        id: index,
        isDefinition: index >= legalTerms.length
    }));
    
    allCards.sort(() => Math.random() - 0.5);

    allCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <div class="card-front"></div>
            <div class="card-back">${card.isDefinition ? card.definition : card.term}</div>
        `;
        cardElement.dataset.id = card.id;
        cardElement.dataset.term = card.term;
        cardElement.addEventListener('click', () => flipCard(cardElement));
        gameBoard.appendChild(cardElement);
    });
}

function flipCard(card) {
    if (lockBoard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');

    if (!firstCard) {
        firstCard = card;
        if (!startTime) startTimer();
        return;
    }

    secondCard = card;
    attempts++;
    document.getElementById('attempts').textContent = attempts;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.term === secondCard.dataset.term;

    if (isMatch) {
        matches++;
        document.getElementById('matches').textContent = matches;
        
        // Add matched animation
        firstCard.style.animation = 'matched 0.5s ease';
        secondCard.style.animation = 'matched 0.5s ease';
        
        resetBoard();
        if (matches === legalTerms.length) {
            setTimeout(endGame, 500);
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1500);
    }
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const currentTime = new Date();
    const timeDiff = Math.floor((currentTime - startTime) / 1000);
    const minutes = Math.floor(timeDiff / 60);
    const seconds = timeDiff % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timer').textContent = timeString;
}

function endGame() {
    clearInterval(timerInterval);
    const finalTime = document.getElementById('timer').textContent;
    document.getElementById('finalTime').textContent = finalTime;
    document.getElementById('finalAttempts').textContent = attempts;
    document.getElementById('gameEndModal').style.display = 'flex';
}

function restartGame() {
    matches = 0;
    attempts = 0;
    startTime = null;
    clearInterval(timerInterval);
    
    document.getElementById('matches').textContent = '0';
    document.getElementById('attempts').textContent = '0';
    document.getElementById('timer').textContent = '0:00';
    document.getElementById('gameEndModal').style.display = 'none';
    
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    createBoard();
}

createBoard();

function goBack() {
    window.location.href = "index.html"; // Redirect to the home page
}


const rulesModal = document.getElementById('rulesModal');
const howToPlayBtn = document.getElementById('howToPlayBtn');
const closeBtn = document.querySelector('.close-btn');

howToPlayBtn.addEventListener('click', () => {
    rulesModal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    rulesModal.style.display = 'none';
});

rulesModal.addEventListener('click', (e) => {
    if (e.target === rulesModal) {
        rulesModal.style.display = 'none';
    }
});