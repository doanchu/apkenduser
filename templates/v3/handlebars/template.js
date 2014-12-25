(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['app-list-template'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li>\n    <div class=\"app_list_b_cnt\"><a href=\"/app/"
    + escapeExpression(((helper = (helper = helpers.Id || (depth0 != null ? depth0.Id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"Id","hash":{},"data":data}) : helper)))
    + ".html\"\n                                   class=\"app_list_b_link app_list_c_link clearfix\"\n                                   data-hover=\"app_list_b_link_hover\"><img\n            src=\""
    + escapeExpression(((helper = (helper = helpers.Thumbnail || (depth0 != null ? depth0.Thumbnail : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"Thumbnail","hash":{},"data":data}) : helper)))
    + "\"\n            class=\"img_app_list_b\">\n        <dl class=\"app_list_b_main bfc\">\n            <dt class=\"app_list_b_tit\">"
    + escapeExpression(((helper = (helper = helpers.Name || (depth0 != null ? depth0.Name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"Name","hash":{},"data":data}) : helper)))
    + "</dt>\n            <dd class=\"app_list_c_info clearfix\">\n                <p class=\"app_list_c_score\"><span class=\"icon_score\"><i style=\"width:82%;\"></i></span></p>\n\n                <p class=\"app_list_d_downloads\"><i class=\"icon_list_down\"></i>"
    + escapeExpression(((helper = (helper = helpers.Total_download || (depth0 != null ? depth0.Total_download : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"Total_download","hash":{},"data":data}) : helper)))
    + "</p></dd>\n        </dl>\n        <p class=\"app_list_c_des\">"
    + escapeExpression(((helper = (helper = helpers.Desc || (depth0 != null ? depth0.Desc : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"Desc","hash":{},"data":data}) : helper)))
    + "</p></a>\n\n        <p class=\"app_list_b_download\"><a href=\"javascript:void(0)\" class=\"btn_app_download\"\n                                          data-hover=\"btn_app_download_hover\"\n                                          onclick=\"market_download(this)\"\n                                          data-name=\""
    + escapeExpression(((helper = (helper = helpers.Id || (depth0 != null ? depth0.Id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"Id","hash":{},"data":data}) : helper)))
    + "\"\n                                          data-href=\"/app/download/"
    + escapeExpression(((helper = (helper = helpers.Id || (depth0 != null ? depth0.Id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"Id","hash":{},"data":data}) : helper)))
    + "\">Tải về</a><span\n                class=\"app_list_b_price\">Miễn phí</span></p></div>\n</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.apps : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { return stack1; }
  else { return ''; }
  },"useData":true});
})();