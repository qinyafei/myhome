
/**
 * 显示外框属性
*/

function outFrameProperty(parent) {
    //外观
    labelName = document.createElement("label");
    parent.appendChild(labelName);

    //外观
    //无槛们
    label = document.createElement("label");
    var checkbtn = document.createElement("input");

    //门扇与地面间隙
    label1 = document.createElement("label");
    input1 = document.createElement("input");
    input1.setAttribute("type", "text");

    //门框埋入地下深度 
    label2 = document.createElement("label");
    input2 = document.createElement("input");
    input2.setAttribute("type", "text");

    //单元
    //系列方案
    label3 = document.createElement("label");
    var dlgbtn = document.createElement("input");
    //框边
    //方案
    label4 = document.createElement("label");
    var dlgbtn2 = document.createElement("input");
    //角部连接方式
    label5 = document.createElement("label");
    var combo = document.createElement("input");
    //型材
    //1
    label6 = document.createElement("label");
    var dlgbtn3 = document.createElement("input");
}

/**
 * 显示内扇属性
*/
function winFanProperty(parent) {
    //分格
    labelName = document.createElement("label");
    parent.appendChild(labelName);
    //开启方式
    label = document.createElement("label");
    dlgbtn = document.createElement("input");
    dlgbtn.setAttribute("type", "button");

    //搭接量
    label2 = document.createElement("label");
    parent.appendChild(label2);
    //水平方向
    label3 = document.createElement("label");
    input3 = document.createElement("input");
    input3.setAttribute("type", "text");
    //垂直方向
    label4 = document.createElement("label");
    input4 = document.createElement("input");
    input4.setAttribute("type", "text");

    //扇组合形式
    label5 = document.createElement("label");
    combo = document.createElement("input");

    //重合位置
    label6 = document.createElement("label");
    input6 = document.createElement("input");
    input6.setAttribute("type", "text");
    //尺寸调整
    label7 = document.createElement("label");
    input7 = document.createElement("input");
    input7.setAttribute("type", "text");

    //五金
    labelName = document.createElement("label");
    parent.appendChild(labelName);
    //五金件组
    label = document.createElement("label");
    dlgbtn2 = document.createElement("input");
    dlgbtn2.setAttribute("type", "button");

    //铝滑轨
    labelName = document.createElement("label");
    parent.appendChild(labelName);
    //铝滑轨方案
    label = document.createElement("label");
    dlgbtn3 = document.createElement("input");
    dlgbtn3.setAttribute("type", "button");

}


/**
 * 显示梃属性
*/
function mullionProperty(parent) {
    //中梃连接形式
    labelName = document.createElement("label");
    parent.appendChild(labelName);
    //左上
    label = document.createElement("label");
    combox = document.createElement("combox");

    //右下
    label2 = document.createElement("label");
    parent.appendChild(label2);
    combox = document.createElement("combox");

    //中梃材料
    label4 = document.createElement("label");
    parent.appendChild(label4);
    //型材
    label5 = document.createElement("label");
    btndlg2 = document.createElement("input");
    btndlg2.setAttribute("type", "button");
}

/**
 * 显示拼接属性
*/
function jointProperty(parent) {
    //插入墙体深度
    labelName = document.createElement("label");
    parent.appendChild(labelName);
    //型材
    label2 = document.createElement("label");
    parent.appendChild(label2);
    //左上
    label3 = document.createElement("label");
    input3 = document.createElement("input");
    input3.setAttribute("type", "text");
    //右下
    label4 = document.createElement("label");
    input4 = document.createElement("input");
    input4.setAttribute("type", "text");

    //钢衬
    label5 = document.createElement("label");
    parent.appendChild(label5);
    //左上
    label6 = document.createElement("label");
    input6 = document.createElement("input");
    input6.setAttribute("type", "text");
    //右下
    label7 = document.createElement("label");
    input7 = document.createElement("input");
    input7.setAttribute("type", "text");

    //物料
    label8 = document.createElement("label");
    parent.appendChild(label8);

    label9 = document.createElement("label");
    dlgbtn3 = document.createElement("input");
    dlgbtn3.setAttribute("type", "button");

    //型材尺寸
    label10 = document.createElement("label");
    parent.appendChild(label10);

    //左下侧偏移
    label11 = document.createElement("label");
    input11 = document.createElement("input");
    input11.setAttribute("type", "text");
    //右上侧偏移
    label12 = document.createElement("label");
    input12 = document.createElement("input");
    input12.setAttribute("type", "text");

    //自动配置
    label13 = document.createElement("label");
    checkbox = document.createElement("input");

    //钢衬
    label14 = document.createElement("label");
    input14 = document.createElement("input");
    input14.setAttribute("type", "text");

    //拼接螺栓
    label15 = document.createElement("label");
    dlgbtn4 = document.createElement("input");
    dlgbtn4.setAttribute("type", "button");

    //贯通否
    label16 = document.createElement("label");
    checkbox2 = document.createElement("input");

    //拼接螺栓(右/上)
    label17 = document.createElement("label");
    dlgbtn5 = document.createElement("input");
    dlgbtn5.setAttribute("type", "button");

}

/**
 * 显示扇边属性
*/
function jointProperty(parent) {
    //扇边
    labelName = document.createElement("label");
    parent.appendChild(labelName);
    //方案
    label2 = document.createElement("label");
    dlgbtn = document.createElement("input");
    dlgbtn.setAttribute("type", "button");

    //角部连接方式
    label22 = document.createElement("label");
    combox = document.createElement("input");

    //型材
    label3 = document.createElement("label");
    parent.appendChild(label3);
    //1
    label4 = document.createElement("label");
    dlgbtn2 = document.createElement("input");
    dlgbtn2.setAttribute("type", "button");
    //2
    label5 = document.createElement("label");
    dlgbtn3 = document.createElement("input");
    dlgbtn3.setAttribute("type", "button");

    //左侧扇边仅有
    //其他
    label6 = document.createElement("label");
    parent.appendChild(label6);
    //右侧
    label7 = document.createElement("label");
    dlgbtn3 = document.createElement("input");
    dlgbtn3.setAttribute("type", "button");

    //纱扇
    label8 = document.createElement("label");
    parent.appendChild(label7);
    //纱扇方案
    label9 = document.createElement("label");
    dlgbtn4 = document.createElement("input");
    dlgbtn4.setAttribute("type", "button");

    //纱扇尺寸调整量
    label10 = document.createElement("label");
    parent.appendChild(label10);
    //水平方向
    label11 = document.createElement("label");
    input11 = document.createElement("input");
    input11.setAttribute("type", "text");
    //垂直方向
    label12 = document.createElement("label");
    input12 = document.createElement("input");
    input12.setAttribute("type", "text");

}