** 属性
1 外框
--------下边框独有-----------
外观
    无槛们  bool
    门扇与地面间隙 int
    门框埋入地下深度 int

---------上下皆有-------------
单元
    系列方案  可选dialog

框边 
     方案   可选dialog
     角部连接方式   combox
型材
    1  可选dialog
    2   >
    3   >
    4   >
-----------------------


2 内扇
分格
     开启方式   可选dialog

搭接量
     水平方向  int
     垂直方向   int
-----开过扇独有---------
扇组合形式  combox
重合位置
尺寸调整
---------------

五金
     五金件组   可选dialog
铝滑轨
     铝滑轨方案  可选dialog

3 梃
中梃连接形式
     左上  combox
     右下
中梃材料
     型材  可选dialog

4 拼接
插入墙体深度
     型材
         左上  int
         右下
    钢衬
         左上  int
         右下
物料
    型材    可选dialog
    型材尺寸
         左下侧偏移  int
         右上侧偏移
 
    自动配置  bool
    钢衬  不可变
    拼接螺栓   可选dialog
    贯通否   bool
    拼接螺栓(右/上) 可选dialog


5 扇边
扇边
     方案   可选dialog
     角部连接方式   combox
型材
    1  可选dialog
    2   >
    3   >
    4   >
    ----左侧扇边仅有---
其他
    右侧  可选dialog
    ---------
纱扇
    纱扇方案  可选dialog
纱扇尺寸调整量
    水平方向   int
    垂直方向  