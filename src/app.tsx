import * as React from "react";
import * as ReactDOM from "react-dom";
import { Reboot } from "material-ui";
import { MuiThemeProvider } from "material-ui/styles";
import { theme } from "./theme";
import Main from "./Main";
import AuthContext from "./adal/Auth";
import AdalConfig from "./adal/AdalConfig";
import HomeLand from "./HomeLand";
import { AppRouter } from "./app.router";
import * as jwt_decode from 'jwt-decode';
import { HashRouter, Redirect, Route } from "react-router-dom";

AuthContext.handleWindowCallback()

if ((window === window.parent) && window === window.top && !AuthContext.isCallback(window.location.hash)) {
  if (!AuthContext.getCachedToken(AdalConfig.clientId) || !AuthContext.getCachedUser()) {   
    ReactDOM.render(
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <HomeLand/>
      </MuiThemeProvider>,
      document.getElementById("app")
    );  } else {
       
    AuthContext.acquireToken(AdalConfig.endpoints.api, (message, token, msg) => {
     
      if (token) {
          // const emailRegex = /^[acojti]@\S+\.\S+\.\S+$/;
          const admin="bvillatoro@datumdesa.onmicrosoft.com";
          interface tk {
            unique_name:string,
            name: string
          } 
        var decode:tk = jwt_decode(token);
        if (decode.unique_name != admin)
        {
          ReactDOM.render(
          <MuiThemeProvider theme={theme}>
              <Reboot />
              <Main />
            </MuiThemeProvider>
            ,
            document.getElementById("app")
          );
        }
        else
        {
          ReactDOM.render(
            <MuiThemeProvider theme={theme}>
              <Reboot />
              <AppRouter />
            </MuiThemeProvider>,
            document.getElementById("app")
          );
       }
      }
    })
  }
}
