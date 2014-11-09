var Item = React.createClass({
  render:function(){
      return (
       
<a href="/app/us.porrassoft.tattoo.gun.camera.html" className="item app">
        <div className="item_cont">
          <img alt="" src={this.props.thumbnail} className="item_icon" />
          <div className="item_meta">
            <div className="item_name">{this.props.name}</div>
            <div className="stars"><div style={{width: 52}} /></div>
            <div className="item_info2">{this.props.downloads} downloads</div>
            <div className="item_info2 orange">Apps</div>
          </div>
          <p className="btn-download" href="">Cài đặt</p>
        </div>
      </a>
        
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
       
      <section className="editors_install">
        <div id="owl-demo" className="owl-carousel owl-theme">
          <div className="item"><a href="#"><img src="/assets/images/fullimage1.jpg" alt="The Last of us" /></a></div>
          <div className="item"><a href="#"><img src="/assets/images/fullimage3.jpg" alt="Mirror Edge" /></a></div>
          <div className="item"><a href="#"><img src="/assets/images/fullimage4.jpg" alt="Mirror Edge" /></a></div>
          <div className="item"><a href="#"><img src="/assets/images/fullimage5.jpg" alt="Mirror Edge" /></a></div>
        </div>
      <div className="wfull center">
        <a className="btn apk_install" href="/"><div></div>&nbsp;&nbsp;Cài Đặt Store</a>
      </div>

      </section>
        
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


var Header = React.createClass({
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
      </header>
    );
  }
});

var NavTop = React.createClass({
  render: function() {
    return (
      <div>
        <div data-window-overlay="" className="nodisplay" />
        <section className="tabs_header">
          {/*<div class="title"></div>*/}
          <div className="tabs">            
            <Link to="/" className={this.props.route == "home" ? "active" : ""}>Trang chủ</Link>
            <Link to="/app/topdownload" className={this.props.route == "topdownload" ? "active" : ""}>Tải nhiều</Link>            
            <Link to="/app/standings" className={this.props.route == "standings" ? "active" : ""}>Thứ hạng</Link>
            <a href="/page" className="">Chọn lọc</a>
          </div>
        </section>
      </div>
    );
  }
});


var AppList = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    var url = "/api/apps-partner-min/" + document.partner + "/1/10";
    $.get(url, function(result) {
      if (this.isMounted()) {
        this.setState({data: result})
      }
    }.bind(this))
  },
  render: function() {    
    //var data = [{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}]
    
    var items = this.state.data.map(function(item){
      if (item != null) {
        return (
          <Item name={item.name} downloads={item.total_download} thumbnail={item.thumbnail}/>
        );
      }
    })
    return (
<section className="items list_app">
{items}
</section>
    );
  }
});

var Content = React.createClass({
  render: function() {
    return (
      <div>
      <AppList />
        <div className="clear" />
        <div id="loading_gif" className="wfull center">
          <div style={{width: 160, height: 15}} className="css_loader"><div style={{top: 0, left: 0, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0s', WebkitAnimationDelay: '0s', MsAnimationDelay: '0s', OAnimationDelay: '0s', animationDelay: '0s'}} /><div style={{top: 0, left: 20, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.125s', WebkitAnimationDelay: '0.125s', MsAnimationDelay: '0.125s', OAnimationDelay: '0.125s', animationDelay: '0.125s'}} /><div style={{top: 0, left: 40, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.25s', WebkitAnimationDelay: '0.25s', MsAnimationDelay: '0.25s', OAnimationDelay: '0.25s', animationDelay: '0.25s'}} /><div style={{top: 0, left: 60, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.375s', WebkitAnimationDelay: '0.375s', MsAnimationDelay: '0.375s', OAnimationDelay: '0.375s', animationDelay: '0.375s'}} /><div style={{top: 0, left: 80, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.5s', WebkitAnimationDelay: '0.5s', MsAnimationDelay: '0.5s', OAnimationDelay: '0.5s', animationDelay: '0.5s'}} /><div style={{top: 0, left: 100, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.625s', WebkitAnimationDelay: '0.625s', MsAnimationDelay: '0.625s', OAnimationDelay: '0.625s', animationDelay: '0.625s'}} /><div style={{top: 0, left: 120, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.75s', WebkitAnimationDelay: '0.75s', MsAnimationDelay: '0.75s', OAnimationDelay: '0.75s', animationDelay: '0.75s'}} /><div style={{top: 0, left: 140, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.875s', WebkitAnimationDelay: '0.875s', MsAnimationDelay: '0.875s', OAnimationDelay: '0.875s', animationDelay: '0.875s'}} /></div>
        </div>
        <p className="btn-view">Xem thêm</p>
        </div>      
    )
  }    
});

var Footer = React.createClass({
  render: function(){
    return (
      <footer>
        <img alt="" className="small_logo" src="/assets/images/logo.png" draggable="false" />
        <a href="#">Lên đầu</a>
      </footer>
    )
  }
});


var Home = React.createClass({
  render: function() {
    return (
      <div className="body">
<Header />
<div className="body_container">
<Banner />
<NavTop route="home" />
<Content route="home"/>
</div>
<Footer />    
    </div>
    )
  }
});

var TopDownload = React.createClass({
  render: function() {
    return (
      <div className="body">
<Header />
<div className="body_container">
<NavTop route="topdownload" />
<Content route="topdownload" />
</div>
<Footer />    
    </div>
    )
  }
});

var TopStandings = React.createClass({
  render: function() {
    return (
      <div className="body">
<Header />
<div className="body_container">
<NavTop route="standings" />
<Content route="standings" />
</div>
<Footer />    
    </div>
    )
  }
})




