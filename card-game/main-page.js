import { renderCards } from "./cards.js"

export const mainPageElement = document.querySelector(".main")

const pageStart = `<form class="container">
                            <p class="level-choice">Выбери сложность</p>
                                <div class="level" id="levels"></div>
                                <button type="submit" class="start-button">Старт</button>
                    </form>`

mainPageElement.innerHTML = pageStart

const levels = [{ level: 1 }, { level: 2 }, { level: 3 }]

export let chosenLevel = null
const levelList = document.getElementById("levels")
const form = document.querySelector(".container")

export const renderStartPage = () => {
    mainPageElement.classList.add("main")
    const renderLevels = () => {
        const levelsHtml = levels
            .map((level) => {
                return `<label class="level">
        <input type="radio" name="level" value="${level.level}">${level.level}</label>`
            })
            .join("")
        levelList.innerHTML = levelsHtml
    }
    renderLevels()

    const radioButtons = document.querySelectorAll('input[type="radio"]')
    for (const radioButton of radioButtons) {
        radioButton.addEventListener("change", () => {
            radioButtons.forEach((btn) => {
                if (btn !== radioButton) {
                    btn.parentElement.classList.remove("chosen-level")
                }
            })
            radioButton.parentElement.classList.add("chosen-level")
            chosenLevel = radioButton
        })
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const checkedLevel = event.target.elements.level.value
        if (checkedLevel) {
            chosenLevel = parseInt(checkedLevel)
            mainPageElement.style.display = "none"
            renderCards()
        } else {
            alert("Чтобы сыграть, сначала выберите уровень")
        }
    })
}
