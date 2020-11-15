import React from "react";
import services, { updateHeaders } from "../services";
import * as authUtil from "../utils/auth.util";
import * as userUtil from "../utils/user.util";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = React.createContext();

const ROLES = {
  contractor: "contractor",
  basicUser: "basicUser"
};

class AuthProvider extends React.Component {
  constructor() {
    super();

    const loginStatus = authUtil.isLoggedIn();

    const token = authUtil.getToken();
    console.log("This is user token", token);
    updateHeaders(token);
    const role = userUtil.getUserRole();
    console.log("role >>>>", role);
    this.state = { isAuth: loginStatus, role: role || {}, loading: false };
    if (loginStatus) {
      console.log("Iam login bro!>>>", loginStatus);
    }
  }

  

  

  
 

 

  isContractor = () =>
    this.state.role === ROLES.contractor && this.state.isAuth;

  isBasicUser = () => this.state.role === ROLES.basicUser && this.state.isAuth;

  isLoggedIn = () => {
    return this.state.isAuth;
  };

  render() {
    const publicProps = {
      loading: this.state.loading,
      isAuth: this.state.isAuth,
      loginUser: this.loginUser,
      loginContractor: this.loginContractor,
      logout: this.logout,
      isContractor: this.isContractor,
      isBasicUser: this.isBasicUser,
      isLoggedIn: this.isLoggedIn,
      sendCode: this.sendCode
    };

    return (
      <div>
        <AuthContext.Provider value={publicProps}>
          {this.props.children}
        </AuthContext.Provider>
      </div>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
