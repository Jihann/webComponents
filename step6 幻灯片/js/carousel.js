/**
 * Created by Jihann on 2015/9/20.
 */
;(function($, window, document, undefined){
    var Carousel = function(poster) {
        this.settings = {
            width : 1000, //幻灯片宽度
            height : 270,   //幻灯片高度
            posterWidth : 640,  //幻灯片第一帧宽度
            posterHeight : 270, //幻灯片第一帧高度
            scale : 0.9,    //记录显示比例关系
            verticalAlign : "middle",
            speed : 500
        };

        this.poster = poster;
        this.posterItemMain = poster.find("ul.poster-list");
        this.nextBtn = poster.find("div.poster-next-btn");
        this.prevBtn = poster.find("div.poster-prev-btn");

        this.posterItems = poster.find("li.poster-item");
        this.posterFirstItem = this.posterItems.eq(0);



        $.extend(this.settings, this.getSettings() || {});

        this.setSettings();
        this.setPosterPos();
    };
    Carousel.prototype = {
        //获取人工配置参数
        getSettings : function() {
            var settings = this.poster.attr("data-settings");
            if (settings && settings !== "") {
                return $.parseJSON(settings);
            } else {
                return {};
            }
        },
        //设置默认参数去控制基本的宽度和高度
        setSettings : function() {
            this.poster.css({
                width : this.settings.width,
                height : this.settings.height
            });
            this.posterItemMain.css({
                width : this.settings.width,
                height : this.settings.height
            });
            //计算上下切换按钮的宽度
            var w = (this.settings.width - this.settings.posterWidth) / 2;
            var size = this.posterItems.size();
            this.nextBtn.css({
                width : w,
                height : this.settings.height,
                zIndex : Math.ceil(size / 2)
            });
            this.prevBtn.css({
                width : w,
                height : this.settings.height,
                zIndex : Math.ceil(size / 2)
            });
            //第一帧位于上下切换按钮的中间
            this.posterFirstItem.css({
                width : this.settings.posterWidth,
                height : this.settings.posterHeight,
                left : w,
                zIndex : Math.floor(size / 2)
            });
        },
        //用于设置剩余帧的位置关系
        setPosterPos : function() {
            var self = this;
            var sliceImtes = this.posterItems.slice(1);
            var sliceSize = sliceImtes.length / 2;
            var rightSlice = sliceImtes.slice(0, sliceSize);
            var level = Math.floor(this.posterItems.length / 2);
            var leftSlice = sliceImtes.slice(sliceSize);


            //设置右边帧的位置关系
            var rightWidth = this.settings.posterWidth;
            var rightHeight = this.settings.posterHeight;
            var gap = ((this.settings.width - this.settings.posterWidth)/2)/level;

            var firstLeft = (this.settings.width - this.settings.posterWidth)/2;
            var fixOffSetLeft = firstLeft + rightWidth;
            rightSlice.each(function(i) {
                level--;
                rightWidth = rightWidth * self.settings.scale;
                rightHeight = rightHeight * self.settings.scale;
                var j = i;

                $(this).css({
                    zIndex : level,
                    width : rightWidth,
                    height : rightHeight,
                    opacity : 1/(++j),
                    left : fixOffSetLeft + (++i)*gap - rightWidth,
                    top : (self.settings.height - rightHeight)/2
                });
            });

            //设置左边帧的位置关系
            var leftWidth = rightSlice.last().width;
            var leftHeight = rightSlice.last().height;
            var oloop = Math.floor(this.posterItems.length / 2);
            leftSlice.each(function(i) {
                $(this).css({
                    zIndex : level,
                    width : leftWidth,
                    height : leftHeight,
                    opacity : 1/oloop,
                    left : i*gap,
                    top : (self.settings.height - leftHeight)/2
                });
                leftWidth = leftWidth/self.settings.scale;
                leftHeight = leftHeight/self.settings.scale;
                oloop--;
            });
        }
    };
    Carousel.init = function(posters) {
        var _this_ = this;
        posters.each(function() {
           new _this_($(this));
        });
    };
    window["Carousel"] = Carousel;
})(jQuery, window, document);