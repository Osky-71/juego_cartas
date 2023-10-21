// Representación completa de una baraja estándar con imágenes de "https://deckofcardsapi.com"
const suits = ['H', 'D', 'C', 'S'];
const values = [
    {name: '2', value: 2},
    {name: '3', value: 3},
    {name: '4', value: 4},
    {name: '5', value: 5},
    {name: '6', value: 6},
    {name: '7', value: 7},
    {name: '8', value: 8},
    {name: '9', value: 9},
    {name: '10', value: 10},
    {name: 'J', value: 11},
    {name: 'Q', value: 12},
    {name: 'K', value: 13},
    {name: 'A', value: 14},
];

const deck = [];

suits.forEach(suit => {
    values.forEach(value => {
        const imagePath = `https://deckofcardsapi.com/static/img/${value.name}${suit}.png`;
        deck.push({
            name: value.name,
            value: value.value,
            imagePath: imagePath
        });
    });
});

let player1Score = 0;
let player2Score = 0;

// Función para mezclar la baraja
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Función para jugar una ronda
function playRound() {
    shuffle(deck);
    const player1Card = deck[0];
    const player2Card = deck[1];

    // Mostrar imágenes de las cartas
    document.getElementById('player1Card').src = player1Card.imagePath;
    document.getElementById('player2Card').src = player2Card.imagePath;

    if (player1Card.value > player2Card.value) {
        player1Score++;
        updateStatus(`Jugador 1 saca ${player1Card.name} de ${getSuitName(player1Card.imagePath)}, Jugador 2 saca ${player2Card.name} de ${getSuitName(player2Card.imagePath)}. ¡Jugador 1 gana!`);
    } else if (player1Card.value < player2Card.value) {
        player2Score++;
        updateStatus(`Jugador 1 saca ${player1Card.name} de ${getSuitName(player1Card.imagePath)}, Jugador 2 saca ${player2Card.name} de ${getSuitName(player2Card.imagePath)}. ¡Jugador 2 gana!`);
    } else {
        updateStatus(`Jugador 1 saca ${player1Card.name} de ${getSuitName(player1Card.imagePath)}, Jugador 2 saca ${player2Card.name} de ${getSuitName(player2Card.imagePath)}. ¡Es un empate!`);
    }
}

function updateStatus(message) {
    document.getElementById('status').innerHTML = `${message} <br> 
        Puntuación: Jugador 1: ${player1Score}, Jugador 2: ${player2Score}`;
}

function getSuitName(imagePath) {
    const lastChar = imagePath[imagePath.length - 5];
    switch (lastChar) {
        case 'H': return 'corazones';
        case 'D': return 'diamantes';
        case 'C': return 'tréboles';
        case 'S': return 'picas';
    }
}
