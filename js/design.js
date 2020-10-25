/*
 * @File: 
 * @Brief: 设计绘图
 * @Version: 1.0.0
 * @Author: xxx
 * @Date: 2020-10-10 07:51:10
 */


var design;

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

    this.addMullion = function (x, y, type) {
        //横梃分割
        if (type == 1) {
            horpt = this.probeHorEdge(x, y);
            mul = new Mullion();
            mul.begin.x = horpt[0];
            mul.begin.y = y;
            mul.end.x = horpt[1];
            mul.end.y = y;
            mul.type = type;
    
            verpt = this.probeVerEdge(x, y);
            
            winfan1 = new this.WindowFans();
            winfan1.frame.out_begin.x = horpt[0];
            winfan1.frame.out_begin.y = verpt[0];
            winfan1.frame.out_end.x = horpt[1];
            winfan1.frame.out_end.y = y;
            winfan1.frame.in_begin.x = winfan1.frame.out_begin.x + frame_span;
            winfan1.frame.in_begin.y = winfan1.frame.out_begin.y + frame_span;
            winfan1.frame.in_out.x = winfan1.frame.out_end.x - frame_span;
            winfan1.frame.in_out.y = winfan1.frame.out_end.y - frame_span;

            winfan2 = new this.WinowFans();
            winfan2.frame.out_begin.x = horpt[0];
            winfan2.frame.out_begin.y = y;
            winfan2.frame.out_end.x = horpt[1];
            winfan2.frame.out_end.y = verpt[1];
            winfan2.frame.in_begin.x = winfan1.frame.out_begin.x + frame_span;
            winfan2.frame.in_begin.y = winfan1.frame.out_begin.y + frame_span;
            winfan2.frame.in_out.x = winfan1.frame.out_end.x - frame_span;
            winfan2.frame.in_out.y = winfan1.frame.out_end.y - frame_span;

            this.windowFans.push(winfan1);
            this.windowFans.push(winfan2);
            this.mullions.push(mul);
        }

         //竖梃分割
         if (type == 2) {
            verpt = this.probeVerEdge(x, y);
            mul = new Mullion();
            mul.begin.x = x;
            mul.begin.y = verpt[0];
            mul.end.x = x;
            mul.end.y = verpt[1];
            mul.type = type;
    
            horpt = this.probeHorEdge(x, y);
            
            winfan1 = new this.WindowFans();
            winfan1.frame.out_begin.x = horpt[0];
            winfan1.frame.out_begin.y = verpt[0];
            winfan1.frame.out_end.x = x;
            winfan1.frame.out_end.y = verpt[1];
            winfan1.frame.in_begin.x = winfan1.frame.out_begin.x + frame_span;
            winfan1.frame.in_begin.y = winfan1.frame.out_begin.y + frame_span;
            winfan1.frame.in_out.x = winfan1.frame.out_end.x - frame_span;
            winfan1.frame.in_out.y = winfan1.frame.out_end.y - frame_span;

            winfan2 = new this.WinowFans();
            winfan2.frame.out_begin.x = x;
            winfan2.frame.out_begin.y = verpt[0];
            winfan2.frame.out_end.x = horpt[1];
            winfan2.frame.out_end.y = verpt[1];
            winfan2.frame.in_begin.x = winfan1.frame.out_begin.x + frame_span;
            winfan2.frame.in_begin.y = winfan1.frame.out_begin.y + frame_span;
            winfan2.frame.in_out.x = winfan1.frame.out_end.x - frame_span;
            winfan2.frame.in_out.y = winfan1.frame.out_end.y - frame_span;

            this.windowFans.push(winfan1);
            this.windowFans.push(winfan2);
            this.mullions.push(mul);
        }
 
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
        this.mullions.map(function (value, index) {

        });

        this.frames.map(function (value, index) {

        });

        this.windowFans.map(function (value, index) {

        });

        this.singleFans.map(function (value, index) {

        });
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

        design.addMullion(400, 400, 1);

        design.addMullion(400, 400, 2);

        design.draw();
    }