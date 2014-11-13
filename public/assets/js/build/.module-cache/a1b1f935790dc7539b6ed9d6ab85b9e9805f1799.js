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
  React.createElement(Routes, {location: location}, 
    React.createElement(Route, {name: "Home", path: "/", handler: Home}
    ), 
    React.createElement(Route, {name: "TopDownload", path: "/app/topdownload", handler: TopDownload}
    ), 
    React.createElement(Route, {name: "TopStandings", path: "/app/standings", handler: TopStandings}
    ), 
    React.createElement(Route, {name: "AppDetails", path: "/app/:appId.html", handler: AppDetails}
    ), 
    React.createElement(Route, {name: "AppSearch", path: "/app/search/:query", handler: AppSearch}
    )

  )
);

React.render(routes, document.body);