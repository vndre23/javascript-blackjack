/**
 * 2C = two of clubs (trebol)
 * 2D = Two of Diaminds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tipoDeck = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];
const crearDeck = () => {
    for (let index = 2; index <= 10; index++) {
        for (let tipo of tipoDeck) {
            deck.push(index + tipo);    
        }
    }

    for(let especial of especiales){
        for(let tipo of tipoDeck){
            deck.push(especial + tipo);
        }
    }
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}
//crearDeck();