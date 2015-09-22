/**
 * Created by Jiahnn on 2015/9/18.
 */
;(function($) {
    var LightBox = function(options) {
        var _this = this;

        this.settings = {
          speed : 500
        };
        $.extend(this.settings, options || {});
        //创建遮罩和弹出框
        this.popupMask = $('<div id="G-lightbox-mask"></div>');
        this.popupWin = $('<div id="G-lightbox-popup">');

        this.bodyNode = $(document.body);

        //渲染
        this.renderDOM();

        //图片预览区
        this.picViewArea = this.popupWin.find("div.lightbox-pic-view");
        this.popupPic = this.popupWin.find("img.lightbox-image");//图片
        this.picCaptionArea = this.popupWin.find("div.lightbox-pic-caption"); //图片描述区
        this.prevBtn = this.popupWin.find("span.lightbox-prev-btn");
        this.nextBtn = this.popupWin.find("span.lightbox-next-btn");
        this.captionText = this.popupWin.find("p.lightbox-pic-desc");
        this.currentIndex = this.popupWin.find("span.lightbox-of-index");
        this.closeBtn = this.popupWin.find("div.lightbox-close-btn");

        this.groupName = null;
        this.groupData = []; //同一组数据
        //开发事件委托，获取组数据
        this.bodyNode.delegate(".js-lightbox,*[data-role=lightbox]", "click", function(e) {
            //阻止冒泡事件
            e.stopPropagation();
            var currentGroupName = $(this).attr("data-group");
            if (currentGroupName !== _this.groupName) {
                _this.groupName = currentGroupName;
                //根据当前组名获取同一组数据
                _this.getGroup();
            }
            _this.initPopup($(this));
        });

        this.popupMask.click(function() {
            $(this).fadeOut();
            _this.popupWin.fadeOut();
            _this.clear = false;
        });
        this.closeBtn.click(function() {
            _this.popupMask.fadeOut();
            _this.popupWin.fadeOut();
            _this.clear = false;
        });

        this.flag = true;
        this.prevBtn.hover(function(){
            if (!$(this).hasClass("disabled") && _this.groupData.length > 1) {
                $(this).addClass("lightbox-prev-btn-show");
            }
        },function() {
            if (!$(this).hasClass("disabled") && _this.groupData.length > 1) {
                $(this).removeClass("lightbox-prev-btn-show");
            }
        }).click(function(e) {
            if (!$(this).hasClass("disabled") && _this.flag) {
                _this.flag = false;
                e.stopPropagation();
                _this.goto("prev");
            }
        });
        this.nextBtn.hover(function(){
            if (!$(this).hasClass("disabled") && _this.groupData.length > 1) {
                $(this).addClass("lightbox-next-btn-show");
            }
        },function() {
            if (!$(this).hasClass("disabled") && _this.groupData.length > 1) {
                $(this).removeClass("lightbox-next-btn-show");
            }
        }).click(function(e) {
            if (!$(this).hasClass("disabled") && _this.flag) {
                _this.flag = false;
                e.stopPropagation();
                _this.goto("next");
            }
        });

        var timer = null;
        this.clear = false;
        // 绑定窗口调整事件
        $(window).resize(function() {
            if (_this.clear) { //弹框出现才执行
                window.clearTimeout(timer);
                timer = window.setTimeout(function() {
                    _this.loadPicZize(_this.groupData[_this.index].src);
                }, 500);
            }
        }).keyup(function(e) {
            var keyValue = e.which;
            if (_this.clear) {
                if (keyValue === 38 || keyValue === 37) {
                    _this.prevBtn.click();
                } else if (keyValue === 40 || keyValue === 39) {
                    _this.nextBtn.click();
                }
            }
        });
    };
    LightBox.prototype = {
        goto : function(dir) {
            if (dir === "prev") {
                this.index--;
                if (this.index <= 0) {
                    this.prevBtn.addClass("disabled");
                    this.prevBtn.removeClass("lightbox-prev-btn-show");
                }
                if (this.index != this.groupData.length - 1) {
                    this.nextBtn.removeClass("disabled");
                }
                var src = this.groupData[this.index].src;
                this.loadPicZize(src);
            } else if (dir === "next") {
                this.index++;
                if (this.index >= this.groupData.length - 1) {
                    this.nextBtn.addClass("disabled");
                    this.nextBtn.removeClass("lightbox-next-btn-show");
                }
                if (this.index != 0) {
                    this.prevBtn.removeClass("disabled");
                }
                var src = this.groupData[this.index].src;
                this.loadPicZize(src);
            }
        },
        loadPicZize : function(sourceSrc) {
            var self = this;
            self.picCaptionArea.hide();
            self.popupPic.css({
               width:"auto",
               height:"auto"
            }).hide();
            self.popupPic.hide();
            this.preLoadImg(sourceSrc, function() {
                self.popupPic.attr("src", sourceSrc);
                var picWidth = self.popupPic.width();
                var picHeight = self.popupPic.height();
                self.changePic(picWidth, picHeight);
            });
        },
        changePic : function(width, height) {
            var self = this;
            var winWidth = $(window).width();
            var winHeight = $(window).height();

            //如果图片的宽高大于浏览器适口的宽高比例，判断是否溢出
            var d = Math.min(winWidth/(width+10),winHeight/(height+10),1);
            width = width*d;
            height = height*d;

            this.picViewArea.animate({
                width:width-10,
                height:height-10
            }, self.settings.speed);
            this.popupWin.animate({
                width:width,
                height:height,
                marginLeft:-(width/2),
                top:(winHeight-height)/2
            }, self.settings.speed, function() {
                self.popupPic.css({
                    width:width-10,
                    height:height-10
                }).fadeIn();
                self.picCaptionArea.fadeIn();
                self.flag = true;
                self.clear = true;
            });

            this.captionText.text(this.groupData[this.index]["caption"]);
            this.currentIndex.text("当前索引：" + (this.index + 1) + " of " + this.groupData.length);
        },
        preLoadImg : function (src, callback) {
            var img = new Image();
            if (!!window.ActiveXObject) { //IE
                img.onreadystatechange = function() {
                    if (this.readyState === "complete") {
                        callback();
                    }
                }
            } else {
                img.onload = function() {
                    callback();
                }
            }
            img.src = src;
        },
        showMaskAndPopup : function(sourceSrc, currentId) {
            var self = this;

            this.popupPic.hide();
            this.picCaptionArea.hide();

            this.popupMask.fadeIn();

            var winWidth = $(window).width();
            var winHeight = $(window).height();
            this.picViewArea.css({
               width : winWidth / 2,
               height : winHeight / 2
            });
            this.popupWin.fadeIn();

            var viewHeight = winHeight / 2 + 10;
            this.popupWin.css({
                width : winWidth / 2 + 10,
                height : winHeight / 2,
                marginLeft: -(winWidth / 2 + 10) / 2,
                top : -viewHeight
            }).animate({
                top : (winHeight - viewHeight) / 2
            }, self.settings.speed, function() {
                //加载图片
                self.loadPicZize(sourceSrc);
            });

            //根据当前点击元素的id获取在当前组别里面的索引值
            this.index = this.getIndexOf(currentId);

            var groupDataLenth = this.groupData.length;
            if (groupDataLenth > 1) {
                if (this.index === 0) {
                    this.prevBtn.addClass("disabled");
                    this.nextBtn.removeClass("disabled");
                } else if (this.index === groupDataLenth - 1) {
                    this.nextBtn.addClass("disabled");
                    this.prevBtn.removeClass("disabled");
                } else {
                    this.prevBtn.removeClass("disabled");
                    this.nextBtn.removeClass("disabled");
                }
            }
        },
        getIndexOf : function(currentId) {
            var index = 0;
            $(this.groupData).each(function(i) {
                index = i;
                if (this.id === currentId) {
                    return false;
                }
            });

            return index;
        },
        initPopup : function(currentObj) {
            var self = this;
            var sourceSrc = currentObj.attr("data-source");
            var currentId = currentObj.attr("data-id");
            this.showMaskAndPopup(sourceSrc, currentId);
        },
        getGroup : function() {
            var self = this;
            //根据当前的组别名称获取页面中所有相同组别的对象
            var groupList = this.bodyNode.find("*[data-group="+this.groupName+"]");
            //清空数组数据
            self.groupData.length = 0;
            groupList.each(function() {
                self.groupData.push({
                    src : $(this).attr("data-source"),
                    id : $(this).attr("data-id"),
                    caption : $(this).attr("data-caption")
                });
            });
            console.log(self.groupData);
        },
        renderDOM : function() {
            var strDom = '<div class="lightbox-pic-view">' +
                '<span class="lightbox-btn lightbox-prev-btn"></span>' +
                    '<img class="lightbox-image"  alt="">' +
                '<span class="lightbox-btn lightbox-next-btn"></span>' +
                '</div>' +
                '<div class="lightbox-pic-caption">' +
                    '<div class="lightbox-caption-area">' +
                        '<p class="lightbox-pic-desc"></p>' +
                        '<span class="lightbox-of-index">当前索引：0 of 0</span>' +
                    '</div>' +
                '<div class="lightbox-close-btn"></div>' +
            '</div>';

            this.popupWin.html(strDom);
            this.bodyNode.append(this.popupMask, this.popupWin);
        }
    };
    window["LightBox"] = LightBox;
})(jQuery);