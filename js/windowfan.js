/*
 * @File: 
 * @Brief: 开扇
 * @Version: 1.0.0
 * @Author: xxx
 * @Date: 2020-10-10 07:51:10
 */

/**
 * 开扇一般由：外框/单扇边/玻璃组成
 * 注意：有可能是多边形
*/ 
WindowFan = function () {
    //外框 windowframe
    this.frame = new WindowFrame();
    //单扇边数组: 扇边和外框结构体定义一致
    this.singleFans = [];

    //玻璃数组
    this.glasses = [];

    this.addFan = function (fan) {
        this.singleFans.push(fan);
    };

    this.addGlass = function (glass) {
        this.glasses.push(glass);
    };

    this.delGlass = function (glass) {

    };

    this.ptIn = function (x, y) {
        //selete singlefan
        this.singleFans.map(function (value, index) {
            value.ptIn(x, y);
        });

        //选中内扇
        if (pointInRect(x, y, this.frame.in_begin, this.frame.in_end)) {
            draw_fill_rect(this.frame.in_begin.x, this.frame.in_begin.y,
                 this.frame.in_end.x - this.frame.in_begin.x, this.frame.in_end.y - this.frame.in_begin.y);
        }
    };

    this.draw = function() {
        if (this.singleFans.length > 0) {
            this.frame.draw();
        }
    };
};