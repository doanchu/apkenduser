{{define "loadMore"}}
<script type="text/javascript">
var page_size = 20;
var soft_num = 0;
var top_total = 100;
//var top_json = [{"id":"79873","total_download":"52672","cid":"30","name":"1Mobile Market","size":"5.65MB","version":"5.1.1","thumbnail":"http:\/\/imgsdown.1mobile.com\/group1\/M00\/9B\/20\/S340LlSQ9ySALES3AAAQ1ac8wfI355.png","cname":"News & Magazines"}];
var top_json = {{.AppList}};
function loadmore(){
	var next_index = soft_num + page_size;
	if(next_index >= top_total){
		next_index = top_total;
	}
	for(var i = soft_num;i<next_index;i++){
		var soft_object = top_json[i];
		if (soft_object != null) {
			var html = '<li><div class="box">';
			html += '<a href="/app/'+soft_object.id+'.html" class="pic">';
			html += '<img src="'+soft_object.thumbnail+'"/></a><em class="rightArea"><a href="/app/download/'+soft_object.id+'" class="btnDown"></a></em>';
		    html += '<div class="baseContent"><p class="pcname">';
		    html += '<a href="/app/category/'+soft_object.cid+'/">'+soft_object.cname+'</a></p>';
		    html += '<p class="pAppName"><a href="/app/'+soft_object.id+'.html">'+soft_object.name+'</a></p>';
		    html += '<p class="pInfo"><span class="size">'+soft_object.size+'</span> | <span class="downNum">'+number_format(soft_object.total_download, 0, '', ',')+'</span> downloads</p>';
		    html += '</div></div></li>';
			$item = $(html).hide();
			$('#more_soft').append($item);
			$item.fadeIn();			
		}
		soft_num ++;
	}
    if(soft_num >= top_total){
        $("#loading").remove();
        return;
    }
}

function number_format (number, decimals, dec_point, thousands_sep) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

loadmore();
</script>

{{end}}