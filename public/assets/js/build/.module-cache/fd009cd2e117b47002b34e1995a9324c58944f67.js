var Navigation = ReactRouter.Navigation;
var Item = React.createClass({displayName: 'Item',
  handleDownload: function(e) {
    e.preventDefault();
    window.location.href = "http://apk.vn:3000/" + e.currentTarget.getAttribute("href");
    return false;
  },
  render:function(){
      return (
       
React.createElement("a", {href: "/app/" + this.props.appId + ".html", className: "item app"}, 
        React.createElement("div", {className: "item_cont"}, 
          React.createElement("img", {alt: "", src: this.props.thumbnail, className: "item_icon"}), 
          React.createElement("div", {className: "item_meta"}, 
            React.createElement("div", {className: "item_name"}, this.props.name), 
            React.createElement("div", {className: "stars"}, React.createElement("div", {style: {width: 52}})), 
            React.createElement("div", {className: "item_info2"}, this.props.downloads, " downloads"), 
            React.createElement("div", {className: "item_info2 orange"}, "Apps")
          ), 
          React.createElement("p", {onClick: this.handleDownload, className: "btn-download", href: "/app/download/" + document.partner + "/" + this.props.appId}, "Cài đặt")
        )
      )
        
      );
  }
});


var Banner = React.createClass({displayName: 'Banner',
  componentDidMount: function() {      
      $("#owl-demo").owlCarousel({

      autoPlay: 3000,
        navigation : false,
        slideSpeed : 300,
        paginationSpeed : 400,
      items : 1,
      
      // "singleItem:true" is a shortcut for:
      
       itemsDesktop : false,
       itemsDesktopSmall : false,
       itemsTablet: false,
       itemsMobile : false

      });
  },
  render:function(){
      return (
       
      React.createElement("section", {className: "editors_install"}, 
        React.createElement("div", {id: "owl-demo", className: "owl-carousel owl-theme"}, 
          React.createElement("div", {className: "item"}, React.createElement("a", {href: "#"}, React.createElement("img", {src: "/assets/images/fullimage1.jpg", alt: "The Last of us"}))), 
          React.createElement("div", {className: "item"}, React.createElement("a", {href: "#"}, React.createElement("img", {src: "/assets/images/fullimage3.jpg", alt: "Mirror Edge"}))), 
          React.createElement("div", {className: "item"}, React.createElement("a", {href: "#"}, React.createElement("img", {src: "/assets/images/fullimage4.jpg", alt: "Mirror Edge"}))), 
          React.createElement("div", {className: "item"}, React.createElement("a", {href: "#"}, React.createElement("img", {src: "/assets/images/fullimage5.jpg", alt: "Mirror Edge"})))
        ), 
      React.createElement("div", {className: "wfull center"}, 
        React.createElement("a", {className: "btn apk_install", href: "http://beta.apk.vn/store/download/" + document.partner}, React.createElement("div", null), "  Cài Đặt Store")
      )

      )
        
        );
  }
});






var LayoutFootter = React.createClass({displayName: 'LayoutFootter',
  render:function(){
      return (
       
          React.createElement("div", null, 
React.createElement("footer", null, 
  React.createElement("img", {alt: "", className: "small_logo", src: "/assets/images/logo.png"}), 
  React.createElement("a", {href: "#"}, "Lên đầu")
)

          )
        
        );
  }
});


var Header = React.createClass({displayName: 'Header',
  mixins: [Navigation],  
  getInitialState: function() {
    return {search: ""}
  },
  componentDidMount: function(){    
    if ($('#search_btn_top[data-search-hidden]').length){
      $(window).scroll(function(e){
        if ($(window).scrollTop() > 100)
          $('#search_btn_top[data-search-hidden]').fadeIn('fast');
        else
          $('#search_btn_top[data-search-hidden]').fadeOut('fast');
      });
    };  
    $('#search_btn_top').click(function(){
      $(this).removeAttr('data-search-hidden').fadeOut('fast');
      $('#top_logo').fadeOut('fast');
      $('#search_top').fadeIn('fast', function(){$(this).removeClass('nodisplay');});
      return false;
    });         
  },
  back: function(e) {
    window.history.back()
  },
  search: function(e) {
    e.preventDefault();
    var query = this.state.search;    
    if (this.props.route != null && this.props.route == "search") {            
      this.props.updateSearchQuery(query)
    } else {
      this.transitionTo("/app/search/" + query);          
    }   
  },
  handleChange: function(e) {
    this.setState({search: e.target.value})
  },
  render: function() {
    var value = this.state.search
    return (
      React.createElement("header", {'data-fixed-header': "", className: "top_header"}, 
        React.createElement("a", {id: "btn_back", onClick: this.back, className: "btn drawer btn_back"}), 
        React.createElement("div", {className: "top_logo_area"}, 
          React.createElement("a", {href: "/", id: "top_logo", className: "top_logo"}, React.createElement("img", {className: "logo", alt: "", src: "/assets/images/logo.png"}))
        ), 
        React.createElement("div", {id: "search_top", className: "search_top nodisplay"}, 
          React.createElement("form", {method: "get", onSubmit: this.search, action: "/"}, 
            React.createElement("input", {type: "text", placeholder: "Tìm kiếm ứng dụng ...", id: "search_input", value: value, name: "search", onChange: this.handleChange}), 
            React.createElement("input", {type: "submit", className: "btn", value: ""})
          )
        ), 
        React.createElement("a", {id: "search_btn_top", href: "#", className: "btn search "})
      )
    );
  }
});

var NavTop = React.createClass({displayName: 'NavTop',
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("div", {'data-window-overlay': "", className: "nodisplay"}), 
        React.createElement("section", {className: "tabs_header"}, 
          /*<div class="title"></div>*/
          React.createElement("div", {className: "tabs"}, 
            React.createElement(Link, {to: "/", className: this.props.route == "home" ? "active" : ""}, "Trang chủ"), 
            React.createElement(Link, {to: "/app/topdownload", className: this.props.route == "topdownload" ? "active" : ""}, "Tải nhiều"), 
            React.createElement(Link, {to: "/app/standings", className: this.props.route == "standings" ? "active" : ""}, "Thứ hạng")
            /*<a href="/page" className="">Chọn lọc</a>*/
          )
        )
      )
    );
  }
});


var AppList = React.createClass({displayName: 'AppList',
  // getInitialState: function() {
  //   return {data: []};
  // },
  componentDidMount: function() {
    // var url = "/api/apps-partner-min/" + document.partner + "/1/10";
    // $.get(url, function(result) {
    //   if (this.isMounted()) {
    //     this.setState({data: result})
    //   }
    // }.bind(this))
  },
  render: function() {    
    //var data = [{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}]
    
    var items = this.props.data.map(function(item){
      if (item != null) {
        return (
          React.createElement(Item, {appId: item.id, name: item.name, downloads: item.total_download, thumbnail: item.thumbnail})
        );
      }
    })
    return (
React.createElement("section", {className: "items list_app"}, 
items
)
    );
  }
});

var Content = React.createClass({displayName: 'Content',
  getInitialState: function() {
    return {data: [], page: 1}
  },
  getMoreContent: function() {    
    var page = this.state.page + 1; 
    var prefix = "/api/apps-partner/";
    if (this.props.route == "home") {
      prefix = "/api/apps-partner/";
    } else if (this.props.route == "topdownload") {
      prefix = "/api/apps-download/";
    } else if (this.props.route == "standings") {
      prefix = "/api/apps-like/";
    }      
    var url = prefix + document.partner + "/" + this.state.page + "/10";
    $.get(url, function(result) {      
      if (this.isMounted()) {
        if (result != null && $.isArray(result) && result.length > 0) {
          var newData = this.state.data.concat(result)
          this.setState({data: newData, page: page})
        }
      }
    }.bind(this))    
  },
  componentDidMount: function() {
    var prefix = "/api/apps-partner/";
    if (this.props.route == "home") {
      prefix = "/api/apps-partner/";
    } else if (this.props.route == "topdownload") {
      prefix = "/api/apps-download/";
    } else if (this.props.route == "standings") {
      prefix = "/api/apps-like/";
    }       
    var url = prefix + document.partner + "/1/10";
    $.get(url, function(result) {
      if (this.isMounted()) {
        this.setState({data: result})
      }
    }.bind(this))
  },
  render: function() {
    return (
      React.createElement("div", null, 
      React.createElement(AppList, {data: this.state.data}), 
        React.createElement("div", {className: "clear"}), 
        React.createElement("div", {id: "loading_gif", className: "wfull center"}, 
          React.createElement("div", {style: {width: 160, height: 15}, className: "css_loader"}, React.createElement("div", {style: {top: 0, left: 0, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0s', WebkitAnimationDelay: '0s', MsAnimationDelay: '0s', OAnimationDelay: '0s', animationDelay: '0s'}}), React.createElement("div", {style: {top: 0, left: 20, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.125s', WebkitAnimationDelay: '0.125s', MsAnimationDelay: '0.125s', OAnimationDelay: '0.125s', animationDelay: '0.125s'}}), React.createElement("div", {style: {top: 0, left: 40, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.25s', WebkitAnimationDelay: '0.25s', MsAnimationDelay: '0.25s', OAnimationDelay: '0.25s', animationDelay: '0.25s'}}), React.createElement("div", {style: {top: 0, left: 60, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.375s', WebkitAnimationDelay: '0.375s', MsAnimationDelay: '0.375s', OAnimationDelay: '0.375s', animationDelay: '0.375s'}}), React.createElement("div", {style: {top: 0, left: 80, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.5s', WebkitAnimationDelay: '0.5s', MsAnimationDelay: '0.5s', OAnimationDelay: '0.5s', animationDelay: '0.5s'}}), React.createElement("div", {style: {top: 0, left: 100, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.625s', WebkitAnimationDelay: '0.625s', MsAnimationDelay: '0.625s', OAnimationDelay: '0.625s', animationDelay: '0.625s'}}), React.createElement("div", {style: {top: 0, left: 120, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.75s', WebkitAnimationDelay: '0.75s', MsAnimationDelay: '0.75s', OAnimationDelay: '0.75s', animationDelay: '0.75s'}}), React.createElement("div", {style: {top: 0, left: 140, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.875s', WebkitAnimationDelay: '0.875s', MsAnimationDelay: '0.875s', OAnimationDelay: '0.875s', animationDelay: '0.875s'}}))
        ), 
        React.createElement("p", {className: "btn-view", onClick: this.getMoreContent}, "Xem thêm")
        )      
    )
  }    
});

var Footer = React.createClass({displayName: 'Footer',
  render: function(){
    return (
      React.createElement("footer", null, 
        React.createElement("img", {alt: "", className: "small_logo", src: "/assets/images/logo.png", draggable: "false"}), 
        React.createElement("a", {href: "#"}, "Lên đầu")
      )
    )
  }
});


var Home = React.createClass({displayName: 'Home',

  render: function() {
    return (
      React.createElement("div", {className: "body"}, 
React.createElement(Header, null), 
React.createElement("div", {className: "body_container"}, 
React.createElement(Banner, null), 
React.createElement(NavTop, {route: "home"}), 
React.createElement(Content, {route: "home"})
), 
React.createElement(Footer, null)
    )
    )
  }
});

var TopDownload = React.createClass({displayName: 'TopDownload',
  render: function() {
    return (
      React.createElement("div", {className: "body"}, 
React.createElement(Header, null), 
React.createElement("div", {className: "body_container"}, 
React.createElement(NavTop, {route: "topdownload"}), 
React.createElement(Content, {route: "topdownload"})
), 
React.createElement(Footer, null)
    )
    )
  }
});


var Details = React.createClass({displayName: 'Details',
  render: function() {
      var images = this.props.data.ss.map(function(item){
      if (item != null) {
        return (
            React.createElement("a", {className: "group1"}, 
              React.createElement("img", {alt: "Barcode Scanner screenshot 1", className: "portrait group1", src: item})
            )

        );
      }
    })

    return (

      React.createElement("section", {className: "app_view"}, 
        React.createElement("div", null, 
          React.createElement("div", {className: "app_meta_data"}, 
            React.createElement("img", {alt: "", src: this.props.data.thumbnail, className: "app_icon"}), 
            React.createElement("p", {className: "app_name"}, this.props.data.name), 
            React.createElement("div", {className: "app_meta mt5"}, 
              "Phiên bản: ", this.props.data.version, " |" + ' ' + 
              "Kích thước: ", this.props.data.size
            ), 
            React.createElement("div", {className: "app_meta"}, 
              "Lượt tải: ", this.props.data.total_download, 
              React.createElement("a", {'data-window-call-id': "app_info", href: "#"})
            ), 
            React.createElement("div", {className: "app_meta install_area"}, 
              React.createElement("a", {href: "/app/download/" + document.partner + "/" + this.props.data.id, className: "btn app_install trusted"}, 
                React.createElement("div", null), 
                "Cài Đặt"
              )
            )
          ), 
          React.createElement("div", {className: "app_controls"}, 
            React.createElement("span", {'data-ajax-url': "http://m.eoliveira.store.aptoide.com/phpajax/do_like_vote.php?appid=7217417undefinedeira", 'data-ajax': "likes", className: "neverdisplay"}, 
              "Submitting vote...   ", 
              React.createElement("div", {className: "load_circ"})
            )
          )
        ), 
        React.createElement("div", {className: "app_screenshots non_select"}, 
          React.createElement("div", {id: "app_screenshots", className: "slider_section"}, 
            React.createElement("span", {'data-sld-btn-prev': "", className: "neverdisplay"}), 
            React.createElement("span", {'data-sld-btn-next': "", className: "neverdisplay"}), 
            React.createElement("div", {id: "app_screenshots_sld", 'data-sld-resizeable': "", 'data-sld-view': "", className: "slider_area"}, 
            images
            )
          )
        ), 
        React.createElement("div", {className: "app_extended_meta"}, 
          React.createElement("div", {className: "app_section_title"}, "Mô tả"), 
          React.createElement("div", {className: "app_description"}, 
            React.createElement("div", {'data-content-expand-id': "description", dangerouslySetInnerHTML: {__html: this.props.data.desc}}
            )
          )
        ), 
        React.createElement("div", {className: "app_extended_meta"}, 
          React.createElement("div", {className: "app_section_title"}, "Đánh giá ứng dụng"), 
          React.createElement("div", {className: "app_flags mt10"}, 
            React.createElement("span", {'data-ajax-url': "http://m.eoliveira.store.aptoide.com/phpajax/do_apk_flag.php?appid=7217417undefinedeira", 'data-ajax': "flags", className: "neverdisplay"}, 
              "Submitting flag...   ", 
              React.createElement("div", {className: "load_circ"})
            ), 
            React.createElement("div", null, 
              React.createElement("div", {className: "good "}, 
                React.createElement("img", {alt: "", src: "http://cdn3.aptoide.com/includes/themes/mobile2014/images/flag_good.png"}), 
                React.createElement("div", null, "Thích"), 
                React.createElement("div", {'data-flag-vote-good-count': ""}, this.props.data.total_like), 
                React.createElement("div", {'data-login-btn-trigger': "", className: "btn"}, 
                  React.createElement("div", null, "Thích")
                )
              )
            ), 
            React.createElement("div", null, 
              React.createElement("div", {className: "license "}, 
                React.createElement("img", {alt: "", src: "http://cdn3.aptoide.com/includes/themes/mobile2014/images/flag_license.png"}), 
                React.createElement("div", null, "Chia sẻ"), 
                React.createElement("div", {'data-flag-vote-license-count': ""}, this.props.data.total_share), 
                React.createElement("div", {'data-login-btn-trigger': "", className: "btn"}, 
                  React.createElement("div", null, "Chia sẻ")
                )
              )
            )

          ), 
          React.createElement("div", {className: "clear"}, React.createElement("br", null))
        )
      )
    );
  }
});

var AppDetails = React.createClass({displayName: 'AppDetails',
  getInitialState: function() {
    return {
      data: {
      name: "",
      version: "",
      size: "",
      total_download: 0,
      total_like: 0,
      total_share: 0,
      thumbnail: "#",
      ss: [
      "#"     
      ],
      desc: ""
    }}
  },
  componentDidMount: function() {      
    var url = "/api/app/" + document.partner + "/" + this.props.params.appId;
    $.get(url, function(result) {      
      if (this.isMounted()) {                
        this.setState({data: result})        
      }
    }.bind(this))    

  },
  render: function() {    
    return (
      React.createElement("div", {className: "body"}, 
React.createElement(Header, null), 
React.createElement("div", {className: "body_container"}, 
React.createElement(Details, {data: this.state.data})
), 
React.createElement(Footer, null)
    )
    )
  }
});

var TopStandings = React.createClass({displayName: 'TopStandings',
  render: function() {
    return (
      React.createElement("div", {className: "body"}, 
React.createElement(Header, null), 
React.createElement("div", {className: "body_container"}, 
React.createElement(NavTop, {route: "standings"}), 
React.createElement(Content, {route: "standings"})
), 
React.createElement(Footer, null)
    )
    )
  }
})


var SearchContent = React.createClass({displayName: 'SearchContent',
  getInitialState: function() {
    return {data: [], page: 1}
  },
  getMoreContent: function() {    
    // var page = this.state.page + 1; 
    // var prefix = "/api/apps-partner/";
    // if (this.props.route == "home") {
    //   prefix = "/api/apps-partner/";
    // } else if (this.props.route == "topdownload") {
    //   prefix = "/api/apps-download/";
    // } else if (this.props.route == "standings") {
    //   prefix = "/api/apps-like/";
    // }      
    // var url = prefix + document.partner + "/" + this.state.page + "/10";
    // $.get(url, function(result) {      
    //   if (this.isMounted()) {
    //     if (result != null && $.isArray(result) && result.length > 0) {
    //       var newData = this.state.data.concat(result)
    //       this.setState({data: newData, page: page})
    //     }
    //   }
    // }.bind(this))    
  },
  componentDidMount: function() {

  },
  render: function() {
    return (
      React.createElement("div", null, 
      React.createElement(AppList, {data: this.props.data}), 
        React.createElement("div", {className: "clear"}), 
        React.createElement("div", {id: "loading_gif", className: "wfull center"}, 
          React.createElement("div", {style: {width: 160, height: 15}, className: "css_loader"}, React.createElement("div", {style: {top: 0, left: 0, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0s', WebkitAnimationDelay: '0s', MsAnimationDelay: '0s', OAnimationDelay: '0s', animationDelay: '0s'}}), React.createElement("div", {style: {top: 0, left: 20, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.125s', WebkitAnimationDelay: '0.125s', MsAnimationDelay: '0.125s', OAnimationDelay: '0.125s', animationDelay: '0.125s'}}), React.createElement("div", {style: {top: 0, left: 40, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.25s', WebkitAnimationDelay: '0.25s', MsAnimationDelay: '0.25s', OAnimationDelay: '0.25s', animationDelay: '0.25s'}}), React.createElement("div", {style: {top: 0, left: 60, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.375s', WebkitAnimationDelay: '0.375s', MsAnimationDelay: '0.375s', OAnimationDelay: '0.375s', animationDelay: '0.375s'}}), React.createElement("div", {style: {top: 0, left: 80, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.5s', WebkitAnimationDelay: '0.5s', MsAnimationDelay: '0.5s', OAnimationDelay: '0.5s', animationDelay: '0.5s'}}), React.createElement("div", {style: {top: 0, left: 100, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.625s', WebkitAnimationDelay: '0.625s', MsAnimationDelay: '0.625s', OAnimationDelay: '0.625s', animationDelay: '0.625s'}}), React.createElement("div", {style: {top: 0, left: 120, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.75s', WebkitAnimationDelay: '0.75s', MsAnimationDelay: '0.75s', OAnimationDelay: '0.75s', animationDelay: '0.75s'}}), React.createElement("div", {style: {top: 0, left: 140, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.875s', WebkitAnimationDelay: '0.875s', MsAnimationDelay: '0.875s', OAnimationDelay: '0.875s', animationDelay: '0.875s'}}))
        ), 
        React.createElement("p", {className: "btn-view", onClick: this.getMoreContent}, "Xem thêm")
        )      
    )
  }    
});

var AppSearch = React.createClass({displayName: 'AppSearch',
  getInitialState: function() {
      return {query: this.props.params.query, data: []};
  },
  updateSearchQuery: function(query) {      
    var prefix = "/app/search/" + query;
    var url = prefix + "/1/10";    
    $.get(url, function(result) {
      if (this.isMounted()) {
        this.setState({data: result, query: query})
      }
    }.bind(this));    

  },
  componentDidMount: function() {
    var prefix = "/app/search/" + this.props.params.query;
    var url = prefix + "/1/10";    
    $.get(url, function(result) {
      if (this.isMounted()) {
        this.setState({data: result, query: this.props.params.query})
      }
    }.bind(this));    
  },
  render: function() {
    return (
      React.createElement("div", {className: "body"}, 
React.createElement(Header, {route: "search", updateSearchQuery: this.updateSearchQuery}), 
React.createElement("div", {className: "body_container"}, 
React.createElement(NavTop, {route: "search"}), 
React.createElement(SearchContent, {route: "search", query: this.state.query, data: this.state.data})
), 
React.createElement(Footer, null)
    )
    )
  }
})




