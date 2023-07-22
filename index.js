"use strict";

const levels = [{ level: 1 }, { level: 2 }, { level: 3 }];

let chosenLevel = null;
const levelList = document.getElementById("levels");
const startButton = document.querySelector(".start-button");

const renderLevels = () => {
  const levelHtml = levels
    .map((level) => {
      return `<div class="level-item">${level.level}</div>`;
    })
    .join("");

  levelList.innerHTML = levelHtml;
};

renderLevels();

function chooseLevel() {
  const selectLevels = document.querySelectorAll(".level-item");
  for (const selectLevel of selectLevels) {
    selectLevel.addEventListener("click", (event) => {
      event.stopPropagation();

      if (chosenLevel !== null) {
        chosenLevel.classList.remove("chosen-level");
      }
      selectLevel.classList.add("chosen-level");
      chosenLevel = selectLevel;
    });
  }
}

chooseLevel();
