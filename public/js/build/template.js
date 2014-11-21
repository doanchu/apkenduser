var Navigation = ReactRouter.Navigation;

var Navbar = React.createClass({displayName: 'Navbar',
  back: function(e) {
    e.preventDefault();
    window.history.back();
  },  
	render: function() {
return (

      React.createElement("div", {className: "navbar"}, 
        /* Navbar inner for Index page*/
        React.createElement("div", {'data-page': "index", className: "navbar-inner"}, 
          React.createElement("div", {className: "left"}, 
            /* Right link contains only icon - additional "icon-only" class*//* Right link contains only icon - additional "icon-only" class*/React.createElement("a", {href: "", onClick: this.back, className: "link icon-only open-panel"}, "  ", React.createElement("i", {className: "glyph-icon flaticon-left216"})
                  )
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
          React.createElement(Link, {to: "/top/downloads", className: this.props.route == "/top/downloads" || this.props.route == "/top/standings" ? "tab-link active" : "tab-link "}, React.createElement("i", {className: "glyph-icon flaticon-list88"})), 
          React.createElement(Link, {to: "/app/categories", className: this.props.route == "/app/categories" ? "tab-link active" : "tab-link "}, React.createElement("i", {className: "glyph-icon flaticon-menu55"})), 
          React.createElement(Link, {to: "/app/search", className: this.props.route == "/app/search" ? "tab-link active" : "tab-link "}, React.createElement("i", {className: "glyph-icon flaticon-search100"}))
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
    var currentTarget = e.currentTarget;
    if (document.partner == "duyhungws") {
      alert("http://127.0.0.1:11793/download?partner=" + document.partner + "&app_id=" + this.props.appId);
    }
    $.ajax({
      url: "http://127.0.0.1:11793/download?partner=" + document.partner + "&app_id=" + this.props.appId,
      jsonp: "callback",
      dataType: "jsonp",
      target: currentTarget,
      timeout: 3000,
      success: function(response) {
        if (response.status == -1) {          
          window.location.href = this.target.getAttribute("href");
        }
      }, 
      error: function(jqXHR, textStatus, errorThrown) {                
        window.location.href = this.target.getAttribute("href");
      }  
    });       
    return false;
  },
  render: function() {
    return (
    React.createElement("li", null, 
      React.createElement("a", {href: "/app/" + this.props.appId + ".html", className: "item-link item-content"}, 
        React.createElement("div", {className: "item-media"}, React.createElement("img", {src: this.props.thumbnail, width: 80})), 
        React.createElement("div", {className: "item-inner"}, 
          React.createElement("div", {className: "item-title-row"}, 
            React.createElement("div", {className: "item-title"}, this.props.name), 
            React.createElement("div", {className: "item-after", onClick: this.handleDownload, href: "/app/cdownload/" + document.partner + "/" + this.props.appId, style: {zIndex: '6000'}})
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
  getInitialState: function() {
    return {data: [], page: 1, title: this.props.title, hasMore: true};
  },
  getMoreContent: function() {    
    var page = this.state.page + 1; 
    // var prefix = "/api/apps-partner/";
    // if (this.props.route == "/") {
    //   prefix = "/api/apps-partner/";
    // } else if (this.props.route == "topdownload" || this.props.route == "/top/downloads") {
    //   prefix = "/api/apps-download/";
    // } else if (this.props.route == "standings" || this.props.route == "/top/standings") {
    //   prefix = "/api/apps-like/";
    // }      
    //var url = prefix + document.partner + "/" + page + "/10";
    var url = this.props.url + "/" + page + "/10";        
    $("#loading").css("display", "block");
    $.get(url, function(result) {  
      $("#loading").css("display", "none");
      if (this.isMounted()) {
        if (result != null && $.isArray(result) && result.length > 0) {
          var newData = this.state.data.concat(result)
          this.setState({data: newData, page: page, hasMore: true})
        } else {
          this.setState({data: this.state.data, page: page, hasMore: false});
        }
      }
    }.bind(this))    
  },    
  componentWillReceiveProps: function(nextProps) {    
    if (nextProps.url) {
      $("#loading").css("display", "block");     
      //var url = prefix + document.partner + "/1/10";    
      var url = nextProps.url + "/1/10";             
      $.get(url, function(result) {      
        $("#loading").css("display", "none");
        var more = false;        
        if (result != null && result.length > 0) {
          more = true;
        }
        if (this.isMounted()) {
          this.setState({data: result, page: 1, hasMore: more})
        }
      }.bind(this))          
    }
  },
  componentDidMount: function() {    
    // var prefix = "/api/apps-partner/";
    // if (this.props.route == "/") {
    //   prefix = "/api/apps-partner/";
    // } else if (this.props.route == "topdownload" || this.props.route == "/top/downloads") {
    //   prefix = "/api/apps-download/";
    // } else if (this.props.route == "standings" || this.props.route == "/top/standings") {
    //   prefix = "/api/apps-like/";
    // }     
    $("#loading").css("display", "block");     
    //var url = prefix + document.partner + "/1/10";    
    var url = this.props.url + "/1/10";           
    $.get(url, function(result) {      
      $("#loading").css("display", "none");
      if (this.isMounted()) {
        this.setState({data: result})
      }
    }.bind(this))
  },  
  render: function() {  
    var title = "";
    if (this.state.title) {
     title = React.createElement("div", {className: "content-block-title"}, this.state.title)     
    }    
    var iscategory = this.props.iscategory;
    var categoryName = "";
    var items = this.state.data.map(function(item){
      if (item != null) {
        if (iscategory == "true") {
          categoryName = item.cname;
        }
        return (
          React.createElement(Item, {appId: item.id, name: item.name, downloads: item.total_download, cname: item.cname, thumbnail: item.thumbnail})
        );
      }
    })    
    var more = React.createElement("a", {className: "btn-view", onClick: this.getMoreContent}, "Xem thêm");     
    //alert(this.state.hasMore);
    if (this.state.hasMore == false) {
      more = "";
    }
    if (items.length == 0) {
      if (this.props.url.indexOf("/app/search/") != -1) {
        title = React.createElement("div", {className: "content-block-title"}, "Không tìm thấy ứng dụng nào");
        more = "";
      }
    }  
    if (iscategory == "true") {
      title = React.createElement("div", {className: "content-block-title"}, categoryName);
    }

    return (
      React.createElement("div", null, 
title, 
React.createElement("div", {className: "list-block media-list lst_item"}, 
                    React.createElement("ul", null, 
items
                    )
                  ), 
                  more
      )
      )
  }
});


var TopDownloads = React.createClass({displayName: 'TopDownloads',
  render: function() {
    return (React.createElement(TopApp, {route: "/top/downloads"}))
  }
})

var TopStandings = React.createClass({displayName: 'TopStandings',
  render: function() {
    return (React.createElement(TopApp, {route: "/top/standings"}))
  }
})

var TopNew = React.createClass({displayName: 'TopNew',
  render: function() {
    return (React.createElement(TopApp, {route: "/top/new"}))
  }
})

var TopApp = React.createClass({displayName: 'TopApp',
  componentDidMount: function() {    
  },
  render: function() {      
    var url = "/api/apps-partner/" + document.partner + "/";
    if (this.props.route == "/top/downloads") {
      url = "/api/apps-download/" + document.partner + "/";
    } if (this.props.route == "/top/standings") {
      url = "/api/apps-like/" + document.partner + "/";
    } if (this.props.route == "/top/new") {
      url = "/api/apps-partner/" + document.partner + "/";  
    }
return (
      React.createElement("div", {style: {height: '100%'}}, 
        React.createElement("div", {className: "loading", id: "loading"}, 
          React.createElement("h5", null, "Đang tải ", React.createElement("img", {src: "/img/ajax-loader.gif"}), " ")
        ), 
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
                  React.createElement(DownloadStoreButton, null), 
                  React.createElement("div", {className: "lst_topapp"}, 
                    React.createElement("div", {className: "content-block"}, 
                      /* Buttons row as tabs controller */
                      React.createElement("div", {className: "buttons-row"}, 
                        /* Link to 1st tab, active */
                         React.createElement(Link, {to: "/top/downloads", className: this.props.route == "/top/downloads" ? "ttab-link active button" : "tab-link button"}, "Tải nhiều"), 
                         React.createElement(Link, {to: "/top/standings", className: this.props.route == "/top/standings" ? "ttab-link active button" : "tab-link button"}, "Ưa thích"), 
                         React.createElement(Link, {to: "/top/new", className: this.props.route == "/top/new" ? "ttab-link active button" : "tab-link button"}, "Mới nhất")
                        /* Link to 3rd tab */
                      )
                    ), 
                    /* Tabs, tabs wrapper */
                    React.createElement("div", {className: "tabs"}, 
                      /* Tab 1, active by default */
                      React.createElement("div", {id: "tab1", className: "tab active"}, 
                        React.createElement("div", {className: "content-block"}, 
                          React.createElement(ItemList, {url: url, title: "", route: this.props.route}), 
                          React.createElement("div", {className: "clear"})
                        )
                      )
                    )
                  ), 
                  React.createElement("div", {className: "clear"})
                )
              )
            ), 

            React.createElement(Toolbar, {route: this.props.route})
          )
        )
      )    
      );    
  }
});

var Search = React.createClass({displayName: 'Search',
  render: function() {
    
  }
})


var Home = React.createClass({displayName: 'Home',
  // getInitialState: function() {
  //   return {data: [], page: 1}
  // },  
  // getMoreContent: function() {    
  //   var page = this.state.page + 1; 
  //   var prefix = "/api/apps-partner/";
  //   if (this.props.route == "home") {
  //     prefix = "/api/apps-partner/";
  //   } else if (this.props.route == "topdownload" || this.props.route == "/top/download") {
  //     prefix = "/api/apps-download/";
  //   } else if (this.props.route == "standings") {
  //     prefix = "/api/apps-like/";
  //   }      
  //   var url = prefix + document.partner + "/" + page + "/10";
  //   $.get(url, function(result) {      
  //     if (this.isMounted()) {
  //       if (result != null && $.isArray(result) && result.length > 0) {
  //         var newData = this.state.data.concat(result)
  //         this.setState({data: newData, page: page})
  //       }
  //     }
  //   }.bind(this))    
  // },  
  // componentDidMount: function() {
  //   var prefix = "/api/apps-partner/";
  //   if (this.props.route == "home") {
  //     prefix = "/api/apps-partner/";
  //   } else if (this.props.route == "topdownload") {
  //     prefix = "/api/apps-download/";
  //   } else if (this.props.route == "standings") {
  //     prefix = "/api/apps-like/";
  //   }       
  //   var url = prefix + document.partner + "/1/10";    
  //   $.get(url, function(result) {      
  //     if (this.isMounted()) {
  //       this.setState({data: result})
  //     }
  //   }.bind(this))
  // },
  render: function() {
    var url = "/api/apps-partner/" + document.partner + "/";
 return (
      React.createElement("div", {style: {height: '100%'}}, 
        React.createElement("div", {className: "loading", id: "loading"}, 
          React.createElement("h5", null, "Đang tải ", React.createElement("img", {src: "/img/ajax-loader.gif"}), " ")
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
                  React.createElement(ItemList, {url: url, title: "Ứng dụng mới nhất", route: this.props.route}), 
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


var AppSearchHeader = React.createClass({displayName: 'AppSearchHeader',
  getInitialState: function() {
    return {query: this.props.query};
  },  
  submit: function(e) {
    e.preventDefault();    
    this.props.submit(this.state.query);
  },
  search: function(e) {
    e.preventDefault(); 
    this.setState({query: e.target.value})
    //var query = "/app/search/" + this.props.params.query;
  },
  back: function(e) {
    e.preventDefault();
    window.history.back();
  },
  render: function() {
    return (
            React.createElement("div", {className: "navbar"}, 
              /* Navbar inner for Index page*/
              React.createElement("div", {'data-page': "index", className: "navbar-inner"}, 
                React.createElement("div", {className: "left"}, 
                  /* Right link contains only icon - additional "icon-only" class*/React.createElement("a", {href: "", onClick: this.back, className: "link icon-only open-panel"}, "  ", React.createElement("i", {className: "glyph-icon flaticon-left216"})
                  )
                ), 
                React.createElement("form", {'data-search-list': ".list-block-search", 'data-search-in': ".item-title", className: "searchbar", onSubmit: this.submit}, 
                  React.createElement("div", {className: "searchbar-input"}, 
                    React.createElement("input", {type: "search", placeholder: "Nhập từ khóa tìm kiếm", value: this.state.query, onChange: this.search}), React.createElement("a", {href: "#", className: "searchbar-clear"})
                  ), React.createElement("a", {href: "#", className: "searchbar-cancel"}, "Cancel")
                )
              )
            )      
      );
  }
})

var AppSearch = React.createClass({displayName: 'AppSearch',
  getInitialState: function() {
    return {query: ""};
  },
  submit: function(query) {    
    this.setState({"query": query});
  },
  render: function() {            
    var list = "Nhập vào từ khoá tìm kiếm";
    if (this.state.query) {
      var url = "/app/search/" + this.state.query;            
      // var url = prefix + "/1/10";    
      list = React.createElement(ItemList, {url: url, title: "Kết quả tìm kiếm", route: this.props.route})
    } else {
      url = "/api/apps-like/" + document.partner + "/";
      list = React.createElement(ItemList, {url: url, title: "Các ứng dụng hot nhất", route: this.props.route})
    }    
    return (
      React.createElement("div", {style: {height: '100%'}}, 
        React.createElement("div", {className: "loading", id: "loading"}, 
          React.createElement("h5", null, "Đang tải ", React.createElement("img", {src: "/img/ajax-loader.gif"}), " ")
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
React.createElement(AppSearchHeader, {query: this.state.query, submit: this.submit}), 
            /* Pages, because we need fixed-through navbar and toolbar, it has additional appropriate classes*/
            React.createElement("div", {className: "pages navbar-through toolbar-through"}, 
              /* Index Page*/
              React.createElement("div", {'data-page': "index", className: "page"}, 
                /* Scrollable page content*/
                React.createElement("div", {className: "page-content"}, 
                  list, 
                  React.createElement("div", {className: "clear"})
                )
              )
              /* About Page*/
              /* Services Page*/
              /* Form Page*/
            ), 
            /* Bottom Toolbar*/
            React.createElement(Toolbar, {route: this.props.route})
          )
        )
      )
    );
  }
});

var AppDetails = React.createClass({displayName: 'AppDetails',
  handleDownload: function(e) {
    e.preventDefault();     
    var currentTarget = e.currentTarget;
    if (document.partner == "duyhứngws") {
      alert("http://127.0.0.1:11793/download?partner=" + document.partner + "&app_id=" + this.state.data.appId);
    }
    $.ajax({
      url: "http://127.0.0.1:11793/download?partner=" + document.partner + "&app_id=" + this.state.data.appId,
      jsonp: "callback",
      dataType: "jsonp",
      target: currentTarget,
      timeout: 3000,
      success: function(response) {
        if (response.status == -1) {          
          window.location.href = this.target.getAttribute("href");
        }
      }, 
      error: function(jqXHR, textStatus, errorThrown) {                
        window.location.href = this.target.getAttribute("href");
      }  
    });       
    return false;
  },  
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
      desc: "",
      id: this.props.params.appId
    }}
  },
  show_hide: function() {
    
    var descItem = $("#appDesc");

    if (descItem.attr("data-showing") == "hidden") {
      descItem.attr("data-showing", "shown");
      descItem.css("height", "auto");
    } else {
      descItem.attr("data-showing", "hidden");
      descItem.css("height", "0px");
    }    
  },
  handleDownload: function() {

  },
  componentDidMount: function() {


    var url = "/api/app/" + document.partner + "/" + this.props.params.appId;
    $.get(url, function(result) {      
      if (this.isMounted()) {                
        this.setState({data: result})        
      }
    }.bind(this))    

  },  
  componentDidUpdate: function() {
    $("#owl-demo").owlCarousel({
   
        autoplay:true,
        autoplayTimeout:1000,
        autoplayHoverPause:true,
        singleItem:false,
        pagination:false,
        autoHeight: true,
       
        // "singleItem:true" is a shortcut for:
         items : 1, 
         itemsDesktop : false,
         itemsDesktopSmall : false,
         itemsTablet: false,
         itemsMobile : false
   
    });
  },
  showInfo: function() {
    $("#infoLink").addClass("active");
    $("#infoTab").addClass("active");
    $("#ratingLink").removeClass("active");
    $("#ratingTab").removeClass("active");

  },
  showRating: function() {
    $("#ratingLink").addClass("active");
    $("#ratingTab").addClass("active");
    $("#infoLink").removeClass("active");
    $("#infoTab").removeClass("active");
  },    
  render: function() {    
    var downloadLink = "/app/cdownload/" + document.partner + "/" + this.state.data.id;
    var screenShots = this.state.data.ss.map(function(item){
      if (item != null) {
        return (
          React.createElement("div", {className: "item"}, React.createElement("img", {src: item, alt: "The Last of us"}))
        );
      }
    })        
    
    return (
      React.createElement("div", {style: {height: "100%"}}, 
        React.createElement("div", {className: "loading", id: "loading"}, 
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
                React.createElement("div", {className: "page-content "}, 
                  React.createElement("div", {className: "detailt-app"}, 
                    React.createElement("div", {className: "list-block media-list lst_item"}, 
                      React.createElement("ul", null, 
                        React.createElement("li", null, 
                          React.createElement("div", {href: "#", className: "item-link item-content"}, 
                            React.createElement("div", {className: "item-media"}, React.createElement("img", {src: this.state.data.thumbnail})), 
                            React.createElement("div", {className: "item-inner"}, 
                              React.createElement("div", {className: "item-title-row"}, 
                                React.createElement("div", {className: "item-titles"}, this.state.data.name)
                              ), 
                              React.createElement("div", {className: "item-subtitle"}, this.state.data.cname), 
                              React.createElement("div", {className: "item-text"}, React.createElement("i", {className: "glyph-icon flaticon-download166"}), " ", this.state.data.total_download)
                            )
                          ), 
                          React.createElement("a", {className: "btn-download", className: " btn-download", href: downloadLink}, " Cài đặt +")
                        )
                      )
                    )
                  ), 
                  React.createElement("div", {className: "lst_topapp"}, 
                    React.createElement("div", {className: "content-block"}, 
                      /* Buttons row as tabs controller */
                      React.createElement("div", {className: "buttons-row"}, 
                        /* Link to 1st tab, active */
                        React.createElement("a", {className: "tab-link active button", id: "infoLink", onClick: this.showInfo}, "Thông tin"), 
                        /* Link to 2nd tab */
                        React.createElement("a", {className: "tab-link button", id: "ratingLink", onClick: this.showRating}, "Đánh giá")
                        /* Link to 3rd tab */
                      )
                    ), 
                    /* Tabs, tabs wrapper */
                    React.createElement("div", {className: "tabs"}, 
                      /* Tab 1, active by default */
                      React.createElement("div", {id: "infoTab", className: "tab active"}, 
                        React.createElement("div", {className: "content-block info-app"}, 
                          React.createElement("div", {className: "row"}, 
                            React.createElement("div", {id: "owl-demo", className: "owl-carousel owl-theme"}, 
                           screenShots
                            )
                          ), 
                          React.createElement("div", {className: "list-block"}, 
                            React.createElement("ul", null, 
                              React.createElement("li", {className: "accordion-item"}, React.createElement("a", {href: "#", className: "item-content item-link", onClick: this.show_hide}, 
                                  React.createElement("div", {className: "item-inner"}, 
                                    React.createElement("div", {className: "item-title"}, "Bấm vào đây để xem mô tả")
                                  )), 
                                React.createElement("div", {className: "accordion-item-content", id: "appDesc", 'data-showing': "hidden"}, 
                                  React.createElement("div", {className: "content-block content-app", dangerouslySetInnerHTML: {__html: this.state.data.desc}}
                                  )
                                )
                              )
                            )
                          ), 
                          React.createElement("a", {className: "btn-view", href: downloadLink, onClick: this.handleDownload}, "Cài đặt")

                        )
                      ), 
                      React.createElement("div", {id: "ratingTab", className: "tab"}, 
                      React.createElement(RatingTab, {appId: this.state.data.id})
                      )
                    )
                  )
                )
              )
            )
            /* About Page*/
            /* Services Page*/
            /* Form Page*/
          ), 
          /* Bottom Toolbar*/
          React.createElement(Toolbar, {route: "/app/details"})
        )
      )
    );
  }
})


var CommentItem = React.createClass({displayName: 'CommentItem',
  render: function() {
    return (
              React.createElement("li", null, 
                React.createElement("div", {className: "item-content"}, 
                  React.createElement("div", {className: "item-media"}, React.createElement("i", {className: "glyph-icon flaticon-user158"}), " "), 
                  React.createElement("div", {className: "item-inner"}, 
                    React.createElement("div", {className: "item-title-row"}, 
                      React.createElement("div", {className: "item-title"}, this.props.name)
                    ), 
                    React.createElement("div", {className: "item-subtitle"}, this.props.content)
                  )
                )
              )      
      );    
  }
})

var CommentList = React.createClass({displayName: 'CommentList',
  getInitialState: function() {
    return {data: []}
  },
  componentDidMount: function() {
     var url = "/api/comments/" + this.props.appId + "/1/10";     
     
      $.get(url, function(result) {  
        $("#loading").css("display", "none");        
        if (this.isMounted()) {
          if (result != null && $.isArray(result) && result.length > 0) {
            var newData = this.state.data.concat(result)
            this.setState({data: newData, page: 1, hasMore: true})
          } else {
            this.setState({data: this.state.data, page: 1, hasMore: false});
          }
        }
      }.bind(this))     
  },
  render: function() {
    var comments = this.state.data.map(function(item){
      if (item != null) {
        return (React.createElement(CommentItem, {name: item.name, content: item.content}))
      }
    });        

    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "list-block media-list lst_item"}, 
          React.createElement("div", {className: "content-block-title"}, "Bình luận"), 
          React.createElement("div", {className: "list-block media-list inset lst_comment"}, 
            React.createElement("ul", null, 
comments
            )
          )
        ), 
        React.createElement("a", {className: "btn-view"}, "Xem thêm")
      )
      )
  }
})

var RatingTab = React.createClass({displayName: 'RatingTab',
  show_hide: function(e) {
    e.preventDefault();
    var ratingAcc = $("#ratingAcc");
// alert(descItem.attr("data-showing"));
    if (ratingAcc.attr("data-showing") == "hidden") {
      ratingAcc.attr("data-showing", "shown");
      ratingAcc.css("height", "auto");
    } else {
      ratingAcc.attr("data-showing", "hidden");
      ratingAcc.css("height", "0px");
    }    
  },  
  like: function() {
    var likeButton = $("#likeButton");
    if (likeButton.hasClass("active")) {
      likeButton.removeClass("active");  
    } else {
      likeButton.addClass("active");  
    }
    
  },
  share: function() {
    var shareButton = $("#shareButton");
    shareButton.addClass("active");  
  },
  render: function() {    
return (

      React.createElement("div", {className: "content-block"}, 
        React.createElement("div", {className: "list-block media-list lst_item"}, 
          React.createElement("div", {className: "row lst_vote"}, 
            React.createElement("div", {id: "shareButton", className: "col-50 item"}, 
              React.createElement("a", {href: "#", onClick: this.share}, 
                React.createElement("i", {className: "glyph-icon flaticon-share39"}), 
                React.createElement("span", null, "Chia sẻ")
              )
            ), 
            React.createElement("div", {id: "likeButton", className: "col-50 item"}, 
              React.createElement("a", {href: "#", onClick: this.like}, 
                React.createElement("i", {className: "glyph-icon flaticon-thumb54"}), React.createElement("span", null, " Thích")
              )
            )
          )
        ), 
        React.createElement("div", {className: "content-block box-comment"}, 
          React.createElement("div", {className: "list-block"}, 
            React.createElement("ul", null, 
              React.createElement("li", {className: "accordion-item"}, 
                React.createElement("a", {href: "#", className: "item-content item-link", onClick: this.show_hide}, 
                  React.createElement("div", {className: "item-inner"}, 
                    React.createElement("div", {className: "item-title"}, "Bấm vào đây để bình luận")
                  )
                ), 
                React.createElement("div", {className: "accordion-item-content", id: "ratingAcc", 'data-showing': "hidden"}, 
                  React.createElement("div", {className: "content-block"}, 
                    React.createElement("div", {className: "list-block"}, 
                      React.createElement("ul", null, 
                        /* Text inputs */
                        React.createElement("li", null, 
                          React.createElement("div", {className: "item-content"}, 
                            React.createElement("div", {className: "item-media"}), 
                            React.createElement("div", {className: "item-inner"}, 
                              React.createElement("div", {className: "item-title label"}, "Tên"), 
                              React.createElement("div", {className: "item-input"}, 
                                React.createElement("input", {type: "text", placeholder: "..."})
                              )
                            )
                          )
                        ), 
                        React.createElement("li", null, 
                          React.createElement("div", {className: "item-content"}, 
                            React.createElement("div", {className: "item-media"}), 
                            React.createElement("div", {className: "item-inner"}, 
                              React.createElement("div", {className: "item-title label"}, "Tiêu đề"), 
                              React.createElement("div", {className: "item-input"}, 
                                React.createElement("input", {type: "text", placeholder: "..."})
                              )
                            )
                          )
                        ), 
                        React.createElement("li", null, 
                          React.createElement("div", {className: "item-content"}, 
                            React.createElement("div", {className: "item-media"}), 
                            React.createElement("div", {className: "item-inner"}, 
                              React.createElement("div", {className: "item-title label"}, "Nội dung"), 
                              React.createElement("div", {className: "item-input"}, 
                                React.createElement("textarea", {placeholder: "..."})
                              )
                            )
                          )
                        ), 
                        React.createElement("button", {className: "btn_send_comment", type: ""}, "Gửi")
                      )
                    ), 
                    React.createElement("br", null)
                  )
                )
              )
            )
          )
        ), 
React.createElement(CommentList, {appId: this.props.appId}), 
        React.createElement("div", {className: "clear"})
      )
    );    
  }
})

var CategoryItem = React.createClass({displayName: 'CategoryItem',
  render: function() {
    return (
      React.createElement("div", {className: "col-33 item"}, 
        React.createElement(Link, {to: "/app/category/" + this.props.id}, 
          React.createElement("img", {src: this.props.icon}), 
          React.createElement("span", null, this.props.name)
        )
      )
      )    
  }
});

var CategoriesList = React.createClass({displayName: 'CategoriesList',
  getInitialState: function() {
    return {data:[{name: "Game online", icon: "http://image.sangame.net/images/2014/04/10/O8Yeh.png"}]}
  },
  componentDidMount: function() {
    // }     
    $("#loading").css("display", "block");     
    //var url = prefix + document.partner + "/1/10";    
    var url = "/api/categories";
    $.get(url, function(result) {      
      $("#loading").css("display", "none");
      if (this.isMounted()) {
        this.setState({data: result})
      }
    }.bind(this))
  },
  render: function() {
    var items = this.state.data.map(function(item){
      if (item != null) {
        return (
          React.createElement(CategoryItem, {icon: item.icon, name: item.name, id: item.id})
        );
      }
    }) 

    return (
      React.createElement("div", {className: "row lst_category"}, 
        items
      )

      )   

  }
});

var Categories = React.createClass({displayName: 'Categories',
render: function() {
    return (
      React.createElement("div", {style: {height: '100%'}}, 
        React.createElement("div", {className: "loading", id: "loading"}, 
          React.createElement("h5", null, "Đang tải ", React.createElement("img", {src: "/img/ajax-loader.gif"}), " ")
        ), 
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
                  React.createElement(DownloadStoreButton, null), 
                  React.createElement("div", {className: "content-block-title title_category"}, "Danh mục ứng dụng"), 
                  React.createElement(CategoriesList, null)
                )
              )
              /* About Page*/
              /* Services Page*/
              /* Form Page*/
            ), 
            /* Bottom Toolbar*/
            React.createElement(Toolbar, {route: "/app/categories"})
          )
        )
      )
    );
  }  
})

var AppCategory = React.createClass({displayName: 'AppCategory',
render: function() {
    var url = "/api/apps-category/" + document.partner + "/" + this.props.params.cid + "/";
    return (      
      React.createElement("div", {style: {height: "100%"}}, 
        React.createElement("div", {className: "loading", id: "loading"}, 
          React.createElement("h5", null, "Đang tải ", React.createElement("img", {src: "img/ajax-loader.gif"}), " ")
        ), 

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
              React.createElement("div", {'data-page': "index", className: "page detailt-colection"}, 
                /* Scrollable page content*/
                React.createElement("div", {className: "page-content"}, 
                  React.createElement(DownloadStoreButton, null), 
                  React.createElement(ItemList, {url: url, title: "", iscategory: "true"}), 
                  React.createElement("div", {className: "clear"})
                )
              )
              /* About Page*/
              /* Services Page*/
              /* Form Page*/
            ), 
            /* Bottom Toolbar*/
            React.createElement(Toolbar, {route: "/app/category"})
          )
        )
      )
    );
  }})
