var zr;
var curType = "move"; //保存当前绘图状态
var main; //绘图区域
var obj; //当前绘制的对象
var points = []; //绘制曲线的点集
var lineWidth = 1; //图形边的宽度
var stroke = "#000000"; //边的颜色
var fill = "#00000000"; //填充颜色
var n = 3; //正多边形边数
var objHistory = [];//保存历史记录，用于撤销操作

window.onload = function () {

    //初始化
    main = document.getElementById("main1");
    zr = zrender.init(main);

    //
    init_design();

    //设置绘图类型按钮点击事件
    $("#type-group button").click(function () {
        curType = this.getAttribute("data");
        //移除原有选中效果
        $("#type-group button").each(function () {
            $(this).removeClass("active");
        });
        $(this).addClass("active");
        if (curType == "move") {
            var objs = zr.storage._roots;
            if (objs) {
                for (let i = 0; i < objs.length; i++) {
                    objs[i].draggable = true;
                }
            }
        } else {
            var objs = zr.storage._roots;
            if (objs) {
                for (let i = 0; i < objs.length; i++) {
                    objs[i].draggable = false;
                }
            }
        }
    });

    
    //通过鼠标移动绘制图形
    main.onmousedown = function (e1) {
        var x0 = e1.offsetX;
        var y0 = e1.offsetY;
        lineWidth = document.getElementById("lineWidth").value;
        stroke = document.getElementById("stroke").value;
        fill = document.getElementById("fill").value;
        main.onmousemove = function (e2) {
            var x1 = e2.offsetX;
            var y1 = e2.offsetY;
            //移除当前图形，重新绘制
            if (obj) {
                zr.remove(obj);
            }
            drawing(x0, y0, x1, y1, lineWidth, stroke, fill);
        }

        //松开鼠标结束本次画图
        main.onmouseup = function () {
            main.onmousemove = null;
            drawing(x0, y0);
            /*
            points = [];
            if (obj) {
                objHistory.push(zr.storage._displayList.slice());
                obj = null;
            }
            */
        }
    }
    

    //图片拖拽上传
    main.ondragover = function (e) {
        e.preventDefault();
    }
    main.ondrop = function (e) {
        e.preventDefault();
        var f = e.dataTransfer.files[0];//获取到第一个上传的文件对象
        var fr = new FileReader();//实例FileReader对象
        fr.readAsDataURL(f);//把上传的文件对象转换成url
        fr.onload = function (e) {
            obj = new zrender.Image({
                draggable: true,
                style: {
                    x: 100,
                    y: 100,
                    width: 100,
                    height: 100,
                    image: e.currentTarget.result
                }
            });
            zr.add(obj);
        }
    }
}

/**
 * 绘制图形
 * @param {*} x0 绘图初始x坐标
 * @param {*} y0 绘图初始y坐标
 * @param {*} x1 绘图当前鼠标x坐标
 * @param {*} y1 绘图当前鼠标y坐标
 * @param {*} lineWidth 图形线宽
 * @param {*} stroke 图形颜色
 */
function drawing(x0, y0, x1, y1) {
    switch (curType) {
        case "hmullion"://
            ret = design.probeHorEdge(x0, y0);
            mul = new Mullion();
            mul.begin.x = ret[0];
            mul.begin.y = y0;
            mul.end.x = ret[1];
            mul.end.y = y0;
            mul.type = 1;
            design.addMullion(mul);
            design.refresh();
            break;
        case "vmullion"://mullion
            ret = design.probeVerEdge(x0, y0);
            mul = new Mullion();
            mul.begin.x = x0;
            mul.begin.y = ret[0];
            mul.end.x = x0;
            mul.end.y = ret[1];
            mul.type = 2;
            design.addMullion(mul);
            design.refresh();
            break;
        case "hjoint":
            var r = Math.sqrt(Math.pow(x1 - x0, 2), Math.pow(y1 - y0, 2));
            obj = new zrender.Circle({
                rectHover: true,
                shape: {
                    cx: x0,
                    cy: y0,
                    r: r
                },
                style: {
                    lineWidth: lineWidth,
                    stroke: stroke,
                    fill: fill
                }
            });
            break;
        case "vjoint":
            obj = new zrender.Rect({
                rectHover: true,
                shape: {
                    r: 0,
                    x: x0,
                    y: y0,
                    width: x1 - x0,
                    height: y1 - y0
                },
                style: {
                    lineWidth: lineWidth,
                    stroke: stroke,
                    fill: fill
                }
            });
            break;
        case "isogon":
            var r = Math.sqrt(Math.pow(x1 - x0, 2), Math.pow(y1 - y0, 2));
            obj = new zrender.Isogon({
                rectHover: true,
                shape: {
                    x: x0,
                    y: y0,
                    r: r,
                    n: n
                },
                style: {
                    lineWidth: lineWidth,
                    stroke: stroke,
                    fill: fill
                }
            });
            break;
        default:
            break;
    }
    if (obj) {
        zr.add(obj);

    }
}

/**
 * 清除所有内容
 */
function clearAll() {
    zr.clear();
}

function undo() {
    zr.clear();
    zr = zrender.init(main);
    objHistory.pop();
    if (objHistory.length > 0) {
        var objs = objHistory[objHistory.length - 1];
        for (let i = 0; i < objs.length; i++) {
            zr.add(objs[i]);
        }
    }
}