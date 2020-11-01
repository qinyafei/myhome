/*
 * @File: 
 * @Brief: 
 * @Version: 1.0.0
 * @Author: xxx
 * @Date: 2020-10-26 10:36:08
 */

/**
 * 扇框绘制
*/
WindowFrame = function() {
    this.out_begin = new Point();
    this.out_end = new Point();
 
    this.in_begin = new Point();
    this.in_end = new Point();

    this.draw = function () {
        draw_rect(this.out_begin.x, this.out_begin.y, this.out_end.x - this.out_begin.x, this.out_end.y - this.out_begin.y);
    
        draw_rect(this.in_begin.x, this.in_begin.y, this.in_end.x - this.in_begin.x, this.in_end.y - this.in_begin.y);
    };

    this.ptIn = function (x, y ) {
        lt = new Point();
        lt.x = this.out_begin.x;
        lt.y = this.out_begin.y;
        rb = new Point();
        rb.x =  this.out_end.x;
        rb.y = this.in_begin.y;
        if (pointInRect(x, y, lt, rb)) {
            fill_frame(this);
            return true;
        }

        lt.x = this.out_begin.x;
        lt.y = this.in_begin.y;
        rb.x = this.in_begin.x;
        rb.y = this.in_end.y;
        if (pointInRect(x, y, lt, rb)) {
            fill_frame(this);
            return true;
        }

        lt.x = this.out_begin.x;
        lt.y = this.in_end.y;
        rb.x = this.out_end.x;
        rb.y = this.out_end.y;
        if (pointInRect(x, y, lt, rb)) {
            fill_frame(this);
            return true;
        }

        lt.x = this.in_end.x;
        lt.y = this.in_begin.y;
        rb.x = this.out_end.x;
        rb.y = this.in_end.y;
        if (pointInRect(x, y, lt, rb)) {
            fill_frame(this);
            return true;
        }
        
        return false;
        
    };
};