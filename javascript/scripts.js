$(document).ready(function () {
    $();
    // onclick - click card, card flips click card 2, card flips:  inspiration from https://medium.com/free-code-camp/vanilla-javascript-tutorial-build-a-memory-game-in-30-minutes-e542c4447eae

    startGame();

    function startGame() {
        shuffleDeckEn(); //shuffles the english cards deck on load
        shuffleDeckFrench(); //shuffles the french cards deck on load
        shuffleDeckItalian(); //shuffles the italian cards deck on load
        countdownTimer(); // starts the game timer on load 
     //   
    }

    // displays countdown time in the info div
    function countdownTimer() {

        let secondsLeft = 60;
        setInterval(function () {
            if (secondsLeft <= 0) {
                clearInterval(secondsLeft = 0);
                $('#timer').html("<h3>Time's Up!</h3>");
            }
            $('#time').text(secondsLeft);
            secondsLeft -= 1
        }, 1000);
    }

    // this function ensures the cards are not always displayed in the same format, and not next to each other in pairs 
    function shuffleDeckEn() {
        $(".game-card-en").each(function () {
            let shuffledDeckEn = Math.floor(Math.random() * 21);
            console.log(shuffledDeckEn);
            console.log(this.style.order);
            this.style.order = shuffledDeckEn;
        })
    }
    // this function ensures the cards are not always displayed in the same format, and not next to each other in pairs for the French deck
    function shuffleDeckFrench() {
        $(".game-card-fr").each(function () {
            let shuffleDeckFrench = Math.floor(Math.random() * 21);
            console.log(shuffleDeckFrench);
            console.log(this.style.order);
            this.style.order = shuffleDeckFrench;
        })
    }

    // this function ensures the cards are not always displayed in the same format, and not next to each other in pairs for the Italian deck
    function shuffleDeckItalian() {
        $(".game-card-it").each(function () {
            let shuffleDeckItalian = Math.floor(Math.random() * 21);
            console.log(shuffleDeckItalian);
            console.log(this.style.order);
            this.style.order = shuffleDeckItalian;
        })
    }

    // global variables 
    const gameCards = document.querySelectorAll(".game-card"); //allows access to call and edit game-cards throughout the game
    let isFlippedCard = false; // to identify which cards are turned 
    let freezePlay = false; // to reference during playGame function to ensure not too many cards are turned or checked at once
    let cardOne, cardTwo; // to identify the first and second cards flipped and be able to check them against each other. 
    var matchedPairs = [];  // array populated by number of pairs matched in isPair function
    var matchedPair = 0;  //  matchedPairs array length to display as score in info div

    // this funtion checks if cards are valid to play,  adds a flip class to cards that are valid, and also identifies which are first and second cards in play, then calls isPair. 
    gameCards.forEach(gameCards => gameCards.addEventListener("click", playGame));
    gameCards.forEach(gameCards => gameCards.addEventListener("touchstart", playGame));
   

    function playGame() {
        if (freezePlay) return;
        if (this === cardOne) return;
        $(this).addClass("flip");
        if (!isFlippedCard) {
            isFlippedCard = true;
            cardOne = this;

        } else {
            isFlippedCard = false;
            cardTwo = this;
            isPair();
        }

        // compares cards one and two to see if they are a match based on the data-ident (identifier) in the html. If the cards are a matched, they get a matched class added and are pushed to  matchedPairs variable and disableCardClick prevents further play for a matched pair in this round, else unFlipCards is called to return face down. 
        function isPair() {
            if (cardOne.dataset.ident === cardTwo.dataset.ident) {
                cardOne.classList.add("matched");
                cardTwo.classList.add("matched");
                matchedPairs.push($(".matched"));

                disableCardClick();
                scoreCounter(); // initites the score counter on load
            } else {
                unFlipCards();
            }
        }
        
        // prevents further play for a matched pair in this round
        function disableCardClick() {
            cardOne.removeEventListener("click", playGame);
            cardTwo.removeEventListener("click", playGame);
        }

       // returns cards to original un-flipped state after displaying for a short period of time and stops further cards being clicked in the meantime
        function unFlipCards() {
            freezePlay = true;
            setTimeout(() => {
                cardOne.classList.remove("flip");
                cardTwo.classList.remove("flip");

                clearDeck();
            }, 1700);
        }

        //returns deck to original state at start of play
        function clearDeck() {
            isFlippedCard = false;
            freezePlay = false;
            cardOne = null;
            cardTwo = null;
        }
    }

 
})