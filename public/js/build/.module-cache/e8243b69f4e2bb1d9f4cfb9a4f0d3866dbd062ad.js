var Navigation = ReactRouter.Navigation;

var Navbar = React.createClass({displayName: 'Navbar',
	render: function() {
return (

      React.createElement("div", {className: "navbar"}, 
        /* Navbar inner for Index page*/
        React.createElement("div", {'data-page': "index", className: "navbar-inner"}, 
          React.createElement("div", {className: "left"}, 
            /* Right link contains only icon - additional "icon-only" class*/React.createElement("a", {href: "#", className: "link icon-only open-panel"}, "  ", React.createElement("img", {src: "http://demo.beta.apk.vn/static/images/2014/11/17/1416185720/1416185720.jpg", width: "24px;"}))
          ), 
          /* We have home navbar without left link*/
          React.createElement("div", {className: "center"}, "Kho ứng dụng"), 
          React.createElement("div", {className: "right"}, 
            /* Right link contains only icon - additional "icon-only" class*/React.createElement("a", {href: "#", className: "link icon-only open-panel"}, "  ", React.createElement("i", {className: "glyph-icon"}))
          )
        )
      )
    );
	}
});

var Toolbar = React.createClass({displayName: 'Toolbar',
  render: function() {
        return (

      React.createElement("div", {className: "toolbar tabbar"}, 
        React.createElement("div", {className: "toolbar-inner"}, 
          React.createElement("a", {href: "#view-1", className: "tab-link active"}, React.createElement("i", {className: "glyph-icon flaticon-home149"})), 
          React.createElement("a", {href: "#view-2", className: "tab-link"}, React.createElement("i", {className: "glyph-icon flaticon-list88"})), 
          React.createElement("a", {href: "#view-3", className: "tab-link"}, React.createElement("i", {className: "glyph-icon flaticon-show6"})), 
          React.createElement("a", {href: "#view-4", className: "tab-link"}, React.createElement("i", {className: "glyph-icon flaticon-search100"}))
        )
      )
    );
  }
});

var Banner = React.createClass({displayName: 'Banner',
  componentDidMount: function() {
    $("#owl-demo").owlCarousel({
   
        autoplay:true,
        autoplayTimeout:1000,
        autoplayHoverPause:true,
        singleItem:false,
        pagination:false,
       
        // "singleItem:true" is a shortcut for:
         items : 1, 
         itemsDesktop : false,
         itemsDesktopSmall : false,
         itemsTablet: false,
         itemsMobile : false
   
    });
  },
  render: function() {
    return (

      React.createElement("div", {id: "owl-demo", className: "owl-carousel owl-theme"}, 
        React.createElement("div", {className: "item"}, React.createElement("img", {src: "http://tinhwrl.beta.apk.vn/assets/images/fullimage4.jpg", alt: "The Last of us"})), 
        React.createElement("div", {className: "item"}, React.createElement("img", {src: "http://tinhwrl.beta.apk.vn/assets/images/fullimage3.jpg", alt: "GTA V"})), 
        React.createElement("div", {className: "item"}, React.createElement("img", {src: "http://tinhwrl.beta.apk.vn/assets/images/fullimage1.jpg", alt: "Mirror Edge"})), 
        React.createElement("div", {className: "item"}, React.createElement("img", {src: "http://tinhwrl.beta.apk.vn/assets/images/fullimage4.jpg", alt: "The Last of us"})), 
        React.createElement("div", {className: "item"}, React.createElement("img", {src: "http://tinhwrl.beta.apk.vn/assets/images/fullimage3.jpg", alt: "GTA V"})), 
        React.createElement("div", {className: "item"}, React.createElement("img", {src: "http://tinhwrl.beta.apk.vn/assets/images/fullimage1.jpg", alt: "Mirror Edge"}))
      )
    );
  }
})



var Home = React.createClass({displayName: 'Home',

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "loading"}, 
          React.createElement("h5", null, "Đang tải ", React.createElement("img", {src: "img/ajax-loader.gif"}), " ")
        ), 
        /* Status bar overlay for fullscreen mode*/
        /* Panels overlay*/
        React.createElement("div", {className: "panel-overlay"}), 
        /* Left panel with reveal effect*/
        React.createElement("div", {className: "panel panel-left panel-reveal"}, 
          React.createElement("div", {className: "content-block"}, 
            React.createElement("p", null, "Left panel content goes here")
          )
        ), 
        /* Views*/
        React.createElement("div", {className: "views"}, 
          /* Your main view, should have "view-main" class*/
          React.createElement("div", {className: "view view-main"}, 
            /* Top Navbar*/
            React.createElement(Navbar, null), 
              /* Pages, because we need fixed-through navbar and toolbar, it has additional appropriate classes*/
              React.createElement("div", {className: "pages navbar-through toolbar-through"}, 
                /* Index Page*/
                React.createElement("div", {'data-page': "index", className: "page"}, 
                  /* Scrollable page content*/
                  React.createElement("div", {className: "page-content"}, 
                    React.createElement(Banner, null), 
                      React.createElement("a", {href: "#", className: "btn_store"}, " Tải store miễn phí "), 
                      React.createElement("div", {className: "content-block-title"}, "Ứng dụng mới nhất"), 
                      React.createElement("div", {className: "list-block media-list lst_item"}, 
                        React.createElement("ul", null, 
                          React.createElement("li", null, 
                            React.createElement("a", {href: "#", className: "item-link item-content"}, 
                              React.createElement("div", {className: "item-media"}, React.createElement("img", {src: "http://demo.beta.apk.vn/static/images/2014/11/17/1416185720/1416185720.jpg", width: 80})), 
                              React.createElement("div", {className: "item-inner"}, 
                                React.createElement("div", {className: "item-title-row"}, 
                                  React.createElement("div", {className: "item-title"}, "Yellow Submarine"), 
                                  React.createElement("div", {className: "item-after"}, React.createElement("span", {className: " btn-download"}, "Cài đặt +"))
                                ), 
                                React.createElement("div", {className: "item-subtitle"}, "lượt tải(100+)"), 
                                React.createElement("div", {className: "item-text"}, "Lorem ipsum dolor sit amet...")
                              )
                            )
                          )
                        )
                      ), 
                      React.createElement("a", {className: "btn-view"}, "Xem thêm"), 
                      React.createElement("div", {className: "clear"})
                    )
                )
                /* About Page*/
                /* Services Page*/
                /* Form Page*/
              ), 
              /* Bottom Toolbar*/
              React.createElement(Toolbar, null)
              )
        )
      )
    );
  }
});