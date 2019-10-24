// Global Variables
const HAND_CLASS = {
    "dealer": ".game__table__dealer-hand",
    "player": ".game__table__user-hand"
}
const SUIT_CLASS = { '♤': "playing-card-black", 
                     '♡': 'playing-card-red', 
                     '♧': 'playing-card-black', 
                     '♢': 'playing-card-red' 
}

module.exports = {
    addEventToButton (id, callback) {
        const button = document.querySelector(id);
        button.addEventListener("click", callback);
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

    addCardToTable (playingCard, sectionClass) {
        const table = document.querySelector(HAND_CLASS[sectionClass]);
        table.append(playingCard)
    },

    newDeal (dealtHands) {
        document.querySelectorAll(`${HAND_CLASS.player}, ${HAND_CLASS.dealer}`).innerHTML = "";
        dealtHands.forEach(deal => {
            deal.hand.forEach(card => {
                let newCard = this.generateCard(card);
                this.addCardToTable(newCard, deal.holder)
            });
        });
    },

    userHit (updatedHand) {
        let playerClass = HAND_CLASS.player;
        document.querySelector(playerClass).innerHTML ="";
        updatedHand.forEach(card => {
            let newCard = this.generateCard(card);
            this.addCardToTable(newCard, "player");
        });
    }
}
