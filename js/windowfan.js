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
    //内扇(未开扇)
    this.innerFan = new InnerFan();
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
        isIn = false;
        //selete singlefan
        this.singleFans.map(function (value, index) {
            if (value.ptIn(x, y)) {
                fill_frame(value)
                return true;
            }
        });

        //选中内扇
        if (pointInRect(x, y, this.innerFan.begin, this.innerFan.end)) {
            if (cur_selector != undefined) {
                cur_selector.map(function (value, index) {
                    zr.remove(value)
                });
            }

            rc = fill_rect(this.innerFan.begin.x, this.innerFan.begin.y,
                this.innerFan.end.x - this.innerFan.begin.x, this.innerFan.end.y - this.innerFan.begin.y);
            cur_selector.push(rc);
            return true;
        }
        return false;
    };

    this.draw = function () {
        if (this.singleFans.length > 0) {
            //this.innerFan.draw();
        }
    };
};