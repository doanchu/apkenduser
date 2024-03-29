var Item = React.createClass({displayName: 'Item',
  render:function(){
      return (
       
React.createElement("a", {href: "/app/us.porrassoft.tattoo.gun.camera.html", className: "item app"}, 
        React.createElement("div", {className: "item_cont"}, 
          React.createElement("img", {alt: "", 'data-postload-img-onerror': "if (this.getAttribute('error') != 1){this.setAttribute('src','http://cdn3.aptoide.com/includes/themes/mobile2014/images/app_icon_default_mdpi.png');this.setAttribute('error',1);}", 'data-postload-img': "http://apk.vn/static/images/2014/10/29/1414549748/86.png", src: "http://apk.vn/static/images/2014/10/29/1414549748/86.png", className: "item_icon"}), 
          React.createElement("div", {className: "item_meta"}, 
            React.createElement("div", {className: "item_name"}, this.props.name), 
            React.createElement("div", {className: "stars"}, React.createElement("div", {style: {width: 52}})), 
            React.createElement("div", {className: "item_info2"}, this.props.downloads, " downloads"), 
            React.createElement("div", {className: "item_info2 orange"}, "Apps")
          ), 
          React.createElement("p", {className: "btn-download", href: ""}, "Cài đặt")
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
        React.createElement("a", {className: "btn apk_install", href: "/"}, React.createElement("div", null), "  Cài Đặt Store")
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
      $('#search_top').fadeIn('fast', function(){$(this).find('input[type="text"][name="search"]').focus();});
      return false;
    });         
  },
  render: function() {
    return (
      React.createElement("header", {'data-fixed-header': "", className: "top_header"}, 
        React.createElement("a", {id: "btn_back", onclick: "goBack()", href: "javascript('goBack()'):;", className: "btn drawer btn_back"}), 
        React.createElement("div", {className: "top_logo_area"}, 
          React.createElement("a", {href: "/", id: "top_logo", className: "top_logo"}, React.createElement("img", {className: "logo", alt: "", src: "/assets/images/logo.png"}))
        ), 
        React.createElement("div", {id: "search_top", className: "search_top nodisplay"}, 
          React.createElement("form", {method: "get", action: "/"}, 
            React.createElement("input", {type: "text", placeholder: "Tìm kiếm ứng dụng ...", value: "", name: "search"}), 
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
            React.createElement(Link, {to: "/app/standings", className: this.props.route == "standings" ? "active" : ""}, "Thứ hạng"), 
            React.createElement("a", {href: "/page", className: ""}, "Chọn lọc")
          )
        )
      )
    );
  }
});


var AppList = React.createClass({displayName: 'AppList',
  render: function() {    
    var data = [{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000},{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}]
    
    var items = data.map(function(item){
        return (
          React.createElement(Item, {name: item.name, downloads: item.downloads})
        );
    })
    return (
React.createElement("section", {className: "items list_app"}, 
items
)
    );
  }
});

var Content = React.createClass({displayName: 'Content',
  render: function() {
    return (
      React.createElement(AppList, null)
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




