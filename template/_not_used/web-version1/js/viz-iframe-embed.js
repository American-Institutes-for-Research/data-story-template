function resizeIframe(obj) {
    // get iframe parent container width
    var parent_container_width = $(obj).parent().width();

    // get viz content width
    // var content_width = obj.contentWindow.document.getElementsByTagName("svg")[0].getBBox().width;
    // var content_height = obj.contentWindow.document.getElementsByTagName("svg")[0].getBBox().height;

    var content_width = obj.contentWindow.document.body.scrollWidth;
    var content_height = obj.contentWindow.document.body.style.height ? obj.contentWindow.document.body.style.height.replace("px", "") : obj.contentWindow.document.body.scrollHeight;
    console.log(content_height);

    // set iframe size&dimension to just fit the actual content
    obj.style.width = content_width + "px";
    obj.style.height = content_height + "px";

    // scale down iframe
    var content_container_ratio = parent_container_width / content_width;
    $(obj).css({
        "-webkit-transform-origin": "0 0",
        "-webkit-transform": "scale(" + content_container_ratio + ")",
        "-moz-transform-origin": "0 0",
        "-moz-transform": "scale(" + content_container_ratio + ")",
        "-ms-transform-origin": "0 0",
        "-ms-transform": "scale(" + content_container_ratio + ")",
        "-o-transform-origin": "0 0",
        "-o-transform": "scale(" + content_container_ratio + ")",
        "transform-origin": "0 0",
        "transform": "scale(" + content_container_ratio + ")"
    });

    // reset the iframe paranet container height
    var newParentHeight = content_container_ratio * content_height;
    $(obj).parent().height(newParentHeight);
}

var chart_iframe = [];

function apply_resize() {
    for (i = 1; i < 7; i++) {
        var iframe_id = "chart" + i + "-iframe";
        chart_iframe.push(document.getElementById(iframe_id));
        resizeIframe(chart_iframe[i - 1]);
    }
}

// iframe responsiveness
// window resize event calculation
$(window).resize(function () {
    apply_resize();
});

// initial page load calculation
window.onload = function () {
    apply_resize();
};