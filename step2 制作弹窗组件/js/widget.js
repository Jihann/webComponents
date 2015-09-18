/**
 * Created by Jihann on 2015/9/17.
 * Widget
 * 抽象类
 */
define(['jquery'], function(jQuery) {
   function Widget() {
       this.boundingBox = null; //属性，最外层容器
   }
   Widget.prototype = {
       //自定义事件
       on : function(type, handler) { //监听事件
           if (typeof this.handlers[type] === 'undefined') {
               this.handlers[type] = [];
           }
           this.handlers[type].push(handler);
           return this;
       },
       fire : function(type, data){
           if (this.handlers[type] instanceof Array) {
               var handlers = this.handlers[type];
               for(var i = 0, len = handlers.length; i < len; i++){
                   handlers[i](data);
               }
           };
       },
       renderUI : function() { //接口，监听dom节点

       },
       bindUI : function() { //接口，监听事件

       },
       syncUI : function()  { //接口，初始化组件属性

       },
       render : function(container) {	//方法：渲染组件
           this.renderUI();
           this.handlers={};
           this.bindUI();
           this.syncUI();
           jQuery(container || document.body).append(this.boundingBox);
       },
       destructor : function() { //接口：销毁前的处理函数

       },
       destory : function(){	//方法：渲染组件
           this.destructor();
           this.boundingBox.off();
           this.boundingBox.remove();
       }
   };
   return {
       Widget : Widget
   }
});