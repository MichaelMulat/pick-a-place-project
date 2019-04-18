import React, { Component } from "react";
import Context from "./UserContext";
import API from "./API";

class UserContextProvider extends Component {
  state = {
    loggedIn: false,
    loadingUser: true,
    username: null,
    firstName: null,
    lastName: null,
    sessionId: null,
    id: null,
    password: null,
    imageUrl: null
  };

  componentDidMount() {
    this.getUser();
  }

  // Get the logged in user
  getUser = () => {
    API.getUser().then(response => {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data.user) {
        const userData = response.data.user
        console.log("Get User: There is a user saved in the server session: ");
        this.setState({
          loggedIn: true,
          loadingUser: false,
          id: userData._id,
          username: response.data.user.username,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          imageUrl: response.data.user.imageurl
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          loadingUser: false,
          username: null,
          firstName: null,
          lastName: null,
          sessionId: null,
          imageUrl: null
        });
      }
    }).catch(err => console.log(err));
  };

  updateUser = userObj => {
    this.setState(userObj);
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // Logout => pass to the Navigation
  logout = event => {
    event.preventDefault();
    console.log("You are here")
    API.logoutUser()
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.setState({
            loggedIn: false,
            username: null,
            firstName: null,
            lastName: null,
            sessionId: null
          });
        }
      })
      .catch(error => {
        console.log("Logout error", error);
      });
  };

  // Log User in => Pass it to the login
  logInUser = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      console.log("Handle Submit");
      API.loginUser({
        username: this.state.username,
        password: this.state.password
      })
        .then(res => {
          console.log("user response", res.data);
          if (res.status === 200) {
            this.getUser();
          }
        })
        .catch(err => console.log(err));
    }
  };

  //Sign User up
  signUpUser = event => {
    event.preventDefault();
    if (
      this.state.firstName &&
      this.state.lastName &&
      this.state.username &&
      this.state.password
    ) {
      API.saveUser({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password
      })
        .then(res => {
          console.log(res);
          if (!res.data.errmsg) {
            console.log("Logging you in");
            this.logInUser(event);
          } else {
            console.log("username already taken");
          }
        })
        .catch(err => console.log(err));
    } else {
        console.log("please complete the entire form")
    }
  };

  render() {
    return (
      <Context.Provider
        value={{
          userState: this.state,
          handleInputChange: this.handleInputChange,
          logInUser: this.logInUser,
          logout: this.logout,
          updateUser: this.updateUser,
          signUpUser: this.signUpUser
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default UserContextProvider;
