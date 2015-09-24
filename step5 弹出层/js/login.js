/**
 * Created by Jihann on 2015/9/18.
 */

var init = function() {
    //获取页面高度和宽度
    var sHeight = document.documentElement.scrollHeight;
    var sWidth = document.documentElement.scrollWidth;
    //可视区域的高度和宽度
    //如果页面是一个竖向的页面，那么可视区域的宽度和页面的宽度是一样的
    var wHeight = document.documentElement.clientHeight;

    var mask = document.createElement("div");
    mask.id = "mask";
    mask.style.height = sHeight + "px";
    mask.style.width = sWidth + "px";
    document.body.appendChild(mask);

    var login = document.createElement("div");
    login.id = "login";
    login.innerHTML = "<div class='loginCon'><div id='close'></div></div>";
    document.body.appendChild(login);

    var dHeight = login.offsetHeight; //login元素的高度
    var dWidth = login.offsetWidth;
    login.style.left = (sWidth-dWidth)/2 + "px";
    login.style.top = (wHeight-dHeight)/2 + "px";

    var close = document.getElementById("close");
    mask.onclick = close.onclick = function() {
        document.body.removeChild(mask);
        document.body.removeChild(login);
    };
}

window.onload = function() {
    var btn = document.getElementById("btnLogin");
        btn.onclick = function() {
            init();
        };
};