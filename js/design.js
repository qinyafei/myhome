/*
 * @File: 
 * @Brief: 
 * @Version: 1.0.0
 * @Author: xxx
 * @Date: 2020-10-10 07:51:10
 */

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