/*
 * @File: 
 * @Brief: 
 * @Version: 1.0.0
 * @Author: xxx
 * @Date: 2020-10-26 10:36:08
 */
Point = function (x0, y0) {
    this.x = x0;
    this.y = y0;
};

/**
 * 1: 横梃
 * 2: 竖梃
 * 3: 水平拼接
 * 4: 垂直拼接
 * 
*/
var model_type = 0;




//水平 / 垂直拼接
Joint = function () {
    this.begin = new Point();
    this.end = new Point();
    this.type = 1;//1:hor 2:ver
};


//尺寸标注
Dimensioning = function () {
    this.begin = new Point();
    this.end = new Point();
    this.length = 0;
    this.span = 15;
    this.type = 1; //1:hor 2:ver
};

//玻璃
Glass = function () {
   this.begin = new Point();
   this.end = new Point();
   this.color = '';
};

//基础绘制-分割线
DivideLine = function () {
    this.begin = new Point();
    this.end = new Point();
};


//转角
Corner = function() {
    this.ldivide = new DivideLine();
    this.rdivide = new DivideLine();
};

//扇内(未开扇的扇框内部矩形)，同玻璃类似
InnerFan = function() {
    this.begin = new Point();
    this.end = new Point();
};

//开扇的单个扇边
//有可能是多边形
SingleFan = function() {
    this.fanEdge = new WindowFrame();
};
