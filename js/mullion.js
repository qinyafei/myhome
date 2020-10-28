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
        if (type == 1) {
            lt = this.pointArray[2];
            rb = this.pointArray[5];
            if (pointInRect(x, y, lt, rb)) {
                fill_model(this.pointArray);
                return true;
            }
        } else if (type == 2) {
            lt = this.pointArray[0];
            rb = this.pointArray[3];
            if (pointInRect(x, y, lt, rb)) {
                fill_model(this.pointArray);
                return true;
            }
        }

        return false;
    };

    this.draw = function() {
        if (this.type == 1) {
            this.draw_hmullion();
        } else if (this.type == 2) {
            this.draw_vmullion();
        }
    };


    /**
     * 绘制横梃
    */
    this.draw_hmullion = function () {
        theta = 25;
        headlen = 10;
        textlen = 20;

        edge = 100;

        //向左箭头
        fromX = this.begin.x + edge;
        fromY = this.begin.y;
        toX = this.begin.x;
        toY = this.begin.y;

        // 计算各角度和对应的P2,P3坐标
        var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
            angle1 = (angle + theta) * Math.PI / 180,
            angle2 = (angle - theta) * Math.PI / 180,
            topX = headlen * Math.cos(angle1),
            topY = headlen * Math.sin(angle1),
            botX = headlen * Math.cos(angle2),
            botY = headlen * Math.sin(angle2);

        var arrowX = toX + topX,
            arrowY = toY + topY;
        draw_line(arrowX, arrowY, toX, toY);
        //保存起始点
        var startx = arrowX;
        var starty = arrowY;

        this.pointArray.push([arrowX, arrowY]);
        this.pointArray.push([toX, toY]);

        arrowX = toX + botX;
        arrowY = toY + botY;
        draw_line(toX, toY, arrowX, arrowY);
        this.pointArray.push([arrowX, arrowY]);

        //画向右箭头
        fromX = this.end.x - edge;
        fromY = this.end.y;
        toX = this.end.x;
        toY = this.end.y;

        var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
            angle1 = (angle + theta) * Math.PI / 180,
            angle2 = (angle - theta) * Math.PI / 180,
            topX = headlen * Math.cos(angle1),
            topY = headlen * Math.sin(angle1),
            botX = headlen * Math.cos(angle2),
            botY = headlen * Math.sin(angle2);

        var arrowX = toX + topX,
            arrowY = toY + topY;
        draw_line(arrowX, arrowY, toX, toY);
        this.pointArray.push([arrowX, arrowY]);
        this.pointArray.push([toX, toY]);

        arrowX = toX + botX;
        arrowY = toY + botY;
        draw_line(toX, toY, arrowX, arrowY);
        this.pointArray.push([arrowX, arrowY]);

        this.pointArray.push(startx, starty);

        draw_line(this.begin.x - topX, this.begin.y - botY, this.end.x + topX, this.begin.y - botY);
        draw_line(this.begin.x - topX, this.end.y + botY, this.end.x + topX, this.end.y + botY);

        fill_model(this.pointArray);
    };


    /**
     * 绘制竖梃
    */
    this.draw_vmullion = function () {
        theta = 30;
        headlen = 10;
        textlen = 20;

        edge = 100;

        //向上箭头
        fromX = this.begin.x;
        fromY = this.begin.y + edge;
        toX = this.begin.x;
        toY = this.begin.y;

        // 计算各角度和对应的P2,P3坐标
        var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
            angle1 = (angle + theta) * Math.PI / 180,
            angle2 = (angle - theta) * Math.PI / 180,
            topX = headlen * Math.cos(angle1),
            topY = headlen * Math.sin(angle1),
            botX = headlen * Math.cos(angle2),
            botY = headlen * Math.sin(angle2);

        var arrowX = toX + topX,
            arrowY = toY + topY;
        draw_line(arrowX, arrowY, toX, toY);
        this.pointArray.push([arrowX, arrowY]);
        this.pointArray.push([toX, toY]);

        //保存起始点
        var startx = arrowX;
        var starty = arrowY;

        arrowX = toX + botX;
        arrowY = toY + botY;
        draw_line(toX, toY, arrowX, arrowY);
        this.pointArray.push([arrowX, arrowY]);

        //画向右箭头
        fromX = this.end.x;
        fromY = this.end.y - edge;
        toX = this.end.x;
        toY = this.end.y;

        var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
            angle1 = (angle + theta) * Math.PI / 180,
            angle2 = (angle - theta) * Math.PI / 180,
            topX = headlen * Math.cos(angle1),
            topY = headlen * Math.sin(angle1),
            botX = headlen * Math.cos(angle2),
            botY = headlen * Math.sin(angle2);

        var arrowX = toX + topX,
            arrowY = toY + topY;
        draw_line(arrowX, arrowY, toX, toY);
        this.pointArray.push([arrowX, arrowY]);
        this.pointArray.push([toX, toY]);

        arrowX = toX + botX;
        arrowY = toY + botY;
        draw_line(toX, toY, arrowX, arrowY);
        this.pointArray.push([arrowX, arrowY]);

        this.pointArray.push(startx, starty);

        //toX <0, boY < 0
        draw_line(this.begin.x - topX, this.begin.y - botY, this.end.x - topX, this.end.y + botY);
        draw_line(this.begin.x + topX, this.begin.y - botY, this.end.x + topX, this.end.y + botY);

    };
};