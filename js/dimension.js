/*
 * @File: 
 * @Brief: 
 * @Version: 1.0.0
 * @Author: xxx
 * @Date: 2020-11-09 11:55:37
 */
//尺寸标注
Dimension = function () {
    this.begin = new Point();
    this.end = new Point();
    this.length = 0;
    this.span = 15;
    this.type = 1; //1:hor 2:ver


    this.drawObjArr = [];

    this.clear = function () {
        this.drawObjArr.map(function (value, index) {
            zr.remove(value)
        });

        this.drawObjArr.splice(0, this.drawObjArr.length);
    };

    this.saveZRObj = function (obj) {
        this.drawObjArr.push(obj);
    };

    this.draw = function () {
        this.clear();

        theta = 25;
        headlen = 10;
        textlen = 20;

        if (this.type == 1) {
            //水平
            //1 画起止线
            obj1 = draw_line(this.begin.x, this.end.y, this.begin.x, this.end.y + this.span);
            this.saveZRObj(obj1);

            obj2 = draw_line(this.end.x, this.end.y, this.end.x, this.end.y + this.span);
            this.saveZRObj(obj2);

            //画向右箭头
            fromX = this.begin.x + (this.end.x - this.begin.x) / 2 + textlen;
            fromY = this.begin.y + this.span;
            toX = this.end.x;
            toY = this.begin.y + this.span;
            objarr = draw_arrow(fromX, fromY, toX, toY, theta, headlen);
            for (let i = 0; i < objarr.length; i++) {
                this.saveZRObj(objarr[i]);
            }

            //画向左箭头
            fromX = this.begin.x + (this.end.x - this.begin.x) / 2 - textlen;
            fromY = this.begin.y + this.span;
            toX = this.begin.x;
            toY = this.begin.y + this.span;

            objarr2 = draw_arrow(fromX, fromY, toX, toY, theta, headlen);
            for (let i = 0; i < objarr2.length; i++) {
                this.saveZRObj(objarr2[i]);
            }

            //绘制字符
            obj3 = draw_text(this.length, fromX, fromY);
            this.saveZRObj(obj3);
        } else {
            //垂直
            //1 画起止线
            obj1 = draw_line(this.begin.x, this.begin.y, this.begin.x + this.span, this.begin.y);
            this.saveZRObj(obj1);
            obj2 = draw_line(this.end.x, this.end.y, this.end.x + this.span, this.end.y);
            this.saveZRObj(obj2);
            //画向上箭头
            fromX = this.begin.x + this.span;
            fromY = this.begin.y + (this.end.y - this.begin.y) / 2 - textlen;
            toX = this.begin.x + this.span;
            toY = this.begin.y;
            objarr = draw_arrow(fromX, fromY, toX, toY, theta, headlen);
            for (let i = 0; i < objarr.length; i++) {
                this.saveZRObj(objarr[i]);
            }

            //画向下箭头
            fromX = this.begin.x + this.span;
            fromY = this.begin.y + (this.end.y - this.begin.y) / 2 + textlen;
            toX = this.end.x + this.span;
            toY = this.end.y;

            objarr2 = draw_arrow(fromX, fromY, toX, toY, theta, headlen);
            for (let i = 0; i < objarr2.length; i++) {
                this.saveZRObj(objarr2[i]);
            }
            //绘制字符
            obj3 = draw_text(this.length, fromX, fromY - textlen);
            this.saveZRObj(obj3);
        }
    };
};

