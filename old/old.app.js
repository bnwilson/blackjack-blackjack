// const dealerLogic = require('blackjack-dealer-logic');

// var alertButton = document.getElementById('alert');
// alertButton.onclick = function() {
//     alert('Here is our alert box')
// }

const buttons = document.querySelectorAll(".Button");
console.log(buttons)

const backgroundButton = document.querySelector(".addBackground");

buttons.forEach(function(button) {
    button.addEventListener("click", () => {
        const pargraph = document.createElement("p");

        parahraph.classList.add("newParagraph");

        paragraph.textContent = "My new paragraph!";

        document.body.append(paragraph)
    });
});

backgroundButton.addEventListener("click", () => {
    const paragraph = document.querySelector(".newParahraph");
});

backgroundButton.addEventListener("click" , () => {
    const parahraph = document.querySelector(".newParagraph");


    paragraph.classList.add("redBackground");
    paragraph.classList.remove("newParagraph");

});


let name = prompt("Enter your name, please\n");
document.write("You suck " + name)
