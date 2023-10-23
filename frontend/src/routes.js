import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { isAuthenticated } from "./services/auth";
import Main from "./pages/Main";
import Header from "./components/Header";


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <>
          <Header />
          <Component {...props} />
        </>
      ) : (
        <Redirect
          to={{ pathname: "/register", state: { from: props.location } }}
        />
      )
    }
  />
);

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Switch>
      <PrivateRoute exact path="/" component={Main} />
        <LoginRoute exact path="/login" component={Login} />
        <LoginRoute exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}
