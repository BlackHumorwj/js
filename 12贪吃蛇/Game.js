//子调用函数 -- 游戏
((function () {
    var that = null;

    function Game(map) {
        //创建食物 和 小蛇对象
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    //游戏的初始化
    Game.prototype.init = function () {
        //初始化食物
        this.food.init(this.map);
        //初始化小蛇
        this.snake.init(this.map);
        this.runSnake();

        //绑定事件
        this.bindKey();
    };

    //小蛇移动
    Game.prototype.runSnake = function () {

        var timeId = setInterval(function () {
            this.snake.move(this.food, this.map);
            this.snake.init(this.map);
            //判断小蛇移动的边
            //最大值
            var maxX = this.map.offsetWidth / this.snake.width;
            var maxY = this.map.offsetHeight / this.snake.height;

            //当前值

            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;

            if (headX < 0 || headX >= maxX) {
                clearInterval(timeId);
                alert("游戏停止");
            }
            if (headY < 0 || headY >= maxY) {
                clearInterval(timeId);
                alert("游戏停止");
            }
        }.bind(that), 150);
    };

    //绑定事件
    Game.prototype.bindKey = function () {

        document.addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = "left";
                    break;
                case 38:
                    this.snake.direction = "top";
                    break;
                case 39:
                    this.snake.direction = "right";
                    break;
                case 40:
                    this.snake.direction = "bottom";
                    break;
            }

        }.bind(that), false);

    };


    window.Game = Game;
})());