;(function(window, document, undefined) {
    "use strict";
    function Slider(options) {
        var _this = this;

        this.settings = {
            exposeWidth : 160
        }

        extend(this.settings, options);

        this.doc = document;
        this.box = this.doc.getElementById("slider"); //最外层容器对象
        this.imgs = this.box.getElementsByTagName("img"); //当前容器下面的img数组对象
        this.imgLen = this.imgs.length; //图片集合
        this.boxWidth = ""; //容器宽度
        this.imgWidth = "";// 单张图片的宽度
        this.translate = ""; //计算每道门打开时应该移动的距离

        this.init();

        //为每道门绑定事件
        for (var i = 0, len = this.imgs.length; i < len; i++) {
            //使用立即调用的函数表达式，为了获取不同的i值
            var _this = this;
            (function(i) {
                //会出现闭包this指针的问题，应该缓存上级this
                _this.imgs[i].onmouseover = function() {
                    _this.setImgsPos(); //复位
                    //打开门
                    for (var j = 1; j <= i; j++) {
                        _this.imgs[j].style.left = parseInt(_this.imgs[j].style.left, 10) - _this.translate + 'px';
                    }
                };
            })(i);
        }
    }
    Slider.prototype = {
        init : function() {
            var self = this;
            this.imgWidth = this.imgs[0].offsetWidth;
            this.boxWidth = this.imgWidth + (this.imgLen - 1) * this.settings.exposeWidth;
            this.box.style.width = this.boxWidth + 'px';
            this.translate = this.imgWidth - this.settings.exposeWidth ;
            self.setImgsPos();
        },
        setImgsPos : function() {
            var self = this;
            for (var i = 1, len = self.imgLen; i < len; i++) {
                self.imgs[i].style.left = self.imgWidth + self.settings.exposeWidth * (i - 1) + 'px';
            }
        }
    };

    var extend = function(target, options) {
        for(var p in options) {
            if(options.hasOwnProperty(p) || target.hasOwnProperty(p)) {
                target[p] = options[p];
            }
        }
    };
    window["Slider"] = Slider;
})(window, document, undefined);
