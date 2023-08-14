import { chosenLevel, mainPageElement, renderStartPage } from "./main-page.js"

const cardSymbols = [
    '<img class="svg-img" src="./static/spades.svg">',
    '<img class="svg-img" src="./static/hearts.svg">',
    '<img class="svg-img" src="./static/diamonds.svg">',
    '<img class="svg-img" src="./static/clubs.svg">',
]
const cardValues = ["A", "K", "Q", "J", "10", "9", "8", "7", "6"]
let cardDeck = []
let selectedCards = []
let cardPairs = 0

const screenAllCards = document.getElementById("begin")
export function renderCards() {
    const screenCards = `
      <div class="top">
        <div class="time">
          <div class="time-text">
            <div class="min">min</div>
            <div class="sec">sec</div>
          </div>
          <div class="time-figures">00.00</div>
        </div>
        <button class="begin">Начать заново</button>
      </div>
      <div class="cards">
        <div class="card-row1"></div>
        <div class="card-row2"></div>  
      </div>`

    screenAllCards.innerHTML = screenCards

    for (let i = 0; i < cardSymbols.length; i++) {
        for (let j = 0; j < cardValues.length; j++) {
            let card = {
                symbol: cardSymbols[i],
                value: cardValues[j],
            }
            cardDeck.push(card)
        }
    }

    const shuffledCards = cardDeck.sort(() => Math.random() - 0.5)
    let topDeck = '<div class="row">'
    const cardsArray = []
    for (let i = 0; i < chosenLevel * 3; i++) {
        let card = shuffledCards[i]
        cardsArray.push(card)
        topDeck += createCardElement(card)
    }
    topDeck += `</div>`
    document.querySelector(".card-row1").innerHTML = topDeck

    let lowDeck = '<div class="row">'
    const cardsRowLow = cardsArray.sort(() => Math.random() - 0.5)
    for (let i = 0; i < chosenLevel * 3; i++) {
        let card = cardsRowLow[i]
        lowDeck += createCardElement(card)
    }
    lowDeck += `</div>`
    document.querySelector(".card-row2").innerHTML = lowDeck
    function createCardElement(card) {
        return `<div class="card ${card.value}" data-value="${card.value}" data-symbol="${card.symbol}">
                    <div class="symbol-top-left"><div>${card.value}</div>
                    <div class="block-symbol">${card.symbol}</div>
                </div>
                <div class="value-center my-svg">${card.symbol}</div>
                <div class="symbol-bottom-right"><div>${card.value}</div>
                <div class="block-symbol">${card.symbol}</div></div></div>`
    }

    function changeCardStyle() {
        const cardFrontElements = document.querySelectorAll(".card")

        cardFrontElements.forEach((cardFrontElement) => {
            cardFrontElement
                .querySelectorAll(
                    ".value-center, .symbol-top-left, .symbol-bottom-right",
                )
                .forEach((element) => {
                    element.style.display = "none"
                })
            cardFrontElement.classList.add("selected")
            selectedCards = []
        })
    }

    setTimeout(changeCardStyle, 5000)

    function addRestartButtonListener() {
        const restartButton = document.querySelector(".begin")
        restartButton.addEventListener("click", (event) => {
            selectedCards = []
            event.preventDefault()
            screenAllCards.style.display = "none"
            mainPageElement.style.display = "flex"
            renderStartPage()
        })
    }
    addRestartButtonListener()

    function getCard() {
        const cardFrontElements = document.querySelectorAll(".card")

        cardFrontElements.forEach((cardFrontElement) => {
            cardFrontElement.addEventListener("click", (event) => {
                event.stopPropagation()
                cardFrontElement.classList.remove("selected")
                cardFrontElement
                    .querySelectorAll(
                        ".value-center, .symbol-top-left, .symbol-bottom-right",
                    )
                    .forEach((element) => {
                        element.style.display = "block"
                    })

                const valueCard = cardFrontElement.dataset.value
                const symbolCard = cardFrontElement.dataset.symbol

                if (selectedCards.length < 2) {
                    selectedCards.push({
                        value: valueCard,
                        symbol: symbolCard,
                    })
                } else {
                    selectedCards = [{ value: valueCard, symbol: symbolCard }]
                }

                if (selectedCards.length === 2) {
                    compareCards()
                }
            })
        })
    }
    getCard()
}

function compareCards() {
    const selectedCard1 = selectedCards[0]
    const selectedCard2 = selectedCards[1]
    if (
        selectedCard1.value === selectedCard2.value &&
        selectedCard1.symbol === selectedCard2.symbol
    ) {
        setTimeout(() => {
            ++cardPairs
            selectedCards = []

            if (cardPairs / 3 === chosenLevel) {
                cardPairs = 0
                selectedCards.splice(0, 2)
                screenAllCards.style.display = "none"
                mainPageElement.style.display = "flex"

                alert("Вы победили!")
            }
        }, 300)
    } else {
        setTimeout(() => {
            selectedCards.splice(0, 2)
            showAllCards()
            alert("Вы проиграли!")
        }, 300)
    }
}

function showAllCards() {
    const cardFrontElements = document.querySelectorAll(".card")
    cardFrontElements.forEach((cardFrontElement) => {
        cardFrontElement.classList.remove("selected")
        cardFrontElement
            .querySelectorAll(
                ".value-center, .symbol-top-left, .symbol-bottom-right",
            )
            .forEach((element) => {
                element.style.display = "block"
            })
    })
}

// import {
//     currentSelectedLevel,
//     screenFirstElement,
//     getScreen,
// } from "./screen-start.js"

// let selectedCards = []
// let numberOfPairs = 0
// const cardSymbols = ["spades", "hearts", "diamonds", "clubs"]
// const cardValues = ["A", "K", "Q", "J", "10", "9", "8", "7", "6"]
// const cardDeck = []

// const screenAllCards = document.getElementById("begin")

// export function renderCards() {
//     screenAllCards.style.display = "block"
//     const screenCards = `
//       <div class="top">
//         <div class="time">
//           <div class="time-text">
//             <div class="min">min</div>
//             <div class="sec">sec</div>
//           </div>
//           <div class="time-figures">00.00</div>
//         </div>
//         <button class="begin">Начать заново</button>
//       </div>
//       <div class="cards">
//         <div class="card-deck-row1"></div>
//         <div class="card-deck-row2"></div>
//       </div>`

//     screenAllCards.innerHTML = screenCards

//     for (let i = 0; i < cardSymbols.length; i++) {
//         for (let j = 0; j < cardValues.length; j++) {
//             let card = {
//                 symbol: cardSymbols[i],
//                 value: cardValues[j],
//             }
//             cardDeck.push(card)
//         }
//     }

//     const shuffledCards = cardDeck.sort(() => Math.random() - 0.5)
//     let topDeck = '<div class="row">'
//     const cardsArray = []
//     for (let i = 0; i < currentSelectedLevel * 3; i++) {
//         let card = shuffledCards[i]
//         cardsArray.push(card)
//         topDeck += createCardElement(card)
//     }
//     topDeck += `</div>`
//     document.querySelector(".card-deck-row1").innerHTML = topDeck

//     let lowDeck = '<div class="row">'
//     const cardsRowLow = cardsArray.sort(() => Math.random() - 0.5)
//     for (let i = 0; i < currentSelectedLevel * 3; i++) {
//         let card = cardsRowLow[i]
//         lowDeck += createCardElement(card)
//     }
//     lowDeck += `</div>`
//     document.querySelector(".card-deck-row2").innerHTML = lowDeck
//     function createCardElement(card) {
//         return `<div class="card ${card.value}" data-value="${card.value}" data-symbol="${card.symbol}.svg">
//                     <div class="symbol-top-left"><div>${card.value}</div>
//                     <div class="block-symbol"><img src="${card.symbol}.svg"></div>
//                 </div>
//                 <div class="value-center my-svg"><img src="${card.symbol}.svg"></div>
//                 <div class="symbol-bottom-right"><div>${card.value}</div>
//                 <div class="block-symbol"><img src="${card.symbol}.svg"></div></div></div>`
//     }

//     function changeCardStyle() {
//         const cardFrontElements = document.querySelectorAll(".card")

//         cardFrontElements.forEach((cardFrontElement) => {
//             cardFrontElement
//                 .querySelectorAll(
//                     ".value-center, .symbol-top-left, .symbol-bottom-right",
//                 )
//                 .forEach((element) => {
//                     element.style.display = "none"
//                 })
//             cardFrontElement.classList.add("selected")
//             selectedCards = []
//         })
//     }

//     setTimeout(changeCardStyle, 5000)

//     function addRestartButtonListener() {
//         const restartButton = document.querySelector(".begin")
//         restartButton.addEventListener("click", (event) => {
//             selectedCards = []
//             event.preventDefault()
//             screenAllCards.style.display = "none"
//             screenFirstElement.style.display = "flex"
//             getScreen()
//         })
//     }
//     addRestartButtonListener()

//     function choiceCard() {
//         const cardFrontElements = document.querySelectorAll(".card")

//         cardFrontElements.forEach((cardFrontElement) => {
//             cardFrontElement.addEventListener("click", (event) => {
//                 event.stopPropagation()
//                 cardFrontElement.classList.remove("selected")
//                 cardFrontElement
//                     .querySelectorAll(
//                         ".value-center, .symbol-top-left, .symbol-bottom-right",
//                     )
//                     .forEach((element) => {
//                         element.style.display = "block"
//                     })

//                 const valueCard = cardFrontElement.dataset.value
//                 const symbolCard = cardFrontElement.dataset.symbol

//                 if (selectedCards.length < 2) {
//                     selectedCards.push({
//                         value: valueCard,
//                         symbol: symbolCard,
//                     })
//                 } else {
//                     selectedCards = [{ value: valueCard, symbol: symbolCard }]
//                 }

//                 if (selectedCards.length === 2) {
//                     compareCards()
//                 }
//             })
//         })
//     }
//     choiceCard()
// }

// function compareCards() {
//     const selectedCard1 = selectedCards[0]
//     const selectedCard2 = selectedCards[1]
//     if (
//         selectedCard1.value === selectedCard2.value &&
//         selectedCard1.symbol === selectedCard2.symbol
//     ) {
//         setTimeout(() => {
//             ++numberOfPairs
//             selectedCards = []

//             if (numberOfPairs / 3 === currentSelectedLevel) {
//                 numberOfPairs = 0
//                 selectedCards.splice(0, 2)
//                 screenAllCards.style.display = "none"
//                 screenFirstElement.style.display = "flex"

//                 alert("Вы победили!")
//             }
//         }, 300)
//     } else {
//         setTimeout(() => {
//             selectedCards.splice(0, 2)
//             showAllCards()
//             alert("Вы проиграли!")
//         }, 300)
//     }
// }

// function showAllCards() {
//     const cardFrontElements = document.querySelectorAll(".card")
//     cardFrontElements.forEach((cardFrontElement) => {
//         cardFrontElement.classList.remove("selected")
//         cardFrontElement
//             .querySelectorAll(
//                 ".value-center, .symbol-top-left, .symbol-bottom-right",
//             )
//             .forEach((element) => {
//                 element.style.display = "block"
//             })
//     })
// }
