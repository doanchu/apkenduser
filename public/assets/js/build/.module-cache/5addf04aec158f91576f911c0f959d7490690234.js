var LayoutHeaderHome = React.createClass({displayName: 'LayoutHeaderHome',

  componentDidMount: function() {
    if ($('#search_btn_top[data-search-hidden]').length){
    $(window).scroll(function(e){
      if ($(window).scrollTop() > 100)
        $('#search_btn_top[data-search-hidden]').fadeIn('fast');
      else
        $('#search_btn_top[data-search-hidden]').fadeOut('fast');
    });
  }
  
  $('#search_btn_top').click(function(){
    $(this).removeAttr('data-search-hidden').fadeOut('fast');
    $('#top_logo').fadeOut('fast');
    $('#search_top').fadeIn('fast', function(){$(this).find('input[type="text"][name="search"]').focus();});
    return false;
  });
  
  $('.arrow_scroll_up').click(function(){
    $('html, body').animate({scrollTop: 0}, 'slow');
  });
  //Drawer
    $('#drawer_btn').click(function(){
      $('#drawer').addClass('active');
          $('.back').show();
      return false;
    });
    $('#drawer_close,.back').click(function(event) {
          /* Act on the event */
              $('.back').hide();
              $('#drawer').removeClass('active');


    });
    $('[data-drawer-menu]').click(function(){
      var el = $(this);
      var submenus = el.parent().find('[data-drawer-submenu="'+el.attr('data-drawer-menu')+'"]');
      var is_opening = !submenus.first().hasClass('open');
      if (is_opening)
        submenus.addClass('open');
      else
        submenus.removeClass('open');
      el.find('[data-drawer-sub-indicator]').attr('data-drawer-sub-indicator', (is_opening ? 'up' : 'down'));
      return false;
    });
  },

  render:function(){
      return (
          React.createElement("div", null, 
             React.createElement("header", {'data-fixed-header': "", className: "top_header"}, 
          React.createElement("a", {id: "drawer_btn", href: "#", className: "btn drawer"}), 
          React.createElement("div", {className: "top_logo_area"}, 
            React.createElement("a", {href: "/", id: "top_logo", className: "top_logo"}, React.createElement("img", {className: "logo", alt: "", src: "/assets/images/logo.png"}))
          ), 
          React.createElement("div", {id: "search_top", className: "search_top nodisplay"}, 
            React.createElement("form", {method: "get", action: "/"}, 
              React.createElement("input", {type: "text", placeholder: "Tìm kiếm ứng dụng ...", value: "", name: "search"}), 
              React.createElement("input", {type: "submit", className: "btn", value: ""})
            )
          ), 
          React.createElement("a", {id: "search_btn_top", href: "#", className: "btn search "}), 

            React.createElement("div", {className: "nav-top"}, 
                    React.createElement("section", {className: "tabs_header"}, 
                        React.createElement("div", {className: "tabs"}, 
                            React.createElement("a", {href: "#top_new"}, "Mới nhất"), 
                            React.createElement("a", {href: "#top_like"}, "Yêu thích"), 
                            React.createElement("a", {href: "#top_select"}, "Chọn lọc"), 
                            React.createElement("a", {href: "#top_share"}, "Chia sẻ")
                        )
                     )
            )

        )
          )
        
        );
  }
});


var LayoutHeaderNotHome = React.createClass({displayName: 'LayoutHeaderNotHome',
  render:function(){
      return (
       
          React.createElement("div", null, 
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
          React.createElement("a", {id: "search_btn_top", href: "#", className: "btn search "}), 

           React.createElement("section", {className: "tabs_header"}, 
        /*<div class="title">{{{@$title}}}</div>*/
        React.createElement("div", {className: "tabs"}, 
          React.createElement("a", {href: "/app/topnew", className: "{{{@$appNew}}}"}, "Mới nhất"), 
          React.createElement("a", {href: "/app/topdownload", className: "{{{@$appDowload}}}"}, "Tải nhiều"), 
          React.createElement("a", {href: "/app/standings", className: "{{{@$appStandings}}}"}, "Thứ hạng"), 
          React.createElement("a", {href: "/page", className: "{{{@$appFilter}}}"}, "Chọn lọc")
        )
      )

        )
          )
        
        );
  }
});




var NavBar = React.createClass({displayName: 'NavBar',
  render:function(){
      return (
       
          React.createElement("div", null, 
            React.createElement("section", {id: "drawer", className: "drawer"}, 
        React.createElement("div", {id: "drawer_close", className: "drawer_close"}), 
        React.createElement("div", null, 
          React.createElement("div", {className: "drawer_top"}, 
            React.createElement("img", {alt: "", src: "/assets/images/logo2.png", className: "logo2"})
          ), 
          React.createElement("div", {className: "drawer_entries"}, 
            React.createElement("a", {href: "/"}, React.createElement("div", null, "Trang chủ")), 
            React.createElement("a", {href: "/app/topnew"}, React.createElement("div", null, "Ứng dụng mới nhất ")), 
            React.createElement("a", {href: "/app/standings"}, React.createElement("div", null, "Ứng dụng yêu thích ")), 
            React.createElement("a", {href: "/page"}, React.createElement("div", null, "Ứng dụng chọn lọc "))
          ), 
          React.createElement("div", {className: "drawer_entries"}, 
            React.createElement("a", {href: "/"}, React.createElement("div", null, React.createElement("img", {alt: "", src: "/assets/images/icon_fb.png"}), "Facebook")), 
            React.createElement("a", {href: "/"}, React.createElement("div", null, React.createElement("img", {alt: "", src: "/assets/images/icon_google_png.png"}), "Google +")), 
            React.createElement("a", {href: "/"}, React.createElement("div", null, React.createElement("img", {alt: "", src: "/assets/images/icon_youtube.png"}), "Youtube")), 
            React.createElement("a", {href: "/"}, React.createElement("div", null, React.createElement("img", {alt: "", src: "/assets/images/icon_twitter.png"}), "Twitter"))
          ), 
          React.createElement("br", null), React.createElement("br", null)
        ), 
        React.createElement("p", {className: "back"}
        )
      )
          )
        
        );
  }
});



var Item = React.createClass({displayName: 'Item',
  render:function(){
      return (
       
          React.createElement("div", null, 
React.createElement("div", {className: "body_container"}, 

React.createElement("div", {'data-window-overlay': "", className: "nodisplay"}), 
          React.createElement("section", {className: "items list_app"}, 

          React.createElement("a", {href: "#", className: "item app"}, 
            React.createElement("div", {className: "item_cont"}, 
              React.createElement("img", {alt: "", 'data-postload-img-onerror': "if (this.getAttribute('error') != 1){this.setAttribute('src','http://cdn3.aptoide.com/includes/themes/mobile2014/images/app_icon_default_mdpi.png');this.setAttribute('error',1);}", 'data-postload-img': "", src: "", className: "item_icon"}), 
              React.createElement("div", {className: "item_meta"}, 
                React.createElement("div", {className: "item_name"}, this.props.name), 
                React.createElement("div", {className: "stars"}, React.createElement("div", {style: {width: 52}})), 
                React.createElement("div", {className: "item_info2"}, "1000 downloads"), 
                React.createElement("div", {className: "item_info2 orange"}, "Apps")
              ), 
              React.createElement("p", {className: "btn-download", href: ""}, "Cài đặt")
            )
          )
        ), 
        React.createElement("div", {className: "clear"}), 

React.createElement("div", {id: "loading_gif", className: "wfull center"}
 
), 
React.createElement("p", {className: "btn-view"}, "Xem thêm")
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
       
          React.createElement("div", null, 
            React.createElement("div", {className: "body_container"}, 

        React.createElement("div", {'data-window-overlay': "", className: "nodisplay"}), 

            React.createElement("section", {className: "editors_install"}, 
        React.createElement("div", {id: "owl-demo", className: "owl-carousel owl-theme"}, 
          React.createElement("div", {className: "item"}, React.createElement("a", {href: "#"}, React.createElement("img", {src: "/assets/assets/fullimage1.jpg", alt: "The Last of us"}))), 
          React.createElement("div", {className: "item"}, React.createElement("a", {href: "#"}, React.createElement("img", {src: "/assets/assets/fullimage3.jpg", alt: "Mirror Edge"}))), 
          React.createElement("div", {className: "item"}, React.createElement("a", {href: "#"}, React.createElement("img", {src: "/assets/assets/fullimage4.jpg", alt: "Mirror Edge"}))), 
          React.createElement("div", {className: "item"}, React.createElement("a", {href: "#"}, React.createElement("img", {src: "/assets/assets/fullimage5.jpg", alt: "Mirror Edge"})))
        ), 
        React.createElement("div", {className: "wfull center"}, 
          React.createElement("a", {className: "btn apk_install", href: "/"}, React.createElement("div", null), "  Cài Đặt Store")
        )
      )
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