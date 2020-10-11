/*
 * @File: 
 * @Brief: 
 * @Version: 1.0.0
 * @Author: xxx
 * @Date: 2020-10-10 07:51:10
 */

 
//设计绘图
DesignFrame = function () {
    this.frame = new Frame();
    //梃
    this.mullions = [];
    //拼接
    this.joints = [];
    //玻璃
    this.glasses = [];

    this.addDivide = function (divide) {
        this.divides.push(divide);
    }

    this.addCorner = function (corner) {
        this.corners.push(corner);
    }

    /**
     * 绘制
    */
    this.draw = function () {
        var x0 = this.begin.x;
        var y0 = this.begin.y;
        var width = this.end.x - this.begin.x;
        var height = this.end.y - this.begin.y;
        draw_rect(x0, y0, width, height);

        //画水平尺寸标识
        dimen = new Dimensioning();
        dimen.begin.x = x0;
        dimen.begin.y = y0 + height;
        dimen.end.x = x0 + width;
        dimen.end.y = y0 + height;
        dimen.length = 1600;
        dimen.span = 20;

        draw_hdimensioning(dimen);

        //画垂直尺寸标识
        dimen2 = new Dimensioning();
        dimen2.begin.x = x0 + width;
        dimen2.begin.y = y0;
        dimen2.end.x = x0 + width;
        dimen2.end.y = y0 + height;
        dimen2.length = 1600;
        dimen2.span = 20;
        draw_vdimensioning(dimen2);

        this.divides.map(function(value,index){
            draw_line(value.begin.x, value.begin.y, value.end.x, value.end.y);
        });

        this.corners.map(function(value,index){
            draw_line(value.ldivide.begin.x, value.ldivide.begin.y, value.ldivide.end.x, value.ldivide.end.y);
            draw_line(value.rdivide.begin.x, value.rdivide.begin.y, value.rdivide.end.x, value.rdivide.end.y);
        });
    };

    /**
     * 序列化成json串
    */
    this.serialize = function () {

    };

};

function init_design() {
    //draw init windows
    var x0 = 100;
    var y0 = 100;
    var width = 500;
    var height = 500;
    draw_rect(x0, y0, width, height);

    var inter = 16;
    draw_rect(x0 + inter, y0 + inter, width - 2*inter, height - 2*inter);

    //画水平尺寸标识
    dimen = new Dimensioning();
    dimen.begin.x = x0;
    dimen.begin.y = y0 + height;
    dimen.end.x = x0 + width;
    dimen.end.y = y0 + height;
    dimen.length = 1600;
    dimen.span = 20;

    draw_hdimensioning(dimen);

    //画垂直尺寸标识
    dimen2 = new Dimensioning();
    dimen2.begin.x = x0 + width;
    dimen2.begin.y = y0;
    dimen2.end.x = x0 + width;
    dimen2.end.y = y0 + height;
    dimen2.length = 1600;
    dimen2.span = 10;

    draw_vdimensioning(dimen2);

    mull = new Mullion();
    mull.begin.x = 200;
    mull.begin.y = 200;
    mull.end.x = 400;
    mull.end.y = 200;
    draw_hmullion(mull);

    mull2 = new Mullion();
    mull2.begin.x = 300;
    mull2.begin.y = 300;
    mull2.end.x = 300;
    mull2.end.y = 500;
    draw_vmullion(mull2);
}