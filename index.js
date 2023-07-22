"use strict";

const levels = [ { level: 1, }, { level: 2, }, { level: 3, }, ];

const levelList = document.getElementById('levels');
const startButton = document.querySelector('.start-button');

const renderLevels = () => {
    const levelHtml = levels.map((level) => {
        return `<div class="level-item">${level.level}</div>`;
      }).join('');

      levelList.innerHTML = levelHtml;
    }

  renderLevels()