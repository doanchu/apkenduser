var Navigation = ReactRouter.Navigation;
var Item = React.createClass({
  handleDownload: function(e) {
    e.preventDefault();
    window.location.href = "http://apk.vn:3000/" + e.currentTarget.getAttribute("href");
    return false;
  },
  render:function(){
      return (
       
<a href={"/app/" + this.props.appId + ".html"} className="item app">
        <div className="item_cont">
          <img alt="" src={this.props.thumbnail} className="item_icon" />
          <div className="item_meta">
            <div className="item_name">{this.props.name}</div>
            <div className="stars"><div style={{width: 52}} /></div>
            <div className="item_info2">{this.props.downloads} downloads</div>
            <div className="item_info2 orange">Apps</div>
          </div>
          <p  onClick={this.handleDownload} className="btn-download" href={"/app/download/" + document.partner + "/" + this.props.appId}>Cài đặt</p>
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
        <a className="btn apk_install" href={"http://beta.apk.vn/store/download/" + document.partner}><div></div>&nbsp;&nbsp;Cài Đặt Store</a>
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
  mixins: [Navigation],  
  getInitialState: function() {
    return {search: ""}
  },
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
      $('#search_top').fadeIn('fast', function(){$(this).removeClass('nodisplay');});
      return false;
    });         
  },
  back: function(e) {
    window.history.back()
  },
  search: function(e) {
    e.preventDefault();
    var query = this.state.search;    
    if (this.props.route != null && this.props.route == "search") {            
      this.props.updateSearchQuery(query)
    } else {
      this.transitionTo("/app/search/" + query);          
    }   
  },
  handleChange: function(e) {
    this.setState({search: e.target.value})
  },
  render: function() {
    var value = this.state.search
    return (
      <header data-fixed-header="" className="top_header">
        <a id="btn_back" onClick={this.back} className="btn drawer btn_back" />
        <div className="top_logo_area">
          <a href="/" id="top_logo" className="top_logo"><img className="logo" alt="" src="/assets/images/logo.png" /></a>
        </div>
        <div id="search_top" className="search_top nodisplay">
          <form method="get" onSubmit={this.search} action="/">
            <input type="text" placeholder="Tìm kiếm ứng dụng ..." id="search_input" value={value} name="search" onChange={this.handleChange}/>
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
            {/*<a href="/page" className="">Chọn lọc</a>*/}
          </div>
        </section>
      </div>
    );
  }
});


var AppList = React.createClass({
  // getInitialState: function() {
  //   return {data: []};
  // },
  componentDidMount: function() {
    // var url = "/api/apps-partner-min/" + document.partner + "/1/10";
    // $.get(url, function(result) {
    //   if (this.isMounted()) {
    //     this.setState({data: result})
    //   }
    // }.bind(this))
  },
  render: function() {    
    //var data = [{name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}, {name: "item1", downloads: 1000}]
    
    var items = this.props.data.map(function(item){
      if (item != null) {
        return (
          <Item appId={item.id} name={item.name} downloads={item.total_download} thumbnail={item.thumbnail}/>
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
    var url = prefix + document.partner + "/" + this.state.page + "/10";
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
      <div>
      <AppList data={this.state.data}/>
        <div className="clear" />
        <div id="loading_gif" className="wfull center">
          <div style={{width: 160, height: 15}} className="css_loader"><div style={{top: 0, left: 0, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0s', WebkitAnimationDelay: '0s', MsAnimationDelay: '0s', OAnimationDelay: '0s', animationDelay: '0s'}} /><div style={{top: 0, left: 20, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.125s', WebkitAnimationDelay: '0.125s', MsAnimationDelay: '0.125s', OAnimationDelay: '0.125s', animationDelay: '0.125s'}} /><div style={{top: 0, left: 40, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.25s', WebkitAnimationDelay: '0.25s', MsAnimationDelay: '0.25s', OAnimationDelay: '0.25s', animationDelay: '0.25s'}} /><div style={{top: 0, left: 60, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.375s', WebkitAnimationDelay: '0.375s', MsAnimationDelay: '0.375s', OAnimationDelay: '0.375s', animationDelay: '0.375s'}} /><div style={{top: 0, left: 80, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.5s', WebkitAnimationDelay: '0.5s', MsAnimationDelay: '0.5s', OAnimationDelay: '0.5s', animationDelay: '0.5s'}} /><div style={{top: 0, left: 100, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.625s', WebkitAnimationDelay: '0.625s', MsAnimationDelay: '0.625s', OAnimationDelay: '0.625s', animationDelay: '0.625s'}} /><div style={{top: 0, left: 120, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.75s', WebkitAnimationDelay: '0.75s', MsAnimationDelay: '0.75s', OAnimationDelay: '0.75s', animationDelay: '0.75s'}} /><div style={{top: 0, left: 140, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.875s', WebkitAnimationDelay: '0.875s', MsAnimationDelay: '0.875s', OAnimationDelay: '0.875s', animationDelay: '0.875s'}} /></div>
        </div>        
        <p className="btn-view" onClick={this.getMoreContent}>Xem thêm</p>
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


var Details = React.createClass({
  render: function() {
      var images = this.props.data.ss.map(function(item){
      if (item != null) {
        return (
            <a className="group1">
              <img alt="Barcode Scanner screenshot 1" className="portrait group1" src={item} />
            </a>

        );
      }
    })

    return (

      <section className="app_view">
        <div>
          <div className="app_meta_data">
            <img alt="" src={this.props.data.thumbnail} className="app_icon" />
            <p className="app_name">{this.props.data.name}</p>
            <div className="app_meta mt5">
              Phiên bản: {this.props.data.version} | 
              Kích thước: {this.props.data.size}
            </div>
            <div className="app_meta">
              Lượt tải: {this.props.data.total_download}
              <a data-window-call-id="app_info" href="#"></a>
            </div>
            <div className="app_meta install_area">
              <a href={"/app/download/" + document.partner + "/" + this.props.data.id} className="btn app_install trusted">
                <div />
                Cài Đặt
              </a>
            </div>
          </div>
          <div className="app_controls">
            <span data-ajax-url="http://m.eoliveira.store.aptoide.com/phpajax/do_like_vote.php?appid=7217417&repo=eoliveira" data-ajax="likes" className="neverdisplay">
              Submitting vote...   
              <div className="load_circ" />
            </span>
          </div>
        </div>
        <div className="app_screenshots non_select">
          <div id="app_screenshots" className="slider_section">
            <span data-sld-btn-prev="" className="neverdisplay" />
            <span data-sld-btn-next="" className="neverdisplay" />
            <div id="app_screenshots_sld" data-sld-resizeable="" data-sld-view="" className="slider_area">
            {images}
            </div>
          </div>
        </div>
        <div className="app_extended_meta">
          <div className="app_section_title">Mô tả</div>
          <div className="app_description">
            <div data-content-expand-id="description" dangerouslySetInnerHTML={{__html: this.props.data.desc}} >            
            </div>            
          </div>
        </div>
        <div className="app_extended_meta">
          <div className="app_section_title">Đánh giá ứng dụng</div>
          <div className="app_flags mt10">
            <span data-ajax-url="http://m.eoliveira.store.aptoide.com/phpajax/do_apk_flag.php?appid=7217417&repo=eoliveira" data-ajax="flags" className="neverdisplay">
              Submitting flag...   
              <div className="load_circ" />
            </span>
            <div>
              <div className="good ">
                <img alt="" src="http://cdn3.aptoide.com/includes/themes/mobile2014/images/flag_good.png" />
                <div>Thích</div>
                <div data-flag-vote-good-count="">{this.props.data.total_like}</div>
                <div data-login-btn-trigger="" className="btn">
                  <div>Thích</div>
                </div>
              </div>
            </div>
            <div>
              <div className="license ">
                <img alt="" src="http://cdn3.aptoide.com/includes/themes/mobile2014/images/flag_license.png" />
                <div>Chia sẻ</div>
                <div data-flag-vote-license-count="">{this.props.data.total_share}</div>
                <div data-login-btn-trigger="" className="btn">
                  <div>Chia sẻ</div>
                </div>
              </div>
            </div>

          </div>
          <div className="clear"><br /></div>
        </div>
      </section>
    );
  }
});

var AppDetails = React.createClass({
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
      desc: ""
    }}
  },
  componentDidMount: function() {      
    var url = "/api/app/" + document.partner + "/" + this.props.params.appId;
    $.get(url, function(result) {      
      if (this.isMounted()) {                
        this.setState({data: result})        
      }
    }.bind(this))    

  },
  render: function() {    
    return (
      <div className="body">
<Header />
<div className="body_container">
<Details data={this.state.data}/>
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


var SearchContent = React.createClass({
  getInitialState: function() {
    return {data: [], page: 1}
  },
  getMoreContent: function() {    
    // var page = this.state.page + 1; 
    // var prefix = "/api/apps-partner/";
    // if (this.props.route == "home") {
    //   prefix = "/api/apps-partner/";
    // } else if (this.props.route == "topdownload") {
    //   prefix = "/api/apps-download/";
    // } else if (this.props.route == "standings") {
    //   prefix = "/api/apps-like/";
    // }      
    // var url = prefix + document.partner + "/" + this.state.page + "/10";
    // $.get(url, function(result) {      
    //   if (this.isMounted()) {
    //     if (result != null && $.isArray(result) && result.length > 0) {
    //       var newData = this.state.data.concat(result)
    //       this.setState({data: newData, page: page})
    //     }
    //   }
    // }.bind(this))    
  },
  componentDidMount: function() {

  },
  render: function() {
    return (
      <div>
      <AppList data={this.props.data}/>
        <div className="clear" />
        <div id="loading_gif" className="wfull center">
          <div style={{width: 160, height: 15}} className="css_loader"><div style={{top: 0, left: 0, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0s', WebkitAnimationDelay: '0s', MsAnimationDelay: '0s', OAnimationDelay: '0s', animationDelay: '0s'}} /><div style={{top: 0, left: 20, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.125s', WebkitAnimationDelay: '0.125s', MsAnimationDelay: '0.125s', OAnimationDelay: '0.125s', animationDelay: '0.125s'}} /><div style={{top: 0, left: 40, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.25s', WebkitAnimationDelay: '0.25s', MsAnimationDelay: '0.25s', OAnimationDelay: '0.25s', animationDelay: '0.25s'}} /><div style={{top: 0, left: 60, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.375s', WebkitAnimationDelay: '0.375s', MsAnimationDelay: '0.375s', OAnimationDelay: '0.375s', animationDelay: '0.375s'}} /><div style={{top: 0, left: 80, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.5s', WebkitAnimationDelay: '0.5s', MsAnimationDelay: '0.5s', OAnimationDelay: '0.5s', animationDelay: '0.5s'}} /><div style={{top: 0, left: 100, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.625s', WebkitAnimationDelay: '0.625s', MsAnimationDelay: '0.625s', OAnimationDelay: '0.625s', animationDelay: '0.625s'}} /><div style={{top: 0, left: 120, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.75s', WebkitAnimationDelay: '0.75s', MsAnimationDelay: '0.75s', OAnimationDelay: '0.75s', animationDelay: '0.75s'}} /><div style={{top: 0, left: 140, height: 15, width: 15, MozAnimationName: 'css_anim', MozAnimationDuration: '1s', MozAnimationIterationCount: 'infinite', MozAnimationDirection: 'linear', MozTransform: 'scale(.3)', WebkitAnimationName: 'css_anim', WebkitAnimationDuration: '1s', WebkitAnimationIterationCount: 'infinite', WebkitAnimationDirection: 'linear', WebkitTransform: 'scale(.3)', MsAnimationName: 'css_anim', MsAnimationDuration: '1s', MsAnimationIterationCount: 'infinite', MsAnimationDirection: 'linear', MsTransform: 'scale(.3)', OAnimationName: 'css_anim', OAnimationDuration: '1s', OAnimationIterationCount: 'infinite', OAnimationDirection: 'linear', OTransform: 'scale(.3)', animationName: 'css_anim', animationDuration: '1s', animationIterationCount: 'infinite', animationDirection: 'linear', transform: 'scale(.3)', MozAnimationDelay: '0.875s', WebkitAnimationDelay: '0.875s', MsAnimationDelay: '0.875s', OAnimationDelay: '0.875s', animationDelay: '0.875s'}} /></div>
        </div>        
        <p className="btn-view" onClick={this.getMoreContent}>Xem thêm</p>
        </div>      
    )
  }    
});

var AppSearch = React.createClass({
  getInitialState: function() {
      return {query: this.props.params.query, data: []};
  },
  updateSearchQuery: function(query) {      
    var prefix = "/app/search/" + query;
    var url = prefix + "/1/10";    
    $.get(url, function(result) {
      if (this.isMounted()) {
        this.setState({data: result, query: query})
      }
    }.bind(this));    

  },
  componentDidMount: function() {
    var prefix = "/app/search/" + this.props.params.query;
    var url = prefix + "/1/10";    
    $.get(url, function(result) {
      if (this.isMounted()) {
        this.setState({data: result, query: this.props.params.query})
      }
    }.bind(this));    
  },
  render: function() {
    return (
      <div className="body">
<Header route="search" updateSearchQuery={this.updateSearchQuery}/>
<div className="body_container">
<NavTop route="search" />
<SearchContent route="search" query={this.state.query} data={this.state.data} />
</div>
<Footer />    
    </div>
    )
  }
})




