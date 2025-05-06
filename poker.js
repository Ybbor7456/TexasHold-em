const readline = require('readline');               
const evaluator = require('poker-evaluator');   // used to evaluate poker hands

const rl = readline.createInterface({   // reads user input for # of players
    input: process.stdin,
    output: process.stdout
});
const suits = ['s', 'h', 'd', 'c']; // spades, hearts, diamonds, clubs
const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];


function createDeck() {
    const deck = [];    // empty deck 
    for (let suit of suits) {
        for (let value of values) {
            deck.push(value + suit);    // fill deck
        }
    }
    return deck;
}

// Shuffle using fisher-yates algorithm 
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];    //swaps values
    }
    return array;
}


function deal(deck, numPlayers) {   // deals 2 cards to each player
    const hands = [];           
    for (let i = 0; i < numPlayers; i++) {
        hands.push([deck.pop(), deck.pop()]);
    }
    return hands;
}

function dealCommunityCards(deck) { // 5 more cards 
    return [deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop()];
}


rl.question('Enter number of players (2–10): ', (input) => {    //user input for #of players
    const numPlayers = parseInt(input);

    if (isNaN(numPlayers) || numPlayers < 2 || numPlayers > 10) {  
        console.log('Please enter a number between 2-10.');
        rl.close();
        return;
    }

    const deck = shuffle(createDeck());     
    const hands = deal(deck, numPlayers);   
    const communityCards = dealCommunityCards(deck);

    console.log("\nPlayer Cards");
    hands.forEach((hand, i) => {
        console.log(`Player ${i + 1}: ${hand.join(', ')}`);
    });

    console.log("\nCommunity Cards");
    console.log(communityCards.join(', '));

    const results = hands.map((hand, i) => {
        const fullHand = hand.concat(communityCards);
        const evaluation = evaluator.evalHand(fullHand);
        return {
            player: i + 1,
            hand,
            handName: evaluation.handName,
            value: evaluation.value
        };
    });

    // Sort by value descending
    results.sort((a, b) => b.value - a.value);

    console.log("\nResults");
    results.forEach(res => {
        console.log(`Player ${res.player}: ${res.handName}`);
    });

    console.log(`\n Winner: Player ${results[0].player} with a ${results[0].handName}`);

    rl.close();
});
