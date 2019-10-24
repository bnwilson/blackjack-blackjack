const {
    default: { singleDeckGame }
  } = require("blackjack-dealer-logic");
import Dom from './utils/Dom';

// Start Game logic
const hitButton = document.querySelector("#hit");
const dealButton = document.querySelector("#deal");
const holdButton = document.querySelector("#hold");

const addHitButtonEvent = (game) => {
  // User Hit (add new card to user hand)
  let buttonId = "#hit";
  const callback = () => {
    Dom.userHit(singleDeckGame.getUserHand())
  }
  Dom.addEventToButton(buttonId, callback);
}


const buildHandsArray = (game) => {
  console.log(game)
  let userHand = game.getUserHand();
  let dealerHand = game.getDealerHand();
  
  return [
  {
    hand: userHand.getCards(),
    holder: "player"
  },
  {
    hand: dealerHand.getCards(),
    holder: "dealer"
  }
]}

singleDeckGame.deal();
// Deal cards
(function startGame (newGame=true) {
  if (newGame) {
    const dealtHands = buildHandsArray(singleDeckGame);
    Dom.newDeal(dealtHands);
    addHitButtonEvent(singleDeckGame);

  } else {
    console.log("Not a new game")
  }
  

})();



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