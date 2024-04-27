const buttons = document.querySelectorAll("button")

const levelHandler = (event) => {
    const selectLevel = event.target.innerText.toLowerCase()
    localStorage.setItem("level", JSON.stringify(selectLevel))
    window.location.assign("/")
}
buttons.forEach((button) => {
    button.addEventListener("click", levelHandler)
})
