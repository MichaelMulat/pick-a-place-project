import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "./components/NavBar";
import theme from "./UI/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Event from "./pages/Event";
import Create from "./pages/Create"
import Vote from "./pages/Vote"
import Result from "./pages/Result";
import UserContextProvider from "./utils/UserContextProvider";

class App extends Component {
  render() {
    return (
      <UserContextProvider>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <div>
              <NavBar />
              <Switch>
                <Route exact path="/" component={Home} />
                <ProtectedRoute
                  exact
                  path="/events/:eventId"
                  component={Event}
                />
                <ProtectedRoute exact path="/create" component={Create} />
                <ProtectedRoute
                  exact
                  path="/vote/:eventId"
                  component={Vote}
                />
                <ProtectedRoute
                  exact
                  path="/result/:eventId"
                  component={Result}
                />
              </Switch>
            </div>
          </Router>
        </MuiThemeProvider>
      </UserContextProvider>
    );
  }
}

export default App;
