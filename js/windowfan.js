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

            //rc = fill_rect(this.innerFan.begin.x, this.innerFan.begin.y,
            //   this.innerFan.end.x - this.innerFan.begin.x, this.innerFan.end.y - this.innerFan.begin.y);
            //cur_selector.push(rc);

            this.setFanScheme(1);
            return true;
        }
        return false;
    };

    this.draw = function () {
        this.singleFans.map(function (value, index) {
            value.draw();
        });
    };

    this.setFanScheme = function (type) {
        //等扇内开
        let interval = 10;
        left = new WindowFrame();
        left.out_begin = this.innerFan.begin;
        left.out_end.x = this.innerFan.begin.x  + (this.innerFan.end.x - this.innerFan.begin.x)/ 2;
        left.out_end.y = this.innerFan.end.y;
        left.in_begin.x = left.out_begin.x + interval;
        left.in_begin.y = left.out_begin.y + interval;
        left.in_end.x = left.out_end.x - interval;
        left.in_end.y = left.out_end.y - interval;
        this.addFan(left);

        right = new WindowFrame();
        right.out_begin.x = left.out_end.x;
        right.out_begin.y = this.innerFan.begin.y;
        right.out_end.x = this.innerFan.end.x;
        right.out_end.y = this.innerFan.end.y;
        right.in_begin.x = right.out_begin.x + interval;
        right.in_begin.y = right.out_begin.y + interval;
        right.in_end.x = right.out_end.x - interval;
        right.in_end.y = right.out_end.y - interval;
        this.addFan(right);
        
    };
};
