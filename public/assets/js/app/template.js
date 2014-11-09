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
    var url = "/api/apps-partner/" + document.partner + "/1/10";
    $.get(url, function(result) {
      if (this.isMounted()) {
        this.setState({data: result})
      }
    }.bind(this))
  },
  render: function() {    
    //var data = [{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}]
    
    var items = this.state.data.map(function(item){
        return (
          <Item name={item.name} downloads={item.total_download} thumbnail={item.thumbnail}/>
        );
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
      <AppList />
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




