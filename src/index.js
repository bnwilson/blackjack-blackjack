const {
    default: { singleDeckGame }
  } = require("blackjack-dealer-logic");
import Dom from './utils/Dom';

function createGameButtons() {
  Dom.addGameButtons();
}

function addPlayerHitEvent(game) {
  Dom.addEventToButton("#hit", () => {
    Dom.userHit(game.getUserHand());
  })
}

function addPlayerDoubleEvent(game, bet) {
  Dom.addEventToButton("#double", () => {
    (game.isUserPlaying) ? Dom.playerDoubleBet(bet) : Dom.updateTableMesage("Double?? It's not your turn!")
  })
}

function addPlayerStandEvent(game) {
  Dom.addEventToButton("#stand", () => {
    (game.isUserPlaying) ? Dom.playerStand() : Dom.updateTableMesage("Stand?? Hold your horses, your turn is over!")
  })
}

function addGameStartEvent() {
  Dom.addEventToButton("#deal", initializeGame);
}

function removeGameStartEvent() {
  Dom.removeEventFromButton("#deal", initializeGame);
  Dom.addEventToButton("#deal", () => {
    Dom.updateTableMesage("You were already dealt the cards!");
  })
}

function buildHandsArray (game) {
  let userHand = game.getUserHand();
  let dealerHand = game.getDealerHand();
  return [ { hand: userHand.getCards(), holder: "player"},
           { hand: dealerHand.getCards(), holder: "dealer" } ]
}

function getBet (game) {
  let balance = game.getUserChips();
    let promptMsg = `Enter your bet   \n\nYou're current balance is:  ${balance}`
    let bet = Number(prompt(promptMsg));
    while (bet > balance || bet <= 0) {
        promptMsg = (bet === 0) ? 
            `You can't not bet you fool! Enter a real one   \n\nYou're current balance is:  ${balance}` :
            `Give a serious bet, please. No funny business   \n\nYou're current balance is:  ${balance}`
        
        bet = Number(prompt(promptMsg));
    }
    return bet;
}


function initializeGame () {
  singleDeckGame.deal();
  let bet = getBet(singleDeckGame);
  let dealtHands = buildHandsArray(singleDeckGame);
  createGameButtons();
  removeGameStartEvent();
  addPlayerHitEvent(singleDeckGame);
  addPlayerDoubleEvent(singleDeckGame);
  addPlayerStandEvent(singleDeckGame);


  Dom.newDeal(dealtHands);

 
};

const userHit = () => {

}

// Add listenEvent to deal button
addGameStartEvent();

/**************** Old Code kept to be laughed at later ****************/
// const addHitButtonEvent = (game) => {
//   // User Hit (add new card to user hand)
//   let buttonId = "#hit";
//   function callback () {
//     Dom.userHit(singleDeckGame.getUserHand())
//   }
//   Dom.addEventToButton(buttonId, callback);
// }

// dealButton.addEventListener("click", () => { 
//   singleDeckGame.deal();
  
//   let userHand = singleDeckGame.getUserHand();
//   let dealerHand = singleDeckGame.getDealerHand();
//   let dealtHand = {
//     userCards: userHand.getCards(),
//     dealerCards: dealerHand.getCards()
//   }
//   console.log(dealtHand);
//   Dom.dealCards(dealtHand);
// });