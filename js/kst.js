



/**
 * 绘制水平尺寸标识
*/
function draw_hdimensioning(dimen) {
    theta = 25;
    headlen = 10;
    textlen = 20;

    //1 画起止线
    draw_line(dimen.begin.x, dimen.end.y, dimen.begin.x, dimen.end.y + dimen.span);

    draw_line(dimen.end.x, dimen.end.y, dimen.end.x, dimen.end.y + dimen.span);

    //画向右箭头
    fromX = dimen.begin.x + (dimen.end.x - dimen.begin.x) / 2 + textlen;
    fromY = dimen.begin.y + dimen.span;
    toX = dimen.end.x;
    toY = dimen.begin.y + dimen.span;
    draw_arrow(fromX, fromY, toX, toY, theta, headlen);

    //画向左箭头
    fromX = dimen.begin.x + (dimen.end.x - dimen.begin.x) / 2 - textlen;
    fromY = dimen.begin.y + dimen.span;
    toX = dimen.begin.x;
    toY = dimen.begin.y + dimen.span;

    draw_arrow(fromX, fromY, toX, toY, theta, headlen);

    //绘制字符
    draw_text(dimen.length, fromX, fromY);
}

/**
 * 绘制垂直尺寸标识
*/
function draw_vdimensioning(dimen) {
    theta = 25;
    headlen = 10;
    textlen = 20;

    //1 画起止线
    draw_line(dimen.begin.x, dimen.begin.y, dimen.begin.x + dimen.span, dimen.begin.y);

    draw_line(dimen.end.x, dimen.end.y, dimen.end.x + dimen.span, dimen.end.y);

    //画向上箭头
    fromX = dimen.begin.x + dimen.span;
    fromY = dimen.begin.y + (dimen.end.y - dimen.begin.y) / 2 - textlen;
    toX = dimen.begin.x + dimen.span;
    toY = dimen.begin.y;
    draw_arrow(fromX, fromY, toX, toY, theta, headlen);

    //画向下箭头
    fromX = dimen.begin.x + dimen.span;
    fromY = dimen.begin.y + (dimen.end.y - dimen.begin.y) / 2 + textlen;
    toX = dimen.end.x + dimen.span;
    toY = dimen.end.y;

    draw_arrow(fromX, fromY, toX, toY, theta, headlen);

    //绘制字符
    draw_text(dimen.length, fromX, fromY - textlen);
}

/**
 * 绘制横梃
*/
function draw_hmullion(mullion) {
    theta = 25;
    headlen = 10;
    textlen = 20;

    edge = 100;

    //向左箭头
    fromX = mullion.begin.x + edge;
    fromY = mullion.begin.y;
    toX = mullion.begin.x;
    toY = mullion.begin.y;

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

    mullion.pointArray.push([arrowX, arrowY]);
    mullion.pointArray.push([toX, toY]);

    arrowX = toX + botX;
    arrowY = toY + botY;
    draw_line(toX, toY, arrowX, arrowY);
    mullion.pointArray.push([arrowX, arrowY]);

    //画向右箭头
    fromX = mullion.end.x - edge;
    fromY = mullion.end.y;
    toX = mullion.end.x;
    toY = mullion.end.y;

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
    mullion.pointArray.push([arrowX, arrowY]);
    mullion.pointArray.push([toX, toY]);

    arrowX = toX + botX;
    arrowY = toY + botY;
    draw_line(toX, toY, arrowX, arrowY);
    mullion.pointArray.push([arrowX, arrowY]);

    mullion.pointArray.push(startx, starty);

    draw_line(mullion.begin.x - topX, mullion.begin.y - botY, mullion.end.x + topX, mullion.begin.y - botY);
    draw_line(mullion.begin.x - topX, mullion.end.y + botY, mullion.end.x + topX, mullion.end.y + botY);

    fill_model(mullion.pointArray);
}


/**
 * 绘制竖梃
*/
function draw_vmullion(mullion) {
    theta = 30;
    headlen = 10;
    textlen = 20;

    edge = 100;

    //向上箭头
    fromX = mullion.begin.x;
    fromY = mullion.begin.y + edge;
    toX = mullion.begin.x;
    toY = mullion.begin.y;

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
    mullion.pointArray.push([arrowX, arrowY]);
    mullion.pointArray.push([toX, toY]);

        //保存起始点
        var startx = arrowX;
        var starty = arrowY;

    arrowX = toX + botX;
    arrowY = toY + botY;
    draw_line(toX, toY, arrowX, arrowY);
    mullion.pointArray.push([arrowX, arrowY]);

    //画向右箭头
    fromX = mullion.end.x;
    fromY = mullion.end.y - edge;
    toX = mullion.end.x;
    toY = mullion.end.y;

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
    mullion.pointArray.push([arrowX, arrowY]);
    mullion.pointArray.push([toX, toY]);

    arrowX = toX + botX;
    arrowY = toY + botY;
    draw_line(toX, toY, arrowX, arrowY);
    mullion.pointArray.push([arrowX, arrowY]);

    mullion.pointArray.push(startx, starty);

    //toX <0, boY < 0
    draw_line(mullion.begin.x - topX, mullion.begin.y - botY, mullion.end.x - topX, mullion.end.y + botY);
    draw_line(mullion.begin.x + topX, mullion.begin.y - botY, mullion.end.x + topX, mullion.end.y + botY);

    fill_model(mullion.pointArray);
}

function draw_frame(frame) {
    draw_rect(frame.out_begin.x, frame.out_begin.y, frame.out_end.x - frame.out_begin.x, frame.out_end.y - frame.out_begin.y);

    draw_rect(frame.in_begin.x, frame.in_begin.y, frame.in_end.x - frame.in_begin.x, frame.in_end.y - frame.in_begin.y);
}

/**
 * 选中状态门框绘制
*/
function fill_frame(frame) {

    draw_fill_rect(frame.out_begin.x, frame.out_begin.y, frame.out_end.x - frame.out_begin.x,
        frame.in_begin.y - frame.out_begin.y);

    draw_fill_rect(frame.in_end.x, frame.in_begin.y, frame.out_end.x - frame.in_end.x,
        frame.in_end.y - frame.in_begin.y);

    draw_fill_rect(frame.out_begin.x, frame.in_end.y, frame.out_end.x - frame.out_begin.x,
        frame.out_end.y - frame.in_end.y);

    draw_fill_rect(frame.out_begin.x, frame.in_begin.y, frame.in_begin.x - frame.out_begin.x,
        frame.in_end.y - frame.in_begin.y);

}

/**
 * 选中状态梃绘制
*/
function fill_model(pointArray) {
    obj = new zrender.Polygon({
        shape: {
            points: pointArray
        }
    });

    zr.add(obj)
}

/**
 * 判定点是否在实体框内
*/
function pointInRect(x, y, begin, end) {
    if (x > begin.x && x < end.x && y > begin.y && y < end.y) {
        return true;
    }

    return false;
}