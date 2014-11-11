var Router = ReactRouter;
var Route = ReactRouter.Route;
var Routes = ReactRouter.Routes;
var DefaultRoute = ReactRouter.DefaultRoute;
var Link = ReactRouter.Link;

var routes = (
  React.createElement(Routes, {location: "history"}, 
    React.createElement(Route, {name: "Home", path: "/", handler: Home}
    ), 
    React.createElement(Route, {name: "TopDownload", path: "/app/topdownload", handler: TopDownload}
    ), 
    React.createElement(Route, {name: "TopStandings", path: "/app/standings", handler: TopStandings}
    ), 
    React.createElement(Route, {name: "AppDetails", path: "/app/:app_id/html", handler: AppDetails}
    )
  )
);

React.render(routes, document.body);