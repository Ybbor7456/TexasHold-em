function parseCards(cards) {
    const valueMap = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
                       '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 11,
                       'Q': 12, 'K': 13, 'A': 14 }; // remember that the ace is dual-value

    return cards.map(card => ({
        value: valueMap[card[0]],
        suit: card[1]
    }));
}

function isRoyalFlush(cards){ // 110,11,12,13,14 of same suit
    const suits = {}
    const sf = [10,11,12,13,14]
    //iterate through cards "9h"
    for(let card of cards){
        if(!suits[card.suit]) suits[card.suit] = []; // creates empty array for each suit
        suits[card.suit].push(card.value); 
    }
    for (let suit in suits) {
        const values = suits[suit];
        if (needed.every(v => values.includes(v))) {
            return { isMatch: true, suit: suit, highCard: 14 };
        }
    }
    return { isMatch: false };
}

function isStraightFlush(cards){ // str8 flush has 5 of same suit, check for suit uniformity, consecutive
   const suits = {}
   
   for(let card of cards){
    if (!suits[card.suit]) suits[card.suit] = [];   
        suits[card.suit].push(card.value);      // 
   }

   for (let suit in suits) {
    if (suits[suit].length < 5) continue; // checks all suits to see if all uniform (5), stops otherwise

    let values = [...new Set(suits[suit])]; // remove duplicates
    values.sort((a, b) => b - a); // sort high to low

   
    if (values.includes(14)) values.push(1); // ace as 1 

    let count = 1;
    for (let i = 1; i < values.length; i++) {
        if (values[i] === values[i - 1] - 1) {
            count++;
            if (count >= 5) return values[i - 4]; // return high card of straight
        } else if (values[i] !== values[i - 1]) {
            count = 1; // reset if not duplicate or sequence
        }
    }
}

return null;
}

function isFourOfAKind(cards){ // holds 4 of the same VALUES. 
    const values = {}

    for(let card of cards){
        values[card.value] = (values[card.value] || 0) + 1 ;  
    }
    for(let value in values){
        if(values[value]=== 4){
            const kc = cards
            .filter(card => card.value !== Number(value))
            .map(card => card.value)
            .sort((a, b) => b - a)[0];

            return {
                isMatch: true,
                quadValue: Number(value),
                kc: kc
            };
        }
    }
    return {isMatch: false}
}

function fullHouse(cards){  // 3-2 of the same, aaa22, kk333, ect, any suit
    const values = {}   
    let triplets = null; 
    let doublets = null; 

    for(let card of cards){
        values[card.value] = (values[card.value] || 0) + 1 ;
    }

    for(let value in values){ // checks for triplets and assigns value
        if(values[value] >= 3){
            if (!triplets || Number(value) > triplets) {
                triplets = Number(value);
            }}}
        
    for(let value in values){   // checks for doubles and assigns values
        if(values[value] >= 2){
            if(!doublets || Number(value)> doublets){
                doublets = Number(value); 
            }}}
    
            if (triplets !== null && doublets !== null) { // if both trips and dubs are filled then its fullhouse
                const kc = cards
                    .filter(card => card.value !== triplets && card.value !== doublets)
                    .map(card => card.value)
                    .sort((a, b) => b - a)[0];
                    return {
                        isMatch: true,
                        threeValue: triplets,
                        dubValue: doublets,
                        kc: kc
                    };
                }


return {isMatch: false}
}

function flush(cards){  // all cards of same suit, check for suit uniformity. CHECKS FOR ROYALFLUSH 1ST

    const suits ={}

    for(let card of cards){
            if(!suits[card.suit]) suits[card.suit] = []; // creates empty array for each suit
            suits[card.suit].push(card.value); 
        
    }

    for (let suit in suits) {
        if (suits[suit].length >= 5) {
        const sorted = suits[suit].sort((a, b) => b - a);
            return {
                isMatch: true,
                suit: suit,
                flushCards: sorted.slice(0, 5),
                highCard: sorted[0]
            };
        }
       }   return { isMatch: false }; 
    }

function straight(cards){ //5 cards in sequence, any suit
    
    const values = cards.map(card => card.value);
    const unique = [...new Set(values)];
    unique.sort((a, b) => b - a);
    if (unique.includes(14)) {
        unique.push(1);
    }

    let count = 1
    for(let i = 1; i < unique.length;i++){
        if(unique[i] === unique[i-1]-1){
            count++;
        }
        if(count === 5){
            return{
                isMatch: true,
                highCard: unique[i - 4]
            };

        }
        else if (unique[i] !== unique[i - 1]){ count = 1;}
    }
    return {isMatch: false};
}

function t0k(cards){ // three of a kind, 3 cards of the same value in any suit. 
    const valueMap = {
        '2': 2, '3': 3, '4': 4, '5': 5,
        '6': 6, '7': 7, '8': 8, '9': 9,
        '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
    };
    const values = {}   
    let triplets = null;  

    for(let card of cards){
        const numericValue = valueMap[card.value.toString()];
        if (!numericValue) continue;
        values[numericValue] = (values[numericValue] || 0) + 1;
    }

   for (let value in values) {
        const num = Number(value);
        if (values[num] >= 3) {
            if (!triplets || num > triplets) {
                triplets = num;
            } }}

    if (triplets !== null){
        const kc = cards
        .map(card => valueMap[card.value.toString()])
        .filter(val => val !== triplets)
        .sort((a, b) => b - a)
        .slice(0, 2); // Get top 2 kickers
                return {
                isMatch: true,
                threeValue: triplets,
                kc: kc
                    };}
return {isMatch: false}
}

function twopair(cards){ // 2-2
    const valueMap = {
        '2': 2, '3': 3, '4': 4, '5': 5,
        '6': 6, '7': 7, '8': 8, '9': 9,
        '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
    };
    const values = {}
    //let doublets = null;
 
    for(let card of cards){
        const numericValue = valueMap[card.value.toString()];
        if (!numericValue) continue;
        values[numericValue] = (values[numericValue] || 0) + 1;
    }

    const pairValues = Object.keys(values)
        .map(Number)
        .filter(val => values[val] >= 2)
        .sort((a, b) => b - a);
        if (pairValues.length >= 2) {
            const topTwoPairs = pairValues.slice(0, 2);
    
            // Find the kicker (not in pair values)
            const kicker = cards
                .map(card => valueMap[card.value.toString()])
                .filter(val => !topTwoPairs.includes(val))
                .sort((a, b) => b - a)[0] || null;
    
            return {
                isMatch: true,
                pairs: topTwoPairs,
                kicker: kicker
            };
        }
    
        return { isMatch: false };
}

function pair(cards){ 
    const valueMap = {
        '2': 2, '3': 3, '4': 4, '5': 5,
        '6': 6, '7': 7, '8': 8, '9': 9,
        '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
    };
    const values = {}
    let doublets = null; 

    for(let card of cards){
        const numericValue = valueMap[card.value.toString()];
        if (!numericValue) continue;
        values[numericValue] = (values[numericValue] || 0) + 1;
    }
    for (let value in values) {
        const num = Number(value);
        if (values[num] >= 2) {
            if (!doublets || num > doublets) {
                doublets = num;
            } }}
        if (doublets !== null){
                const kc = cards
                .map(card => valueMap[card.value.toString()])
                .filter(val => val !== doublets)
                .sort((a, b) => b - a)
                .slice(0, 3); // Get top 3 kickers
                        return {
                        isMatch: true,
                        pairValue: doublets,
                        kc: kc
                            };}
        return {isMatch: false}

}

function highcard(cards){ // any 5 card hand that is none of the above. Takes highest card value in hand
    const valueMap = {
        '2': 2, '3': 3, '4': 4, '5': 5,
        '6': 6, '7': 7, '8': 8, '9': 9,
        '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
    };
    const cardValues = cards
    .map(card => valueMap[card.value.toString()])
    .filter(v => v !== undefined)
    .sort((a, b) => b - a) // High to low
    .slice(0, 5); // Only top 5 values matter for high card

return {
    isMatch: true,  // Always a match since every hand has a high card
    highCards: cardValues
};
}

function tiebreak(hand1,hand2){

    const resultA = tiebreak(handA);
    const resultB = tiebreak(handB);
    const cardsA = resultA.highCards;
    const cardsB = resultB.highCards;

    for (let i =0; i < Math.min(cardsA.length, cardsB.length); i++) {
        if (cardsA[i] > cardsB[i]) return 'Hand A wins';
        if (cardsB[i] > cardsA[i]) return 'Hand B wins';
    }
    return 'Tie';
}
















function evaluateHand(cards) {
    const parsed = parseCards(cards);
    
    // Sort by value descending
    parsed.sort((a, b) => b.value - a.value);

    // Try to detect each hand type, in order of strength
    if (isStraightFlush(parsed)) return { handName: "Straight Flush", rankValue: 8000 };
    if (isFourOfAKind(parsed)) return { handName: "Four of a Kind", rankValue: 7000 };
    // ... etc

    return { handName: "High Card", rankValue: parsed[0].value };
}
