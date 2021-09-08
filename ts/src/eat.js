var Food = /** @class */ (function () {
    function Food() {
        this.element = document.getElementById("food");
    }
    Object.defineProperty(Food.prototype, "x", {
        get: function () {
            return this.element.offsetLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Food.prototype, "y", {
        get: function () {
            return this.element.offsetTop;
        },
        enumerable: false,
        configurable: true
    });
    Food.prototype.change = function () {
        var top = Math.round(Math.random() * 39) * 10;
        var left = Math.round(Math.random() * 39) * 10;
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    };
    return Food;
}());
var ScorePanel = /** @class */ (function () {
    function ScorePanel(maxLevel, upScore) {
        if (maxLevel === void 0) { maxLevel = 10; }
        if (upScore === void 0) { upScore = 2; }
        this.score = 0;
        this.level = 1;
        this.scoreELe = document.getElementById("scoreNum");
        this.levelEle = document.getElementById("levelNum");
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }
    ScorePanel.prototype.addScore = function () {
        this.score++;
        this.scoreELe.innerHTML = this.score + '';
        if (this.score % this.upScore === 0 && this.level < this.maxLevel) {
            this.levelUp();
        }
    };
    ScorePanel.prototype.levelUp = function () {
        this.level++;
        this.levelEle.innerHTML = this.level + '';
    };
    return ScorePanel;
}());
var Snake = /** @class */ (function () {
    function Snake() {
        this.snake = document.getElementById("snake");
        this.head = document.querySelector("#snake>div");
        this.bodies = this.snake.getElementsByTagName("div");
    }
    Object.defineProperty(Snake.prototype, "X", {
        get: function () {
            return this.head.offsetLeft;
        },
        set: function (value) {
            if (value < 0 || value > 390) {
                throw new Error("GAME OVER");
            }
            this.head.style.left = value + "px";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Snake.prototype, "Y", {
        get: function () {
            return this.head.offsetTop;
        },
        set: function (value) {
            if (value < 0 || value > 400) {
                throw new Error("GAME OVER");
            }
            this.head.style.top = value + 'px';
        },
        enumerable: false,
        configurable: true
    });
    Snake.prototype.addBody = function () {
        this.snake.insertAdjacentHTML("beforeend", "<div></div>");
    };
    Snake.prototype.moveBody = function () {
        for (var i = this.bodies.length - 1; i > 0; i--) {
            var X = this.bodies[i - 1].offsetLeft;
            var Y = this.bodies[i - 1].offsetTop;
            this.bodies[i].style.left = X + 'px';
            this.bodies[i].style.top = Y + 'px';
        }
    };
    return Snake;
}());
var GameControl = /** @class */ (function () {
    function GameControl() {
        this.dirction = '';
        this.isLive = true;
        this.food = new Food();
        this.snake = new Snake();
        this.scorePanel = new ScorePanel();
        this.init();
    }
    GameControl.prototype.init = function () {
        this.food.change();
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        this.run();
    };
    GameControl.prototype.handleKeyDown = function (e) {
        this.dirction = e.key;
    };
    GameControl.prototype.run = function () {
        var x = this.snake.X;
        var y = this.snake.Y;
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
                x -= 10;
        }
        this.ischeckoutEat(x, y);
        this.snake.moveBody();
        try {
            this.snake.X = x;
            this.snake.Y = y;
        }
        catch (e) {
            alert(e.message);
            this.isLive = false;
        }
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    };
    GameControl.prototype.ischeckoutEat = function (x, y) {
        if (x === this.food.x && y === this.food.y) {
            this.food.change();
            this.scorePanel.addScore();
            this.snake.addBody();
        }
    };
    return GameControl;
}());
new GameControl();
