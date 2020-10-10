



/**
 * 绘制水平尺寸标识
*/
function draw_hdimensioning(dimen) {
    theta = 25;
    headlen = 10;
    textlen = 20;

    //1 画起止线
    leftline = draw_line(dimen.begin.x, dimen.end.y, dimen.begin.x, dimen.end.y + dimen.span);
    zr.add(leftline);

    rightline = draw_line(dimen.end.x, dimen.end.y, dimen.end.x, dimen.end.y + dimen.span);
    zr.add(rightline);

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
    topline = draw_line(dimen.begin.x, dimen.begin.y, dimen.begin.x + dimen.span, dimen.begin.y);
    zr.add(topline);

    botline = draw_line(dimen.end.x, dimen.end.y, dimen.end.x + dimen.span, dimen.end.y);
    zr.add(botline);

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


function draw_hmullion(mullion) {
    theta = 25;
    headlen = 10;
    textlen = 20;

    edge = 100;
    left_edge = 0;
    right_edge = 0;

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

    left_edge = topX;

    var arrowX = toX + topX,
        arrowY = toY + topY;
    line2 = draw_line(arrowX, arrowY, toX, toY);
    zr.add(line2);

    arrowX = toX + botX;
    arrowY = toY + botY;
    line3 = draw_line(toX, toY, arrowX, arrowY);
    zr.add(line3);


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

    right_edge = topX;

    var arrowX = toX + topX,
        arrowY = toY + topY;
    line2 = draw_line(arrowX, arrowY, toX, toY);
    zr.add(line2);

    arrowX = toX + botX;
    arrowY = toY + botY;
    line3 = draw_line(toX, toY, arrowX, arrowY);
    zr.add(line3);

    line4 = draw_line(mullion.begin.x - topX, mullion.begin.y - botY, mullion.end.x + topX, mullion.begin.y - botY);
    zr.add(line4);
    line5 = draw_line(mullion.begin.x - topX, mullion.end.y + botY, mullion.end.x + topX, mullion.end.y + botY);
    zr.add(line5);
}
