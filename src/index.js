const {
    default: { singleDeckGame }
  } = require("blackjack-dealer-logic");
import Dom from './utils/Dom';

/************  Game Button Event Listeners  ************/

function playerHitAndEvalCallback () {
  if (singleDeckGame.isUserPlaying()) {
    userHit()
  } else {
    Dom.updateTableMesage("Dealer:  You can't hit again, you dolt!")
  }
}

function addPlayerHitEvent() {
  Dom.addEventToButton("#hit", playerHitAndEvalCallback)
}

function playerDoubleEventCallback() {
  (singleDeckGame.isUserPlaying()) ? 
    userDouble() : 
    Dom.updateTableMesage("Double?? It's not your turn!");
}

function addPlayerDoubleEvent() {
  Dom.addEventToButton("#double", playerDoubleEventCallback)
}

function playerStandEventCallback() {
  (singleDeckGame.isUserPlaying() || singleDeckGame.isUserBust()) ? 
    userStand() : 
    Dom.updateTableMesage("Dealer:  What do you mean 'Stand'?? Hold your horses, your turn is over!")
}

function addPlayerStandEvent() {
  Dom.addEventToButton("#stand", playerStandEventCallback);
}

function addGameStartEvent() {
  Dom.addEventToButton("#deal", initializeGame);
}

function removeGameStartEventCallback() {
  Dom.updateTableMesage("You were already dealt the cards!");
}

function removeGameStartEvent() {
  Dom.removeEventFromButton("#deal", initializeGame);
  Dom.addEventToButton("#deal", removeGameStartEventCallback);
}

function removeDoubleEventCallback() {
  Dom.updateTableMesage("Double what?? You are done");
}

function removeDoubleEvent() {
  Dom.removeEventFromButton("#double", playerDoubleEventCallback);
  Dom.addEventToButton("#double", removeDoubleEventCallback)
}

function removeHitEventCallback() {
  Dom.updateTableMesage("Dealer:  Game Over, man.. let it go");
}

function removeHitEvent() {
  Dom.removeEventFromButton("#hit", playerHitAndEvalCallback);
  Dom.addEventToButton("#hit", removeHitEventCallback)
}

function removeStandEventCallback() {
  Dom.updateTableMesage("Dealer:  Stand, sit, do whatever -- but the game is Over");
}

function removeStandEvent() {
  Dom.removeEventFromButton("#stand", playerStandEventCallback);
  Dom.addEventToButton("#stand", removeStandEventCallback)
}

function removeHitDoubleStandEvents() {
  removeStandEvent();
  removeHitEvent();
  removeDoubleEvent();
}

/************ Game Logic ************/

function buildHandsArray (game) {
  let userHand = game.getUserHand();
  let dealerHand = game.getDealerHand();
  return [ { hand: userHand.getCards(), holder: "player"},
           { hand: dealerHand.getCards(), holder: "dealer" } ]
}

function createGameButtons() {
  Dom.addGameButtons();
}

function didUserBust (game) {
  game.evaluateUser()
  console.log("Is user playing?  >>  " + game.isUserPlaying())
  let isBust = (game.isUserBust()) ? true : false;
  console.log("Busted?  >> " + isBust)
  return isBust;
}

function endGameEval() {
  let endCount = 0;
  singleDeckGame.settleDealerHand();
  Dom.dealerHit(singleDeckGame.getDealerHand());
  console.log(dealer);
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
  singleDeckGame.receiveAnte(bet);
  let dealtHands = buildHandsArray(singleDeckGame);
  createGameButtons();
  removeGameStartEvent();
  addPlayerHitEvent();
  addPlayerDoubleEvent();
  addPlayerStandEvent();
  Dom.newDeal(dealtHands);
  Dom.updateChipCount(singleDeckGame.getUserChips());
  Dom.updateUserBet(bet);
};

function userHit() {
  singleDeckGame.hitUser();
  Dom.userHit(singleDeckGame.getUserHand());
  (didUserBust(singleDeckGame)) ? 
    removeHitDoubleStandEvents() : 
    Dom.updateTableMesage("Dealer:  Whew, that was intense!");
}

function userStand() {
  singleDeckGame.standUser();
  removeHitDoubleStandEvents();
  endGameEval();

}

function userDouble() {
  singleDeckGame.doubleUser();
  Dom.updateUserBet(singleDeckGame.getAnte());
  Dom.updateChipCount(singleDeckGame.getUserChips())
  userStand();
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