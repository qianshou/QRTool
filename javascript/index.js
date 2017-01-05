/**
 * Created by zhezhao on 2017/1/3.
 */

//标签页代码
$(function() {
    $('#doc-my-tabs').tabs({noSwipe: 1});
})

//chrome扩展获得当前url，并转为二维码
chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs){
    var url = tabs[0].url;
    $('#current_url').text(url);
    createQR('current_qr',url);
});

//生成自定义二维码
$("#create").click(function () {
   var custom_text = $("#custom_text").val();
   if(custom_text == ''){
       $("#custom_qr").text('输入内容不能为空');
   }else{
       createQR('custom_qr',custom_text);
   }
});

//自动清除上次输入
$("#custom_text").click(function () {
    $("#custom_text").val('');
});

//生成二维码
function createQR(id,content) {
    content = utf16to8(content);
    $("#"+id).empty();
    $("#"+id).qrcode({
        render: "table",
        text: content
    });
};

//convert Chinese to utf-8
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
    }
    return out;
}