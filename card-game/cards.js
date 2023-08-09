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
        <div class="card-back"></div>
        <div class="card-deck"></div>  
      </div>`

    screenAllCards.innerHTML = screenCards

    const cardSymbols = [
        '<img class="svg-img" src="./img/spades.svg">',
        '<img class="svg-img" src="./img/hearts.svg">',
        '<img class="svg-img" src="./img/diamonds.svg">',
        '<img class="svg-img" src="./img/clubs.svg">',
    ]
    const cardValues = ["A", "K", "Q", "J", "10", "9", "8", "7", "6"]
    let cardDeck = []
    let cardBack = []

    for (let i = 0; i < cardSymbols.length; i++) {
        for (let j = 0; j < cardValues.length; j++) {
            let card = {
                symbol: cardSymbols[i],
                value: cardValues[j],
            }
            cardDeck.push(card)
        }
    }

    for (let i = 0; i < cardSymbols.length; i++) {
        let back = {
            symbol: '<img src="./img/back.jpg">',
            value: "RB",
        }
        cardBack.push(back)
    }

    const deck = [...cardDeck, ...cardBack]

    let deckHtml = '<div class="row">'
    for (let i = 0; i < 36; i++) {
        deckHtml += `<div class="card ${deck[i].value}">`
        if (deck[i].value !== "RB") {
            deckHtml += `<div class="symbol-top-left"><div>${deck[i].value}</div><div class="block-symbol">${deck[i].symbol}</div></div>`
            deckHtml += `<div class="value-center my-svg">${deck[i].symbol}</div>`
            deckHtml += `<div class="symbol-bottom-right"><div>${deck[i].value}</div><div class="block-symbol">${deck[i].symbol}</div></div>`
        } else {
            deckHtml += `${deck[i].symbol}`
        }
        deckHtml += `</div>`
    }
    deckHtml += `</div>`
    document.querySelector(".card-deck").innerHTML = deckHtml

    let backHtml = '<div class="row">'
    for (let i = 0; i < 36; i++) {
        backHtml += `<div class="card-back"><img src="./img/back.jpg"></div>`
    }
    backHtml += `</div>`
    document.querySelector(".card-back").innerHTML = backHtml
}
