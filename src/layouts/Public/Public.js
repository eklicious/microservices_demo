import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// javascript plugin used to create scrollbars on windows

// core components
import Footer from "components/Footer/Footer.js";

import routes from "routes.js";

var ps;

class Public extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/public") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
        <div className="wrapper">
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
            <Switch>
              {this.getRoutes(routes)}
              <Redirect from="*" to="/public/sign-in"/>
            </Switch>
            <Footer fluid />
          </div>
        </div>
      </>
    );
  }
}

export default Public;
