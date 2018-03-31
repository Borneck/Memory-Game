"use strict";
                        /****** Navigation mit Hamburger Menü ******
                        *******************************************/

( function() {
    
                        /******* Klasse zu html hinzufügen JavaScript aktiviert ******/
document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '') + ' js ';
function naviklapp(navid) {
                        /****** Navigationselemente, Button, Menü ******/
var nav = document.getElementById( navid );
var button;
var menu;
                        /****** navigation aus ******/
if ( ! nav )
    return;
                        /****** erster Button des h3-Element innerhalb der Navigation ******/
button = nav.getElementsByTagName('h4')[0];

                        /****** die erste ungeordnete Liste in der Navigation ist das Menü *******/
menu = nav.getElementsByTagName('ul')[0];
    if ( ! button )
    return;

if ( ! menu || ! menu.childNodes.length ) {
    button.style.display = 'none';
    return;
}
button.onclick = function() {

    if ( -1 != button.className.indexOf('toggled_on') ) {
        button.className = button.className.replace('toggled_on', '');
        menu.className = menu.className.replace('toggled_on', '');
    } else {
        button.className += 'toggled_on';
        menu.className += 'toggled_on';
    }
};
}
naviklapp('navi');

} )();;
/***************************************** Ende der Navigation *****************************************************/

                        /****** Mermory Spiel ******
                        ****************************/

                        /****** Speichern der klassen in Variabeln ******/
const deck =document.querySelector('.deck');
const card = document.querySelectorAll('.card');
const decke = document.querySelector('#play-deck');
const restart = document.querySelector('.restart');
const time = document.querySelector(".time");

const move = document.querySelector('.moves');
let count = 0;

let second = 0, minute = 0;
let interval;
let timeControl = true;
                        /****** Klassen namen in Array Speichern ******/
let cards = [...card];
let cardOneTwo = [];
let cardArray = [];
                        /****** Variabeln für Speicherplatz ******/
let cardOne;
let cardTwo;
let cardList;
                        /****** Spiel Starten ******/
document.body.onload = startGame();
                        /****** Spielkarten neu Mischen ******/
                        /***** Shuffle function from http://stackoverflow.com/a/2450976 ******/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


                        /****** Schleife um die Node Liste zu durchlaufen ******/
card.forEach(cardsOpen);
                        /****** Event Listener um Spielkarten zu Öffnen und schließen ******/
function cardsOpen(cards){
    cards.addEventListener('click', cardDisplay, false)
};

                        /****** Funktionen für das Memory Spiel ******/

                        /****** Funktion wenn neues Spiel startet ******/
function startGame(){
    cardsShuffle();
    cardsRemove();
    gameReset();
    
};
                        /****** Funktion um Karten neu zu Mischen ******/ 
function cardsShuffle(){
    cards = shuffle(cards);
};
                        /****** Funktion um Klassen bei Start zu löschen *****/
function cardsRemove() {
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = '';
        [].forEach.call(cards, function(item) {
            decke.appendChild(item);
        });
        cards[i].classList.remove('show', 'open', 'match', 'no-event');
    };
};
                        /****** Funktion zu Anzeigen der Spielkarten ******/
function cardDisplay(){
    cardList = this.classList;
    cardOneTwo.push(this.children[0].classList[1]);
    cardArray.push(this);
     
    openCards()
    if(timeControl == true){startTimer();} 
    twoCardsOpen();
    checkCards();

    return cardList;
};
                        /****** Funktion um Spiel Karten zu öffnen ******/
function openCards(){
    cardList.toggle('open');
    cardList.toggle('show');
    cardList.toggle('no-event');
    
};
                        /****** Funktion um zwei Spielkarten zu öffnen ******/
function twoCardsOpen(){
    if(cardArray.length <= 2) {}
    else {
        cardList.remove('open', 'show', 'no-event')
    };
};
                        /****** Funktion um zwei Spielkarten zu Überprüfen ob richtig ******/
function checkCards(){
    cardOne = cardOneTwo[0];
    cardTwo = cardOneTwo[1];
        
    if (cardOne === undefined ||  cardTwo === undefined ){} 
    else if (cardOne === cardTwo ) {
        cardArray[0].classList.add('match', 'no-event');
        cardArray[1].classList.add('match', 'no-event');
        
        moveCounter();
        cardOneTwo=[];
        cardArray= [];
    }
    else {
        if(cardArray.length === 2){
            moveCounter();
            setTimeout(function(){
                cardArray[0].classList.remove('open', 'show', 'no-event');
                cardArray[1].classList.remove('open', 'show', 'no-event');
                
                cardOneTwo= [];
                cardArray=[];
            }, 1500); 
        }; 
    };
};
                        /****** Funktion um die Versuche zu zählen ******/

function moveCounter(){
    count++;
    if(count <= 1){
        move.innerText = `${count}. Move`;
    } else {
        move.innerText = `${count}. Moves `;
    }
    
}
                        /****** Funktion Move nach restart zurückstetztn ******/
function resetMove() {
    count = 0;
    move.innerText = '';
}
                        /***** Funktion für den Zeitzähler zu starten ******/
function startTimer(){
    timeControl = false;
    interval = setInterval(function(){
        
        time.innerText = `${minute} min ${second} sec`;
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
    },1000);
}
                        /****** Funktion um Zeit zu Stoppen ******/
function timerStop() {
    clearInterval(interval);
}
                        /****** Funtkion Timer nach restart zurückzusetzten ******/
function resetTimer() {
    timerStop();
    second = 0;
    minute = 0;
    time.innerText = '';
    
    timeControl =true;
}
                        /****** Funktion um das Spiele Neu zu starten ******/
function gameReset(){
    restart.addEventListener('click',function(){        
            restart.classList.remove("show");
        resetTimer();
        startGame();
        resetMove();
        cardOneTwo= [];
        cardArray= [];
    });
};


/*************************************** Ende Memory Spiel*******************************************************/
const stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll(".stars li");

/*
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }


  /**
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
