
//基础绘图
BasicFrame = function () {
    this.begin = new Point();
    this.end = new Point();
    this.divides = [];
    this.corners = [];

    this.addDivide = function (divide) {
        this.divides.push(divide);
    }

    this.addCorner = function (corner) {
        this.corners.push(corner);
    }

    /**
     * 绘制
    */
    this.draw = function () {
        var x0 = this.begin.x;
        var y0 = this.begin.y;
        var width = this.end.x - this.begin.x;
        var height = this.end.y - this.begin.y;
        draw_rect(x0, y0, width, height);

        //画水平尺寸标识
        dimen = new Dimensioning();
        dimen.begin.x = x0;
        dimen.begin.y = y0 + height;
        dimen.end.x = x0 + width;
        dimen.end.y = y0 + height;
        dimen.length = 1600;
        dimen.span = 20;

        draw_hdimensioning(dimen);

        //画垂直尺寸标识
        dimen2 = new Dimensioning();
        dimen2.begin.x = x0 + width;
        dimen2.begin.y = y0;
        dimen2.end.x = x0 + width;
        dimen2.end.y = y0 + height;
        dimen2.length = 1600;
        dimen2.span = 20;
        draw_vdimensioning(dimen2);

        this.divides.map(function(value,index){
            draw_line(value.begin.x, value.begin.y, value.end.x, value.end.y);
        });

        this.corners.map(function(value,index){
            draw_line(value.ldivide.begin.x, value.ldivide.begin.y, value.ldivide.end.x, value.ldivide.end.y);
            draw_line(value.rdivide.begin.x, value.rdivide.begin.y, value.rdivide.end.x, value.rdivide.end.y);
        });
    };

    /**
     * 序列化成json串
    */
    this.serialize = function () {

    };

};


function init_basic() {
    basicfrm = new BasicFrame();
    basicfrm.begin.x = 100;
    basicfrm.begin.y = 100;
    basicfrm.end.x = 700;
    basicfrm.end.y = 500;

    cor = new Corner();
    cor.ldivide.begin.x = 200;
    cor.ldivide.begin.y = basicfrm.begin.y;
    cor.ldivide.end.x = 200;
    cor.ldivide.end.y = basicfrm.end.y;

    cor.rdivide.begin.x = 220;
    cor.rdivide.begin.y = basicfrm.begin.y;
    cor.rdivide.end.x = 220;
    cor.rdivide.end.y = basicfrm.end.y;
    basicfrm.addCorner(cor);

    divi = new DivideLine()
    divi.begin.x = 600;
    divi.begin.y = basicfrm.begin.y;
    divi.end.x = 600;
    divi.end.y = basicfrm.end.y;
    basicfrm.addDivide(divi);

    basicfrm.draw();
}
