/*
 * @File: 
 * @Brief: 开扇
 * @Version: 1.0.0
 * @Author: xxx
 * @Date: 2020-10-10 07:51:10
 */

/**
 * 开扇一般由：外框/单扇边/玻璃组成
 * 注意：有可能是多边形
*/
WindowFan = function () {
    //外框 windowframe
    this.frame = new WindowFrame();
    //单扇边数组
    this.singleFans = [];

    //玻璃数组
    this.glasses = [];

    this.addGlass = function (glass) {
        this.glasses.push(glass);
    }

    this.delGlass = function (glass) {

    }
};