/**
 * 梃结构及绘制
*/

//横梃 / 竖梃
Mullion = function () {

    this.begin = new Point();
    this.end = new Point();
    this.type = 1; //1:hor 2:ver
    this.pointArray = []; //fill points array

    this.ptIn = function (x, y) {
        //TODO:
        //横梃
        if (this.type == 1) {
            lt = new Point(this.pointArray[0][0], this.pointArray[0][1]);
            rb = new Point(this.pointArray[3][0], this.pointArray[3][1]);
            if (pointInRect(x, y, lt, rb)) {
                fill_model(this.pointArray);
                return true;
            }
        } else if (this.type == 2) {
            lt = new Point(this.pointArray[2][0], this.pointArray[2][1]);
            rb = new Point(this.pointArray[5][0], this.pointArray[5][1]);
            if (pointInRect(x, y, lt, rb)) {
                fill_model(this.pointArray);
                return true;
            }
        }

        return false;
    };

    this.draw = function () {
        if (this.type == 1) {
            this.draw_hmullion();
        } else if (this.type == 2) {
            this.draw_vmullion();
        }
    };

    this.init = function (x0, y0, x1, y1, t) {
        this.begin.x = x0;
        this.begin.y = y0;
        this.end.x = x1;
        this.end.y = y1;
        this.type = t;

        if (this.type == 1) {
            arx = this.begin.x + frame_span / 2;
            ary = this.begin.y;

            pt1 = new Point();
            pt1.x = this.begin.x + frame_span;
            pt1.y = this.begin.y - frame_span / 2;

            start = new Point();
            start.x = pt1.x;
            start.y = pt1.y;

            this.pointArray.push([pt1.x, pt1.y]);
            this.pointArray.push([arx, ary]);

            pt1.x = this.begin.x + frame_span;
            pt1.y = this.begin.y + frame_span / 2;
            this.pointArray.push([pt1.x, pt1.y]);

            pt2 = new Point(this.end.x - frame_span, this.end.y + frame_span / 2);
            this.pointArray.push([pt2.x, pt2.y]);

            arx = this.end.x - frame_span / 2;
            ary = this.end.y;
            this.pointArray.push([arx, ary]);

            pt2.x = this.end.x - frame_span;
            pt2.y = this.end.y - frame_span / 2;
            this.pointArray.push([pt2.x, pt2.y]);
            this.pointArray.push([start.x, start.y]);
        } else if (this.type == 2) {
            arx = this.begin.x;
            ary = this.begin.y + frame_span / 2;

            pt1 = new Point();
            pt1.x = this.begin.x + frame_span / 2;;
            pt1.y = this.begin.y + frame_span;

            start = new Point();
            start.x = pt1.x;
            start.y = pt1.y;

            this.pointArray.push([pt1.x, pt1.y]);
            this.pointArray.push([arx, ary]);

            pt1.x = this.begin.x - frame_span / 2;
            pt1.y = this.begin.y + frame_span;
            this.pointArray.push([pt1.x, pt1.y]);

            pt2 = new Point(this.end.x - frame_span / 2, this.end.y - frame_span);
            this.pointArray.push([pt2.x, pt2.y]);

            arx = this.end.x;
            ary = this.end.y - frame_span / 2;
            this.pointArray.push([arx, ary]);

            pt2.x = this.end.x + frame_span / 2;
            pt2.y = this.end.y - frame_span;
            this.pointArray.push([pt2.x, pt2.y]);
            this.pointArray.push([start.x, start.y]);
        }
    };

    /**
     * 绘制横梃
    */
    this.draw_hmullion = function () {
        //向左箭头
        arx = this.begin.x + frame_span / 2;
        ary = this.begin.y;

        pt1 = new Point();
        pt1.x = this.begin.x + frame_span;
        pt1.y = this.begin.y - frame_span / 2;
        draw_line(pt1.x, pt1.y, arx, ary);

        start = new Point();
        start.x = pt1.x;
        start.y = pt1.y;

        pt1.x = this.begin.x + frame_span;
        pt1.y = this.begin.y + frame_span / 2;
        draw_line(arx, ary, pt1.x, pt1.y);

        pt2 = new Point(this.end.x - frame_span, this.end.y + frame_span / 2);
        draw_line(pt1.x, pt1.y, pt2.x, pt2.y);

        arx = this.end.x - frame_span / 2;
        ary = this.end.y;
        draw_line(pt2.x, pt2.y, arx, ary);

        pt2.x = this.end.x - frame_span;
        pt2.y = this.end.y - frame_span / 2;
        draw_line(arx, ary, pt2.x, pt2.y);
        draw_line(pt2.x, pt2.y, start.x, start.y);
    };


    /**
     * 绘制竖梃
    */
    this.draw_vmullion = function () {
        //向上箭头
        arx = this.begin.x;
        ary = this.begin.y + frame_span / 2;

        pt1 = new Point();
        pt1.x = this.begin.x + frame_span / 2;;
        pt1.y = this.begin.y + frame_span;
        draw_line(pt1.x, pt1.y, arx, ary);

        start = new Point();
        start.x = pt1.x;
        start.y = pt1.y;

        pt1.x = this.begin.x - frame_span / 2;
        pt1.y = this.begin.y + frame_span;
        draw_line(arx, ary, pt1.x, pt1.y);


        pt2 = new Point(this.end.x - frame_span / 2, this.end.y - frame_span);
        draw_line(pt1.x, pt1.y, pt2.x, pt2.y);

        arx = this.end.x;
        ary = this.end.y - frame_span / 2;
        draw_line(pt2.x, pt2.y, arx, ary);

        pt2.x = this.end.x + frame_span / 2;
        pt2.y = this.end.y - frame_span;
        draw_line(arx, ary, pt2.x, pt2.y);
        draw_line(pt2.x, pt2.y, start.x, start.y);
    };
};