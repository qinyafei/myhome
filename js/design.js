/*
 * @File: 
 * @Brief: 
 * @Version: 1.0.0
 * @Author: xxx
 * @Date: 2020-10-10 07:51:10
 */


var design;

//设计绘图
DesignFrame = function () {
    this.frame = new WindowFrame();
    //梃
    this.mullions = [];
    //拼接
    this.joints = [];
    //玻璃
    this.glasses = [];

    this.addMullion = function (mullion) {
        this.mullions.push(mullion);
    }

    this.addJoint = function (joint) {
        this.joints.push(joint);
    }

    this.addGlass = function (glass) {
        this.glasses.push(glass);
    }

    this.delMullion = function (mullion) {

    }

    this.delJoint = function (joint) {

    }

    this.delGlass = function (glass) {

    }

    /**
     * 绘制
    */
    this.draw = function () {
        //draw init windows
        draw_frame(this.frame);

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
            if (value.type == 1) {
                draw_hmullion(value);
            } else {
                draw_vmullion(value);
            }

        });

        this.joints.map(function (value, index) {
            //draw_line(value.ldivide.begin.x, value.ldivide.begin.y, value.ldivide.end.x, value.ldivide.end.y);
            //draw_line(value.rdivide.begin.x, value.rdivide.begin.y, value.rdivide.end.x, value.rdivide.end.y);
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
                        beginSpan = x - value.begin.x;
                    }
                } else if (value.begin.x > x) {
                    if (value.begin.x - x < endSpan && y >= value.begin.y && y <= value.end.y) {
                        endSpan = value.begin.x - x;
                    }
                }
            }

        });

        this.joints.map(function (value, index) {
            if (value.type == 2) {
                if (value.begin.x < x) {
                    if (x - value.begin.x <= beginSpan && y >= value.begin.y && y <= value.end.y) {
                        beginSpan = x - value.begin.x;
                    }
                } else if (value.begin.x > x) {
                    if (value.begin.x - x < endSpan && y >= value.begin.y && y <= value.end.y) {
                        endSpan = value.begin.x - x;
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
                        beginSpan = y - value.begin.y;
                    }
                } else if (value.begin.y > y) {
                    if (value.begin.y - y < endSpan && x >= value.begin.x && x <= value.end.x) {
                        endSpan = value.begin.y - y;
                    }
                }
            }

        });

        this.joints.map(function (value, index) {
            if (value.type == 1) {
                if (value.begin.y < y) {
                    if (y - value.begin.y <= beginSpan && x >= value.begin.x && x <= value.end.x) {
                        beginSpan = y - value.begin.y;
                    }
                } else if (value.begin.y > y) {
                    if (value.begin.y - y < endSpan && x >= value.begin.x && x <= value.end.x) {
                        endSpan = value.begin.y - y;
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
        
    }
};



function init_design() {
    design = new DesignFrame();
    design.frame.out_begin.x = 200;
    design.frame.out_begin.y = 200;
    design.frame.out_end.x = 800;
    design.frame.out_end.y = 600;

    span = 10;
    design.frame.in_begin.x = design.frame.out_begin.x + span;
    design.frame.in_begin.y = design.frame.out_begin.y + span;
    design.frame.in_end.x = design.frame.out_end.x - span;
    design.frame.in_end.y = design.frame.out_end.y - span;


    vmull = new Mullion();
    vmull.begin.x = 400;
    vmull.begin.y = design.frame.out_begin.y;
    vmull.end.x = 400;
    vmull.end.y = design.frame.out_end.y;
    vmull.type = 2;
    design.addMullion(vmull);

    hmull = new Mullion();
    hmull.begin.x = vmull.begin.x;
    hmull.begin.y = 400;
    hmull.end.x = design.frame.out_end.x;
    hmull.end.y = 400;
    hmull.type = 1;
    design.addMullion(hmull);

    design.draw();
}