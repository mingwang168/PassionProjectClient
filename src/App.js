import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/auth/Register';
import Welcome from './components/auth/Welcome';
import LogIn from './components/auth/LogIn';
import ForgotPassword from './components/auth/ForgotPassword';
import ChangePassword from './components/auth/ChangePassword';
import ForgotPasswordSubmit from './components/auth/ForgotPasswordSubmit';
import ChangePasswordConfirmation from './components/auth/ChangePasswordConfirmation';
import Detail from './components/auth/Detail';
import Learning from './components/Learning.js';
import Footer from './components/Footer.js';
import Result from './components/Result';
import ChangeList from './components/ChangeList.js'
import { Auth } from 'aws-amplify';

class App extends Component {
  //declare state variables
  state = {
    isAuth: false,
    user: null,
    checkingAuth: true
  }
  //helper methods to set variables
  authenticateUser = authenticated => {
    this.setState({ isAuth: authenticated });
  }

  setAuthUser = user => {
    this.setState({ user: user });
  }
  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.authenticateUser(true)
      // console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.setAuthUser(user);
    } catch (error) {
      console.log(error);
    }
    this.setState({ checkingAuth: false })
  }

  render() {
    //bundle state variables and helper methods to pass to each component
    const authProps = {
      isAuth: this.state.isAuth,
      user: this.state.user,
      authenticateUser: this.authenticateUser,
      setAuthUser: this.setAuthUser
    }
    //pass authProps (along with existing props as needed) to each component
    return (
      //wait for Auth methods before rendering router
      !this.state.checkingAuth &&
      <div className="App">
        <Router>
          <div>
            <Navbar auth={authProps} />
            <Switch>
              <Route
                exact path="/"
                render={(props) =>
                  <Home {...props} auth={authProps} />
                }
              />
              <Route
                exact path="/login"
                render={(props) =>
                  <LogIn {...props} auth={authProps} />
                }
              />
              <Route
                exact path="/forgotpassword"
                render={(props) =>
                  <ForgotPassword {...props} auth={authProps} />
                }
              />
              <Route
                exact path="/forgotpasswordsubmit"
                render={(props) =>
                  <ForgotPasswordSubmit {...props} auth={authProps} />
                }
              />
              <Route
                exact path="/changepassword"
                render={(props) =>
                  <ChangePassword {...props} auth={authProps} />
                }
              />
              <Route
                exact path="/changepasswordconfirmation"
                render={(props) =>
                  <ChangePasswordConfirmation {...props} auth={authProps} />
                }
              />
              <Route
                exact path="/register"
                render={(props) =>
                  <Register {...props} auth={authProps} />
                }
              />
              <Route
                exact path="/welcome"
                render={(props) =>
                  <Welcome {...props} auth={authProps} />
                }
              />
              <Route
                exact path="/detail"
                render={(props) =>
                  <Detail {...props} auth={authProps} />
                }
              />
              <Route
                exact path="/learning"
                render={(props) =>
                  <Learning {...props} auth={authProps} />
                }
              />
              <Route
                exact path="/result"
                render={(props) =>
                  <Result {...props} auth={authProps} />
                }
              />
              <Route
                exact path="/changeList"
                render={(props) =>
                  <ChangeList {...props} auth={authProps} />
                }
              />
            </Switch>
            <Footer  auth={authProps} />
          </div>
        </Router>
      </div>
    );

  }
}

export default App;
