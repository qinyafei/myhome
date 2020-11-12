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
    //外框尺寸标注
    this.hroFrameDimen = new Dimension();
    this.verFrameDimen = new Dimension();
    //尺寸标注数组
    this.dimensions = [];

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

        this.hroFrameDimen.begin.x = x;
        this.hroFrameDimen.begin.y = this.frame.out_end.y;
        this.hroFrameDimen.end.x = this.frame.out_end.x;
        this.hroFrameDimen.end.y = this.frame.out_end.y;
        this.hroFrameDimen.type = 1;
        this.hroFrameDimen.length = 1600;
        this.hroFrameDimen.span = 25;

        this.verFrameDimen.begin.x = this.frame.out_end.x;
        this.verFrameDimen.begin.y = y;
        this.verFrameDimen.end.x = this.frame.out_end.x;
        this.verFrameDimen.end.y = this.frame.out_end.y;
        this.verFrameDimen.type = 2;
        this.verFrameDimen.length = 1600;
        this.verFrameDimen.span = 25;
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
            this.mullions.push(mul);

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

        this.reCalculateDimension();
    }

    this.addJoint = function (joint) {
        this.joints.push(joint);
    };

    this.delMullion = function (mullion) {

    };

    this.delJoint = function (joint) {

    };

    /**
     * 绘制尺寸标注
    */
    this.drawDimension = function () {
        //绘制外框dimension
        this.hroFrameDimen.draw();
        this.verFrameDimen.draw();

        //其他内区间尺寸
        this.dimensions.map(function (value, index) {
            value.draw();
        });
    };

    /**
     * check 重新check尺寸标注
    */
    this.reCalculateDimension = function () {
        //先清空
        this.dimensions.splice(0, this.dimensions.length);

        //水平尺寸标注的X是frame.out_end.x
        //垂直尺寸标注的y是frame.out_end.y
        //只存储标注点的y值
        horSpan = [];
        //存储标注点的x值
        verSpan = [];
        this.mullions.map(function (value, index) {
            if (value.type == 1) {
                horSpan.push(value.end.y);
            } else if (value.type == 2) {
                verSpan.push(value.end.x);
            }
        });

        horSpan.sort(function (a, b) { return a - b });
        verSpan.sort(function (a, b) { return a - b });

        for (idx = 0; idx < horSpan.length; idx++) {
            if (idx == 0) {
                dimen = new Dimension();
                dimen.begin.x = this.frame.out_end.x;
                dimen.begin.y = this.frame.out_begin.y;
                dimen.end.x = this.frame.out_end.x;
                dimen.end.y = horSpan[idx];
                dimen.type = 2;
                dimen.length = horSpan[idx] - this.frame.out_begin.y;
                this.dimensions.push(dimen);
            } else if (idx == horSpan.length - 1) {
                dimen = new Dimension();
                dimen.begin.x = this.frame.out_end.x;
                dimen.begin.y = horSpan[idx];
                dimen.end.x = this.frame.out_end.x;
                dimen.end.y = this.frame.out_end.y;
                dimen.type = 2;
                dimen.length = horSpan[idx] - this.frame.out_begin.y;
                this.dimensions.push(dimen);
            } else {
                dimen = new Dimension();
                dimen.begin.x = this.frame.out_end.x;
                dimen.begin.y = horSpan[idx];
                dimen.end.x = this.frame.out_end.x;
                dimen.end.y = horSpan[idx + 1];
                dimen.type = 2;
                dimen.length = horSpan[idx + 1] - horSpan[idx];
                this.dimensions.push(dimen);
            }
        }

        for (idx = 0; idx < verSpan.length; idx++) {
            if (idx == 0) {
                dimen = new Dimension();
                dimen.begin.x = this.frame.out_begin.x;
                dimen.begin.y = this.frame.out_end.y;
                dimen.end.x = verSpan[idx];
                dimen.end.y = this.frame.out_end.y;
                dimen.type = 1;
                dimen.length = verSpan[idx] - this.frame.out_begin.x;
                this.dimensions.push(dimen);
            } else if (idx == horSpan.length - 1) {
                dimen = new Dimension();
                dimen.begin.x = verSpan[idx];
                dimen.begin.y = this.frame.out_end.y;
                dimen.end.x = this.frame.out_end.x;
                dimen.end.y = this.frame.out_end.y;
                dimen.type = 1;
                dimen.length = this.frame.out_end.x - verSpan[idx];
                this.dimensions.push(dimen);
            } else {
                dimen = new Dimension();
                dimen.begin.x = verSpan[idx];
                dimen.begin.y = this.frame.out_end.y;
                dimen.end.x = verSpan[idx + 1];
                dimen.end.y = this.frame.out_end.y;
                dimen.type = 1;
                dimen.length = verSpan[idx + 1] - verSpan[idx];
                this.dimensions.push(dimen);
            }
        }

    };

    /**
     * 绘制
    */
    this.draw = function () {
        //draw init windows
        this.frame.draw();

        //画水平/垂直尺寸标识
        this.drawDimension();

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