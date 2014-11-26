var Navigation = ReactRouter.Navigation;
var RouterState = ReactRouter.ActiveState;

window.createTotalDownload = function(total_download) {
  if (total_download < 1000) {
    return "500 - 1000";
  } else if (1000 <= total_download && total_download < 10000) {
    return "1000+";
  } else if (10000 <= total_download && total_download < 50000) {
    return "10000+";    
  } else if (50000 <= total_download && total_download < 100000) {
    return "50000+";
  } else if (100000 <= total_download && total_download < 1000000) {
    return "100000+";
  } else if (1000000 <= total_download) {
    return "1M+";
  }
};

var Banner = React.createClass({  
  getInitialState: function() {
    return {data: []}
  },
  componentDidMount: function() {    
    $("#loading").css("display", "block");     
    //var url = prefix + document.partner + "/1/10";        
    var url = "/api/banners";
    $.get(url, function(result) {     
      $("#loading").css("display", "none");      
      if (this.isMounted()) {
        if (result != null && $.isArray(result) && result.length > 0) {
          this.setState({data: result});
        }
      }
    }.bind(this))       
  },
  componentDidUpdate: function(prevProps, prevState) {     
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
    var banner = <div className="bottom-loading" id="loading" style={{display: 'none'}} />
    if (this.state.data.length != 0) {
        bannerList = this.state.data.map(function(item){
          if (item != null) {
            var link = item.link.replace("{partner}", document.partner);
            return (
                <div className="item"><a href={link}><img src={item.banner} alt={item.name} style={{width: "100%", maxWidth: "480px"}}/></a></div>              
              )            
          }
        });
        banner = <div id="owl-demo" className="owl-carousel owl-theme">{bannerList}</div>;
    }
    return (
      <div>
      {banner}
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
        <div className="card no-rationale square-cover apps small" data-original-classes="card no-rationale square-cover apps small" data-short-classes="card no-rationale square-cover apps tiny">
          <div className="card-content id-track-click id-track-impression"  data-uitype={500}>
            <Link to={"/app/" + this.props.appId + ".html"} className="card-click-target" href={"/app/" + this.props.appId + ".html"} aria-hidden="true" tabindex={-1} /> 
            <div className="cover">
              <div className="cover-image-container">
                <div className="cover-outer-align">
                  <div className="cover-inner-align"> <img className="cover-image" alt={this.props.name} src={this.props.thumbnail} aria-hidden="true" /> </div>
                </div>
              </div>
              <Link to={"/app/" + this.props.appId + ".html"} className="card-click-target" href={"/app/" + this.props.appId + ".html"} aria-hidden="true" tabindex={-1}>  <span className="movies preordered-overlay-container id-preordered-overlay-container" style={{display: 'none'}}> <span className="preordered-label">Pre-ordered</span> </span> <span className="preview-overlay-container" ></span></Link> 
            </div>
            <div className="details">
              <Link to={"/app/" + this.props.appId + ".html"} className="card-click-target" href={"/app/" + this.props.appId + ".html"} aria-hidden="true" tabindex={-1} />  
              <h2> <Link to={"/app/" + this.props.appId + ".html"} className="title" href={"/app/" + this.props.appId + ".html"} title={this.props.name}>{this.props.name}<span className="paragraph-end" /> </Link> </h2>
              <div className="subtitle-container">
                <Link to={"/app/category/" + this.props.cid} className="subtitle" href="#">{this.props.cname}</Link>   
                <span className="price-container">
                  <span className="paragraph-end" />   
                  <span className="apps is-price-tag buy-button-container" data-doc-fetch-skip-cache={0} data-doc-fetch-vouchers={0} >
                    <div className="pon" style={{display: 'none'}}>1</div>
                    <button className="price buy">      <span className="display-price" data-href={"/app/cdownload/" + document.partner + "/" + this.props.appId}>Tải về</span> </button>    
                  </span>
                </span>
              </div>
            </div>
            <div className="reason-set">
              <span className="stars-container">
                <a data-href={"/app/cdownload/" + document.partner + "/" + this.props.appId} onClick={this.handleDownload} tabindex={-1}>
                  <div className="reason-set-star-rating" style={{paddingBottom: "2px"}}>
                  {this.props.size + "-" + window.createTotalDownload(this.props.downloads) + " cài đặt"}
                  </div>
                </a>
                <span className="price-container">
                  <span className="paragraph-end" />   
                  <span className="apps is-price-tag buy-button-container" data-doc-fetch-skip-cache={0} data-doc-fetch-vouchers={0} >
                    <div className="pon" style={{display: 'none'}}>1</div>
                    <button className="price buy">      <span className="display-price" data-href={"/app/cdownload/" + document.partner + "/" + this.props.appId} onClick={this.handleDownload}>Tải về</span> </button>    
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>        
      );    
  }
});

var ItemList = React.createClass({
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

      var searchResult = <div></div>;
      var isSearching = this.getActiveRoutes()[0].props.path.indexOf("/app/search") == -1 ? false : true;
      if (this.state.data.length == 0) {
        if (isSearching) {
          searchResult = <h1 className="cluster-heading">Không tìm thấy kết quả nào</h1> 
        }
      } else {
        var items = this.state.data.map(function(item){
          if (item != null) {
              var size = parseInt(item.size);
              if (!isNaN(size)) {
                  size = Math.floor(size / (1024*1024));
                  if (size == 0) {
                    size = parseInt(item.size);
                    size = Math.floor(size / 1024)  ;
                    size = size + " KB";
                  } else {
                    size = size + " MB";          
                  }        
              } else {
                size = item.size;
              }            
            return (
              <Item appId={item.id} name={item.name} size={size} downloads={item.total_download} cname={item.cname} cid={item.cid} thumbnail={item.thumbnail}/>
            );
          }
        })  
        more = <button className="play-button" id="show-more-button" style={{display: 'block'}} onClick={this.getMoreContent}>Xem thêm</button>;
        searchResult = (        
        <div>          
          <div className="card-list">
            {items}                   
          </div>
          <div className="bottom-loading" id="loading" style={{display: 'none'}} />        
          {more}        
        </div>
        )
      }

      
      return searchResult;
    }
});

var ActionBar = React.createClass({
  mixins: [Navigation, RouterState],    
  getInitialState: function() {    
    if (this.props.query != null) {
      return {query: this.props.query};  
    } else {
      return {query: ""};
    }
    
  },
  showMenuBar: function() {    
    if ($(document.body).hasClass("nav-open")) {
      $(document.body).removeClass("nav-open");
      //$("#mobile-menu-overlay").css("display", "none");        
    } else {
      $(document.body).addClass("nav-open");
      //$("#mobile-menu-overlay").css("display", "block");                  
    }
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
      <div>
        <ul>
          <ul className="mobile-nav" id="main-menu">
            <li>
              <div className="nav-profile-wrapper">
                <div style={{opacity: 1}}>                     
                </div>
                <div className="nav-profile" style={{opacity: 1}}>  <span> <span className="profile-curtain" /> <Link to="/" > <span className="profile-image" style={{backgroundImage: 'url("https://lh5.googleusercontent.com/-N0W0IXHj1N0/AAAAAAAAAAI/AAAAAAAAAJE/QxmGurCwbTo/w72-h72/photo.jpg")'}}> </span> <span className="profile-name non-selectable">{document.storeName}</span> </Link></span> </div>                  
              </div>
            </li>                        
            <li> <Link to="/" className="apps mobile-nav-item default"> <span className="icon" /> <span className="label">Hot</span> </Link> </li>
            <li>
              <div className="mobile-nav-separator" />
            </li>
            <li> <Link to="/top/new" className="mobile-nav-item secondary"> <span className="icon" /> <span className="label">Mới nhất</span> </Link> </li>
            <li> <Link to="/top/downloads" className="mobile-nav-item secondary" href="/store/account"> <span className="icon" /> <span className="label">Tải nhiều</span> </Link> </li>
            <li> <Link to="/top/standings" className="mobile-nav-item secondary id-track-click" href="/settings"> <span className="icon" /> <span className="label">Yêu thích</span> </Link> </li>
            <li>
              <div className="mobile-nav-separator" />
            </li>
            <li> <Link to="/app/categories" className="apps mobile-nav-item default"> <span className="icon" /> <span className="label">Thể loại</span> </Link> </li>
            <li> <Link to="/app/collections" className="apps mobile-nav-item default"> <span className="icon" /> <span className="label">Chọn lọc</span> </Link> </li>
          </ul>
        </ul>         
        <div className="mobile-action-bar">
          <span className="action-bar-menu-button" onClick={this.showMenuBar}> <i className="fa fa-align-justify fa-lg" style={{color: "#fff", marginTop: "17px"}}></i> </span> <Link to="/" className="play-logo" href="/" /> <span className="action-bar-search-button" onClick={this.showSearchBar}> <i className="fa fa-search fa-lg" style={{color: "#fff", marginTop: "17px"}}></i> </span> 
          <div className={"mobile-search-bar " + searchClass} id="search-bar">
            <span className="search-container">
              <form className="search-text-box" action="/store/search" id="gbqf" onSubmit={this.searchSubmit}>
                <div id="gbfwa" style={{marginRight:'30px'}}>
                  <div id="gbqfqw"> <input className="input-search" value={this.state.query} onChange={this.handleChange} placeholder="Tìm kiếm" id="gbqfq" name="q" aria-haspopup="true" /> </div>
                </div>
              </form>
              <span id="mobile-search-submit"> <span className="search-icon" /> </span> 
            </span>
            <span className="close-button" onClick={this.closeSearchBar}> <span className="close-icon" /> </span> 
          </div>
        </div>        
      </div>
      )
  }
});

var VerticalShortcuts = React.createClass({
  render: function() {
    return (

      <div className="vertical-shortcuts">
        <ul className="vertical-shortcuts-inner">
          <li className="shortcut"> <Link to="/top/new" className="play-button btn-new"><i className="fa fa-2 fa-wifi"></i> Mới nhất</Link> </li>
          <li className="shortcut"> <Link to="/top/downloads" className="play-button btn-downloads"> <i className="fa fa-2 fa-download"></i> Tải nhiều</Link> </li>
          <li className="shortcut"> <Link to="/top/standings" className="play-button btn-standings"><i className="fa fa-2 fa-heart-o"></i> Yêu thích</Link> </li>
          <li className="shortcut"> <Link to="/app/collections" className="play-button btn-collections"><i className="fa fa-2 fa-star-o"></i> Chọn lọc</Link> </li>
        </ul>
      </div>
    );
  }
});

var Footer = React.createClass({
  hideMenuBar: function() {
    $(document.body).removeClass("nav-open");
    $("#mobile-menu-overlay").css("display", "none");
  },    
  render: function() {
    return (
      <div>
      <div id="footer-content">            
        <div className="footer">
          <div className="footer-links-container">{document.footer}</div>
        </div>        
      </div>
      <div id="mobile-menu-overlay" onClick={this.hideMenuBar} style={{opacity: '0.8', display: 'none'}} />
      </div>
      )    
  }
});

var TopApp = React.createClass({
  getInitialState: function() {
    $(document.body).removeClass("nav-open");  
    return {};
  },
  downloadStore: function(e) {
    window.location.href = e.currentTarget.getAttribute("data-href");
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
      <div>     
        <ActionBar />      
        <div className="wrapper-with-footer phone-optimized-top" id="wrapper">
          <div className="butterbar-container"><span id="butterbar" /></div>
          <div className="body-content-loading-overlay" style={{display: 'none'}}>
            <div className="body-content-loading-spinner" />
          </div>
          <div className="id-body-content-beginning" aria-labelledby="main-title" tabindex={-1} />
          <div id="body-content" role="main">   
            <VerticalShortcuts />                   
            <div className="browse-page">
              <div className="cluster-container">
                <Banner />     
                <span className="apps large play-button"><button onClick={this.downloadStore} className="" data-href={"http://apk.vn/store/download/" + document.partner}><span>CÀI ĐẶT STORE MIỄN PHÍ</span></button></span>         
                <div className="cluster id-track-impression normal square-cover apps show-all id-track-chomp" data-fetch-start={18} data-original-classes="cluster normal square-cover apps show-all" data-short-classes="cluster tight square-cover apps show-all" data-uitype={400}>
                  <h1 className="cluster-heading">
                    {title}
                  </h1> 
                  <ItemList url={url} title="" route={this.props.route} />                  
                </div>                
              </div>
            </div>
          </div>         
          <div className="overlay-background" style={{display: 'none'}} />
          <div className="overlay-wrapper" style={{display: 'none'}}>
            <div className="overlay-content-wrapper">
              <div id="overlay-content" />
            </div>
          </div>
          <div style={{clear: 'both'}} />         
          <Footer />
        </div>
        <div className="loaded" id="page-load-indicator" />
        <div className="modal-dialog" tabindex={-1} role="dialog" style={{display: 'none'}}>
          <div className="id-contents-wrapper">
            <div className="contents">
            This is content
            </div>
          </div>
        </div>
        <div className="modal-dialog-overlay" style={{display: 'none'}} />
        <div id="roster-for-Google-Help" style={{display: 'none'}} />
      </div>
    );
  }	
});

var TopNew = React.createClass({
  render: function() {
    return (<TopApp route="/top/new"/>)
  }
});

var TopDownloads = React.createClass({
  render: function() {
    return (<TopApp route="/top/downloads"/>)
  }
});

var TopStandings = React.createClass({
  render: function() {
    return (<TopApp route="/top/standings"/>)
  }
});


var Home = React.createClass({
  render: function() {
    return (<TopApp route="/"/>)
  }
});


var Content = React.createClass({
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
        return (<div className="bottom-loading" id="content-loading" style={{display: 'block'}} />);
    };
    var screenShots = this.state.data.ss.map(function(item){
      if (item != null) {
        return (
          <img className="screenshot" data-expand-to="full-screenshot-7" src={item} itemprop="screenshot" /> 
        );
      }
    });      
    var downloadLink = "/app/cdownload/" + document.partner + "/" + this.state.data.id;
    var size = parseInt(this.state.data.size);
    if (!isNaN(size)) {
        size = Math.floor(size / (1024*1024));
        if (size == 0) {
          size = parseInt(this.state.data.size);
          size = Math.floor(size / 1024)  ;
          size = size + " KB";
        } else {
          size = size + " MB";          
        }        
    } else {
      size = this.state.data.size;
    }
    return (
<div itemscope="itemscope" itemtype="http://schema.org/MobileApplication" id="body-content" role="main">      
<div>
  <div className="details-wrapper apps square-cover id-track-partial-impression" data-uitype={209}>
    <div className="details-info">
      <div className="cover-container"> <img className="cover-image" src={this.state.data.thumbnail} alt="Cover art" aria-hidden="true" itemprop="image" /> </div>
      <div className="info-container">
        <div className="document-title" itemprop="name">
          <div>{this.state.data.name}</div>
        </div>
        <div itemprop="author" itemscope="" itemtype="http://schema.org/Organization">                      
          <div className="document-subtitle primary"> <span itemprop="name">{size} - {window.createTotalDownload(this.state.data.total_download)} Lượt tải</span> </div>                            
        </div>        
        <div>  <Link to={"/app/category/" + this.state.data.cid} className="document-subtitle category" href={"/app/category/" + this.state.data.cid}> <span itemprop="genre">{this.state.data.cname}</span> </Link></div>
        <div className="details-actions">
          <span>
            <span className="apps medium play-button buy-button-container" data-doc-fetch-skip-cache={0} data-doc-fetch-vouchers={0}>
              <div className="pon" style={{display: 'none'}}>1</div>
              <button className="" onClick={this.handleDownload} data-href={downloadLink}>                
                <span> Cài đặt ngay</span>    
              </button>
            </span>
          </span>
          <span>
          <span className="apps medium play-button buy-button-container" style={{minWidth: "50px", backgroundColor: "#2ecc71"}} data-doc-fetch-skip-cache={0} data-doc-fetch-vouchers={0}>
                        <button className="">
                <i className="fa fa-thumbs-o-up fa-lg"></i>
                <span> Thích</span>    
              </button>
</span>              
              </span>

        </div>                        
        <div className="app-compatibility">
          <div className="app-compatibility-final" style={{}}>
            <div className="id-app-compatibility-icon compatibility-image compatibility-info-img" />
            Ứng dụng này tương thích với thất cả các thiết bị của bạn
          </div>
        </div>
        <div className="details-info-divider" />
        <div className="header-star-badge">
          <div className="stars-container">
            <div className="tiny-star star-rating-non-editable-container" aria-label="Rated 4.3 stars out of five stars">
              <div className="current-rating" style={{width: '85.82446098327637%'}} />
            </div>
          </div>
          <div className="stars-count"> (<span className="reviewers-small" />{" " + this.state.data.total_download + " Lượt tải"}) </div>
        </div>
      </div>
    </div>
    <div className="details-section screenshots" aria-hidden="true">
      <div className="details-section-contents">
        <div className="details-section-body expandable">
          <div className="thumbnails-wrapper">
            <div className="thumbnails" data-expand-target="thumbnails">{screenShots}</div>
          </div>
        </div>
      </div>
      <div className="details-section-divider" />
    </div>
    <div className="details-section description simple contains-text-link">
      <div className="details-section-contents show-more-container more" data-show-use-buffer="true">
        <div className="heading">Mô tả</div>
        <div className="show-more-content text-body" itemprop="description" id="app-description" style={{maxHeight: 340}}>
          <div className="id-app-orig-desc" dangerouslySetInnerHTML={{__html: this.state.data.desc}}>                        
          </div>
          <div className="show-more-end" id="showMoreEnd"/>
        </div>
        <div>
          <button className="play-button show-more small" id="showMoreButton" onClick={this.showMore}>Xem thêm</button> 
          <button className="play-button expand-close">
            <div className="close-image"> </div>
          </button>
        </div>
      </div>
      <div className="details-section-divider" />
    </div>
  </div>
</div>
<RecommendedList cid={this.state.data.cid} />
</div>     
      )    
  }
});

var RecommendedList = React.createClass({
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
      items = <div className="bottom-loading" id="recommended-loading" style={{display: 'block'}} />;
    } else {
      items = this.state.data.map(function(item){
        if (item != null) {
          return (
            <Item appId={item.id} name={item.name} downloads={item.total_download} cname={item.cname} cid={item.cid} thumbnail={item.thumbnail}/>
          );
        }
      })  

    }
    return (
      <div className="details-wrapper">
        <div className="details-section recommendation">
          <div className="details-section-contents">
            <div className="rec-cluster" data-uitype={400}>
              <h1 className="heading">Các ứng dụng cùng thể loại</h1>
              <div className="cards expandable">
              {items}
              </div>
            </div>
          </div>
        </div>
      </div>      
      );
  }
});

var AppDetails = React.createClass({
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
      <div>

        <ActionBar />

        <div className="wrapper-with-footer phone-optimized-top" id="wrapper">                    
          <div className="body-content-loading-overlay" style={{display: 'none'}}>
            <div className="body-content-loading-spinner" />
          </div>
          <div className="action-bar-container" role="navigation">
            <div className="action-bar-inner">
            </div>
          </div>          
          
          <Content appId={this.props.params.appId}/>
          <div className="overlay-background" style={{display: 'none'}} />
          <div className="overlay-wrapper" style={{display: 'none'}}>
            <div className="overlay-content-wrapper">
              <div id="overlay-content" />
            </div>
          </div>
          <div style={{clear: 'both'}} />
          <Footer />
        </div>
        <div className="loaded" id="page-load-indicator" />
        
        <div id="instrument-manager-parent" />
        <div className="modal-dialog" tabindex={-1} role="dialog" style={{display: 'none'}}>
          <div className="id-contents-wrapper">
            <div className="contents" />
          </div>
        </div>
        <div className="modal-dialog-overlay" style={{display: 'none'}} />
        <div id="roster-for-Google-Help" style={{display: 'none'}} />
      </div>
    );
  }
});

var AppSearch = React.createClass({
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
      <div>     
        <ActionBar query={this.state.query} updateSearchQuery={this.updateSearchQuery}/>      
        <div className="wrapper-with-footer phone-optimized-top" id="wrapper">
          <div className="butterbar-container"><span id="butterbar" /></div>
          <div className="body-content-loading-overlay" style={{display: 'none'}}>
            <div className="body-content-loading-spinner" />
          </div>
          <div className="id-body-content-beginning" aria-labelledby="main-title" tabindex={-1} />
          <div id="body-content" role="main">   
            <VerticalShortcuts />                   
            <div className="browse-page">
              <div className="cluster-container">
                <div className="cluster id-track-impression normal square-cover apps show-all id-track-chomp" data-fetch-start={18} data-original-classes="cluster normal square-cover apps show-all" data-short-classes="cluster tight square-cover apps show-all" data-uitype={400}>
                  <ItemList url={url} title="" route={this.props.route} />                                    
                </div>                
              </div>
            </div>
          </div>         
          <div className="overlay-background" style={{display: 'none'}} />
          <div className="overlay-wrapper" style={{display: 'none'}}>
            <div className="overlay-content-wrapper">
              <div id="overlay-content" />
            </div>
          </div>
          <div style={{clear: 'both'}} />         
          <Footer />
        </div>
        <div className="loaded" id="page-load-indicator" />
        <div className="modal-dialog" tabindex={-1} role="dialog" style={{display: 'none'}}>
          <div className="id-contents-wrapper">
            <div className="contents">
            This is content
            </div>
          </div>
        </div>
        <div className="modal-dialog-overlay" style={{display: 'none'}} />
        <div id="roster-for-Google-Help" style={{display: 'none'}} />
      </div>
    );    
  }
});



var CategoryItem = React.createClass({  
  render: function() {
    var categoryURL = "/app/category/" + this.props.id;
    return (
        <div className="card no-rationale square-cover apps small" data-original-classes="card no-rationale square-cover apps small" data-short-classes="card no-rationale square-cover apps tiny">
          <div className="card-content id-track-click id-track-impression"  data-uitype={500}>
            <Link to={categoryURL} className="card-click-target" href={categoryURL} aria-hidden="true" tabindex={-1} /> 
            <div className="cover">
              <div className="cover-image-container">
                <div className="cover-outer-align">
                  <div className="cover-inner-align"> <img className="cover-image" alt={this.props.name} src={this.props.icon} aria-hidden="true" /> </div>
                </div>
              </div>
              <Link to={categoryURL} className="card-click-target" href={categoryURL} aria-hidden="true" tabindex={-1}>  <span className="movies preordered-overlay-container id-preordered-overlay-container" style={{display: 'none'}}> <span className="preordered-label">Pre-ordered</span> </span> <span className="preview-overlay-container" ></span></Link> 
            </div>
            <div className="details">
              <Link to={categoryURL} className="card-click-target" href={categoryURL} aria-hidden="true" tabindex={-1} />  
              <h2> <Link to={categoryURL} className="title" href={categoryURL} title={this.props.name}>{this.props.name}<span className="paragraph-end" /> </Link> </h2>
            </div>
          </div>
        </div>        
      );    
  }
});

var CategoryList = React.createClass({  
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {    
   
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

      var searchResult = <div><div className="bottom-loading" id="loading" style={{display: 'none'}} />        </div>;      
      if (this.state.data.length == 0) {
      } else {
        var items = this.state.data.map(function(item){
          if (item != null) {
            return (
              <CategoryItem id={item.id} name={item.name} icon={item.icon} />
            );
          }
        })          
        searchResult = (        
        <div>
          <div className="card-list">
            {items}                   
          </div>                  
        </div>
        )
      }

      
      return searchResult;
    }
});


var Categories = React.createClass({
  getInitialState: function() {
    $(document.body).removeClass("nav-open");  
    return {data:[]};
  }, 
  render: function() {
    return (
      <div>     
        <ActionBar />      
        <div className="wrapper-with-footer phone-optimized-top" id="wrapper">
          <div className="butterbar-container"><span id="butterbar" /></div>
          <div className="body-content-loading-overlay" style={{display: 'none'}}>
            <div className="body-content-loading-spinner" />
          </div>
          <div className="id-body-content-beginning" aria-labelledby="main-title" tabindex={-1} />
          <div id="body-content" role="main">   
            <VerticalShortcuts />                   
            <div className="browse-page">
              <div className="cluster-container">
                <div className="cluster id-track-impression normal square-cover apps show-all id-track-chomp" data-fetch-start={18} data-original-classes="cluster normal square-cover apps show-all" data-short-classes="cluster tight square-cover apps show-all" data-uitype={400}>
                  <CategoryList />                  
                </div>                
              </div>
            </div>
          </div>         
          <div className="overlay-background" style={{display: 'none'}} />
          <div className="overlay-wrapper" style={{display: 'none'}}>
            <div className="overlay-content-wrapper">
              <div id="overlay-content" />
            </div>
          </div>
          <div style={{clear: 'both'}} />         
          <Footer />
        </div>
        <div className="loaded" id="page-load-indicator" />
        <div className="modal-dialog" tabindex={-1} role="dialog" style={{display: 'none'}}>
          <div className="id-contents-wrapper">
            <div className="contents">
            This is content
            </div>
          </div>
        </div>
        <div className="modal-dialog-overlay" style={{display: 'none'}} />
        <div id="roster-for-Google-Help" style={{display: 'none'}} />
      </div>
    );
  }
});


var AppCategoryList = React.createClass({
  mixins: [RouterState],
  getInitialState: function() {
    return {data: [], page: 1, cname: ""};
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
    var url = "/api/v2/apps-category/" + document.partner + "/" + this.props.cid + "/" + page + "/10";        
    $("#loading").css("display", "block");
    $("#show-more-button").addClass("disabled");
    $.get(url, function(result) {      
      $("#loading").css("display", "none");
      $("#show-more-button").removeClass("disabled");
      if (this.isMounted()) {
        if (result != null && $.isArray(result.apps) && result.apps.length > 0) {
          var newData = this.state.data.concat(result.apps)
          this.setState({data: newData, page: page, cname: result.cname})
        } else {
          this.setState({data: this.state.data, page: page, cname: this.state.cname});
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
    $("#show-more-button").addClass("disabled");
    var url = "/api/v2/apps-category/" + document.partner + "/" + this.props.cid + "/1/10";                
    $.get(url, function(result) {      
      $("#loading").css("display", "none");
      $("#show-more-button").removeClass("disabled");
      if (this.isMounted()) {
        if (result != null && $.isArray(result.apps) && result.apps.length > 0) {
          this.setState({data: result.apps, page: 1, cname: result.cname});
        }
      }
    }.bind(this))
  },         
  render: function() {

      var searchResult = <div><div className="bottom-loading" id="loading" style={{display: 'none'}} /></div>;      
      if (this.state.data.length == 0) {
      } else {
        var items = this.state.data.map(function(item){
          if (item != null) {
            return (
              <Item appId={item.id} name={item.name} downloads={item.total_download} cname={item.cname} thumbnail={item.thumbnail}/>
            );
          }
        })  
        more = <button className="play-button" id="show-more-button" style={{display: 'block'}} onClick={this.getMoreContent}>Xem thêm</button>;
        searchResult = (        
        <div>
          <h1 className="cluster-heading">{this.state.cname}</h1>           
          <div className="card-list">
            {items}                   
          </div>
          <div className="bottom-loading" id="loading" style={{display: 'none'}} />        
          {more}        
        </div>
        )
      }

      
      return searchResult;
    }
});

var AppCategory = React.createClass({
  getInitialState: function() {
    $(document.body).removeClass("nav-open");  
    return {data:[]};
  }, 
  render: function() {
    return (
      <div>     
        <ActionBar />      
        <div className="wrapper-with-footer phone-optimized-top" id="wrapper">
          <div className="butterbar-container"><span id="butterbar" /></div>
          <div className="body-content-loading-overlay" style={{display: 'none'}}>
            <div className="body-content-loading-spinner" />
          </div>
          <div className="id-body-content-beginning" aria-labelledby="main-title" tabindex={-1} />
          <div id="body-content" role="main">   
            <VerticalShortcuts />                   
            <div className="browse-page">
              <div className="cluster-container">
                <div className="cluster id-track-impression normal square-cover apps show-all id-track-chomp" data-fetch-start={18} data-original-classes="cluster normal square-cover apps show-all" data-short-classes="cluster tight square-cover apps show-all" data-uitype={400}>
                  <AppCategoryList cid={this.props.params.cid} />                  
                </div>                
              </div>
            </div>
          </div>         
          <div className="overlay-background" style={{display: 'none'}} />
          <div className="overlay-wrapper" style={{display: 'none'}}>
            <div className="overlay-content-wrapper">
              <div id="overlay-content" />
            </div>
          </div>
          <div style={{clear: 'both'}} />         
          <Footer />
        </div>
        <div className="loaded" id="page-load-indicator" />
        <div className="modal-dialog" tabindex={-1} role="dialog" style={{display: 'none'}}>
          <div className="id-contents-wrapper">
            <div className="contents">
            This is content
            </div>
          </div>
        </div>
        <div className="modal-dialog-overlay" style={{display: 'none'}} />
        <div id="roster-for-Google-Help" style={{display: 'none'}} />
      </div>
    );
  }
})

var CollectionItem = React.createClass({
  render: function() {
    var collectionURL = "/app/collection/" + this.props.colid;
    return (
        <div className="card no-rationale wide-cover apps small" data-original-classes="card no-rationale square-cover apps small" data-short-classes="card no-rationale square-cover apps tiny">
          <div className="card-content id-track-click id-track-impression"  data-uitype={500}>
            <Link to={collectionURL} className="card-click-target" href={collectionURL} aria-hidden="true" tabindex={-1} /> 
            <div className="cover">
              <div className="cover-image-container">
                <div className="cover-outer-align">
                  <div className="cover-inner-align"> <img className="cover-image" alt={this.props.name} src={this.props.banner} aria-hidden="true" /> </div>
                </div>
              </div>
              <Link to={collectionURL} className="card-click-target" href={collectionURL} aria-hidden="true" tabindex={-1}>  <span className="movies preordered-overlay-container id-preordered-overlay-container" style={{display: 'none'}}> <span className="preordered-label">Pre-ordered</span> </span> <span className="preview-overlay-container" ></span></Link> 
            </div>
            <div className="details">
              <Link to={collectionURL} className="card-click-target" href={collectionURL} aria-hidden="true" tabindex={-1} />  
              <h2> <Link to={collectionURL} className="title" href={collectionURL} title={this.props.name}>{this.props.name}<span className="paragraph-end" /> </Link> </h2>
            </div>
          </div>
        </div>        
      );    
  }  
})

var CollectionList = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {    
   
    $("#loading").css("display", "block");     
    //var url = prefix + document.partner + "/1/10";      
    var url = "/api/collections";           
    $.get(url, function(result) {      
      $("#loading").css("display", "none");      
      if (this.isMounted()) {
        this.setState({data: result})
      }
    }.bind(this))
  },         
  render: function() {

      var searchResult = <div><div className="bottom-loading" id="loading" style={{display: 'none'}} />        </div>;      
      if (this.state.data.length == 0) {
      } else {
        var items = this.state.data.map(function(item){
          if (item != null) {
            return (
              <CollectionItem colid={item.Oid} name={item.name} banner={item.banner} />
            );
          }
        })          
        searchResult = (        
        <div>
          <div className="card-list">
            {items}                   
          </div>                  
        </div>
        )
      }

      
      return searchResult;
    }
})



var Collections = React.createClass({
  getInitialState: function() {
    $(document.body).removeClass("nav-open");  
    return {data:[]};
  }, 
  render: function() {
    return (
      <div>     
        <ActionBar />      
        <div className="wrapper-with-footer phone-optimized-top" id="wrapper">
          <div className="butterbar-container"><span id="butterbar" /></div>
          <div className="body-content-loading-overlay" style={{display: 'none'}}>
            <div className="body-content-loading-spinner" />
          </div>
          <div className="id-body-content-beginning" aria-labelledby="main-title" tabindex={-1} />
          <div id="body-content" role="main">   
            <VerticalShortcuts />                   
            <div className="browse-page">
              <div className="cluster-container">
                <div className="cluster id-track-impression normal square-cover apps show-all id-track-chomp" data-fetch-start={18} data-original-classes="cluster normal square-cover apps show-all" data-short-classes="cluster tight square-cover apps show-all" data-uitype={400}>
                  <CollectionList />                  
                </div>                
              </div>
            </div>
          </div>         
          <div className="overlay-background" style={{display: 'none'}} />
          <div className="overlay-wrapper" style={{display: 'none'}}>
            <div className="overlay-content-wrapper">
              <div id="overlay-content" />
            </div>
          </div>
          <div style={{clear: 'both'}} />         
          <Footer />
        </div>
        <div className="loaded" id="page-load-indicator" />
        <div className="modal-dialog-overlay" style={{display: 'none'}} />
        <div id="roster-for-Google-Help" style={{display: 'none'}} />
      </div>
    );
  }
});


var AppCollectionList = React.createClass({
  mixins: [RouterState],
  getInitialState: function() {
    return {data: [], name: "", banner: "", id: ""};
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
    var url = "/api/collection-details/" + document.partner + "/" + this.props.cid;                
    $.get(url, function(result) {      
      $("#loading").css("display", "none");
      $("#show-more-button").removeClass("disabled");
      if (this.isMounted()) {
        if (result != null && $.isArray(result.apps) && result.apps.length > 0) {
          this.setState({data: result.apps, name: result.name, banner: result.banner, id: result.Oid});
        }
      }
    }.bind(this))
  },         
  render: function() {

      var searchResult = <div><div className="bottom-loading" id="loading" style={{display: 'none'}} /></div>;      
      if (this.state.data.length == 0) {
      } else {        
        var items = this.state.data.map(function(item){
          if (item != null) {
            return (
              <Item appId={item.id} name={item.name} downloads={item.total_download} cname={item.cname} thumbnail={item.thumbnail}/>
            );
          }
        })          
        searchResult = (        
        <div>        
          <CollectionItem colid={this.state.id} name={this.state.name} banner={this.state.banner} />                  
          <div className="card-list">
            {items}                   
          </div>
          <div className="bottom-loading" id="loading" style={{display: 'none'}} />                  
        </div>
        )
      }

      
      return searchResult;
    }
});

var AppCollection = React.createClass({
  getInitialState: function() {
    $(document.body).removeClass("nav-open");  
    return {data:[]};
  }, 
  render: function() {
    return (
      <div>     
        <ActionBar />      
        <div className="wrapper-with-footer phone-optimized-top" id="wrapper">
          <div className="butterbar-container"><span id="butterbar" /></div>
          <div className="body-content-loading-overlay" style={{display: 'none'}}>
            <div className="body-content-loading-spinner" />
          </div>
          <div className="id-body-content-beginning" aria-labelledby="main-title" tabindex={-1} />
          <div id="body-content" role="main">   
            <VerticalShortcuts />                   
            <div className="browse-page">
              <div className="cluster-container">
                <div className="cluster id-track-impression normal square-cover apps show-all id-track-chomp" data-fetch-start={18} data-original-classes="cluster normal square-cover apps show-all" data-short-classes="cluster tight square-cover apps show-all" data-uitype={400}>
                  <AppCollectionList cid={this.props.params.cid} />                  
                </div>                
              </div>
            </div>
          </div>         
          <div className="overlay-background" style={{display: 'none'}} />
          <div className="overlay-wrapper" style={{display: 'none'}}>
            <div className="overlay-content-wrapper">
              <div id="overlay-content" />
            </div>
          </div>
          <div style={{clear: 'both'}} />         
          <Footer />
        </div>
        <div className="loaded" id="page-load-indicator" />
        <div className="modal-dialog" tabindex={-1} role="dialog" style={{display: 'none'}}>
          <div className="id-contents-wrapper">
            <div className="contents">
            This is content
            </div>
          </div>
        </div>
        <div className="modal-dialog-overlay" style={{display: 'none'}} />
        <div id="roster-for-Google-Help" style={{display: 'none'}} />
      </div>
    );
  }
})
