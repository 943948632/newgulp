var index=function(){var e={demoAjax:function(e){var n=e.isdefult||"need";$.ajax({url:Api+e.url,dataType:"json",type:e.type||"get",data:e.param||"",async:e.async||!0,timeout:1e4,success:function(o){"need"==n?0==o.code?e.successBack instanceof Function&&e.successBack(o.data):console.log(o.msg):e.successBack instanceof Function&&e.successBack(o)},error:function(e,n,o){console.log(JSON.stringify(e)),console.log(n),console.log(o)}})},getSear:function(e){var n=location.search;n=n.substring(1,n.length);for(var o=n.split("&"),c=new Object,t=0;t<o.length;t++){var a=o[t].split("=");c[decodeURIComponent(a[0])]=decodeURIComponent(a[1])}return c[e]}};return e}(window);$(function(){$("#header").load("./include/header.html"),$("#footer").load("./include/footer.html")});