(()=>{var e={906:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>y});var n=function(){function e(e,t){this.suit=t,this.value=e}return e.prototype.getSuit=function(){return this.suit},e.prototype.getValue=function(){return this.value},e.prototype.getCardValue=function(){return[this.value,this.suit]},e}(),a=function(){function e(e,t){var r=this;void 0===e&&(e=[]),void 0===t&&(t=[]),this.cards=[],this.suits=e,this.values=t,this.suits.forEach((function(e){r.values.forEach((function(t){r.addCard(new n(t,e))}))}))}return e.prototype.getCards=function(){return this.cards},e.prototype.addCard=function(e){this.cards.push(e)},e.prototype.dealTopCard=function(){var e=this.cards.shift();if(void 0===e)throw new Error("No cards left in the Deck");return e},e.prototype.getCardValues=function(){var e=[];return this.getCards().forEach((function(t){e.push(t.getCardValue())})),e},e.prototype.shuffle=function(){for(var e=[],t=0;t<this.cards.length;t++){var r=Math.floor(Math.random()*(t+1));e[t]=e[r],e[r]=this.cards[t]}this.cards=e},e}(),o=function(){function e(){}return e.build=function(e,t){return new a(e,t)},e}().build(["♤","♡","♧","♢"],["2","3","4","5","6","7","8","9","10","J","Q","K","A"]),s=function(e,t){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},s(e,t)};function i(e,t){function r(){this.constructor=e}s(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var u,d=function(){function e(e,t){this.cards=[],this.cards.push(e),this.cards.push(t)}return e.prototype.addCard=function(e){this.cards.push(e)},e.prototype.getCards=function(){return this.cards},e.prototype.getFirstCard=function(){return this.cards[0]},e.prototype.getHandValue=function(){return this.cards.map((function(e){return e.getCardValue().join("")})).join(", ")},e.prototype.getHandValues=function(){return this.cards.map((function(e){return e.getValue()}))},e}(),c=function(){function e(){this.bust=!1,this.playing=!0}return e.prototype.double=function(e){this.hit(e),this.playing=!1},e.prototype.getHand=function(){if(void 0===this.hand)throw new Error("Hand must be defined!");return this.hand},e.prototype.hit=function(e){if(void 0===this.hand)throw new Error("Hand must be defined!");this.hand.addCard(e)},e.prototype.isBust=function(){return this.bust},e.prototype.isPlaying=function(){return this.playing},e.prototype.receiveHand=function(e){this.hand=e},e.prototype.reset=function(){this.bust=!1,this.playing=!0},e.prototype.setBust=function(e){this.bust=e},e.prototype.setPlaying=function(e){this.playing=e},e.prototype.stand=function(){this.setPlaying(!1)},e}(),l=function(e){function t(t){var r=e.call(this)||this;return t.shuffle(),r.deck=t,r}return i(t,e),t.prototype.dealCard=function(){return this.deck.dealTopCard()},t.prototype.dealHands=function(){return[new d(this.deck.dealTopCard(),this.deck.dealTopCard()),new d(this.deck.dealTopCard(),this.deck.dealTopCard())]},t.prototype.getCardUp=function(){if(void 0===this.getHand())throw new Error("dealerHand isn't defined yet");return this.getHand().getFirstCard().getCardValue().join("")},t.prototype.getDeck=function(){return this.deck},t}(c);!function(e){e[e.LOSS=0]="LOSS",e[e.PUSH=1]="PUSH",e[e.WIN=2]="WIN"}(u||(u={}));var p=u,h=function(){function e(e,t){this.ante=0,this.dealer=t,this.user=e}return e.prototype.deal=function(){var e=this.dealer.dealHands(),t=e[0],r=e[1];this.dealer.receiveHand(t),this.user.receiveHand(r)},e.prototype.doubleUser=function(){this.user.double(this.dealer.dealCard()),this.user.wager(this.ante),this.ante=2*this.ante},e.prototype.evaluateDealer=function(){return this.evaluateHand(this.dealer.getHand().getHandValues(),this.dealer)},e.prototype.evaluateUser=function(){return this.evaluateHand(this.user.getHand().getHandValues(),this.user)},e.prototype.getAnte=function(){return this.ante},e.prototype.getDealerCardUp=function(){return this.dealer.getCardUp()},e.prototype.getDealerHandValue=function(){return this.dealer.getHand().getHandValue()},e.prototype.getUserChips=function(){return this.user.getChips()},e.prototype.getUserHandValue=function(){return this.user.getHand().getHandValue()},e.prototype.hitDealer=function(){this.dealer.hit(this.dealer.dealCard())},e.prototype.hitUser=function(){this.user.hit(this.dealer.dealCard())},e.prototype.isDealerBust=function(){return this.dealer.isBust()},e.prototype.isDealerPlaying=function(){return this.dealer.isPlaying()},e.prototype.isUserBust=function(){return this.user.isBust()},e.prototype.isUserPlaying=function(){return this.user.isPlaying()},e.prototype.outcome=function(){return this.isDealerBust()&&!this.isUserBust()?p.WIN:this.evaluateUser()<this.evaluateDealer()||this.isUserBust()?p.LOSS:this.evaluateUser()===this.evaluateDealer()?p.PUSH:p.WIN},e.prototype.pushHand=function(){this.user.receiveChips(this.ante),this.resetAnte()},e.prototype.receiveAnte=function(e){this.user.wager(e),this.ante+=e},e.prototype.resetAnte=function(){this.ante=0},e.prototype.resetPlayers=function(){this.user.reset(),this.dealer.reset()},e.prototype.settleDealerHand=function(){for(;this.evaluateDealer()<17;)this.hitDealer();this.standDealer()},e.prototype.standDealer=function(){this.dealer.stand()},e.prototype.standUser=function(){this.user.stand()},e.prototype.userWin=function(){var e=2*this.ante;this.user.receiveChips(e),this.resetAnte()},e.prototype.getUserHand=function(){return this.user.getHand()},e.prototype.getDealerHand=function(){return this.dealer.getHand()},e.prototype.evaluateHand=function(t,r){var n=0;if(t.forEach((function(e){n+="A"===e?11:"J"===e||"Q"===e||"K"===e?10:Number(e)})),n>e.BLACKJACK&&t.includes("A")){var a=t.indexOf("A");return t[a]="1",this.evaluateHand(t,r)}return n>e.BLACKJACK&&r.setBust(!0),n},e.BLACKJACK=21,e}(),f=function(e){function t(t){void 0===t&&(t=200);var r=e.call(this)||this;return r.chips=t,r}return i(t,e),t.prototype.getChips=function(){return this.chips},t.prototype.receiveChips=function(e){this.chips+=e},t.prototype.wager=function(e){if(e>this.chips)throw new Error("Can't wager more chips than are available!");this.chips-=e},t}(c);const y={singleDeckGame:new h(new f,new l(o)),Dealer:l,Result:p,Table:h,User:f}},288:e=>{const t={dealer:".game__table__dealer-hand",player:".game__table__user-hand"},r={"♤":"playing-card-black","♡":"playing-card-red","♧":"playing-card-black","♢":"playing-card-red"};e.exports={addCardToTable(e,r,n=!1){const a=document.querySelector(t[r]);if(n&&"dealer"===r){const t=this.generateCardBack();a.append(t),a.append(e)}else a.append(e)},addEventToButton(e,t){document.querySelector(e).addEventListener("click",t)},addGameButtons(){const e=document.querySelector(".game__button-wrapper"),t=document.createElement("button"),r=document.createElement("button"),n=document.createElement("button");t.classList.add("game__button"),t.setAttribute("id","hit"),t.innerHTML="Hit",r.classList.add("game__button"),r.setAttribute("id","double"),r.innerHTML="Double Bet",n.classList.add("game__button"),n.setAttribute("id","stand"),n.innerHTML="Stand",[t,r,n].forEach((t=>{e.append(t)}))},clearBoard(){this.updateTableMesage(""),document.querySelector(t.dealer).innerHTML="",document.querySelector(t.player).innerHTML=""},dealerHit(e){let r=t.dealer;document.querySelector(r).innerHTML="",e.getCards().forEach((e=>{let t=this.generateCard(e);this.addCardToTable(t,"dealer")}))},generateCard(e){const t=document.createElement("section");t.classList.add("playing-card"),t.classList.add(r[e.suit]);const n=document.createElement("section");n.classList.add("value-container");const a=document.createElement("span");a.classList.add("value"),a.textContent=e.getValue();const o=document.createElement("span");return o.classList.add("suit"),o.textContent=e.getSuit(),o.classList.add([r[e.suit]]),n.append(a),n.append(o),t.append(n),t},generateCardBack(){const e=document.createElement("section");return e.classList.add("playing-card"),e.classList.add("playing-card-down"),e},getBetFromUser(e){let t=e.getUserChips(),r=`Enter your bet   \n\nYou're current balance is:  ${t}`,n=Number(prompt(r));for(;n>t||n<=0;)r=0===n?`You can't not bet you fool! Enter a real one   \n\nYou're current balance is:  ${t}`:`Give a serious bet, please. No funny business   \n\nYou're current balance is:  ${t}`,n=Number(prompt(r))},newDeal(e){document.querySelectorAll(`${t.player}, ${t.dealer}`).innerHTML="",e.forEach((e=>{e.hand.forEach((t=>{let r=this.generateCard(t);this.addCardToTable(r,e.holder,!0)}))}))},userDoubleBet(e){console.log(2*e)},userStand(){console.log(" Standing ")},removeEventFromButton(e,t){document.querySelector(e).removeEventListener("click",t)},updateTableMesage(e){document.querySelector(".game__table__message").innerHTML=e},updateChipCount(e){document.querySelector(".chip-count").innerHTML=e},updateUserBet(e){document.querySelector(".user-chips").innerHTML=e},userHit(e){let r=t.player;document.querySelector(r).innerHTML="",e.getCards().forEach((e=>{let t=this.generateCard(e);this.addCardToTable(t,"player")}))}}}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{"use strict";var e=r(288),t=r.n(e);const{default:{singleDeckGame:n}}=r(906);function a(){n.isUserPlaying()&&!n.isUserBust()?n.getUserChips()>=n.getAnte()?(n.doubleUser(),t().userHit(n.getUserHand()),t().updateUserBet(n.getAnte()),t().updateChipCount(n.getUserChips()),c()):t().updateTableMesage("Dealer:  You can't double money you don't have!"):t().updateTableMesage("Double?? It's not your turn!")}function o(){n.isUserPlaying()?(n.hitUser(),t().userHit(n.getUserHand()),n.evaluateUser(),console.log(n),n.isUserBust()?(t().updateTableMesage("Dealer:  Wow, why would you hit again??? You busted!"),c()):t().updateTableMesage("Dang, that was a close one. Scary stuff... Hit again?")):n.isUserBust()?c():t().updateTableMesage("Dealer:  You can't hit again, you dolt!")}function s(){!n.isUserPlaying()||n.isUserBust()?t().updateTableMesage("Dealer:  What do you mean 'Stand'?? Hold your horses, your turn is over!"):c()}function i(){t().removeEventFromButton("#deal",p)}function u(){console.log(n),console.log(" * SHAME ON YOU *"),n.isUserPlaying()?t().updateTableMesage("You should probably finish your turn first..."):n.isDealerPlaying()?t().updateTableMesage("Dealer:  I'm still playing, good grief!"):async function(){n.getUserChips()>0?l(n).then((e=>{t().clearBoard(),n.receiveAnte(e),n.resetPlayers(),n.deal(),t().newDeal(d(n)),t().updateUserBet(e),t().updateChipCount(n.getUserChips())})).catch((e=>{console.error(e)})):(t().removeEventFromButton("#stand",s),t().removeEventFromButton("#hit",o),t().removeEventFromButton("#double",a),i(),t().updateTableMesage("Dealer:  Sorry, you're out of chips! Come back with your next paycheck or.. you know.. refresh the page"))}()}function d(e){const t=e.getUserHand(),r=e.getDealerHand();return[{hand:t.getCards(),holder:"player"},{hand:[r.getCards()[1]],holder:"dealer"}]}function c(){n.standUser(),function(){switch(n.settleDealerHand(),t().dealerHit(n.getDealerHand()),n.outcome()){case 0:t().updateTableMesage("Sorry, you lose!"),n.resetAnte();break;case 1:t().updateTableMesage("Draw! You get your money back.."),n.pushHand();break;case 2:t().updateTableMesage("Damn, you win... play again?"),n.userWin();break;default:n.resetAnte()}}()}function l(e){return new Promise(((t,r)=>{let a=e.getUserChips(),o=`Enter your bet   \n\nYou're current balance is:  ${n.getUserChips()}`,s=Number(prompt(o));for(;s>a||s<=0;)o=0===s?`You can't not bet you fool! Enter a real one   \n\nYou're current balance is:  ${a}`:`Give a serious bet, please. No funny business   \n\nYou're current balance is:  ${a}`,s=Number(prompt(o));t(s)}))}async function p(){n.deal(),l(n).then((e=>{n.receiveAnte(e);const r=d(n);t().addGameButtons(),i(),t().addEventToButton("#deal",u),t().addEventToButton("#hit",o),t().addEventToButton("#double",a),t().addEventToButton("#stand",s),t().newDeal(r),t().updateChipCount(n.getUserChips()),t().updateUserBet(e)})).catch((e=>{console.error(e)}))}t().addEventToButton("#deal",p)})()})();