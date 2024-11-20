const scenarios = [
    {
        title: "Insider Trading Dilemma",
        description: "You've overheard confidential information about a pending merger that could significantly increase your company's stock value. What do you do?",
        choices: [
            {
                text: "Buy company stocks before the announcement",
                consequences: {
                    reputation: -30,
                    legal: -50,
                    financial: 20,
                    opportunities: -40
                }
            },
            {
                text: "Report the potential insider trading risk to compliance",
                consequences: {
                    reputation: 20,
                    legal: 30,
                    financial: -10,
                    opportunities: 15
                }
            },
            {
                text: "Keep the information to yourself and do nothing",
                consequences: {
                    reputation: 5,
                    legal: 10,
                    financial: 0,
                    opportunities: 5
                }
            }
        ]
    },
    {
        title: "Intellectual Property Dispute",
        description: "A competitor's product seems very similar to your company's patented technology. What action do you take?",
        choices: [
            {
                text: "Immediately file a lawsuit",
                consequences: {
                    reputation: -10,
                    legal: 0,
                    financial: -20,
                    opportunities: -15
                }
            },
            {
                text: "Negotiate and seek a licensing agreement",
                consequences: {
                    reputation: 20,
                    legal: 15,
                    financial: 25,
                    opportunities: 20
                }
            },
            {
                text: "Conduct more research before taking action",
                consequences: {
                    reputation: 10,
                    legal: 10,
                    financial: -5,
                    opportunities: 10
                }
            }
        ]
    },
    {
        title: "Employment Law Challenge",
        description: "An employee has reported workplace discrimination but has requested to keep it confidential. How do you proceed?",
        choices: [
            {
                text: "Launch a full investigation immediately",
                consequences: {
                    reputation: 15,
                    legal: 20,
                    financial: -10,
                    opportunities: 10
                }
            },
            {
                text: "Respect confidentiality but monitor the situation",
                consequences: {
                    reputation: -5,
                    legal: -15,
                    financial: 0,
                    opportunities: -10
                }
            },
            {
                text: "Consult with HR and legal before proceeding",
                consequences: {
                    reputation: 20,
                    legal: 25,
                    financial: -5,
                    opportunities: 15
                }
            }
        ]
    },
    {
        title: "Corporate Governance Issue",
        description: "The board is considering a major restructuring that could affect jobs but improve profitability. How do you handle the situation?",
        choices: [
            {
                text: "Implement changes quickly and quietly",
                consequences: {
                    reputation: -25,
                    legal: -10,
                    financial: 30,
                    opportunities: -20
                }
            },
            {
                text: "Develop a transparent transition plan",
                consequences: {
                    reputation: 25,
                    legal: 20,
                    financial: 10,
                    opportunities: 25
                }
            },
            {
                text: "Delay the restructuring for better timing",
                consequences: {
                    reputation: 5,
                    legal: 5,
                    financial: -15,
                    opportunities: 0
                }
            },
            {
                title: "International Business Ethics",
                description: "Your company is expanding into a foreign market where facilitation payments are common practice. A local official hints at faster processing of permits with a 'consulting fee'. What's your approach?",
                choices: [
                    {
                        text: "Pay the facilitation fee to speed up the process",
                        consequences: {
                            reputation: -25,
                            legal: -40,
                            financial: 15,
                            opportunities: -20
                        }
                    },
                    {
                        text: "Refuse and follow standard procedures, despite delays",
                        consequences: {
                            reputation: 20,
                            legal: 30,
                            financial: -15,
                            opportunities: 10
                        }
                    },
                    {
                        text: "Seek guidance from local legal counsel and ethics committee",
                        consequences: {
                            reputation: 15,
                            legal: 20,
                            financial: -5,
                            opportunities: 15
                        }
                    }
                ]
            },
            {
                title: "Data Privacy Compliance",
                description: "You discover that your company's customer data collection practices don't fully comply with new privacy regulations. The fix would be costly and time-consuming. How do you proceed?",
                choices: [
                    {
                        text: "Implement immediate changes regardless of cost",
                        consequences: {
                            reputation: 25,
                            legal: 35,
                            financial: -30,
                            opportunities: 15
                        }
                    },
                    {
                        text: "Gradually implement changes while maintaining current practices",
                        consequences: {
                            reputation: -10,
                            legal: -20,
                            financial: 10,
                            opportunities: -15
                        }
                    },
                    {
                        text: "Develop a phased compliance plan with clear deadlines",
                        consequences: {
                            reputation: 20,
                            legal: 25,
                            financial: -15,
                            opportunities: 20
                        }
                    }
                ]
            },
            {
                title: "Environmental Compliance",
                description: "Your company's new manufacturing process is technically within legal limits but causing controversy in the local community. What action do you take?",
                choices: [
                    {
                        text: "Continue operations as they're legally compliant",
                        consequences: {
                            reputation: -30,
                            legal: 5,
                            financial: 20,
                            opportunities: -25
                        }
                    },
                    {
                        text: "Invest in exceeding environmental standards",
                        consequences: {
                            reputation: 35,
                            legal: 20,
                            financial: -25,
                            opportunities: 25
                        }
                    },
                    {
                        text: "Form a community advisory board to find solutions",
                        consequences: {
                            reputation: 25,
                            legal: 15,
                            financial: -15,
                            opportunities: 20
                        }
                    }
                ]
            },
           
        ]
    }
];

let currentScenario = 0;
let metrics = {
    reputation: 100,
    legal: 100,
    financial: 100,
    opportunities: 100
};

// Game State Management
function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    loadScenario(0);
    updateMetrics();
}

function loadScenario(index) {
    if (index >= scenarios.length) {
        endGame();
        return;
    }

    const scenario = scenarios[index];
    document.getElementById('scenario-title').textContent = scenario.title;
    document.getElementById('scenario-description').textContent = scenario.description;

    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';

    scenario.choices.forEach((choice, choiceIndex) => {
        const button = document.createElement('button');
        button.className = 'choice-button w-full text-left bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border border-gray-200 mb-4';
        button.textContent = choice.text;
        button.onclick = () => makeChoice(choiceIndex);
        choicesContainer.appendChild(button);
    });

    updateProgress();
}

function makeChoice(choiceIndex) {
    const consequences = scenarios[currentScenario].choices[choiceIndex].consequences;
    
    // Apply consequences with animations
    Object.keys(consequences).forEach(metric => {
        metrics[metric] = Math.max(0, Math.min(100, metrics[metric] + consequences[metric]));
    });

    updateMetrics();
    currentScenario++;
    loadScenario(currentScenario);
}

function updateMetrics() {
    Object.keys(metrics).forEach(metric => {
        const element = document.getElementById(`${metric}-value`);
        element.textContent = metrics[metric];
        
        // Add color coding based on value
        if (metrics[metric] < 40) {
            element.className = 'text-2xl font-bold text-red-600';
        } else if (metrics[metric] < 70) {
            element.className = 'text-2xl font-bold text-yellow-600';
        } else {
            element.className = 'text-2xl font-bold text-green-600';
        }
    });
}

function updateProgress() {
    const progress = (currentScenario / scenarios.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function endGame() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.remove('hidden');

    const finalScores = document.getElementById('final-scores');
    finalScores.innerHTML = '';

    Object.entries(metrics).forEach(([metric, value]) => {
        const scoreCard = document.createElement('div');
        scoreCard.className = 'metric-card bg-white p-4 rounded-lg shadow-md';
        scoreCard.innerHTML = `
            <h3 class="text-gray-600 text-sm font-semibold">${metric.charAt(0).toUpperCase() + metric.slice(1)}</h3>
            <p class="text-2xl font-bold ${value < 40 ? 'text-red-600' : value < 70 ? 'text-yellow-600' : 'text-green-600'}">${value}</p>
        `;
        finalScores.appendChild(scoreCard);
    });
}

function restartGame() {
    currentScenario = 0;
    metrics = {
        reputation: 100,
        legal: 100,
        financial: 100,
        opportunities: 100
    };
    document.getElementById('end-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    loadScenario(0);
    updateMetrics();
}

function goBack() {
    window.location.href = "index.html"; // Redirect to the home page
}

// Event Listeners
document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('restart-button').addEventListener('click', restartGame);


// Get modal elements
const modal = document.getElementById('rules-modal');
const openModalBtn = document.getElementById('how-to-play-btn');
const closeModalBtn = document.getElementById('close-modal');

// Open modal
openModalBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
});

// Close modal functions
const closeModal = () => {
    modal.classList.add('hidden');
    // Restore background scrolling
    document.body.style.overflow = 'auto';
};

// Close with X button
closeModalBtn.addEventListener('click', closeModal);

// Close when clicking outside the modal
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});