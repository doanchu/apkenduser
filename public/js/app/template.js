var Navigation = ReactRouter.Navigation;

var Navbar = React.createClass({
  back: function(e) {
    e.preventDefault();
    window.history.back();
  },  
	render: function() {
return (

      <div className="navbar">
        {/* Navbar inner for Index page*/}
        <div data-page="index" className="navbar-inner">
          <div className="left">
            {/* Right link contains only icon - additional "icon-only" class*/}{/* Right link contains only icon - additional "icon-only" class*/}<a href="" onClick={this.back} className="link icon-only open-panel">  <i className="glyph-icon flaticon-left216" />                   
                  </a>                
          </div>
          {/* We have home navbar without left link*/}
          <div className="center">Kho ứng dụng</div>
          <div className="right">
            {/* Right link contains only icon - additional "icon-only" class*/}<a href="#" className="link icon-only open-panel">  <i className="glyph-icon" /></a>
          </div>
        </div>
      </div>
    );
	}
});

var Toolbar = React.createClass({
  render: function() {    
        return (

      <div className="toolbar tabbar tabbar-labels">
        <div className="toolbar-inner">
          <Link to="/" className={this.props.route == "home" ? "tab-link active" : "tab-link "}><i className="glyph-icon flaticon-home149" /><span class="tabbar-label">Trang chủ</span></Link>
          <Link to="/top/downloads" className={this.props.route == "/top/downloads" || this.props.route == "/top/standings" ? "tab-link active" : "tab-link "}><i className="glyph-icon flaticon-list88" /><span class="tabbar-label">Hot</span></Link>                    
          <Link to="/app/categories" className={this.props.route == "/app/categories" ? "tab-link active" : "tab-link "}><i className="glyph-icon flaticon-menu55" /><span class="tabbar-label">Danh mục</span></Link>                    
          <Link to="/app/search" className={this.props.route == "/app/search" ? "tab-link active" : "tab-link "}><i className="glyph-icon flaticon-search100" /><span class="tabbar-label">Tìm kiếm</span></Link>                              
        </div>
      </div>
    );
  }
});


var DownloadStoreButton = React.createClass({
  render: function() {
    return (<a href={"http://beta.apk.vn/store/download/" + document.partner} className="btn_store"> Tải store miễn phí </a>);                  
  }
})
var Banner = React.createClass({
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

      <div id="owl-demo" className="owl-carousel owl-theme">
        <div className="item"><img src="http://tinhwrl.beta.apk.vn/assets/images/fullimage4.jpg" alt="The Last of us" /></div>
        <div className="item"><img src="http://tinhwrl.beta.apk.vn/assets/images/fullimage3.jpg" alt="GTA V" /></div>
        <div className="item"><img src="http://tinhwrl.beta.apk.vn/assets/images/fullimage1.jpg" alt="Mirror Edge" /></div>
        <div className="item"><img src="http://tinhwrl.beta.apk.vn/assets/images/fullimage4.jpg" alt="The Last of us" /></div>
        <div className="item"><img src="http://tinhwrl.beta.apk.vn/assets/images/fullimage3.jpg" alt="GTA V" /></div>
        <div className="item"><img src="http://tinhwrl.beta.apk.vn/assets/images/fullimage1.jpg" alt="Mirror Edge" /></div>
      </div>
    );
  }
})


var Item = React.createClass({
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
    <li>
      <a href={"/app/" + this.props.appId + ".html"} className="item-link item-content">
        <div className="item-media"><img src={this.props.thumbnail} width={80} /></div>
        <div className="item-inner">
          <div className="item-title-row">
            <div className="item-title">{this.props.name}</div>
            <div className="item-after" onClick={this.handleDownload} href={"/app/cdownload/" + document.partner + "/" + this.props.appId} style={{zIndex: '6000'}} ></div>
          </div>
          <div className="item-subtitle">{this.props.downloads} Lượt Tải</div>
          <div className="item-text">{this.props.cname}</div>
        </div>
      </a>
    </li>    
    );
  }
});

var ItemList = React.createClass({
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
     title = <div className="content-block-title">{this.state.title}</div>     
    }    
    var iscategory = this.props.iscategory;
    var categoryName = "";
    var items = this.state.data.map(function(item){
      if (item != null) {
        if (iscategory == "true") {
          categoryName = item.cname;
        }
        return (
          <Item appId={item.id} name={item.name} downloads={item.total_download} cname={item.cname} thumbnail={item.thumbnail}/>
        );
      }
    })    
    var more = <a className="btn-view" onClick={this.getMoreContent}>Xem thêm</a>;     
    //alert(this.state.hasMore);
    if (this.state.hasMore == false) {
      more = "";
    }
    if (items.length == 0) {
      if (this.props.url.indexOf("/app/search/") != -1) {
        title = <div className="content-block-title">Không tìm thấy ứng dụng nào</div>;
        more = "";
      }
    }  
    if (iscategory == "true") {
      title = <div className="content-block-title">{categoryName}</div>;
    }

    return (
      <div>
{title}
<div className="list-block media-list lst_item">
                    <ul>                      
{items}
                    </ul>
                  </div>
                  {more}
      </div>
      )
  }
});


var TopDownloads = React.createClass({
  render: function() {
    return (<TopApp route="/top/downloads"/>)
  }
})

var TopStandings = React.createClass({
  render: function() {
    return (<TopApp route="/top/standings"/>)
  }
})

var TopNew = React.createClass({
  render: function() {
    return (<TopApp route="/top/new"/>)
  }
})

var TopApp = React.createClass({
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
      <div style={{height: '100%'}}>
        <div className="loading" id="loading">
          <h5>Đang tải <img src="/img/ajax-loader.gif" /> </h5>
        </div>      
        <div className="panel-overlay" />
        {/* Left panel with reveal effect*/}
        <div className="panel panel-left panel-reveal">
          <div className="content-block">
            <p>Left panel content goes here</p>
          </div>
        </div>
        {/* Views*/}
        <div className="views">
          {/* Your main view, should have "view-main" class*/}
          <div className="view view-main">
            {/* Top Navbar*/}
            <Navbar />
            {/* Pages, because we need fixed-through navbar and toolbar, it has additional appropriate classes*/}
            <div className="pages navbar-through toolbar-through">
              {/* Index Page*/}
              <div data-page="index" className="page">
                {/* Scrollable page content*/}
                <div className="page-content">
                  <DownloadStoreButton />
                  <div className="lst_topapp">
                    <div className="content-block">
                      {/* Buttons row as tabs controller */}
                      <div className="buttons-row">
                        {/* Link to 1st tab, active */}
                         <Link to="/top/downloads" className={this.props.route == "/top/downloads" ? "ttab-link active button" : "tab-link button"}>Tải nhiều</Link>
                         <Link to="/top/standings" className={this.props.route == "/top/standings" ? "ttab-link active button" : "tab-link button"}>Ưa thích</Link>                        
                         <Link to="/top/new" className={this.props.route == "/top/new" ? "ttab-link active button" : "tab-link button"}>Mới nhất</Link>                        
                        {/* Link to 3rd tab */}                        
                      </div>
                    </div>
                    {/* Tabs, tabs wrapper */}
                    <div className="tabs">
                      {/* Tab 1, active by default */}
                      <div id="tab1" className="tab active">
                        <div className="content-block">
                          <ItemList url={url} title="" route={this.props.route} />
                          <div className="clear" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="clear" />
                </div>
              </div>
            </div>

            <Toolbar route={this.props.route}/>
          </div>
        </div>
      </div>    
      );    
  }
});

var Search = React.createClass({
  render: function() {
    
  }
})


var Home = React.createClass({
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
      <div style={{height: '100%'}}>
        <div className="loading" id="loading">
          <h5>Đang tải <img src="/img/ajax-loader.gif" /> </h5>
        </div>
        {/* Status bar overlay for fullscreen mode*/}
        {/* Panels overlay*/}
        <div className="panel-overlay" />
        {/* Left panel with reveal effect*/}
        <div className="panel panel-left panel-reveal">
          <div className="content-block">
            <p>Left panel content goes here</p>
          </div>
        </div>
        {/* Views*/}
        <div className="views">
          {/* Your main view, should have "view-main" class*/}
          <div className="view view-main">
            {/* Top Navbar*/}
<Navbar />
            {/* Pages, because we need fixed-through navbar and toolbar, it has additional appropriate classes*/}
            <div className="pages navbar-through toolbar-through">
              {/* Index Page*/}
              <div data-page="index" className="page">
                {/* Scrollable page content*/}
                <div className="page-content">
<Banner />
                  <DownloadStoreButton />
                  <ItemList url={url} title="Ứng dụng mới nhất" route={this.props.route}/>
                  <div className="clear" />
                </div>
              </div>
              {/* About Page*/}
              {/* Services Page*/}
              {/* Form Page*/}
            </div>
            {/* Bottom Toolbar*/}
<Toolbar route="home"/>
          </div>
        </div>
      </div>
    );
  }
});


var AppSearchHeader = React.createClass({
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
            <div className="navbar">
              {/* Navbar inner for Index page*/}
              <div data-page="index" className="navbar-inner">
                <div className="left">
                  {/* Right link contains only icon - additional "icon-only" class*/}<a href="" onClick={this.back} className="link icon-only open-panel">  <i className="glyph-icon flaticon-left216" />                   
                  </a>
                </div>
                <form data-search-list=".list-block-search" data-search-in=".item-title" className="searchbar" onSubmit={this.submit}>
                  <div className="searchbar-input">
                    <input type="search" placeholder="Nhập từ khóa tìm kiếm" value={this.state.query} onChange={this.search}/><a href="#" className="searchbar-clear" />
                  </div><a href="#" className="searchbar-cancel">Cancel</a>
                </form>
              </div>
            </div>      
      );
  }
})

var AppSearch = React.createClass({
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
      list = <ItemList url={url} title="Kết quả tìm kiếm" route={this.props.route} />
    } else {
      url = "/api/apps-like/" + document.partner + "/";
      list = <ItemList url={url} title="Các ứng dụng hot nhất" route={this.props.route} />
    }    
    return (
      <div style={{height: '100%'}}>
        <div className="loading" id="loading">
          <h5>Đang tải <img src="/img/ajax-loader.gif" /> </h5>
        </div>
        {/* Status bar overlay for fullscreen mode*/}
        {/* Panels overlay*/}
        <div className="panel-overlay" />
        {/* Left panel with reveal effect*/}
        <div className="panel panel-left panel-reveal">
          <div className="content-block">
            <p>Left panel content goes here</p>
          </div>
        </div>
        {/* Views*/}
        <div className="views">
          {/* Your main view, should have "view-main" class*/}
          <div className="view view-main">
            {/* Top Navbar*/}
<AppSearchHeader query={this.state.query} submit={this.submit}/>
            {/* Pages, because we need fixed-through navbar and toolbar, it has additional appropriate classes*/}
            <div className="pages navbar-through toolbar-through">
              {/* Index Page*/}
              <div data-page="index" className="page">
                {/* Scrollable page content*/}
                <div className="page-content">
                  {list}
                  <div className="clear" />
                </div>
              </div>
              {/* About Page*/}
              {/* Services Page*/}
              {/* Form Page*/}
            </div>
            {/* Bottom Toolbar*/}
            <Toolbar route={this.props.route}/>
          </div>
        </div>
      </div>
    );
  }
});

var AppDetails = React.createClass({
  handleDownload: function(e) {
    e.preventDefault();     
    var currentTarget = e.currentTarget;
    if (document.partner == "duyhungws") {
      alert("http://127.0.0.1:11793/download?partner=" + document.partner + "&app_id=" + this.state.data.id);
    }
    $.ajax({
      url: "http://127.0.0.1:11793/download?partner=" + document.partner + "&app_id=" + this.state.data.id,
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
          <div className="item"><img src={item} alt="The Last of us" /></div>
        );
      }
    })        
    
    return (
      <div style={{height: "100%"}}>
        <div className="loading" id="loading">
          <h5>Đang tải <img src="img/ajax-loader.gif" /> </h5>
        </div>
        {/* Status bar overlay for fullscreen mode*/}
        {/* Panels overlay*/}
        <div className="panel-overlay" />
        {/* Left panel with reveal effect*/}
        <div className="panel panel-left panel-reveal">
          <div className="content-block">
            <p>Left panel content goes here</p>
          </div>
        </div>
        {/* Views*/}
        <div className="views">
          {/* Your main view, should have "view-main" class*/}
          <div className="view view-main">
            {/* Top Navbar*/}
            <Navbar />
            {/* Pages, because we need fixed-through navbar and toolbar, it has additional appropriate classes*/}
            <div className="pages navbar-through toolbar-through">
              {/* Index Page*/}
              <div data-page="index" className="page">
                {/* Scrollable page content*/}
                <div className="page-content ">
                  <div className="detailt-app">
                    <div className="list-block media-list lst_item">
                      <ul>
                        <li>
                          <div href="#" className="item-link item-content">
                            <div className="item-media"><img src={this.state.data.thumbnail} /></div>
                            <div className="item-inner">
                              <div className="item-title-row">
                                <div className="item-titles">{this.state.data.name}</div>
                              </div>
                              <div className="item-subtitle">{this.state.data.cname}</div>
                              <div className="item-text"><i className="glyph-icon flaticon-download166" /> {this.state.data.total_download}</div>
                            </div>
                          </div>
                          <a className="btn-download" href={downloadLink} className=" btn-download" onClick={this.handleDownload}> Cài đặt +</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="lst_topapp">
                    <div className="content-block">
                      {/* Buttons row as tabs controller */}
                      <div className="buttons-row">
                        {/* Link to 1st tab, active */}
                        <a className="tab-link active button" id="infoLink" onClick={this.showInfo}>Thông tin</a>
                        {/* Link to 2nd tab */}
                        <a className="tab-link button" id="ratingLink" onClick={this.showRating}>Đánh giá</a>
                        {/* Link to 3rd tab */}
                      </div>
                    </div>
                    {/* Tabs, tabs wrapper */}
                    <div className="tabs">
                      {/* Tab 1, active by default */}
                      <div id="infoTab" className="tab active">
                        <div className="content-block info-app">
                          <div className="row">
                            <div id="owl-demo" className="owl-carousel owl-theme">
                           {screenShots} 
                            </div>
                          </div>
                          <div className="list-block">
                            <ul>
                              <li className="accordion-item"><a href="#" className="item-content item-link" onClick={this.show_hide}>
                                  <div className="item-inner">
                                    <div className="item-title">Bấm vào đây để xem mô tả</div>
                                  </div></a>
                                <div className="accordion-item-content" id="appDesc" data-showing="hidden">
                                  <div className="content-block content-app" dangerouslySetInnerHTML={{__html: this.state.data.desc}}>   
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <a className="btn-view" href={downloadLink} onClick={this.handleDownload}>Cài đặt</a> 

                        </div>
                      </div>   
                      <div id="ratingTab" className="tab">
                      <RatingTab appId={this.state.data.id}/>
                      </div>                       
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* About Page*/}
            {/* Services Page*/}
            {/* Form Page*/}
          </div>
          {/* Bottom Toolbar*/}
          <Toolbar route="/app/details" />
        </div>
      </div>
    );
  }
})


var CommentItem = React.createClass({
  render: function() {
    return (
              <li>
                <div className="item-content">
                  <div className="item-media"><i className="glyph-icon flaticon-user158" /> </div>
                  <div className="item-inner">
                    <div className="item-title-row">
                      <div className="item-title">{this.props.name}</div>
                    </div>
                    <div className="item-subtitle">{this.props.content}</div>
                  </div>
                </div>
              </li>      
      );    
  }
})

var CommentList = React.createClass({
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
        return (<CommentItem name={item.name} content={item.content}/>)
      }
    });        

    return (
      <div>
        <div className="list-block media-list lst_item">
          <div className="content-block-title">Bình luận</div>
          <div className="list-block media-list inset lst_comment">
            <ul>
{comments}
            </ul>
          </div>
        </div>
        <a className="btn-view">Xem thêm</a>      
      </div>
      )
  }
})

var RatingTab = React.createClass({
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

      <div className="content-block">
        <div className="list-block media-list lst_item">
          <div className="row lst_vote">
            <div id="shareButton" className="col-50 item">
              <a href="#" onClick={this.share}>
                <i className="glyph-icon flaticon-share39" /> 
                <span>Chia sẻ</span>
              </a>
            </div>
            <div id="likeButton" className="col-50 item">
              <a href="#" onClick={this.like}>
                <i className="glyph-icon flaticon-thumb54" /><span> Thích</span>
              </a>
            </div>
          </div>
        </div>
        <div className="content-block box-comment">
          <div className="list-block">
            <ul>
              <li className="accordion-item">
                <a href="#" className="item-content item-link" onClick={this.show_hide}>
                  <div className="item-inner">
                    <div className="item-title">Bấm vào đây để bình luận</div>
                  </div>
                </a>
                <div className="accordion-item-content" id="ratingAcc" data-showing="hidden">
                  <div className="content-block">
                    <div className="list-block">
                      <ul>
                        {/* Text inputs */}
                        <li>
                          <div className="item-content">
                            <div className="item-media" />
                            <div className="item-inner">
                              <div className="item-title label">Tên</div>
                              <div className="item-input">
                                <input type="text" placeholder="..." />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="item-content">
                            <div className="item-media" />
                            <div className="item-inner">
                              <div className="item-title label">Tiêu đề</div>
                              <div className="item-input">
                                <input type="text" placeholder="..." />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="item-content">
                            <div className="item-media" />
                            <div className="item-inner">
                              <div className="item-title label">Nội dung</div>
                              <div className="item-input">
                                <textarea placeholder="..." />
                              </div>
                            </div>
                          </div>
                        </li>
                        <button className="btn_send_comment" type="">Gửi</button>
                      </ul>
                    </div>
                    <br />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
<CommentList appId={this.props.appId}/>
        <div className="clear" />
      </div>
    );    
  }
})

var CategoryItem = React.createClass({
  render: function() {
    return (
      <div className="col-33 item">        
        <Link to={"/app/category/" + this.props.id}>
          <img src={this.props.icon} />
          <span>{this.props.name}</span>        
        </Link>
      </div>
      )    
  }
});

var CategoriesList = React.createClass({
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
          <CategoryItem icon={item.icon} name={item.name} id={item.id}/>
        );
      }
    }) 

    return (
      <div className="row lst_category">
        {items}
      </div>

      )   

  }
});

var Categories = React.createClass({
render: function() {
    return (
      <div style={{height: '100%'}}>
        <div className="loading" id="loading">
          <h5>Đang tải <img src="/img/ajax-loader.gif" /> </h5>
        </div>            
        <div className="panel-overlay" />
        {/* Left panel with reveal effect*/}
        <div className="panel panel-left panel-reveal">
          <div className="content-block">
            <p>Left panel content goes here</p>
          </div>
        </div>
        {/* Views*/}
        <div className="views">
          {/* Your main view, should have "view-main" class*/}
          <div className="view view-main">
            {/* Top Navbar*/}
            <Navbar />
            {/* Pages, because we need fixed-through navbar and toolbar, it has additional appropriate classes*/}
            <div className="pages navbar-through toolbar-through">
              {/* Index Page*/}
              <div data-page="index" className="page">
                {/* Scrollable page content*/}
                <div className="page-content">
                  <DownloadStoreButton />
                  <div className="content-block-title title_category">Danh mục ứng dụng</div>
                  <CategoriesList />
                </div>
              </div>
              {/* About Page*/}
              {/* Services Page*/}
              {/* Form Page*/}
            </div>
            {/* Bottom Toolbar*/}
            <Toolbar route="/app/categories" />
          </div>
        </div>
      </div>
    );
  }  
})

var AppCategory = React.createClass({
render: function() {
    var url = "/api/apps-category/" + document.partner + "/" + this.props.params.cid + "/";
    return (      
      <div style={{height: "100%"}}>
        <div className="loading" id="loading">
          <h5>Đang tải <img src="img/ajax-loader.gif" /> </h5>
        </div>

        <div className="panel-overlay" />
        {/* Left panel with reveal effect*/}
        <div className="panel panel-left panel-reveal">
          <div className="content-block">
            <p>Left panel content goes here</p>
          </div>
        </div>
        {/* Views*/}
        <div className="views">
          {/* Your main view, should have "view-main" class*/}
          <div className="view view-main">
            {/* Top Navbar*/}
            <Navbar />
            {/* Pages, because we need fixed-through navbar and toolbar, it has additional appropriate classes*/}
            <div className="pages navbar-through toolbar-through">
              <div data-page="index" className="page detailt-colection">
                {/* Scrollable page content*/}
                <div className="page-content">
                  <DownloadStoreButton />
                  <ItemList url={url} title="" iscategory="true" />
                  <div className="clear" />
                </div>
              </div>
              {/* About Page*/}
              {/* Services Page*/}
              {/* Form Page*/}
            </div>
            {/* Bottom Toolbar*/}
            <Toolbar route="/app/category" />
          </div>
        </div>
      </div>
    );
  }})
