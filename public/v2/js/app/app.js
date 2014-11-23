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

var routes = (
  <Routes location={loc}>
    <Route name="TopDownloads" path="/top/downloads" route="/top/downloads" handler={TopDownloads}>    
    </Route>
    <Route name="TopStandings" path="/top/standings" route="/top/standings" handler={TopStandings}>        
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


  </Routes>
);

React.render(routes, document.body);