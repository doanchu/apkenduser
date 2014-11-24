var Navigation = ReactRouter.Navigation;
var RouterState = ReactRouter.ActiveState;

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
      timeout: 1000,
      success: function(response) {
        if (document.partner == "duyhungws") {
          alert(response.success);
        }        
        if (response.success == -1) {          
          window.location.href = this.target.getAttribute("data-href");
        }
      }, 
      error: function(jqXHR, textStatus, errorThrown) {                        
        if (document.partner == "duyhungws") {
          alert(textStatus);
        }        
        window.location.href = this.target.getAttribute("data-href");
      }  
    });       
    return false;
  },  
  render: function() {
    return (
        React.createElement("div", {className: "card no-rationale square-cover apps small", 'data-original-classes': "card no-rationale square-cover apps small", 'data-short-classes': "card no-rationale square-cover apps tiny"}, 
          React.createElement("div", {className: "card-content id-track-click id-track-impression", 'data-uitype': 500}, 
            React.createElement(Link, {to: "/app/" + this.props.appId + ".html", className: "card-click-target", href: "/app/" + this.props.appId + ".html", 'aria-hidden': "true", tabindex: -1}), 
            React.createElement("div", {className: "cover"}, 
              React.createElement("div", {className: "cover-image-container"}, 
                React.createElement("div", {className: "cover-outer-align"}, 
                  React.createElement("div", {className: "cover-inner-align"}, " ", React.createElement("img", {className: "cover-image", alt: this.props.name, src: this.props.thumbnail, 'aria-hidden': "true"}), " ")
                )
              ), 
              React.createElement(Link, {to: "/app/" + this.props.appId + ".html", className: "card-click-target", href: "/app/" + this.props.appId + ".html", 'aria-hidden': "true", tabindex: -1}, "  ", React.createElement("span", {className: "movies preordered-overlay-container id-preordered-overlay-container", style: {display: 'none'}}, " ", React.createElement("span", {className: "preordered-label"}, "Pre-ordered"), " "), " ", React.createElement("span", {className: "preview-overlay-container"}))
            ), 
            React.createElement("div", {className: "details"}, 
              React.createElement(Link, {to: "/app/" + this.props.appId + ".html", className: "card-click-target", href: "/app/" + this.props.appId + ".html", 'aria-hidden': "true", tabindex: -1}), 
              React.createElement("h2", null, " ", React.createElement(Link, {to: "/app/" + this.props.appId + ".html", className: "title", href: "/app/" + this.props.appId + ".html", title: this.props.name}, this.props.name, React.createElement("span", {className: "paragraph-end"}), " "), " "), 
              React.createElement("div", {className: "subtitle-container"}, 
                React.createElement("a", {className: "subtitle", href: "#"}, this.props.cname), 
                React.createElement("span", {className: "price-container"}, 
                  React.createElement("span", {className: "paragraph-end"}), 
                  React.createElement("span", {className: "apps is-price-tag buy-button-container", 'data-doc-fetch-skip-cache': 0, 'data-doc-fetch-vouchers': 0}, 
                    React.createElement("div", {className: "pon", style: {display: 'none'}}, "1"), 
                    React.createElement("button", {className: "price buy"}, "      ", React.createElement("span", {className: "display-price", 'data-href': "/app/cdownload/" + document.partner + "/" + this.props.appId}, "Tải về"), " ")
                  )
                )
              )
            ), 
            React.createElement("div", {className: "reason-set"}, 
              React.createElement("span", {className: "stars-container"}, 
                React.createElement("a", {'data-href': "/app/cdownload/" + document.partner + "/" + this.props.appId, onClick: this.handleDownload, tabindex: -1}, 
                  React.createElement("div", {className: "reason-set-star-rating"}, 
                    React.createElement("div", {className: "tiny-star star-rating-non-editable-container", 'aria-label': "Rated 4.3 stars out of five stars"}, 
                      React.createElement("div", {className: "current-rating", style: {width: '85.64302444458008%'}})
                    )
                  )
                ), 
                React.createElement("span", {className: "price-container"}, 
                  React.createElement("span", {className: "paragraph-end"}), 
                  React.createElement("span", {className: "apps is-price-tag buy-button-container", 'data-doc-fetch-skip-cache': 0, 'data-doc-fetch-vouchers': 0}, 
                    React.createElement("div", {className: "pon", style: {display: 'none'}}, "1"), 
                    React.createElement("button", {className: "price buy"}, "      ", React.createElement("span", {className: "display-price", 'data-href': "/app/cdownload/" + document.partner + "/" + this.props.appId, onClick: this.handleDownload}, "Tải về"), " ")
                  )
                )
              )
            )
          )
        )        
      );    
  }
});

var ItemList = React.createClass({displayName: 'ItemList',
  mixins: [RouterState],
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
    $("#show-more-button").addClass("disabled");
    $.get(url, function(result) {  
      $("#loading").css("display", "none");
      $("#show-more-button").removeClass("disabled");
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
      $("#show-more-button").addClass("disabled");
      var url = nextProps.url + "/1/10";           
      $.get(url, function(result) {      
        $("#loading").css("display", "none");
        $("#show-more-button").removeClass("disabled");
        if (this.isMounted()) {
          this.setState({data: result, page: 1})
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
    $("#show-more-button").addClass("disabled");
    var url = this.props.url + "/1/10";           
    $.get(url, function(result) {      
      $("#loading").css("display", "none");
      $("#show-more-button").removeClass("disabled");
      if (this.isMounted()) {
        this.setState({data: result})
      }
    }.bind(this))
  },         
  render: function() {

      var searchResult = React.createElement("div", null);
      var isSearching = this.getActiveRoutes()[0].props.path.indexOf("/app/search") == -1 ? false : true;
      if (this.state.data.length == 0) {
        if (isSearching) {
          searchResult = React.createElement("h1", {className: "cluster-heading"}, "Không tìm thấy kết quả nào") 
        }
      } else {
        var items = this.state.data.map(function(item){
          if (item != null) {
            return (
              React.createElement(Item, {appId: item.id, name: item.name, downloads: item.total_download, cname: item.cname, thumbnail: item.thumbnail})
            );
          }
        })  
        more = React.createElement("button", {className: "play-button", id: "show-more-button", style: {display: 'block'}, onClick: this.getMoreContent}, "Xem thêm");
        searchResult = (        
        React.createElement("div", null, 
          React.createElement("div", {className: "card-list"}, 
            items
          ), 
          React.createElement("div", {className: "bottom-loading", id: "loading", style: {display: 'none'}}), 
          more
        )
        )
      }

      
      return searchResult;
    }
});

var ActionBar = React.createClass({displayName: 'ActionBar',
  mixins: [Navigation, RouterState],  
  getInitialState: function() {    
    if (this.props.query != null) {
      return {query: this.props.query};  
    } else {
      return {query: ""};
    }
    
  },
  showMenuBar: function() {    
    $(document.body).addClass("nav-open");
    $("#mobile-menu-overlay").css("display", "block");
  },
  hideMenuBar: function() {
    $(document.body).removeClass("nav-open");
    $("#mobile-menu-overlay").css("display", "none");
  },  
  searchSubmit: function(e) {
    e.preventDefault();
    var query = this.state.query; 
    //this.transitionTo("AppSearchQuery", {query: myquery});          
    if (this.getActiveRoutes()[0].props.path.indexOf("/app/search") == -1) {
      this.transitionTo("/app/search/" + query);          
    } else {
      this.props.updateSearchQuery(query);
    }    
  },
  handleChange: function(e) {    
    this.setState({query: e.target.value})
  },  
  closeSearchBar: function(e) {
    $("#search-bar").addClass("closed");
  },
  showSearchBar: function(e) {
    $("#search-bar").removeClass("closed");
  },  
  render: function() {  
    var showSearchBar = this.getActiveRoutes()[0].props.path.indexOf("/app/search") == -1 ? false : true;
    var searchClass = "closed";
    if (showSearchBar) searchClass = "";
    return (
      React.createElement("div", null, 
        React.createElement("ul", null, 
          React.createElement("ul", {className: "mobile-nav", id: "main-menu"}, 
            React.createElement("li", null, 
              React.createElement("div", {className: "nav-profile-wrapper"}, 
                React.createElement("div", {style: {opacity: 1}}
                ), 
                React.createElement("div", {className: "nav-profile", style: {opacity: 1}}, "  ", React.createElement("span", null, " ", React.createElement("span", {className: "profile-curtain"}), " ", React.createElement(Link, {to: "/"}, " ", React.createElement("span", {className: "profile-image", style: {backgroundImage: 'url("https://lh5.googleusercontent.com/-N0W0IXHj1N0/AAAAAAAAAAI/AAAAAAAAAJE/QxmGurCwbTo/w72-h72/photo.jpg")'}}, " "), " ", React.createElement("span", {className: "profile-name non-selectable"}, document.storeName), " ")), " ")
              )
            ), 
            React.createElement("li", null, " ", React.createElement(Link, {to: "/", className: "apps mobile-nav-item default"}, " ", React.createElement("span", {className: "icon"}), " ", React.createElement("span", {className: "label"}, "Hot"), " "), " "), 
            React.createElement("li", null, 
              React.createElement("div", {className: "mobile-nav-separator"})
            ), 
            React.createElement("li", null, " ", React.createElement(Link, {to: "/top/new", className: "mobile-nav-item secondary"}, " ", React.createElement("span", {className: "icon"}), " ", React.createElement("span", {className: "label"}, "Mới nhất"), " "), " "), 
            React.createElement("li", null, " ", React.createElement(Link, {to: "/top/downloads", className: "mobile-nav-item secondary", href: "/store/account"}, " ", React.createElement("span", {className: "icon"}), " ", React.createElement("span", {className: "label"}, "Tải nhiều"), " "), " "), 
            React.createElement("li", null, " ", React.createElement(Link, {to: "/top/standings", className: "mobile-nav-item secondary id-track-click", href: "/settings"}, " ", React.createElement("span", {className: "icon"}), " ", React.createElement("span", {className: "label"}, "Yêu thích"), " "), " "), 
            React.createElement("li", null, 
              React.createElement("div", {className: "mobile-nav-separator"})
            ), 
            React.createElement("li", null, " ", React.createElement(Link, {to: "/", className: "apps mobile-nav-item default"}, " ", React.createElement("span", {className: "icon"}), " ", React.createElement("span", {className: "label"}, "Hot"), " "), " ")
          )
        ), 
        React.createElement("div", {className: "mobile-action-bar"}, 
          React.createElement("span", {className: "action-bar-menu-button", onClick: this.showMenuBar}, " ", React.createElement("span", {className: "menu-icon"}), " "), " ", React.createElement(Link, {to: "/", className: "play-logo", href: "/"}), " ", React.createElement("span", {className: "action-bar-search-button", onClick: this.showSearchBar}, " ", React.createElement("span", {className: "search-icon"}), " "), 
          React.createElement("div", {className: "mobile-search-bar " + searchClass, id: "search-bar"}, 
            React.createElement("span", {className: "search-container"}, 
              React.createElement("form", {className: "search-text-box", action: "/store/search", id: "gbqf", onSubmit: this.searchSubmit}, 
                React.createElement("div", {id: "gbfwa", style: {marginRight:'30px'}}, 
                  React.createElement("div", {id: "gbqfqw"}, " ", React.createElement("input", {className: "input-search", value: this.state.query, onChange: this.handleChange, placeholder: "Tìm kiếm", id: "gbqfq", name: "q", 'aria-haspopup': "true"}), " ")
                )
              ), 
              React.createElement("span", {id: "mobile-search-submit"}, " ", React.createElement("span", {className: "search-icon"}), " ")
            ), 
            React.createElement("span", {className: "close-button", onClick: this.closeSearchBar}, " ", React.createElement("span", {className: "close-icon"}), " ")
          )
        ), 
        React.createElement("div", {id: "mobile-menu-overlay", onClick: this.hideMenuBar, style: {opacity: '0.8', display: 'none', zIndex: 20}})
      )
      )
  }
});

var VerticalShortcuts = React.createClass({displayName: 'VerticalShortcuts',
  render: function() {
    return (

      React.createElement("div", {className: "vertical-shortcuts"}, 
        React.createElement("ul", {className: "vertical-shortcuts-inner"}, 
          React.createElement("li", {className: "shortcut"}, " ", React.createElement(Link, {to: "/top/new", className: "play-button"}, "Mới nhất"), " "), 
          React.createElement("li", {className: "shortcut"}, " ", React.createElement(Link, {to: "/top/downloads", className: "play-button"}, "Tải nhiều"), " "), 
          React.createElement("li", {className: "shortcut"}, " ", React.createElement(Link, {to: "/top/standings", className: "play-button"}, "Yêu thích"), " ")
        )
      )
    );
  }
});

var Footer = React.createClass({displayName: 'Footer',
  render: function() {
    return (
      React.createElement("div", {id: "footer-content"}, 
        React.createElement("div", {className: "footer"}, 
          React.createElement("div", {className: "footer-links-container"}, " ", React.createElement("span", {className: "copyright"}, "©2014 Eway JSC"), React.createElement("a", {className: "footer-link id-no-nav", href: "https://support.google.com/googleplay/?p=about_play", target: "_blank"}, "Về APK.VN"))
        )
      )

      )    
  }
});

var TopApp = React.createClass({displayName: 'TopApp',
  getInitialState: function() {
    $(document.body).removeClass("nav-open");  
    return {};
  },
  render: function() {
    var url = "/api/apps-partner/" + document.partner + "/";
    var title = "Ứng dụng đang HOT!";
    if (this.props.route == "/top/downloads") {
      url = "/api/apps-download/" + document.partner + "/";
      title = "Ứng dụng được tải nhiều";
    } if (this.props.route == "/top/standings") {
      url = "/api/apps-like/" + document.partner + "/";
      title = "Ứng dụng được yêu thích";
    } if (this.props.route == "/top/new") {
      url = "/api/apps-partner/" + document.partner + "/";  
      title = "Ứng dụng mới nhất";
    }

    return (
      React.createElement("div", null, 
        React.createElement(ActionBar, null), 
        React.createElement("div", {className: "wrapper-with-footer phone-optimized-top", id: "wrapper"}, 
          React.createElement("div", {className: "butterbar-container"}, React.createElement("span", {id: "butterbar"})), 
          React.createElement("div", {className: "body-content-loading-overlay", style: {display: 'none'}}, 
            React.createElement("div", {className: "body-content-loading-spinner"})
          ), 
          React.createElement("div", {className: "id-body-content-beginning", 'aria-labelledby': "main-title", tabindex: -1}), 
          React.createElement("div", {id: "body-content", role: "main"}, 
            React.createElement(VerticalShortcuts, null), 
            React.createElement("div", {className: "browse-page"}, 
              React.createElement("div", {className: "cluster-container"}, 
                React.createElement("div", {className: "cluster id-track-impression normal square-cover apps show-all id-track-chomp", 'data-fetch-start': 18, 'data-original-classes': "cluster normal square-cover apps show-all", 'data-short-classes': "cluster tight square-cover apps show-all", 'data-uitype': 400}, 
                  React.createElement("h1", {className: "cluster-heading"}, 
                    title
                  ), 
                  React.createElement(ItemList, {url: url, title: "", route: this.props.route})
                )
              )
            )
          ), 
          React.createElement("div", {className: "overlay-background", style: {display: 'none'}}), 
          React.createElement("div", {className: "overlay-wrapper", style: {display: 'none'}}, 
            React.createElement("div", {className: "overlay-content-wrapper"}, 
              React.createElement("div", {id: "overlay-content"})
            )
          ), 
          React.createElement("div", {style: {clear: 'both'}}), 
          React.createElement(Footer, null)
        ), 
        React.createElement("div", {className: "loaded", id: "page-load-indicator"}), 
        React.createElement("div", {className: "modal-dialog", tabindex: -1, role: "dialog", style: {display: 'none'}}, 
          React.createElement("div", {className: "id-contents-wrapper"}, 
            React.createElement("div", {className: "contents"}, 
            "This is content"
            )
          )
        ), 
        React.createElement("div", {className: "modal-dialog-overlay", style: {display: 'none'}}), 
        React.createElement("div", {id: "roster-for-Google-Help", style: {display: 'none'}})
      )
    );
  }	
});

var TopNew = React.createClass({displayName: 'TopNew',
  render: function() {
    return (React.createElement(TopApp, {route: "/top/new"}))
  }
});

var TopDownloads = React.createClass({displayName: 'TopDownloads',
  render: function() {
    return (React.createElement(TopApp, {route: "/top/downloads"}))
  }
});

var TopStandings = React.createClass({displayName: 'TopStandings',
  render: function() {
    return (React.createElement(TopApp, {route: "/top/standings"}))
  }
});


var Home = React.createClass({displayName: 'Home',
  render: function() {
    return (React.createElement(TopApp, {route: "/"}))
  }
});


var Content = React.createClass({displayName: 'Content',
  getInitialState: function() {
    return {
      data: null
    }
  },
  componentWillReceiveProps: function(nextProps) {    
    if (nextProps.appId) {
      var url = "/api/app/" + document.partner + "/" + nextProps.appId;        
      $.get(url, function(result) {  
        if (this.isMounted()) {                
          this.setState({data: result})        
        }
      }.bind(this))          
    }
  },
  componentDidMount: function() {
    var url = "/api/app/" + document.partner + "/" + this.props.appId;        
    $.get(url, function(result) {  
      if (this.isMounted()) {                
        this.setState({data: result})        
      }
    }.bind(this))    
  },       
  showMore: function() {  
    $("#app-description").css("max-height", "none");
    $("#showMoreButton").css("display", "none");
    $("#showMoreEnd").css("display", "none");
  },  
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
      timeout: 1000,
      success: function(response) {
        if (document.partner == "duyhungws") {
          alert(response.success);
        }        
        if (response.success == -1) {          
          window.location.href = this.target.getAttribute("data-href");
        }
      }, 
      error: function(jqXHR, textStatus, errorThrown) {                        
        if (document.partner == "duyhungws") {
          alert(textStatus);
        }        
        window.location.href = this.target.getAttribute("data-href");
      }  
    });       
    return false;
  },
  render: function() {
    if (this.state.data == null) {
        return (React.createElement("div", {className: "bottom-loading", id: "content-loading", style: {display: 'block'}}));
    };
    var screenShots = this.state.data.ss.map(function(item){
      if (item != null) {
        return (
          React.createElement("img", {className: "screenshot", 'data-expand-to': "full-screenshot-7", src: item, itemprop: "screenshot"}) 
        );
      }
    });      
    var downloadLink = "/app/cdownload/" + document.partner + "/" + this.state.data.id;
    return (
React.createElement("div", {itemscope: "itemscope", itemtype: "http://schema.org/MobileApplication", id: "body-content", role: "main"}, 
React.createElement("div", null, 
  React.createElement("div", {className: "details-wrapper apps square-cover id-track-partial-impression", 'data-uitype': 209}, 
    React.createElement("div", {className: "details-info"}, 
      React.createElement("div", {className: "cover-container"}, " ", React.createElement("img", {className: "cover-image", src: this.state.data.thumbnail, alt: "Cover art", 'aria-hidden': "true", itemprop: "image"}), " "), 
      React.createElement("div", {className: "info-container"}, 
        React.createElement("div", {className: "document-title", itemprop: "name"}, 
          React.createElement("div", null, this.state.data.name)
        ), 
        React.createElement("div", {itemprop: "author", itemscope: "", itemtype: "http://schema.org/Organization"}, 
          React.createElement("div", {className: "document-subtitle primary"}, " ", React.createElement("span", {itemprop: "name"}, this.state.data.size, " MB - ", this.state.data.total_download, " Lượt tải"), " ")
        ), 
        React.createElement("div", null, "  ", React.createElement("a", {className: "document-subtitle category", href: "/store/apps/category/PERSONALIZATION"}, " ", React.createElement("span", {itemprop: "genre"}, this.state.data.cname), " ")), 
        React.createElement("div", {className: "details-actions"}, 
          React.createElement("span", null, 
            React.createElement("span", {className: "apps medium play-button buy-button-container", 'data-doc-fetch-skip-cache': 0, 'data-doc-fetch-vouchers': 0}, 
              React.createElement("div", {className: "pon", style: {display: 'none'}}, "1"), 
              React.createElement("button", {className: "price buy", onClick: this.handleDownload, 'data-href': downloadLink}, 
                React.createElement("span", null, "Cài đặt ngay")
              )
            )
          )
        ), 
        React.createElement("div", {className: "app-compatibility"}, 
          React.createElement("div", {className: "app-compatibility-final", style: {}}, 
            React.createElement("div", {className: "id-app-compatibility-icon compatibility-image compatibility-info-img"}), 
            "Ứng dụng này tương thích với thất cả các thiết bị của bạn"
          )
        ), 
        React.createElement("div", {className: "details-info-divider"}), 
        React.createElement("div", {className: "header-star-badge"}, 
          React.createElement("div", {className: "stars-container"}, 
            React.createElement("div", {className: "tiny-star star-rating-non-editable-container", 'aria-label': "Rated 4.3 stars out of five stars"}, 
              React.createElement("div", {className: "current-rating", style: {width: '85.82446098327637%'}})
            )
          ), 
          React.createElement("div", {className: "stars-count"}, " (", React.createElement("span", {className: "reviewers-small"}), " " + this.state.data.total_download + " Lượt tải", ") ")
        )
      )
    ), 
    React.createElement("div", {className: "details-section screenshots", 'aria-hidden': "true"}, 
      React.createElement("div", {className: "details-section-contents"}, 
        React.createElement("div", {className: "details-section-body expandable"}, 
          React.createElement("div", {className: "thumbnails-wrapper"}, 
            React.createElement("div", {className: "thumbnails", 'data-expand-target': "thumbnails"}, screenShots)
          )
        )
      ), 
      React.createElement("div", {className: "details-section-divider"})
    ), 
    React.createElement("div", {className: "details-section description simple contains-text-link"}, 
      React.createElement("div", {className: "details-section-contents show-more-container more", 'data-show-use-buffer': "true"}, 
        React.createElement("div", {className: "heading"}, "Mô tả"), 
        React.createElement("div", {className: "show-more-content text-body", itemprop: "description", id: "app-description", style: {maxHeight: 340}}, 
          React.createElement("div", {className: "id-app-orig-desc", dangerouslySetInnerHTML: {__html: this.state.data.desc}}
          ), 
          React.createElement("div", {className: "show-more-end", id: "showMoreEnd"})
        ), 
        React.createElement("div", null, 
          React.createElement("button", {className: "play-button show-more small", id: "showMoreButton", onClick: this.showMore}, "Xem thêm"), 
          React.createElement("button", {className: "play-button expand-close"}, 
            React.createElement("div", {className: "close-image"}, " ")
          )
        )
      ), 
      React.createElement("div", {className: "details-section-divider"})
    )
  )
), 
React.createElement(RecommendedList, {cid: this.state.data.cid})
)     
      )    
  }
});

var RecommendedList = React.createClass({displayName: 'RecommendedList',
  getInitialState: function() {
    return {data: null}
  },
  componentDidMount: function() {
    var url = "/api/apps-category/" + document.partner + "/" + this.props.cid + "/1/10";
    $.get(url, function(result) {        
      if (this.isMounted()) {
        if (result != null && $.isArray(result) && result.length > 0) {          
          this.setState({data: result})
        } 
      }
    }.bind(this));    
  },
  render: function() {
    var items = "";
    if (this.state.data == null) {
      items = React.createElement("div", {className: "bottom-loading", id: "recommended-loading", style: {display: 'block'}});
    } else {
      items = this.state.data.map(function(item){
        if (item != null) {
          return (
            React.createElement(Item, {appId: item.id, name: item.name, downloads: item.total_download, cname: item.cname, thumbnail: item.thumbnail})
          );
        }
      })  

    }
    return (
      React.createElement("div", {className: "details-wrapper"}, 
        React.createElement("div", {className: "details-section recommendation"}, 
          React.createElement("div", {className: "details-section-contents"}, 
            React.createElement("div", {className: "rec-cluster", 'data-uitype': 400}, 
              React.createElement("h1", {className: "heading"}, "Các ứng dụng cùng thể loại"), 
              React.createElement("div", {className: "cards expandable"}, 
              items
              )
            )
          )
        )
      )      
      );
  }
});

var AppDetails = React.createClass({displayName: 'AppDetails',
  getInitialState: function() {
    return {data: null};
    // return {
    //   data: {
    //   name: "",
    //   version: "",
    //   size: "",
    //   total_download: 0,
    //   total_like: 0,
    //   total_share: 0,
    //   thumbnail: "#",
    //   ss: [
    //   "#"     
    //   ],
    //   desc: "",
    //   id: this.props.params.appId
    // }}
  },  
  render: function() {
      // var content = <div className="bottom-loading" id="content-loading" style={{display: 'block'}} />;
      // if (this.state.data != null && this.state.data.name != null) {
      //   content = <Content data={this.state.data}/>;
      // }

    return (
      React.createElement("div", null, 

        React.createElement(ActionBar, null), 

        React.createElement("div", {className: "wrapper-with-footer phone-optimized-top", id: "wrapper"}, 
          React.createElement("div", {className: "body-content-loading-overlay", style: {display: 'none'}}, 
            React.createElement("div", {className: "body-content-loading-spinner"})
          ), 
          React.createElement("div", {className: "action-bar-container", role: "navigation"}, 
            React.createElement("div", {className: "action-bar-inner"}
            )
          ), 
          
          React.createElement(Content, {appId: this.props.params.appId}), 
          React.createElement("div", {className: "overlay-background", style: {display: 'none'}}), 
          React.createElement("div", {className: "overlay-wrapper", style: {display: 'none'}}, 
            React.createElement("div", {className: "overlay-content-wrapper"}, 
              React.createElement("div", {id: "overlay-content"})
            )
          ), 
          React.createElement("div", {style: {clear: 'both'}}), 
          React.createElement(Footer, null)
        ), 
        React.createElement("div", {className: "loaded", id: "page-load-indicator"}), 
        
        React.createElement("div", {id: "instrument-manager-parent"}), 
        React.createElement("div", {className: "modal-dialog", tabindex: -1, role: "dialog", style: {display: 'none'}}, 
          React.createElement("div", {className: "id-contents-wrapper"}, 
            React.createElement("div", {className: "contents"})
          )
        ), 
        React.createElement("div", {className: "modal-dialog-overlay", style: {display: 'none'}}), 
        React.createElement("div", {id: "roster-for-Google-Help", style: {display: 'none'}})
      )
    );
  }
});

var AppSearch = React.createClass({displayName: 'AppSearch',
  getInitialState: function() {       
    return {query: this.props.params.query}
  },
  updateSearchQuery: function(newQuery) {    
    this.setState({query: newQuery});
  },
  render: function() {
    var url = "/app/search/" + this.state.query + "/";    
    var title = "";
    return (
      React.createElement("div", null, 
        React.createElement(ActionBar, {query: this.state.query, updateSearchQuery: this.updateSearchQuery}), 
        React.createElement("div", {className: "wrapper-with-footer phone-optimized-top", id: "wrapper"}, 
          React.createElement("div", {className: "butterbar-container"}, React.createElement("span", {id: "butterbar"})), 
          React.createElement("div", {className: "body-content-loading-overlay", style: {display: 'none'}}, 
            React.createElement("div", {className: "body-content-loading-spinner"})
          ), 
          React.createElement("div", {className: "id-body-content-beginning", 'aria-labelledby': "main-title", tabindex: -1}), 
          React.createElement("div", {id: "body-content", role: "main"}, 
            React.createElement(VerticalShortcuts, null), 
            React.createElement("div", {className: "browse-page"}, 
              React.createElement("div", {className: "cluster-container"}, 
                React.createElement("div", {className: "cluster id-track-impression normal square-cover apps show-all id-track-chomp", 'data-fetch-start': 18, 'data-original-classes': "cluster normal square-cover apps show-all", 'data-short-classes': "cluster tight square-cover apps show-all", 'data-uitype': 400}, 
                  React.createElement(ItemList, {url: url, title: "", route: this.props.route})
                )
              )
            )
          ), 
          React.createElement("div", {className: "overlay-background", style: {display: 'none'}}), 
          React.createElement("div", {className: "overlay-wrapper", style: {display: 'none'}}, 
            React.createElement("div", {className: "overlay-content-wrapper"}, 
              React.createElement("div", {id: "overlay-content"})
            )
          ), 
          React.createElement("div", {style: {clear: 'both'}}), 
          React.createElement(Footer, null)
        ), 
        React.createElement("div", {className: "loaded", id: "page-load-indicator"}), 
        React.createElement("div", {className: "modal-dialog", tabindex: -1, role: "dialog", style: {display: 'none'}}, 
          React.createElement("div", {className: "id-contents-wrapper"}, 
            React.createElement("div", {className: "contents"}, 
            "This is content"
            )
          )
        ), 
        React.createElement("div", {className: "modal-dialog-overlay", style: {display: 'none'}}), 
        React.createElement("div", {id: "roster-for-Google-Help", style: {display: 'none'}})
      )
    );    
  }
});
