const {
    default: { singleDeckGame }
  } = require("blackjack-dealer-logic");
import Dom from './utils/Dom';

function createGameButtons() {
  Dom.addGameButtons();
}

function playerHitAndEvalCallback () {
  if (singleDeckGame.isUserPlaying()) {
    singleDeckGame.hitUser();
    Dom.userHit(singleDeckGame.getUserHand());
    (didUserBust(singleDeckGame)) ? removeHitDoubleStandEvents(singleDeckGame) : Dom.updateTableMesage("Dealer:  Whew, that was intense!");
  } else {
    Dom.updateTableMesage("Dealer:  You can't hit again, you dolt!")
  }
}

function addPlayerHitEvent(game) {
  Dom.addEventToButton("#hit", playerHitAndEvalCallback)
}

function playerDoubleEventCallback() {
  (singleDeckGame.isUserPlaying()) ? 
    Dom.userDoubleBet(singleDeckGame.getAnte()) : 
    Dom.updateTableMesage("Double?? It's not your turn!");
}

function addPlayerDoubleEvent() {
  Dom.addEventToButton("#double", playerDoubleEventCallback)
}

function playerStandEventCallback() {
  (singleDeckGame.isUserPlaying) ? 
    Dom.userStand() : 
    Dom.updateTableMesage("Stand?? Hold your horses, your turn is over!")
}

function addPlayerStandEvent() {
  Dom.addEventToButton("#stand", playerStandEventCallback);
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

function removeHitDoubleStandEvents(game, bet) {
  Dom.removeEventFromButton("#hit", playerHitAndEvalCallback);
  Dom.removeEventFromButton("#double", playerDoubleEventCallback);
  Dom.removeEventFromButton("#stand", playerStandEventCallback);

  Dom.addEventToButton("#hit", () => { Dom.updateTableMesage("Dealer:  Game Over, man.. let it go")})
  Dom.addEventToButton("#double", () => { Dom.updateTableMesage("Double what?? You are done") })
  Dom.addEventToButton("#stand", () => { Dom.updateTableMesage("Dealer:  Stand, sit, do whatever -- but the game is Over")})
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

function didUserBust (game) {
  game.evaluateUser()
  console.log("Is user playing?  >>  " + game.isUserPlaying())
  let isBust = (game.isUserBust()) ? true : false;
  console.log("Busted?  >> " + isBust)
  return isBust;

}

function initializeGame () {
  singleDeckGame.deal();
  let bet = getBet(singleDeckGame);
  singleDeckGame.receiveAnte(bet);
  let dealtHands = buildHandsArray(singleDeckGame);
  createGameButtons();
  removeGameStartEvent();
  addPlayerHitEvent(singleDeckGame);
  addPlayerDoubleEvent(singleDeckGame);
  addPlayerStandEvent(singleDeckGame);
  console.log(singleDeckGame.evaluateUser());


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