/**
 * Created by Jihann on 2015/9/17.
 */

require.config({
   paths: {
       jquery : 'jquery.min',
       jqueryUI : 'jquery-ui.min'
   }
});

require(['jquery', 'window'], function($, w) {
    $("#btn").on('click', function() {
        var win = new w.Window();
        win.alert({
            title: "提示",
            msg : "你人品很好",
            width : 500,
            height : 300,
            hasCloseBtn: true,
            //skinClassName : "window_skin_a",
            text4AlertBtn : '关闭',
            dragHandle : ".window_header"
        }).on("alert", function() {
            alert('不要点我');
        });
        win.on("alert", function() {
            alert('你点击了我，我就给你关掉');
        });
        win.on("alert", function() {
            alert('为什么了');
        });
        win.on("alert", function() {
            alert('因为你欺负我');
        });
        win.on("close", function() {
            alert('原来你还知道我有这个功能');
        });
    });
});
