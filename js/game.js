
const level = JSON.parse(localStorage.getItem("level")) || "medium"
const loader = document.getElementById("loader")
const container = document.getElementById("container")
const questionText = document.getElementById("question-text")
const buttonsAnswers = document.querySelectorAll(".answer-question")
const scoreText = document.getElementById("score")
const nextButton = document.getElementById("next-button")
const finishButton = document.getElementById("finish-button")
const questionNumber = document.getElementById("qusestion-number")
const error = document.getElementById("error")

const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

let customizedData = null;
let correctAnswerIndex = null;
let isAccepted = true;
let questionIndex = 0
const CORRECT_BONUS = 10;
let score = 0;

const formatData = (questionData) => {
    const result = questionData.map((item) => {
        const questionObject = { question: item.question }
        const answers = [...item.incorrect_answers]
        const correctAnswerIndex = Math.floor(Math.random() * 4)
        // Insert the correct answer at the randomly generated index
        answers.splice(correctAnswerIndex, 0, item.correct_answer);
        // Add the answers array to the questionObject
        questionObject.answers = answers;
        questionObject.correctIndex = correctAnswerIndex
        return questionObject;
    })
    return result
}
//1
const getApi = async () => {
    try {
        const response = await fetch(URL)
        const json = await response.json()
        customizedData = formatData(json.results)
        start()
    } catch (err) {
        loader.style.display = "none";
        error.style.display = "block"
    }

}
//2
const start = () => {
    showQuestion()
    loader.style.display = "none";
    container.style.display = "block"
}
// display Data (question) in the document HTML 

const showQuestion = () => {
            //یک فانکشن برای اصلاح فرمت سوالات وپاسخ ها 
    function decodeHTMLEntities(text) {
        var textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }
    const formatQuestion = decodeHTMLEntities(customizedData[questionIndex].question);
    const formatAnswers = decodeHTMLEntities(customizedData[questionIndex].answers);
    const codeanswers = formatAnswers.split(",")
            // نشان دادن سوالات و پاسخ ها در صفحه
    const { correctIndex } = customizedData[questionIndex]
    questionText.innerText = formatQuestion
    correctAnswerIndex = correctIndex
    buttonsAnswers.forEach((button, index) => {
        button.innerText = codeanswers[index]

    })
}

const checkAnswer = (event, index) => {
    if (!isAccepted) return
    isAccepted = false;
    const isCorrect = index === correctAnswerIndex ? true : false
    if (isCorrect) {
        event.target.classList.add("correct")
        score += CORRECT_BONUS
        scoreText.innerText = score
    } else {
        event.target.classList.add("incorrect")
        buttonsAnswers[correctAnswerIndex].classList.add("correct")
    }
}

const removeClass = () => {
    buttonsAnswers.forEach(button => button.className = "answer-question")
}

const nextHandler = () => {
    questionIndex++
    if (questionIndex < customizedData.length) {
        questionNumber.innerHTML = questionIndex + 1
        removeClass()
        isAccepted = true
        showQuestion()
    } else {
        finishHandler()
    }
}
const finishHandler = () => {
    localStorage.setItem("score", JSON.stringify(score))
    window.location.assign("/end.html")
}

const resetLevelHandler = () => {
    localStorage.removeItem("level")
}
window.addEventListener("load", getApi)
window.addEventListener("load", resetLevelHandler)

buttonsAnswers.forEach((button, index) => {
    button.addEventListener("click", (event) => checkAnswer(event, index))
})
nextButton.addEventListener("click", nextHandler)
finishButton.addEventListener("click", finishHandler)