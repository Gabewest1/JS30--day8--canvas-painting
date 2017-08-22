(function() {
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.strokeStyle = "#BADA55"
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.lineWidth = 15

    document.addEventListener("mousemove", draw)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", () => isDrawing = false)
    document.addEventListener("mouseout", () => isDrawing = false)

    let isDrawing = false
    let lastX = 0
    let lastY = 0

    function draw(e) {
        if (!isDrawing) return

        ctx.beginPath()
        ctx.moveTo(lastX, lastY)
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()

        lastX = e.offsetX
        lastY = e.offsetY
        ctx.strokeStyle = modifyStrokeColor(ctx.strokeStyle)
    }

    function handleMouseDown(e) {
        isDrawing = true
        lastX = e.offsetX
        lastY = e.offsetY
    }

    function modifyStrokeColor(currentColor) {
        let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        let letters= ["A", "B", "C", "D", "E", "F"]

        let randomIndex1 = Math.floor(Math.random() * 6) + 1
        let randomIndex2

        do {
            randomIndex2 = Math.floor(Math.random() * 6) + 1
        } while (randomIndex2 === randomIndex1)

        if (randomIndex1 > randomIndex2) {
            let temp = randomIndex1
            randomIndex1 = randomIndex2
            randomIndex2 = temp
        }

        let getRandomNumber = Math.floor(Math.random() * 2) === 0

        let newHexValue1 = getRandomNumber
                        ? numbers[Math.floor(Math.random() * numbers.length)]
                        : letters[Math.floor(Math.random() * letters.length)]

        let newHexValue2 = getRandomNumber
                        ? numbers[Math.floor(Math.random() * numbers.length)]
                        : letters[Math.floor(Math.random() * letters.length)]

        let newColor = currentColor.substring(0, randomIndex1) + newHexValue1 + currentColor.substring(randomIndex1+1, randomIndex2) + newHexValue2 + currentColor.substring(randomIndex2+1)

        return newColor
    }
})()