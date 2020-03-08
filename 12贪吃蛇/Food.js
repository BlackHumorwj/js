//子调用函数--食物
((function () {

    var elements = [];//定义一个数组存放食物的视图

    //1、定义食物的构造函数 并设置默认值
    function Food(x, y, width, height, color) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 20;
        this.height = height || 20;
        this.color = color || "green";
    }

    window.Food = Food;

    //2、定义食物的原型方法，并将食物添加到地图上
    //构造函数赋值给全局变量
    Food.prototype.init = function (map) {

        //先删除地图上的元素
        remove();

        var foodDiv = document.createElement("div");

        map.appendChild(foodDiv);

        var fStyle = foodDiv.style;
        //设置食物的样式
        //宽高 背景色
        //注意单位添加
        fStyle.width = this.width + "px";
        fStyle.height = this.height + "px";
        fStyle.backgroundColor = this.color;
        //元素的偏移量
        //先脱标
        fStyle.position = "absolute";
        //随机数
        var x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        var y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;

        this.x = x;
        this.y = y;

        //注意单位添加
        fStyle.left = this.x + "px";
        fStyle.top = this.y + "px";

        elements.push(foodDiv);

    };

    //3 提供一个私有的删除食物的方法

    function remove() {
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(0, 1);
        }
    }


})());