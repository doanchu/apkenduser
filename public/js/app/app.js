var Router = ReactRouter;
var Route = ReactRouter.Route;
var Routes = ReactRouter.Routes;
var DefaultRoute = ReactRouter.DefaultRoute;
var Link = ReactRouter.Link;


var loc = "history";
if (window.history && window.history.pushState) {
    loc = "history";
} else {
    loc = "hash";
}

var x = function() {
    alert("fuck");
};

var routes = (
  <Routes location={loc} onChange={fn}>
    <Route name="Home" path="/" route="/" handler={Home}>    
    </Route>
    <Route name="TopDownloads" path="/top/downloads" route="/top/downloads" handler={TopDownloads}>    
    </Route>
    <Route name="TopStandings" path="/top/standings" route="/top/standings" handler={TopStandings}>        
    </Route>    
    <Route name="TopNew" path="/top/new" route="/top/new" handler={TopNew}>        
    </Route>        
    <Route name="AppSearch" path="/app/search" route="/app/search" handler={AppSearch}>        
    </Route>    
    <Route name="AppDetails" path="/app/:appId.html" handler={AppDetails}>        
    </Route>    
    <Route name="Categories" path="/app/categories" handler={Categories}>
    </Route>
    <Route name="AppCategory" path="/app/category/:cid" handler={AppCategory}>        
    </Route>            

  </Routes>
);

React.render(routes, document.body);