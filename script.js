// Keep track of which option is selected
let selectedOption = null;

// Object to store all game titles
const gameTitles = {
    1: "Law Case Challenge",
    2: "Contract Negotiation Simulator",
    3: "Legal Ethics Dilemma Maze",
    4: "Regulatory Compliance Race",
    5: "Corporate Structure Builder",
    6: "Legal Terms Match"
};

function selectOption(optionNumber) {
    // Remove "selected" class from any previously selected option
    if (selectedOption !== null) {
        document.getElementById(`option${selectedOption}`).classList.remove("selected");
    }
    
    // Mark the clicked option as selected
    selectedOption = optionNumber;
    document.getElementById(`option${optionNumber}`).classList.add("selected");
}

function startGame() {
    if (selectedOption !== null) {
        // Get the game title using the selected option number
        const gameTitle = gameTitles[selectedOption];
        
        // Show alert with the game title
        alert(`Starting ${gameTitle}`);
        
        // Redirect to the appropriate game page
        window.location.href = `game${selectedOption}.html`;
    } else {
        alert("Please select a case to start the game.");
    }
}

// Optional: Add event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click listeners to all options
    for (let i = 1; i <= 6; i++) {
        const option = document.getElementById(`option${i}`);
        if (option) {
            option.addEventListener('click', () => selectOption(i));
        }
    }
    
    // Add click listener to start button
    const startButton = document.querySelector('.start-btn');
    if (startButton) {
        startButton.addEventListener('click', startGame);
    }
});