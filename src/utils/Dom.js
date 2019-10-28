// Global Variables
const HAND_CLASSES = {
    "dealer": ".game__table__dealer-hand",
    "player": ".game__table__user-hand"
}
const SUIT_CLASS = { '♤': "playing-card-black", 
                     '♡': 'playing-card-red', 
                     '♧': 'playing-card-black', 
                     '♢': 'playing-card-red' 
}

module.exports = {
    addCardToTable (playingCard, sectionClass, newHand = false) {
        const table = document.querySelector(HAND_CLASSES[sectionClass]);
        if (newHand && sectionClass === "dealer") {
            const cardBack = this.generateCardBack();

            table.append(cardBack);
            table.append(playingCard)
        } else {
            table.append(playingCard)
        }
    },

    addEventToButton (id, callback) {
        const button = document.querySelector(id);
        button.addEventListener("click", callback);
    },

    addGameButtons () {
        const buttonContainer = document.querySelector(".game__button-wrapper");
        const hitButton = document.createElement("button");
        const doubleButton = document.createElement("button");
        const standButton = document.createElement("button");
        
        hitButton.classList.add("game__button");
        hitButton.setAttribute("id", "hit");
        hitButton.innerHTML = "Hit"

        doubleButton.classList.add("game__button");
        doubleButton.setAttribute("id", "double");
        doubleButton.innerHTML = "Double Bet";

        standButton.classList.add("game__button");
        standButton.setAttribute("id", "stand");
        standButton.innerHTML = "Stand";

        const buttons = [ hitButton, doubleButton, standButton ];
        buttons.forEach(button => { buttonContainer.append(button) });
    },

    clearBoard () {
        this.updateTableMesage("");
        document.querySelector(HAND_CLASSES.dealer).innerHTML = "";
        document.querySelector(HAND_CLASSES.player).innerHTML = "";

    },

    dealerHit (updatedHand) {
        let dealerClass = HAND_CLASSES.dealer;
        document.querySelector(dealerClass).innerHTML = "";
        updatedHand.getCards().forEach(card => {
            let newCard = this.generateCard(card);
            this.addCardToTable(newCard, "dealer");
        });
    },

    generateCard (card) {
        const playingCard = document.createElement("section");
        playingCard.classList.add("playing-card");
        playingCard.classList.add(SUIT_CLASS[card.suit]);
        
        const valueContainer = document.createElement("section");
        valueContainer.classList.add("value-container");
        
        const value = document.createElement("span");
        value.classList.add("value");
        value.textContent = card.getValue();
        
        const suit = document.createElement("span");
        suit.classList.add("suit");
        suit.textContent = card.getSuit();
        suit.classList.add([SUIT_CLASS[card.suit]])
        
        valueContainer.append(value);
        valueContainer.append(suit);
        playingCard.append(valueContainer);
        
        return playingCard;
    },

    generateCardBack () {
        const playingCardBack = document.createElement("section");
        playingCardBack.classList.add("playing-card");
        playingCardBack.classList.add("playing-card-down")
        return playingCardBack
    },

    getBetFromUser (game) {
        let balance = game.getUserChips();
        let promptMsg = `Enter your bet   \n\nYou're current balance is:  ${balance}`
        let bet = Number(prompt(promptMsg));
        while (bet > balance || bet <= 0) {
            promptMsg = (bet === 0) ? 
                `You can't not bet you fool! Enter a real one   \n\nYou're current balance is:  ${balance}` :
                `Give a serious bet, please. No funny business   \n\nYou're current balance is:  ${balance}`
           
            bet = Number(prompt(promptMsg));
        }
    },

    newDeal (dealtHands) {
        document.querySelectorAll(`${HAND_CLASSES.player}, ${HAND_CLASSES.dealer}`).innerHTML = "";
        dealtHands.forEach(deal => {
            deal.hand.forEach(card => {
                let newCard = this.generateCard(card);
                this.addCardToTable(newCard, deal.holder, true)
            });
        });
    },

    userDoubleBet (bet) {
        console.log(bet * 2);
    },

    userStand() {
        console.log(" Standing ");
    },

    removeEventFromButton(id, callback) {
        let button = document.querySelector(id);
        button.removeEventListener("click", callback);
    },

    updateTableMesage (messageStr) {
        let tableMsgBox = document.querySelector(".game__table__message");
        tableMsgBox.innerHTML = messageStr;
    },

    updateChipCount (ChipCountStr){
        let chipCount = document.querySelector(".chip-count")
        chipCount.innerHTML = ChipCountStr; 
    },

    updateUserBet (userBetStr){
        let userChips = document.querySelector(".user-chips")
        userChips.innerHTML = userBetStr 
    },

    userHit (updatedHand) {
        let playerClass = HAND_CLASSES.player;
        document.querySelector(playerClass).innerHTML = "";
        updatedHand.getCards().forEach(card => {
            let newCard = this.generateCard(card);
            this.addCardToTable(newCard, "player");
        });
    }
}

 
