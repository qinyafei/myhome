
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