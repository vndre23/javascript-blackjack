/**
 * 2C = two of clubs (trebol)
 * 2D = Two of Diaminds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tipoDeck = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];
const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
let puntosJugador = 0;
let puntosComputadora = 0;
let smalls = document.querySelectorAll('small');

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
    return deck;
}


const pedirCarta = () => {
    if (deck.length===0){
        throw 'No hay cartas en el deck'
    }
    let carta = deck.pop();
    return carta;
    
    
}

const valorCarta = (carta) => {

    let valor = carta.substring(0,carta.length-1);
    return isNaN(valor) ?  
            (valor==='A' ? valor=11 :  valor=10) 
        :   parseInt(valor)
    
    
}

crearDeck();

//eventos
btnPedir.addEventListener('click', () => {
    
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    
    
    smalls[0].innerText=puntosJugador;
    console.log(puntosJugador);

    //<img class="carta" src="assets/cartas/2C.png"/>
    
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    divCartasJugador.append(imgCarta);

    if(puntosJugador>21){
        console.warn('Lo siento perdiste');
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugador)
        
        return;
    }else if (puntosJugador===21){
        console.warn('Ganaste');
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugador)
       
        return;
    }
});

//turno de la computador

const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        
        
        smalls[1].innerText=puntosComputadora;
        
    
        //<img class="carta" src="assets/cartas/2C.png"/>
        
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta'); 
        divCartasComputadora.append(imgCarta);
    } while( (puntosComputadora<puntosMinimos) && puntosMinimos<=21 );
    setTimeout(()=> {
        if(puntosComputadora === puntosMinimos){
            alert('Empate');
        }else if(puntosMinimos> 21){
            alert('Perdiste Computadora gana');
        }else if(puntosComputadora>21){
            alert('Ganaste');
        }else{
            alert('computadora gana');
        }
    },10);
    
}

btnDetener.addEventListener('click',()=>{
    btnPedir.disabled=true;
    btnDetener.disabled=true;
    turnoComputadora(puntosJugador);

});



