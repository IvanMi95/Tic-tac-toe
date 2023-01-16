const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]]
let circleTurn
let xClass = "x"
let circleClass = "circle"
let circleArray = []
let xArray = []
let winningMessaggeTextElement = document.querySelector("[data-winning-message-text]")
let winningMessaggeElement = document.getElementById("winningMessage")
let restartBtn = document.getElementById("restartButton")
restartBtn.addEventListener("click", startGame)

startGame()

function startGame () {
  circleTurn = false

  cellElements.forEach(cell => {
    cell.classList.remove(xClass)
    cell.classList.remove(circleClass)
cell.removeEventListener("click",hanldeClick)
    cell.addEventListener("click", hanldeClick, { once: true })
  })
  setBoardHoverClass()
  winningMessaggeElement.classList.remove("show")
}

function hanldeClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? circleClass : xClass
  placeMark(cell, currentClass)
  if (chechWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

const swapTurns = () => circleTurn = !circleTurn

const placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass)
}

function setBoardHoverClass  ()  {
  board.classList.remove(xClass)
  board.classList.remove(circleClass)
  circleTurn ? board.classList.add(circleClass) : board.classList.add(xClass)
}

function chechWin(currentClass) {
  return winningConditions.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function endGame(draw) {
  if (draw) {
    winningMessaggeTextElement.innerText = "Draw!"
  } else {
    winningMessaggeTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`
  }
  winningMessaggeElement.classList.add("show")
}

function chechWin(currentClass) {
  return winningConditions.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
  })
}


