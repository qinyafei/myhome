
/**
 * 绘制直线
*/
function draw_line(x0, y0, x1, y1) {
    line = new zrender.Line({
        rectHover: true,
        shape: {
            x1: x0,
            y1: y0,
            x2: x1,
            y2: y1
        },
        style: {
            lineWidth: 1,
            stroke: stroke
        },
    });

    zr.add(line);
}

/**
 * brief:绘制箭头
 * return: 
*/
function draw_arrow(fromx, fromy, tox, toy, theta, headlen) {
    color = '#000';

    // 计算各角度和对应的P2,P3坐标
    var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
        angle1 = (angle + theta) * Math.PI / 180,
        angle2 = (angle - theta) * Math.PI / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);

    draw_line(fromX, fromY, toX, toY);

    var arrowX = toX + topX,
        arrowY = toY + topY;
    draw_line(arrowX, arrowY, toX, toY);

    arrowX = toX + botX;
    arrowY = toY + botY;
    draw_line(toX, toY, arrowX, arrowY);
}


function draw_rect(x, y, width, height) {
    obj = new zrender.Rect({
        rectHover: true,
        shape: {
            r: 0,
            x: x,
            y: y,
            width: width,
            height: height
        },
        style: {
            lineWidth: 1,
            stroke: stroke,
            fill: 'rgba(255,255,255,0)'
        }
    });

    zr.add(obj);
}

/**
 * 绘制填充矩形框
*/
function draw_fill_rect(x, y, width, height) {
    var rect = new zrender.Rect({
        style: {
            fill: 'red',      //填充颜色
            stroke: 'none'    //描边颜色
        },
        shape: {
            x: x,           //x,y代表坐标
            y: y,
            width: width,
            height: height,
           // r: [3]            //圆角
        },
        z: 1                   //层次，大的会覆盖小的
    });

    zr.add(rect);
}


/**
 * 绘制文本
*/
function draw_text(str, x, y) {
    var countText = new zrender.Text({
        zlevel: 1,
        style: {
            text: str,
            x: x,
            y: y - 3,
            textFont: 'normal 12px verdana',
        }
    });
    zr.add(countText);
}