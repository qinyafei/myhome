/**
 * 绘制算法
*/


/**
 * 判定点是否在实体框内
*/
function pointInRect(x, y, begin, end) {
    if (x > begin.x && x < end.x && y > begin.y && y < end.y) {
        return true;
    }

    return false;
}
