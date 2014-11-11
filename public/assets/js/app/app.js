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
    <Route name="Home" path="/" handler={Home}>    
    </Route>
    <Route name="TopDownload" path="/app/topdownload" handler={TopDownload}>    
    </Route>
    <Route name="TopStandings" path="/app/standings" handler={TopStandings}>    
    </Route>
    <Route name="AppDetails" path="/app/:appId.html" handler={AppDetails}>        
    </Route>
    <Route name="AppSearch" path="/app/search/:query" handler={AppSearch}>        
    </Route>

  </Routes>
);

React.render(routes, document.body);