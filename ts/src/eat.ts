class Food {
    element: HTMLElement
    constructor() {
        this.element = document.getElementById("food")
    }
    get x() {
        return this.element.offsetLeft
    }
    get y() {
        return this.element.offsetTop
    }
    public change(): void {
        let top = Math.round(Math.random() * 39) * 10
        let left = Math.round(Math.random() * 39) * 10
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}


class ScorePanel {
    score = 0;
    level = 1;
    scoreELe: HTMLElement;
    levelEle: HTMLElement;
    maxLevel: number;
    upScore: number;
    constructor(maxLevel: number = 10, upScore: number = 2) {
        this.scoreELe = document.getElementById("scoreNum")
        this.levelEle = document.getElementById("levelNum")
        this.maxLevel = maxLevel
        this.upScore = upScore
    }
    public addScore(): void {
        this.score++
        this.scoreELe.innerHTML = this.score + ''
        if (this.score % this.upScore === 0 && this.level < this.maxLevel) {
            this.levelUp()
        }
    }
    public levelUp(): void {
        this.level++
        this.levelEle.innerHTML = this.level + ''
    }
}

class Snake {
    head: HTMLElement;
    snake: HTMLElement;
    bodies: HTMLCollection;
    constructor() {
        this.snake = document.getElementById("snake")
        this.head = document.querySelector("#snake>div")
        this.bodies = this.snake.getElementsByTagName("div")
    }
    get X() {
        return this.head.offsetLeft
    }
    set X(value: number) {
        if (value < 0 || value > 390) {
            throw new Error("GAME OVER")
        }
        this.head.style.left = value + "px"
    }
    get Y() {
        return this.head.offsetTop
    }
    set Y(value: number) {
        if (value < 0 || value > 400) {
            throw new Error("GAME OVER")
        }
        this.head.style.top = value + 'px'
    }
    public addBody(): void {
        this.snake.insertAdjacentHTML("beforeend", "<div></div>")
    }
    public moveBody(): void {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }
}


class GameControl {
    food: Food;
    snake: Snake;
    scorePanel: ScorePanel;
    dirction: string = '';
    isLive = true;
    constructor() {
        this.food = new Food()
        this.snake = new Snake()
        this.scorePanel = new ScorePanel()
        this.init()
    }
    public init(): void {
        this.food.change()
        document.addEventListener("keydown", this.handleKeyDown.bind(this))
        this.run()
    }
    public handleKeyDown(e: KeyboardEvent): void {
        this.dirction = e.key
    }
    public run(): void {
        let x = this.snake.X
        let y = this.snake.Y
        switch (this.dirction) {
            case "ArrowUp":
                y -= 10;
                break;
            case "ArrowDown":
                y += 10;
                break;
            case "ArrowRight":
                x += 10;
                break;
            case "ArrowLeft":
                x -= 10
        }
        this.ischeckoutEat(x, y)
        this.snake.moveBody()
        try {
            this.snake.X = x
            this.snake.Y = y
        }
        catch (e) {
            alert(e.message)
            this.isLive = false
        }

        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }
    ischeckoutEat(x: number, y: number) {
        if (x === this.food.x && y === this.food.y) {
            this.food.change()
            this.scorePanel.addScore()
            this.snake.addBody()
        }
    }

}

new GameControl()