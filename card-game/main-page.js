const mainPageElement = document.getElementById("first")

const pageStart = `
<form class="container">
<p class="level-choice">Выбери сложность</p>
<div class="level" id="levels">
  <!-- рендерится из js -->
</div>
<button type="submit" class="start-button">Старт</button>
</form>`

mainPageElement.innerHTML = pageStart

const levels = [{ level: 1 }, { level: 2 }, { level: 3 }]

let chosenLevel = null
const levelList = document.getElementById("levels")
const startButton = document.querySelector(".start-button")

export const renderStartPage = () => {
    const renderLevels = () => {
        const levelHtml = levels
            .map((level) => {
                return `<div class="level-item">${level.level}</div>`
            })
            .join("")

        levelList.innerHTML = levelHtml
    }

    renderLevels()

    const selectLevels = document.querySelectorAll(".level-item")
    for (const selectLevel of selectLevels) {
        selectLevel.addEventListener("click", (event) => {
            event.stopPropagation()

            if (chosenLevel !== null) {
                chosenLevel.classList.remove("chosen-level")
            }
            selectLevel.classList.add("chosen-level")
            chosenLevel = selectLevel
        })
    }

    startButton.addEventListener("click", (event) => {
        event.stopPropagation()
        if (chosenLevel === null) {
            alert("Чтобы сыграть, сначала выберите уровень")
            return
        }

        const newPage = document.createElement("div")
        document.body.innerHTML = ""
        document.body.appendChild(newPage)
        console.log(`ВАш уровень...`)
    })
}
