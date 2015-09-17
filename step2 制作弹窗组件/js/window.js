/**
 * Created by Jihann on 2015/9/17.
 */
define(['jquery', 'jqueryUI'], function($, $UI) {
   function Window() {
        this.options = {
            width : 500,
            height : 300,
            title: "消息提示",
            msg : "",
            hasCloseBtn : false,
            hasMask : true,
            isDraggable : true,
            dragHandle : null,
            skinClassName : null,
            text4AlertBtn : "确定",
            handler4AlertBtn : null,
            handler4CloseBtn : null
        };
        this.handlers = {

        };
   }
   Window.prototype = {
       alert: function(options) {
           var CFG = $.extend(this.options, options);

           var boundingBox = $('<div class="window_boundingBox">' +
               '<div class="window_header">' + CFG.title + '</div>' +
               '<div class="window_body">' + CFG.msg + '</div>' +
               '<div class="window_footer">' +
                    '<input class="window_alertBtn" type="button" value="' + CFG.text4AlertBtn + '">' +
               '</div>' +
           '</div>');
           var btn = boundingBox.find(".window_alertBtn");
           var mask = null;
           var that = this;
           if (CFG.hasMask) {
               mask = $('<div class="window_mask"></div>');
               mask.appendTo("body");
           }

           boundingBox.appendTo("body");
           btn.on('click', function() {
               boundingBox.remove();
               mask && mask.remove();
               that.fire("alert");
           });

           boundingBox.css({
               width : CFG.width + 'px',
               height : CFG.height + 'px',
               left :(CFG.x || (window.innerWidth - CFG.width) /2) + 'px',
               top :(CFG.y || (window.innerHeight - CFG.height) /2) + 'px'
           });

           if (CFG.hasCloseBtn) {
               var closeBtn = $('<span class="window_closeBtn">X</span>');
               closeBtn.appendTo(boundingBox);
               closeBtn.on('click', function() {
                   boundingBox.remove();
                   mask && mask.remove();
                   that.fire("close");
               });
           }

           if (CFG.skinClassName) {
               boundingBox.addClass(CFG.skinClassName);
           }

           //拖动
           if (CFG.isDraggable) {
               if (CFG.dragHandle) {
                   boundingBox.draggable({handle : CFG.dragHandle});
               }else{
                   boundingBox.draggable();
               }
           }

           if (CFG.handler4AlertBtn) {
               this.on('alert', CFG.handler4AlertBtn);
           };
           if (CFG.handler4CloseBtn) {
               this.on('close', CFG.handler4CloseBtn);
           };
           //用于实现连缀语法
           return this;
       },
       confirm: function() {

       },
       prompt: function() {

       },
       //自定义事件
       on : function(type, handler) {
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
       }
   }
   return {
       Window: Window
   }
});
