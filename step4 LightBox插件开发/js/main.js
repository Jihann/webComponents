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

    $("#del").on('click', function() {
        var win = new w.Window();
        win.confirm({
            title: "系统提示",
            msg : "您确定要删除这个文件吗？",
            width : 500,
            height : 300,
            text4ConfirmBtn : 'YES',
            text4CancelBtn : 'NO',
            dragHandle : ".window_header"
        }).on("confirm", function() {
            alert('已删除');
        }).on("cancel", function() {
            alert('已取消');
        });
    });

    $("#common").on('click', function() {
        var win = new w.Window();
        win.common({
            msg : "这不是你想要的内容",
            width : 500,
            height : 300,
            hasCloseBtn : true
        });
    });
});
