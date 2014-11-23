var Navigation = ReactRouter.Navigation;

var Item = React.createClass({displayName: 'Item',
  render: function() {
    return (
        React.createElement("div", {className: "card no-rationale square-cover apps small", 'data-docid': "air.com.A5thplanetgames.pets", 'data-original-classes': "card no-rationale square-cover apps small", 'data-short-classes': "card no-rationale square-cover apps tiny"}, 
          React.createElement("div", {className: "card-content id-track-click id-track-impression", 'data-docid': "air.com.A5thplanetgames.pets", 'data-uitype': 500}, 
            React.createElement("a", {className: "card-click-target", href: "/store/apps/details?id=air.com.A5thplanetgames.pets", 'aria-hidden': "true", tabindex: -1}), 
            React.createElement("div", {className: "cover"}, 
              React.createElement("div", {className: "cover-image-container"}, 
                React.createElement("div", {className: "cover-outer-align"}, 
                  React.createElement("div", {className: "cover-inner-align"}, " ", React.createElement("img", {className: "cover-image", alt: this.props.name, 'data-cover-large': "https://lh3.ggpht.com/CMkObCRo3TfUzX4kWUM66fP2hp8lU8ci5ow83uk37sRLSOnkL9hKo3Bz_JgRMu_K9cg=w340", 'data-cover-small': "https://lh3.ggpht.com/CMkObCRo3TfUzX4kWUM66fP2hp8lU8ci5ow83uk37sRLSOnkL9hKo3Bz_JgRMu_K9cg=w170", src: this.props.thumbnail, 'aria-hidden': "true"}), " ")
                )
              ), 
              React.createElement("a", {className: "card-click-target", href: "/store/apps/details?id=air.com.A5thplanetgames.pets", 'aria-hidden': "true", tabindex: -1}, "  ", React.createElement("span", {className: "movies preordered-overlay-container id-preordered-overlay-container", style: {display: 'none'}}, " ", React.createElement("span", {className: "preordered-label"}, "Pre-ordered"), " "), " ", React.createElement("span", {className: "preview-overlay-container", 'data-docid': "air.com.A5thplanetgames.pets"}))
            ), 
            React.createElement("div", {className: "details"}, 
              React.createElement("a", {className: "card-click-target", href: "/store/apps/details?id=air.com.A5thplanetgames.pets", 'aria-hidden': "true", tabindex: -1}), 
              React.createElement("h2", null, " ", React.createElement("a", {className: "title", href: "/store/apps/details?id=air.com.A5thplanetgames.pets", title: this.props.name}, this.props.name, React.createElement("span", {className: "paragraph-end"}), " "), " "), 
              React.createElement("div", {className: "subtitle-container"}, 
                React.createElement("a", {className: "subtitle", href: "/store/apps/developer?id=5th+Planet+Games", title: "5th Planet Games"}, this.props.cname), 
                React.createElement("span", {className: "price-container"}, 
                  React.createElement("span", {className: "paragraph-end"}), 
                  React.createElement("span", {className: "apps is-price-tag buy-button-container", 'data-doc-fetch-skip-cache': 0, 'data-doc-fetch-vouchers': 0, 'data-docid': "air.com.A5thplanetgames.pets"}, 
                    React.createElement("div", {className: "pon", style: {display: 'none'}}, "1"), 
                    React.createElement("button", {className: "price buy"}, "      ", React.createElement("span", {className: "display-price"}, "Tải về"), " ")
                  )
                )
              )
            ), 
            React.createElement("div", {className: "reason-set"}, 
              React.createElement("span", {className: "stars-container"}, 
                React.createElement("a", {href: "/store/apps/details?id=air.com.A5thplanetgames.pets", tabindex: -1}, 
                  React.createElement("div", {className: "reason-set-star-rating"}, 
                    React.createElement("div", {className: "tiny-star star-rating-non-editable-container", 'aria-label': "Rated 4.3 stars out of five stars"}, 
                      React.createElement("div", {className: "current-rating", style: {width: '85.64302444458008%'}})
                    )
                  )
                ), 
                React.createElement("span", {className: "price-container"}, 
                  React.createElement("span", {className: "paragraph-end"}), 
                  React.createElement("span", {className: "apps is-price-tag buy-button-container", 'data-doc-fetch-skip-cache': 0, 'data-doc-fetch-vouchers': 0, 'data-docid': "air.com.A5thplanetgames.pets"}, 
                    React.createElement("div", {className: "pon", style: {display: 'none'}}, "1"), 
                    React.createElement("button", {className: "price buy"}, "      ", React.createElement("span", {className: "display-price"}, "Tải về"), " ")
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
      var items = this.state.data.map(function(item){
        if (item != null) {
          return (
            React.createElement(Item, {appId: item.id, name: item.name, downloads: item.total_download, cname: item.cname, thumbnail: item.thumbnail})
          );
        }
      })  

      return (
        React.createElement("div", {className: "card-list"}, 
  items
        )
      );
    }
});

var TopApp = React.createClass({displayName: 'TopApp',

  render: function() {
    var url = "/api/apps-partner/" + document.partner + "/";
    var title = "";
    if (this.props.route == "/top/downloads") {
      url = "/api/apps-download/" + document.partner + "/";
    } if (this.props.route == "/top/standings") {
      url = "/api/apps-like/" + document.partner + "/";
    } if (this.props.route == "/top/new") {
      url = "/api/apps-partner/" + document.partner + "/";  
      title = "Ứng dụng mới nhất";
    }

    return (
      React.createElement("div", null, 
        React.createElement("ul", null, 
          React.createElement("ul", {className: "mobile-nav", id: "main-menu"}, 
            React.createElement("li", null, 
              React.createElement("div", {className: "nav-profile-wrapper"}, 
                React.createElement("div", {style: {opacity: 1}}
                ), 
                React.createElement("div", {className: "nav-profile", style: {opacity: 1}}, "  ", React.createElement("span", null, " ", React.createElement("span", {className: "profile-curtain"}), " ", React.createElement("a", {href: "#"}, " ", React.createElement("span", {className: "profile-image", style: {backgroundImage: 'url("https://lh5.googleusercontent.com/-N0W0IXHj1N0/AAAAAAAAAAI/AAAAAAAAAJE/QxmGurCwbTo/w72-h72/photo.jpg")'}}, " "), " ", React.createElement("span", {className: "profile-name non-selectable"}, "Google Play Store"), " ")), " ")
              )
            ), 
            React.createElement("li", null, " ", React.createElement("a", {className: "store mobile-nav-item selected", href: "/store"}, " ", React.createElement("span", {className: "icon"}), " ", React.createElement("span", {className: "label"}, "Shop"), " "), " "), 
            React.createElement("li", null, " ", React.createElement("a", {className: "apps mobile-nav-item default", href: "/store/apps"}, " ", React.createElement("span", {className: "icon"}), " ", React.createElement("span", {className: "label"}, "Apps"), " "), " "), 
            React.createElement("li", null, " ", React.createElement("a", {className: "books mobile-nav-item default", href: "/store/books"}, " ", React.createElement("span", {className: "icon"}), " ", React.createElement("span", {className: "label"}, "Books"), " "), " "), 
            React.createElement("li", null, 
              React.createElement("div", {className: "mobile-nav-separator"})
            ), 
            React.createElement("li", null, " ", React.createElement("a", {className: "apps mobile-nav-item default", href: "/store/books"}, " ", React.createElement("span", {className: "icon"}), " ", React.createElement("span", {className: "label"}, "TOP"), " "), " "), 
            React.createElement("li", null, " ", React.createElement("a", {className: "mobile-nav-item secondary", href: "/wishlist"}, " ", React.createElement("span", {className: "icon"}), " ", React.createElement("span", {className: "label"}, "Mới nhất"), " "), " "), 
            React.createElement("li", null, " ", React.createElement("a", {className: "mobile-nav-item secondary", href: "/store/account"}, " ", React.createElement("span", {className: "icon"}), " ", React.createElement("span", {className: "label"}, "Tải nhiều"), " "), " "), 
            React.createElement("li", {'data-uitype': 108}, " ", React.createElement("a", {className: "mobile-nav-item secondary id-track-click", href: "/settings"}, " ", React.createElement("span", {className: "icon"}), " ", React.createElement("span", {className: "label"}, "Yêu thích"), " "), " "), 
            React.createElement("li", null, 
              React.createElement("div", {className: "mobile-nav-separator"})
            )
          )
        ), 
        React.createElement("div", {style: {position: 'fixed', top: -100000, left: -100000, opacity: 0}, id: "offscreen-renderer"}), 
        React.createElement("div", {className: "mobile-action-bar"}, 
          React.createElement("span", {className: "action-bar-menu-button"}, " ", React.createElement("span", {className: "menu-icon"}), " "), " ", React.createElement("a", {className: "play-logo", href: "/store"}), " ", React.createElement("span", {className: "action-bar-search-button"}, " ", React.createElement("span", {className: "search-icon"}), " "), 
          React.createElement("div", {className: "mobile-search-bar closed"}, 
            React.createElement("span", {className: "search-container"}, 
              React.createElement("form", {className: "search-text-box", action: "/store/search", id: "gbqf", onsubmit: "return false;"}, 
                React.createElement("div", {id: "gbfwa"}, 
                  React.createElement("div", {id: "gbqfqw"}, " ", React.createElement("input", {placeholder: "Search", id: "gbqfq", name: "q", 'aria-haspopup': "true"}), " ")
                )
              ), 
              React.createElement("span", {id: "mobile-search-submit"}, " ", React.createElement("span", {className: "search-icon"}), " ")
            ), 
            React.createElement("span", {className: "close-button"}, " ", React.createElement("span", {className: "close-icon"}), " ")
          )
        ), 
        React.createElement("div", {className: "wrapper-with-footer phone-optimized-top", id: "wrapper"}, 
          React.createElement("div", {className: "butterbar-container"}, React.createElement("span", {id: "butterbar"})), 
          React.createElement("div", {className: "body-content-loading-overlay", style: {display: 'none'}}, 
            React.createElement("div", {className: "body-content-loading-spinner"})
          ), 
          React.createElement("div", {className: "id-body-content-beginning", 'aria-labelledby': "main-title", tabindex: -1}), 
          React.createElement("div", {id: "body-content", role: "main"}, 
            React.createElement("meta", {content: "https://www.gstatic.com/android/market_images/plus/play_stream_logo.png", itemprop: "logoImageUrl"}), 
            React.createElement("meta", {content: "https://play.google.com", itemprop: "logoHrefUrl"}), 
            React.createElement("div", {className: "browse-page"}, 
              React.createElement("div", {className: "cluster-container"}, 
                React.createElement("div", {className: "cluster id-track-impression normal square-cover apps show-all id-track-chomp", 'data-fetch-start': 18, 'data-original-classes': "cluster normal square-cover apps show-all", 'data-short-classes': "cluster tight square-cover apps show-all", 'data-uitype': 400}, 
                  React.createElement("h1", {className: "cluster-heading"}, 
                    title
                  ), 
                  React.createElement(ItemList, {url: url, title: "", route: this.props.route}), 
                  React.createElement("button", {className: "play-button", id: "show-more-button", style: {display: 'block'}}, "Xem thêm")
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
          React.createElement("div", {id: "footer-content"}, 
            React.createElement("div", {className: "bottom-loading", style: {display: 'none'}}), 
            React.createElement("div", {className: "footer"}, 
              React.createElement("div", {className: "footer-links-container"}, " ", React.createElement("span", {className: "copyright"}, "©2014 Eway JSC"), React.createElement("a", {className: "footer-link id-no-nav", href: "https://support.google.com/googleplay/?p=about_play", target: "_blank"}, "Về APK.VN"))
            )
          ), 
          React.createElement("div", {id: "mobile-menu-overlay", style: {opacity: '0.8', display: 'none'}})
        ), 
        React.createElement("div", {className: "loaded", id: "page-load-indicator"}), 
        React.createElement("div", {id: "audio-player"}, 
          React.createElement("audio", {autoplay: "autoplay", id: "html5Player"}), 
          React.createElement("div", {className: "goog-ui-media-flash"}, 
            React.createElement("embed", {quality: "high", id: ":4", name: ":4", className: "goog-ui-media-flash-object", src: "https://www.gstatic.com/play/store/web/swf/4musicplayer.swf", flashvars: "", bgcolor: "#000000", allowscriptaccess: "always", allowfullscreen: "true", seamlesstabbing: "false", type: "application/x-shockwave-flash", pluginspage: "http://www.macromedia.com/go/getflashplayer", wmode: "window", style: {width: 1, height: 1}})
          )
        ), 
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

var TopNew = React.createClass({displayName: 'TopNew',
  render: function() {
    return (React.createElement(TopApp, {route: "/top/new"}))
  }
})
