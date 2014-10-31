var LayoutHeaderHome = React.createClass({

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
          <div>
             <header data-fixed-header="" className="top_header">
          <a id="drawer_btn" href="#" className="btn drawer"></a>
          <div className="top_logo_area">
            <a href="/" id="top_logo" className="top_logo"><img className="logo" alt="" src="/assets/images/logo.png" /></a>
          </div>
          <div id="search_top" className="search_top nodisplay">
            <form method="get" action="/">
              <input type="text" placeholder="Tìm kiếm ứng dụng ..." value="" name="search" />
              <input type="submit" className="btn" value="" />
            </form>
          </div>
          <a id="search_btn_top" href="#" className="btn search " />

            <div className="nav-top">
                    <section className="tabs_header">
                        <div className="tabs">
                            <a href="#top_new" >Mới nhất</a>
                            <a href="#top_like">Yêu thích</a>
                            <a href="#top_select">Chọn lọc</a>
                            <a href="#top_share">Chia sẻ</a>
                        </div>
                     </section>
            </div>

        </header>
          </div>
        
        );
  }
});


var LayoutHeaderNotHome = React.createClass({
  render:function(){
      return (
       
          <div>
             <header data-fixed-header="" className="top_header">
          <a id="btn_back" onclick="goBack()" href="javascript('goBack()'):;" className="btn drawer btn_back" />
          <div className="top_logo_area">
            <a href="/" id="top_logo" className="top_logo"><img className="logo" alt="" src="/assets/images/logo.png" /></a>
          </div>
          <div id="search_top" className="search_top nodisplay">
            <form method="get" action="/">
              <input type="text" placeholder="Tìm kiếm ứng dụng ..." value="" name="search" />
              <input type="submit" className="btn" value="" />
            </form>
          </div>
          <a id="search_btn_top" href="#" className="btn search " />

           <section className="tabs_header">
        {/*<div class="title">{{{@$title}}}</div>*/}
        <div className="tabs">
          <a href="/app/topnew" className="{{{@$appNew}}}">Mới nhất</a>
          <a href="/app/topdownload" className="{{{@$appDowload}}}">Tải nhiều</a>
          <a href="/app/standings" className="{{{@$appStandings}}}">Thứ hạng</a>
          <a href="/page" className="{{{@$appFilter}}}">Chọn lọc</a>
        </div>
      </section>

        </header>
          </div>
        
        );
  }
});




var NavBar = React.createClass({
  render:function(){
      return (
       
          <div>
            <section id="drawer" className="drawer">
        <div id="drawer_close" className="drawer_close" />
        <div>
          <div className="drawer_top">
            <img alt="" src="/assets/images/logo2.png" className="logo2" />
          </div>
          <div className="drawer_entries">
            <a href="/"><div>Trang chủ</div></a>
            <a href="/app/topnew"><div>Ứng dụng mới nhất </div></a>
            <a href="/app/standings"><div>Ứng dụng yêu thích </div></a>
            <a href="/page"><div>Ứng dụng chọn lọc </div></a>
          </div>
          <div className="drawer_entries">
            <a href="/"><div><img alt="" src="/assets/images/icon_fb.png" />Facebook</div></a>
            <a href="/"><div><img alt="" src="/assets/images/icon_google_png.png" />Google +</div></a>
            <a href="/"><div><img alt="" src="/assets/images/icon_youtube.png" />Youtube</div></a>
            <a href="/"><div><img alt="" src="/assets/images/icon_twitter.png" />Twitter</div></a>
          </div>
          <br /><br />
        </div>
        <p className="back">
        </p>
      </section>
          </div>
        
        );
  }
});



var Item = React.createClass({
  render:function(){
      return (
       
          <div>
<div className="body_container">

<div data-window-overlay="" className="nodisplay"></div>
          <section className="items list_app">

          <a href="#" className="item app">
            <div className="item_cont">
              <img alt="" data-postload-img-onerror="if (this.getAttribute('error') != 1){this.setAttribute('src','http://cdn3.aptoide.com/includes/themes/mobile2014/images/app_icon_default_mdpi.png');this.setAttribute('error',1);}" data-postload-img="" src="" className="item_icon" />
              <div className="item_meta">
                <div className="item_name">Name</div>
                <div className="stars"><div style={{width: 52}} /></div>
                <div className="item_info2">1000 downloads</div>
                <div className="item_info2 orange">Apps</div>
              </div>
              <p className="btn-download" href="">Cài đặt</p>
            </div>
          </a>
        </section>
        <div className="clear" />

<div id="loading_gif" className="wfull center">
 
</div>
<p className="btn-view">Xem thêm</p>
        </div>
          </div>
        
        );
  }
});


var Banner = React.createClass({
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
       
          <div>
            <div className="body_container">

        <div data-window-overlay="" className="nodisplay"></div>

            <section className="editors_install">
        <div id="owl-demo" className="owl-carousel owl-theme">
          <div className="item"><a href="#"><img src="/assets/assets/fullimage1.jpg" alt="The Last of us" /></a></div>
          <div className="item"><a href="#"><img src="/assets/assets/fullimage3.jpg" alt="Mirror Edge" /></a></div>
          <div className="item"><a href="#"><img src="/assets/assets/fullimage4.jpg" alt="Mirror Edge" /></a></div>
          <div className="item"><a href="#"><img src="/assets/assets/fullimage5.jpg" alt="Mirror Edge" /></a></div>
        </div>
        <div className="wfull center">
          <a className="btn apk_install" href="/"><div />  Cài Đặt Store</a>
        </div>
      </section>
          </div>
          </div>
        
        );
  }
});






var LayoutFootter = React.createClass({
  render:function(){
      return (
       
          <div>
<footer>
  <img alt="" className="small_logo" src="/assets/images/logo.png"/>
  <a href="#">Lên đầu</a>
</footer>

          </div>
        
        );
  }
});