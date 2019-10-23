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
        const table = document.querySelector(".game__table");
        table.append(playingCard);
    },

    dealCards (dealtHands) {
        dealtHands.userCards.forEach(card => {
            let newCard = this.generateCard(card);
            this.addCardToTable(newCard, "player");
        });
    }
}