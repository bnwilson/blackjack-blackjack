const {
    default: { singleDeckGame }
  } = require("blackjack-dealer-logic");
import Dom from './utils/Dom';

/************  Game Button Event Listeners  ************/
// Player Double Event
function playerDoubleEventCallback() {
  if (singleDeckGame.isUserPlaying() && !singleDeckGame.isUserBust()) {
    userDouble()  
  } else {
    Dom.updateTableMesage("Double?? It's not your turn!");
  }
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
  switch (settleDealer()) {
    // User Lose
    case 0:
      Dom.updateTableMesage("Sorry, you lose!")
      singleDeckGame.resetAnte();
      break;
    // User Push
    case 1:
      Dom.updateTableMesage("Draw! You get your money back..")
      singleDeckGame.pushHand();
      break;
    // User WIN
    case 2:
      Dom.updateTableMesage("Damn, you win... play again?")
      singleDeckGame.userWin();
      break;
    // Default
    default:
      singleDeckGame.resetAnte();
      break;
  }
}

function endUserTurn() {
  singleDeckGame.standUser();
  // removeHitDoubleStandEvents();
  endGameEval();
}

function evalHand() {
  console.log(singleDeckGame);
  if (singleDeckGame.isUserBust()) {
    Dom.updateTableMesage("Dealer:  Wow, why would you hit again??? You busted!");
    endUserTurn();
  } else {
    Dom.updateTableMesage("Dang, that was a close one. Scary stuff... Hit again?")
  }
}

function getAnteFromUser (game) {
  const ante = new Promise((resolve, reject) => {
    let balance = game.getUserChips();
    let promptMsg = `Enter your bet   \n\nYou're current balance is:  ${singleDeckGame.getUserChips()}`
    let bet = Number(prompt(promptMsg));
    while (bet > balance || bet <= 0) {
        promptMsg = (bet === 0) ? 
            `You can't not bet you fool! Enter a real one   \n\nYou're current balance is:  ${balance}` :
            `Give a serious bet, please. No funny business   \n\nYou're current balance is:  ${balance}`
        
        bet = Number(prompt(promptMsg));
    }
    resolve(bet);
  })
  return ante;
}

async function initializeGame () {
  singleDeckGame.deal();
  getAnteFromUser(singleDeckGame)
  .then(bet => {
    singleDeckGame.receiveAnte(bet);
    const dealtHands = buildHandsArray(singleDeckGame);
    createGameButtons();
    removeGameStartEvent();
    addNewGameEvent();
    addHitDoubleStandEvents();
    Dom.newDeal(dealtHands);
    Dom.updateChipCount(singleDeckGame.getUserChips());
    Dom.updateUserBet(bet);
  })
  .catch(err => {
    console.error(err)
  })
};

function settleDealer () {
  singleDeckGame.settleDealerHand();
  Dom.dealerHit(singleDeckGame.getDealerHand());
  return singleDeckGame.outcome();
}

async function startNextGame () {
  if (singleDeckGame.getUserChips > 0) {
    getAnteFromUser(singleDeckGame)
    .then(bet => {
      Dom.clearBoard();
      singleDeckGame.receiveAnte(bet);
      singleDeckGame.resetPlayers();
      singleDeckGame.deal();
      Dom.newDeal(buildHandsArray(singleDeckGame));
      Dom.updateUserBet(bet);
      Dom.updateChipCount(singleDeckGame.getUserChips());
    })
    .catch(err => {
      console.error(err)
    })
  } else {
    removeHitDoubleStandEvents();
    removeGameStartEvent();
    Dom.updateTableMesage("Dealer:  Sorry, you're out of chips! Come back with your next paycheck or.. you know.. refresh the page");
  }
  
}

function userDouble () {
  if (singleDeckGame.getUserChips() >= singleDeckGame.getAnte()) {
    singleDeckGame.doubleUser();
    Dom.userHit(singleDeckGame.getUserHand());
    Dom.updateUserBet(singleDeckGame.getAnte());
    Dom.updateChipCount(singleDeckGame.getUserChips())
    endUserTurn();
  } else {
    Dom.updateTableMesage("Dealer:  You can't double money you don't have!")
  }
}

function userHit () {
  singleDeckGame.hitUser();
  Dom.userHit(singleDeckGame.getUserHand());
  singleDeckGame.evaluateUser();
  evalHand();
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