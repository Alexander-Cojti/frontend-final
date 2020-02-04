import * as React from "react";
// import { AppRouter } from "./app.router";
import "bootstrap/dist/css/bootstrap.min.css";
import Documents from "./Report/Documents";
import Upload from "./Report/Upload";
import { HomeRoute } from "./pages/home-page";
import { SearchRoute } from "./pages/search-page";
import { DetailRoute } from "./pages/detail-page";
import { HashRouter, Switch, Route, Link, Router } from "react-router-dom";
import Auth from "./adal/Auth";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import AdalConfig from "./adal/AdalConfig";
import * as jwt_decode from "jwt-decode";
import {  Person} from 'material-ui-icons';

 
export default class Main extends React.Component {


  render() {
    var name: string;
Auth.acquireToken(AdalConfig.endpoints.api, (message, token, msg) => {
  if (token) {
    interface tk {
      unique_name: string;
      name: string;
    }
    var decode: tk = jwt_decode(token);
    name = decode.name;
  }
});
    return (
      <HashRouter>
        <div className="App_nav">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a href="/">
              <Link className="btn btn-primary" to="/">
                {" "}
                <Image
                  src="https://jfkstorageqymjpzort5hho.blob.core.windows.net/logos-frontend-dq/logo60.png"
                  width="40"
                  height="40"

                />
                &nbsp;Query
              </Link>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="btn btn-primary" to="/documents">
                    Documents
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="btn btn-primary" to="/upload" >
                    Upload 
                  </Link>
                </li>
              </ul>
            </div>
            <div className="btn float-right">
              <Button><Person/>{name}</Button> &nbsp;
                  <Button
                  variant="outline-light"
                    className="btn btn-outline-primary float-right"
                    onClick={() => Auth.logOut()}
                  >
                    LogOut
                  </Button>
                </div>
          </nav>
          <Switch>
            //importa los componentes router para funcionar en #/ en el inicio
            deimport Upload from './Report/InputFiles';
 la página
            {HomeRoute}
            {SearchRoute}
            {DetailRoute}
            <Route exact path="/documents" component={Documents} />
            <Route exact path="/upload" component={Upload} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
