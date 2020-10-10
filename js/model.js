Point = function () {
    this.x = 0;
    this.y = 0;
};

/**
 * 1: 横梃
 * 2: 竖梃
 * 3: 水平拼接
 * 4: 垂直拼接
 * 
*/
var model_type = 0;

//横梃 / 竖梃
Mullion = function () {

    this.begin = new Point();
    this.end = new Point();
    this.type = 1;
};


//水平 / 垂直拼接
Joint = function () {
    this.begin = new Point();
    this.end = new Point();
    this.type = 3;
};


//尺寸标注
Dimensioning = function () {
    this.begin = new Point();
    this.end = new Point();
    this.length = 0;
    this.span = 15;
};

//框
Frame = function() {
    this.out_begin = new Point();
    this.out_end = new Point();
 
    this.in_begin = new Point();
    this.in_end = new Point();
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

//基础框架
BasicFrame= function () {
    this.begin = new Point();
    this.end = new Point();
    this.divides = []; 

};