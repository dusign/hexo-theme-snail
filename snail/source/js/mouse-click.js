var a_idx = 0;

var a = new Array();
var f_colors = new Array();
var scripts = document.getElementsByTagName("script");
for (var i=0; i< scripts.length;i++) {
    var script = scripts[i];
    if (script && script.getAttribute("src") && script.getAttribute("src").indexOf("mouse-click.js")>-1 && script.getAttribute("content")) {
        a = JSON.parse(script.getAttribute("content"));
        f_colors = JSON.parse(script.getAttribute("color"));
    }
}

jQuery(document).ready(function($) {
    $("body").click(function(e) {
        //var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善");
        var $i = $("<span/>").text(a[a_idx]);
        
        a_idx = (a_idx + 1) % a.length;
        var x = e.pageX,y = e.pageY;
        $i.css({
            "z-index": 100000000,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": f_colors[a_idx]});

        $("body").append($i);
        
        $i.animate({
            "top": y - 180,
            "opacity": 0},1500,function() {$i.remove();});
    });
});