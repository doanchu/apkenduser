var Router = ReactRouter;
var Route = ReactRouter.Route;
var Routes = ReactRouter.Routes;
var Link = ReactRouter.Link;




var NavTopLink = React.createClass({displayName: 'NavTopLink',
  render:function(){
      return (
       
          React.createElement("section", {className: "tabs_header"}, 
        /*<div class="title">{{{@$title}}}</div>*/
        React.createElement("div", {className: "tabs"}, 
          React.createElement("a", {href: "/app/topnew", className: "{{{@$appNew}}}"}, "Mới nhất"), 
          React.createElement("a", {href: "/app/topdownload", className: "{{{@$appDowload}}}"}, "Tải nhiều"), 
          React.createElement("a", {href: "/app/standings", className: "{{{@$appStandings}}}"}, "Thứ hạng"), 
          React.createElement("a", {href: "/page", className: "{{{@$appFilter}}}"}, "Chọn lọc")
        )
      )
        );
  }
});



var Home = React.createClass({displayName: 'Home',
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(LayoutHeaderHome, null), 
        React.createElement(NavBar, null), 
        React.createElement(Banner, null), 


        React.createElement(LayoutFootter, null), 


        React.createElement(this.props.activeRouteHandler, null)
      )
    );
  }
});

var ListApp = React.createClass({displayName: 'ListApp',
  render: function() {    
    var data = [{name: "item1"},{name: "item2"}]
    
    var items = data.map(function(item){
        return (
          React.createElement(Item, {name: item.name})
        );
    })
    return (
      React.createElement("div", null, 
         React.createElement(LayoutHeaderNotHome, null), 
         
        items, 
      
      React.createElement(LayoutFootter, null), 
        React.createElement(this.props.activeRouteHandler, null)
      )
    );
  }
});



var DetailtApp = React.createClass({displayName: 'DetailtApp',
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(NavTopLink, null), 


      
        React.createElement(this.props.activeRouteHandler, null)
      )
    );
  }
});




var routes = (
  React.createElement(Routes, {location: "history"}, 
    React.createElement(Route, {name: "app", path: "/", handler: Home}
    ), 
    React.createElement(Route, {name: "top_new", path: "/app/topnew", handler: ListApp}
    ), 
    React.createElement(Route, {name: "standings", path: "/app/standings", handler: ListApp}
    ), 
    React.createElement(Route, {name: "topdownload", path: "/app/topdownload", handler: ListApp}
    ), 
    React.createElement(Route, {name: "page", path: "/page", handler: ListApp}
    )

 

  )
);

React.render(routes, document.body);