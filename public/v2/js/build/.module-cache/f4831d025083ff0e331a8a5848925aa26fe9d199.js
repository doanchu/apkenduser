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
    React.createElement(Route, {name: "TopNew", path: "/top/new", route: "/top/new", handler: TopNew}
    )

  )
);

React.render(routes, document.body);