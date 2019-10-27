const {
    default: { singleDeckGame }
  } = require("blackjack-dealer-logic");
import Dom from './utils/Dom';

/************  Game Button Event Listeners  ************/
// Player Double Event
function playerDoubleEventCallback() {
  (singleDeckGame.isUserPlaying()) ?
    (singleDeckGame.isUserBust()) ?
      endUserTurn() : 
    userDouble() : 
    Dom.updateTableMesage("Double?? It's not your turn!");
}

function addPlayerDoubleEvent() {
  Dom.addEventToButton("#double", playerDoubleEventCallback)
}

function removeDoubleEventCallback() {
  Dom.updateTableMesage("Double what?? You are done");
}

function removeDoubleEvent() {
  Dom.removeEventFromButton("#double", playerDoubleEventCallback);
  // Dom.addEventToButton("#double", removeDoubleEventCallback)
}

// Player Hit Event
function playerHitEventCallback () {
  if (singleDeckGame.isUserPlaying()) {
    userHit()
  } else if (singleDeckGame.isUserBust()) {
    endUserTurn();
  } else {
    Dom.updateTableMesage("Dealer:  You can't hit again, you dolt!")
  }
}

function addPlayerHitEvent() {
  Dom.addEventToButton("#hit", playerHitEventCallback)
}

function removeHitEventCallback() {
  Dom.updateTableMesage("Dealer:  Game Over, man.. let it go");
}

function removeHitEvent() {
  Dom.removeEventFromButton("#hit", playerHitEventCallback);
  // Dom.addEventToButton("#hit", removeHitEventCallback)
}

// Player Stand Event
function playerStandEventCallback() {
  (!singleDeckGame.isUserPlaying() || (singleDeckGame.isUserBust())) ? 
    Dom.updateTableMesage("Dealer:  What do you mean 'Stand'?? Hold your horses, your turn is over!") :
    endUserTurn() 
}

function addPlayerStandEvent() {
  Dom.addEventToButton("#stand", playerStandEventCallback);
}

function removeStandEventCallback() {
  Dom.updateTableMesage("Dealer:  Stand, sit, do whatever -- but the game is Over");
}

function removeStandEvent() {
  Dom.removeEventFromButton("#stand", playerStandEventCallback);
  // Dom.addEventToButton("#stand", removeStandEventCallback)
}

// Game Start Event
function addGameStartEvent() {
  Dom.addEventToButton("#deal", initializeGame);
}

function removeGameStartEventCallback() {
  Dom.updateTableMesage("You were already dealt the cards!");
}

function removeGameStartEvent() {
  Dom.removeEventFromButton("#deal", initializeGame);
  // Dom.addEventToButton("#deal", removeGameStartEventCallback);
}

// New Game Start Event
function addNewGameEvent() {
  Dom.addEventToButton("#deal", newGameEventCallback);
}

function newGameEventCallback() {
  console.log(singleDeckGame);
  (singleDeckGame.isUserPlaying()) ?
    Dom.updateTableMesage("You should probably finish your turn first...") :
    (singleDeckGame.isDealerPlaying()) ?
      Dom.updateTableMesage("Dealer:  I'm still playing, good grief!") :
      startNextGame();
}

// Grouped Events
function removeHitDoubleStandEvents() {
  removeStandEvent();
  removeHitEvent();
  removeDoubleEvent();
}

function addHitDoubleStandEvents() {
  addPlayerHitEvent();
  addPlayerDoubleEvent();
  addPlayerStandEvent();
}

/************ Game Logic ************/

function buildHandsArray (game) {
  const userHand = game.getUserHand();
  const dealerHand = game.getDealerHand();
  return [ { hand: userHand.getCards(), holder: "player"},
           { hand: dealerHand.getCards(), holder: "dealer" } ]
}

function createGameButtons() {
  Dom.addGameButtons();
}

function endGameEval() {
  const resultNum = settleDealer();
  const outcomeMsgArr = ["Sorry, you lose!", "Draw! You get your money back..", "Damn, you win... play again?"]
  Dom.updateTableMesage(outcomeMsgArr[resultNum]);
  switch (resultNum) {
    // User Lose
    case 0:
      singleDeckGame.resetAnte();
      break;
    // User Push
    case 1:
      singleDeckGame.pushHand();
      break;
    // User WIN
    case 2:
      singleDeckGame.userWin();
      break;
    // Default
    default:
      singleDeckGame.resetAnte();
      break;
  }
  
  Dom.updateChipCount(singleDeckGame.getUserChips());
}

function endUserTurn() {
  singleDeckGame.standUser();
  // removeHitDoubleStandEvents();
  endGameEval();

}

function evalHand(game) {
  const isBusted = game.isUserBust();
  return isBusted
}

function getBet () {
  let balance = singleDeckGame.getUserChips();
  let promptMsg = `Enter your bet   \n\nYou're current balance is:  ${singleDeckGame.getUserChips()}`
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
  const bet = getBet(singleDeckGame);
  singleDeckGame.receiveAnte(bet);
  const dealtHands = buildHandsArray(singleDeckGame);
  createGameButtons();
  removeGameStartEvent();
  addNewGameEvent();
  addHitDoubleStandEvents();
  Dom.newDeal(dealtHands);
  Dom.updateChipCount(singleDeckGame.getUserChips());
  Dom.updateUserBet(bet);
};

function settleDealer () {
  singleDeckGame.settleDealerHand();
  Dom.dealerHit(singleDeckGame.getDealerHand());
  return singleDeckGame.outcome();
}

function startNextGame () {
  singleDeckGame.resetPlayers();
  const bet = getBet();
  singleDeckGame.deal();
  const dealtHands = buildHandsArray(singleDeckGame);
  Dom.newDeal(dealtHands);
  Dom.updateUserBet(bet);
}

function userDouble () {
  console.log(singleDeckGame);
  singleDeckGame.doubleUser();
  Dom.userHit(singleDeckGame.getUserHand());
  Dom.updateUserBet(singleDeckGame.getAnte());
  Dom.updateChipCount(singleDeckGame.getUserChips())
  endUserTurn();
}

function userHit () {
  singleDeckGame.hitUser();
  Dom.userHit(singleDeckGame.getUserHand());
  (evalHand(singleDeckGame)) ? 
    endUserTurn() : 
    Dom.updateTableMesage("Dealer:  Whew, that was intense!");
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