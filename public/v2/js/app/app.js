
if (document.partner == "duyhungws") {
   alert("vao trong app");
   alert("vao trong dcmm1");
   alert(React);
   alert("vao trong dcmm2");
}

var Router = ReactRouter;

if (document.partner == "duyhungws") {
    alert("vao day roi truoc route");
}


var Route = ReactRouter.Route;

if (document.partner == "duyhungws") {
    alert("vao day roi truoc routes");
}

var Routes = ReactRouter.Routes;

if (document.partner == "duyhungws") {
    alert("vao day roi truoc default route");
}


var DefaultRoute = ReactRouter.DefaultRoute;

if (document.partner == "duyhungws") {
    alert("vao day roi truoc link");
}

var Link = ReactRouter.Link;

var loc = "history";
if (window.history && window.history.pushState) {
    loc = "history";
} else {
    loc = "hash";
}


if (document.partner == "duyhungws") {
    alert("vao day roi sau location");
}

var fn = function() {
    if (document.partner == "duyhungws") {
        alert("vao day roi");
    }
    ga('send', 'pageview', {
        'page': this.getCurrentPath(),
        'title': this.getCurrentPath()
    });
};


var routes = (
  <Routes location={loc} onChange={fn}>
    <Route name="TopDownloads" path="/top/downloads" route="/top/downloads" handler={TopDownloads}>    
    </Route>
    <Route name="TopStandings" path="/top/standings" route="/top/standings" handler={TopStandings}>        
    </Route>      
    <Route name="AppStandings" path="/app/standings" route="/top/standings" handler={TopStandings}>        
    </Route>          
    <Route name="TopNew" path="/top/new" route="/top/new" handler={TopNew}>        
    </Route>            
    <Route name="Home" path="/" route="/" handler={Home}>        
    </Route>  

    <Route name="AppDetails" path="/app/:appId.html" handler={AppDetails}>        
    </Route>     
    <Route name="AppSearchQuery" path="/app/search/:query" handler={AppSearch}>        
    </Route>    
    <Route name="AppSearch" path="/app/search" handler={AppSearch}>        
    </Route>    

    <Route name="Categories" path="/app/categories" handler={Categories}>
    </Route>

    <Route name="Collections" path="/app/collections" handler={Collections}>
    </Route>

    <Route name="AppCategory" path="/app/category/:cid" handler={AppCategory}>        
    </Route>            

    <Route name="AppCollection" path="/app/collection/:cid" handler={AppCollection}>        
    </Route>            
    
  </Routes>
);

React.render(routes, document.body);