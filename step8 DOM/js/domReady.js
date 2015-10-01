/**
 * Created by Jihann on 2015/9/22.
 */
function myReady(fn) {

    //现代浏览器
    if (document.addEventListener) { //能力检测
        document.addEventListener("DOMContentLoaded", fn, false);
    } else {
        IEContentLoaded(fn);
    }
    //IE模拟DOMContentLoaded
    function IEContentLoaded(fn) {
        var doc = window.document;
        var done = false;
        //只执行一次用户的回调函数
        var init = function() {
            if (!done) {
                done = true;
                fn();
            }
        };

        (function() {
           try {
               //DOM树未创建完之前调用doScroll会抛出错误
               doc.documentElement.doScroll("left");
           }catch(e) {
                //延迟再试一次
               setTimeout(arguments.callee, 50);
               return;
           }
            init();
        })();

        //监听document的加载状态
        doc.onreadystatechange = function() {
            if (doc.readyState === "complete") {
                doc.onreadystatechange = null;
                init();
            }
        }
    }
}