const {
    default: { singleDeckGame }
  } = require("blackjack-dealer-logic");
import Dom from './utils/Dom';
  
singleDeckGame.deal();
  
const userHand = singleDeckGame.getUserHand();
const dealerHand = singleDeckGame.getDealerHand();
const dealtHand = {
  userCards: userHand.getCards(),
  dealerCards: dealerHand.getCards()
}
console.log(dealtHand);
Dom.newDeal(dealtHand);
  
const hitButton = document.querySelector("#hit");
const dealButton = document.querySelector("#deal");
console.log(hitButton);

// User Hit (add new card to user hand)
hitButton.addEventListener("click", () =>{
  singleDeckGame.hitUser();
  Dom.userHit(singleDeckGame.getUserHand().getCards());
});

dealButton.addEventListener("click", () => { 
  singleDeckGame.deal();
  
  const userHand = singleDeckGame.getUserHand();
  const dealerHand = singleDeckGame.getDealerHand();
  const dealtHand = {
    userCards: userHand.getCards(),
    dealerCards: dealerHand.getCards()
  }
  console.log(dealtHand);
  Dom.newDeal(dealtHand);
});