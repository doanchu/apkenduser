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
          React.createElement(Link, {to: "/", className: this.props.route == "home" ? "tab-link active" : "tab-link "}, React.createElement("i", {className: "glyph-icon flaticon-home149"})), 
          React.createElement("a", {href: "#view-2", className: "tab-link"}, React.createElement("i", {className: "glyph-icon flaticon-list88"})), 
          React.createElement("a", {href: "#view-3", className: "tab-link"}, React.createElement("i", {className: "glyph-icon flaticon-show6"})), 
          React.createElement("a", {href: "#view-4", className: "tab-link"}, React.createElement("i", {className: "glyph-icon flaticon-search100"}))
        )
      )
    );
  }
});


var DownloadStoreButton = React.createClass({displayName: 'DownloadStoreButton',
  render: function() {
    return (React.createElement("a", {href: "http://beta.apk.vn/store/download/" + document.partner, className: "btn_store"}, " Tải store miễn phí "));                  
  }
})
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


var Item = React.createClass({displayName: 'Item',
  handleDownload: function(e) {
    e.preventDefault();
    window.location.href = e.currentTarget.getAttribute("href");
    return false;
  },
  render: function() {
    return (
    React.createElement("li", null, 
      React.createElement("a", {href: "", className: "item-link item-content"}, 
        React.createElement("div", {className: "item-media"}, React.createElement("img", {src: this.props.thumbnail, width: 80})), 
        React.createElement("div", {className: "item-inner"}, 
          React.createElement("div", {className: "item-title-row"}, 
            React.createElement("div", {className: "item-title"}, this.props.name), 
            React.createElement("div", {className: "item-after"}, React.createElement("span", {onClick: this.handleDownload, className: " btn-download", href: "/app/download/" + document.partner + "/" + this.props.appId}, "Cài đặt +"))
          ), 
          React.createElement("div", {className: "item-subtitle"}, this.props.downloads, " Lượt Tải"), 
          React.createElement("div", {className: "item-text"}, this.props.cname)
        )
      )
    )    
    );
  }
});

var ItemList = React.createClass({displayName: 'ItemList',
  render: function() {
    var title = "";
    if (this.props.title) {
     title = React.createElement("div", {className: "content-block-title"}, this.props.title)     
    }
    var items = this.props.data.map(function(item){
      if (item != null) {
        return (
          React.createElement(Item, {appId: item.id, name: item.name, downloads: item.total_download, cname: item.cname, thumbnail: item.thumbnail})
        );
      }
    })    
    return (
      React.createElement("div", null, 
title, 
React.createElement("div", {className: "list-block media-list lst_item"}, 
                    React.createElement("ul", null, 
items
                    )
                  ), 
                  React.createElement("a", {className: "btn-view", onClick: this.props.onGetMoreContentClick}, "Xem thêm")
      )
      )
  }
});


var TopApp = React.createClass({displayName: 'TopApp',
  render: function() {
return (
      React.createElement("div", {style: {height: '100%'}}, 
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
                  React.createElement("a", {href: "#", className: "btn_store"}, " Tải store miễn phí "), 
                  React.createElement("div", {className: "lst_topapp"}, 
                    React.createElement("div", {className: "content-block"}, 
                      /* Buttons row as tabs controller */
                      React.createElement("div", {className: "buttons-row"}, 
                        /* Link to 1st tab, active */
                        React.createElement("a", {href: "#tab1", className: "tab-link active button"}, "Mới nhất"), 
                        /* Link to 2nd tab */
                        React.createElement("a", {href: "#tab2", className: "tab-link button"}, "Tải nhiều"), 
                        /* Link to 3rd tab */
                        React.createElement("a", {href: "#tab3", className: "tab-link button"}, "Yêu thích")
                      )
                    ), 
                    /* Tabs, tabs wrapper */
                    React.createElement("div", {className: "tabs"}, 
                      /* Tab 1, active by default */
                      React.createElement("div", {id: "tab1", className: "tab active"}, 
                        React.createElement("div", {className: "content-block"}, 
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
                                    React.createElement("div", {className: "item-subtitle"}, "Game thuần việt"), 
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
                      /* Tab 2 */
                      /* Tab 3 */
                    )
                  ), 
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


var Home = React.createClass({displayName: 'Home',
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
    var url = prefix + document.partner + "/" + page + "/10";
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
      React.createElement("div", {style: {height: '100%'}}, 
        React.createElement("div", {className: "loading", display: "block"}, 
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
                  React.createElement(DownloadStoreButton, null), 
                  React.createElement(ItemList, {title: "Ứng dụng mới nhất", data: this.state.data, onGetMoreContentClick: this.getMoreContent}), 
                  React.createElement("div", {className: "clear"})
                )
              )
              /* About Page*/
              /* Services Page*/
              /* Form Page*/
            ), 
            /* Bottom Toolbar*/
React.createElement(Toolbar, {route: "home"})
          )
        )
      )
    );
  }
});