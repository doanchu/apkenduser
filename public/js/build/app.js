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
  React.createElement(Routes, {location: loc}, 
    React.createElement(Route, {name: "Home", path: "/", route: "/", handler: Home}
    ), 
    React.createElement(Route, {name: "TopDownloads", path: "/top/downloads", route: "/top/downloads", handler: TopDownloads}
    ), 
    React.createElement(Route, {name: "TopStandings", path: "/top/standings", route: "/top/standings", handler: TopStandings}
    ), 
    React.createElement(Route, {name: "AppSearch", path: "/app/search", route: "/app/search", handler: AppSearch}
    ), 
    React.createElement(Route, {name: "AppDetails", path: "/app/:appId.html", handler: AppDetails}
    )
  )
);

React.render(routes, document.body);