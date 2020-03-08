//子调用函数--小蛇
((function () {

    var elements = [];//存放小蛇身体的小方块

    function Snake(width, height, direction) {
        this.width = width || 20;
        this.height = height || 20;
        this.body = [
            {x: 3, y: 2, color: "red"},//头 0
            {x: 2, y: 2, color: "green"},//身体 1
            {x: 1, y: 2, color: "green"}//身体 2
        ];
        this.direction = direction || "right";
    }

    //初始化方法，在屏幕上创建小蛇
    Snake.prototype.init = function (map) {

        remove();

        //遍历小蛇中的身体，创建元素
        for (var i = 0; i < this.body.length; i++) {
            var obj = this.body[i];

            var dv = document.createElement("div");

            var dvStyle = dv.style;

            dvStyle.position = "absolute";
            dvStyle.width = this.width + "px";
            dvStyle.height = this.height + "px";

            //设置每个小方块的位置
            dvStyle.left = obj.x * this.width + "px";
            dvStyle.top = obj.y * this.height + "px";

            dvStyle.backgroundColor = obj.color;
            //添加元素进地图
            map.appendChild(dv);

            //方向不定

            //添加元素进数组，为了删除用
            elements.push(dv);
        }
    };

    //小蛇移动方法
    Snake.prototype.move = function (food, map) {
        //body的移动
        //数组元素前移,倒序遍历
        var i = this.body.length - 1;
        for (; i > 0; i--) {
            //数组前面的元素坐标赋值给后一元素
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //头部的移动
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }

        //判断是否迟到食物
        var head = this.body[0];

        //小蛇头坐标
        var headX = head.x * this.width;
        var headY = head.y * this.height;

        //食物坐标


        if (headX == food.x && headY == food.y) {
            //小蛇身体加一，小蛇的尾巴坐标赋值给新的身体
            var lastBody = this.body[this.body.length - 1];
            this.body.push({
                x: lastBody.x,
                y: lastBody.y,
                color: lastBody.color
            });

            //初始化食物
            food.init(map);
        }
    };


    //清除元素
    function remove() {
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            //???
            elements.splice(i, 1);
        }

    }

    //将snake暴露给window对象
    window.Snake = Snake;

})());