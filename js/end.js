const showScore = document.getElementById("my-score")
const enteredUser = document.getElementById("enter-user")
const saveButton = document.getElementById("save-button")
const myScore = JSON.parse(localStorage.getItem("score"))
const highScores = JSON.parse(localStorage.getItem("players")) || []

showScore.innerHTML = myScore

const saveHandler = () => {
    if (!enteredUser.value || !myScore) {
        alert("Invalid userName or score")
    } else {
        const finalScore = {
            name: enteredUser.value,
            score: myScore
        }
        highScores.push(finalScore)
        highScores.sort((a, b) => b.score - a.score)
        highScores.splice(10)
        localStorage.setItem("players", JSON.stringify(highScores))
        enteredUser.value = ""
        window.location.assign("/")

    }
}
saveButton.addEventListener("click", saveHandler)