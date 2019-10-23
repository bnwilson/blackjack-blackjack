const {
    default: { singleDeckGame }
  } = require("blackjack-dealer-logic");
import Dom from './utils/Dom';
  
singleDeckGame.deal();
// Dom.generateCard(userHand.getCards()[0]),
// Dom.generateCard(userHand.getCards()[1])
  
const userHand = singleDeckGame.getUserHand();
const dealerHand = singleDeckGame.getDealerHand();
const dealtHand = {
  userCards: userHand.getCards(),
  dealerCards: dealerHand.getCards()
}
console.log(dealtHand);
Dom.dealCards(dealtHand);
  
