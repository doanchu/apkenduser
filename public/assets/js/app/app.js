var Router = ReactRouter;
var Route = ReactRouter.Route;
var Routes = ReactRouter.Routes;
var Link = ReactRouter.Link;




var NavTopLink = React.createClass({
  render:function(){
      return (
       
          <section className="tabs_header">
        {/*<div class="title">{{{@$title}}}</div>*/}
        <div className="tabs">
          <a href="/app/topnew" className="{{{@$appNew}}}">Mới nhất</a>
          <a href="/app/topdownload" className="{{{@$appDowload}}}">Tải nhiều</a>
          <a href="/app/standings" className="{{{@$appStandings}}}">Thứ hạng</a>
          <a href="/page" className="{{{@$appFilter}}}">Chọn lọc</a>
        </div>
      </section>
        );
  }
});



var Home = React.createClass({
  render: function() {
    return (
      <div>
        <LayoutHeaderHome />
        <NavBar />
        <Banner />


        <LayoutFootter />


        <this.props.activeRouteHandler/>
      </div>
    );
  }
});

var ListApp = React.createClass({
  render: function() {
    var data = [{name: "item1"},{name: "item2"}]
    
    return (
      <div>
         <LayoutHeaderNotHome />
         
        <Item/>
      
      <LayoutFootter />
        <this.props.activeRouteHandler/>
      </div>
    );
  }
});



var DetailtApp = React.createClass({
  render: function() {
    return (
      <div>
        <NavTopLink />


      
        <this.props.activeRouteHandler/>
      </div>
    );
  }
});




var routes = (
  <Routes location="history">
    <Route name="app" path="/" handler={Home}>
    </Route>
    <Route name="top_new" path="/app/topnew" handler={ListApp}>
    </Route>
    <Route name="standings" path="/app/standings" handler={ListApp}>
    </Route>
    <Route name="topdownload" path="/app/topdownload" handler={ListApp}>
    </Route>
    <Route name="page" path="/page" handler={ListApp}>
    </Route>

 

  </Routes>
);

React.render(routes, document.body);