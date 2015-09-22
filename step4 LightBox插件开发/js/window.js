/**
 * Created by Jihann on 2015/9/17.
 */
define(['widget', 'jquery', 'jqueryUI'], function(widget, $, $UI) {
   function Window() {
        this.settings = {
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
            text4ConfirmBtn : "确定",
            text4CancelBtn : "取消",
            handler4AlertBtn : null,
            handler4CloseBtn : null,
            handler4ConfirmBtn : null,
            handler4CancelBtn : null
        };
   }
   Window.prototype = $.extend({}, new widget.Widget(), {
       renderUI : function() {
           var footerContent = '';
           switch(this.settings.winType){
               case "alert" :
                   footerContent = '<input class="window_alertBtn" type="button" value="'
                   + this.settings.text4AlertBtn + '">';
                   break;
               case "confirm" :
                   footerContent = '<input type="button" value="' +
                   this.settings.text4ConfirmBtn + '" class="window_confirmBtn"><input type="button" value="' +
                   this.settings.text4CancelBtn + '" class="window_cancelBtn">';
                   break;
           }
           this.boundingBox = $(
               '<div class="window_boundingBox">' +
                    '<div class="window_body">' + this.settings.msg + '</div>' +
                '</div>');
           if (this.settings.winType !== "common") {
               this.boundingBox.prepend('<div class="window_header">' +  this.settings.title + '</div>');
               this.boundingBox.append('<div class="window_footer">' + footerContent + '</div>');
           }
           if (this.settings.hasMask) {
               this._mask = $('<div class="window_mask"></div>');
               this._mask.appendTo("body");
           }

           if (this.settings.hasCloseBtn) {
               var closeBtn = $('<span class="window_closeBtn">X</span>');
               this.boundingBox.append(closeBtn);
           }

           this.boundingBox.appendTo(document.body);
       },
       bindUI : function() {
           var that = this;
           this.boundingBox.delegate(".window_alertBtn", "click", function() {
               that.fire("alert");
               that.destory();
           }).delegate(".window_closeBtn", "click", function() {
               that.fire("close");
               that.destory();
           }).delegate(".window_confirmBtn", "click", function(){
               that.fire('confirm');
               that.destory();
           }).delegate(".window_cancelBtn", "click", function(){
               that.fire('cancel');
               that.destory();
           });

           if (this.settings.handler4AlertBtn) {
               that.on('alert', this.settings.handler4AlertBtn);
           };

           if (this.settings.handler4CloseBtn) {
               that.on('close', this.settings.handler4CloseBtn);
           };

           if (this.settings.handler4ConfirmBtn) {
               that.on('confirm', this.settings.handler4ConfirmBtn);
           };

           if (this.settings.handler4CancelBtn) {
               that.on('cancel', this.settings.handler4CancelBtn);
           };
       },
       syncUI : function() { //init初始化参数
           this.boundingBox.css({
               width : this.settings.width + 'px',
               height : this.settings.height + 'px',
               left :(this.settings.x || (window.innerWidth - this.settings.width) /2) + 'px',
               top :(this.settings.y || (window.innerHeight - this.settings.height) /2) + 'px'
           });

           if (this.settings.skinClassName) {
               this.boundingBox.addClass(this.settings.skinClassName);
           }

           if (this.settings.isDraggable) { //拖动
               if (this.settings.dragHandle) {
                   this.boundingBox.draggable({handle : this.settings.dragHandle});
               }else{
                   this.boundingBox.draggable();
               }
           }
       },
       destructor : function() {
           this._mask && this._mask.remove();
       },
       alert : function(options) {
           $.extend(this.settings, options, {winType :'alert'});
           this.render();
           return this;
       },
       confirm: function(options) {
           $.extend(this.settings, options, {winType :'confirm'});
           this.render();
           return this;
       },
       prompt: function() {},
       common: function(options) {
           $.extend(this.settings, options, {winType :'common'});
           this.render();
           return this;
       }
   });
   return {
       Window: Window
   }
});
