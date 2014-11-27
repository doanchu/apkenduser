
if (document.partner == "duyhungws") {
   alert("vao trong app");
}

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
if (document.partner == "duyhungws") {
    alert("vao day roi ngoai");
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
  React.createElement(Routes, {location: loc, onChange: fn}, 
    React.createElement(Route, {name: "TopDownloads", path: "/top/downloads", route: "/top/downloads", handler: TopDownloads}
    ), 
    React.createElement(Route, {name: "TopStandings", path: "/top/standings", route: "/top/standings", handler: TopStandings}
    ), 
    React.createElement(Route, {name: "AppStandings", path: "/app/standings", route: "/top/standings", handler: TopStandings}
    ), 
    React.createElement(Route, {name: "TopNew", path: "/top/new", route: "/top/new", handler: TopNew}
    ), 
    React.createElement(Route, {name: "Home", path: "/", route: "/", handler: Home}
    ), 

    React.createElement(Route, {name: "AppDetails", path: "/app/:appId.html", handler: AppDetails}
    ), 
    React.createElement(Route, {name: "AppSearchQuery", path: "/app/search/:query", handler: AppSearch}
    ), 
    React.createElement(Route, {name: "AppSearch", path: "/app/search", handler: AppSearch}
    ), 

    React.createElement(Route, {name: "Categories", path: "/app/categories", handler: Categories}
    ), 

    React.createElement(Route, {name: "Collections", path: "/app/collections", handler: Collections}
    ), 

    React.createElement(Route, {name: "AppCategory", path: "/app/category/:cid", handler: AppCategory}
    ), 

    React.createElement(Route, {name: "AppCollection", path: "/app/collection/:cid", handler: AppCollection}
    )
    
  )
);

React.render(routes, document.body);