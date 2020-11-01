/*
 * @File: 
 * @Brief: 设计绘图
 * @Version: 1.0.0
 * @Author: xxx
 * @Date: 2020-10-10 07:51:10
 */


var design;
var cur_selector = [];

/**
 * 设计绘图：一扇窗主要由：外框/梃/拼接/开扇组成
*/
DesignFrame = function () {
    this.frame = new WindowFrame();
    //开扇数组
    this.windowFans = [];
    //梃数组
    this.mullions = [];
    //拼接数组
    this.joints = [];

    this.init = function (x, y, wid, hei) {
        this.frame.out_begin.x = x;
        this.frame.out_begin.y = y;
        this.frame.out_end.x = x + wid;
        this.frame.out_end.y = y + hei;

        this.frame.in_begin.x = design.frame.out_begin.x + frame_span;
        this.frame.in_begin.y = design.frame.out_begin.y + frame_span;
        this.frame.in_end.x = design.frame.out_end.x - frame_span;
        this.frame.in_end.y = design.frame.out_end.y - frame_span;

        winfan = new WindowFan();
        winfan.innerFan.begin.x = this.frame.in_begin.x;
        winfan.innerFan.begin.y = this.frame.in_begin.y;
        winfan.innerFan.end.x = this.frame.in_end.x;
        winfan.innerFan.end.y = this.frame.in_end.y;
        this.windowFans.push(winfan);
    };

    this.addMullion = function (x, y, type) {
        var winfan1, winfan2;

        //横梃分割
        if (type == 1) {
            horpt = this.probeHorEdge(x, y);
            mul = new Mullion();
            mul.init(horpt[0], y, horpt[1], y, type);
            this.mullions.push(mul);

            verpt = this.probeVerEdge(x, y);

            winfan1 = new WindowFan();
            winfan1.innerFan.begin.x = horpt[0] + frame_span;
            winfan1.innerFan.begin.y = verpt[0] + frame_span;
            winfan1.innerFan.end.x = horpt[1] - frame_span;
            winfan1.innerFan.end.y = y - frame_span / 2;

            winfan2 = new WindowFan();
            winfan2.innerFan.begin.x = horpt[0] + frame_span;
            winfan2.innerFan.begin.y = y + frame_span / 2;
            winfan2.innerFan.end.x = horpt[1] - frame_span;
            winfan2.innerFan.end.y = verpt[1] - frame_span;
        }

        //竖梃分割
        if (type == 2) {
            verpt = this.probeVerEdge(x, y);
            mul = new Mullion();
            mul.init(x, verpt[0], x, verpt[1], type);

            horpt = this.probeHorEdge(x, y);

            winfan1 = new WindowFan();
            winfan1.innerFan.begin.x = horpt[0] + frame_span;
            winfan1.innerFan.begin.y = verpt[0] + frame_span;
            winfan1.innerFan.end.x = x - frame_span / 2;
            winfan1.innerFan.end.y = verpt[1] - frame_span;

            winfan2 = new WindowFan();
            winfan2.innerFan.begin.x = x + frame_span / 2;
            winfan2.innerFan.begin.y = verpt[0] + frame_span;
            winfan2.innerFan.end.x = horpt[1] - frame_span;
            winfan2.innerFan.end.y = verpt[1] - frame_span;

            this.mullions.push(mul);
        }

        //删除原fan
        for (var i = 0; i < this.windowFans.length; i++) {
            if (pointInRect(x, y, this.windowFans[i].innerFan.begin, this.windowFans[i].innerFan.end)) {
                this.windowFans.splice(i, 1);
                break;
            }
        }

        //最后添加新fan
        this.windowFans.push(winfan1);
        this.windowFans.push(winfan2);

    }

    this.addJoint = function (joint) {
        this.joints.push(joint);
    };

    this.delMullion = function (mullion) {

    };

    this.delJoint = function (joint) {

    };

    /**
     * 绘制
    */
    this.draw = function () {
        //draw init windows
        this.frame.draw();

        //画水平尺寸标识
        dimen = new Dimensioning();
        dimen.begin.x = this.frame.out_begin.x;
        dimen.begin.y = this.frame.out_end.y;
        dimen.end.x = this.frame.out_end.x;
        dimen.end.y = this.frame.out_end.y;
        dimen.length = 1600;
        dimen.span = 20;

        draw_hdimensioning(dimen);

        //画垂直尺寸标识
        dimen2 = new Dimensioning();
        dimen2.begin.x = this.frame.out_end.x;
        dimen2.begin.y = this.frame.out_begin.y;
        dimen2.end.x = this.frame.out_end.x;
        dimen2.end.y = this.frame.out_end.y;
        dimen2.length = 1600;
        dimen2.span = 10;

        draw_vdimensioning(dimen2);

        this.mullions.map(function (value, index) {
            value.draw();
        });

        this.joints.map(function (value, index) {
            //draw_line(value.ldivide.begin.x, value.ldivide.begin.y, value.ldivide.end.x, value.ldivide.end.y);
            //draw_line(value.rdivide.begin.x, value.rdivide.begin.y, value.rdivide.end.x, value.rdivide.end.y);
        });

        this.windowFans.map(function (value, index) {
            value.draw();
        });
    };

    /**
     * 序列化成json串
    */
    this.serialize = function () {

    };

    /**
     * 刷新重绘
    */
    this.refresh = function () {
        this.draw();
    };

    /**
     * 根据当前添加梃/拼接的位置，自动探测其宽度
    */
    this.probeHorEdge = function (x, y) {
        beginSpan = x - this.frame.out_begin.x;
        endSpan = this.frame.out_end.x - x;

        //probe ver mullion
        this.mullions.map(function (value, index) {
            if (value.type == 2) {
                if (value.begin.x < x) {
                    if (x - value.begin.x <= beginSpan && y >= value.begin.y && y <= value.end.y) {
                        beginSpan = x - value.begin.x + frame_span / 2;
                    }
                } else if (value.begin.x > x) {
                    if (value.begin.x - x < endSpan && y >= value.begin.y && y <= value.end.y) {
                        endSpan = value.begin.x - x + frame_span / 2;
                    }
                }
            }

        });

        this.joints.map(function (value, index) {
            if (value.type == 2) {
                if (value.begin.x < x) {
                    if (x - value.begin.x <= beginSpan && y >= value.begin.y && y <= value.end.y) {
                        beginSpan = x - value.begin.x + frame_span / 2;
                    }
                } else if (value.begin.x > x) {
                    if (value.begin.x - x < endSpan && y >= value.begin.y && y <= value.end.y) {
                        endSpan = value.begin.x + frame_span / 2;
                    }
                }
            }
        });

        ret = [x - beginSpan, x + endSpan];
        return ret;
    };


    /**
     * 根据当前添加梃/拼接的位置，自动探测其高度
    */
    this.probeVerEdge = function (x, y) {
        beginSpan = y - this.frame.out_begin.y;
        endSpan = this.frame.out_end.y - y;

        //probe ver mullion
        this.mullions.map(function (value, index) {
            if (value.type == 1) {
                if (value.begin.y < y) {
                    if (y - value.begin.y <= beginSpan && x >= value.begin.x && x <= value.end.x) {
                        beginSpan = y - value.begin.y + frame_span / 2;
                    }
                } else if (value.begin.y > y) {
                    if (value.begin.y - y < endSpan && x >= value.begin.x && x <= value.end.x) {
                        endSpan = value.begin.y - y + frame_span / 2;
                    }
                }
            }

        });

        this.joints.map(function (value, index) {
            if (value.type == 1) {
                if (value.begin.y < y) {
                    if (y - value.begin.y <= beginSpan && x >= value.begin.x && x <= value.end.x) {
                        beginSpan = y - value.begin.y + frame_span / 2;
                    }
                } else if (value.begin.y > y) {
                    if (value.begin.y - y < endSpan && x >= value.begin.x && x <= value.end.x) {
                        endSpan = value.begin.y - y + frame_span / 2;
                    }
                }
            }
        });

        ret = [y - beginSpan, y + endSpan];
        return ret;
    };

    /**
    * 根据坐标判定选中的实体
    */
    this.selectObj = function (x, y) {
        isIn = false;
        this.mullions.map(function (value, index) {
            if (value.ptIn(x, y)) {
                return;
            }
        });

        if (this.frame.ptIn(x, y)) {
            return;
        }

        this.windowFans.map(function (value, index) {
            if (value.ptIn(x, y) == true) {
                return;
            }
        });
    };
};



function init_design() {
    design = new DesignFrame();
    design.init(100, 100, 700, 500);

    //design.addMullion(400, 400, 1);

    //design.addMullion(400, 400, 2);

    design.draw();
}