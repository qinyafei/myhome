



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
 * 选中状态门框绘制
*/
function fill_frame(frame) {
    if (cur_selector != undefined) {
        cur_selector.map(function (value, index) {
            zr.remove(value)
        });
    }

    rc1 = fill_rect(frame.out_begin.x, frame.out_begin.y, frame.out_end.x - frame.out_begin.x,
        frame.in_begin.y - frame.out_begin.y);
    cur_selector.push(rc1);

    rc2 = fill_rect(frame.in_end.x, frame.in_begin.y, frame.out_end.x - frame.in_end.x,
        frame.in_end.y - frame.in_begin.y);
    cur_selector.push(rc2);

    rc3 = fill_rect(frame.out_begin.x, frame.in_end.y, frame.out_end.x - frame.out_begin.x,
        frame.out_end.y - frame.in_end.y);
    cur_selector.push(rc3);

    rc4 = fill_rect(frame.out_begin.x, frame.in_begin.y, frame.in_begin.x - frame.out_begin.x,
        frame.in_end.y - frame.in_begin.y);
    cur_selector.push(rc4);
}

/**
 * 选中状态梃绘制
*/
function fill_model(pointArray) {
    if (cur_selector != undefined) {
        cur_selector.map(function (value, index) {
            zr.remove(value)
        });
    }

    obj = new zrender.Polygon({
        shape: {
            points: pointArray
        },
        style:{ fill:'#708090' }
    });

    zr.add(obj)

    cur_selector.push(obj);
}


/**
 * 填充矩形框
*/
function fill_rect(x, y, width, height) {
    var rect = new zrender.Rect({
        style: {
            fill: '#708090',      //填充颜色
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
    return rect;
}