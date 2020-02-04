import * as React from "react";
import { searchPath } from "../search-page";
import { LogoJFKComponent } from "../../common/components/logo-jfk";
import { SearchButton } from "./components/search";
// import { CaptionComponent } from "./components/caption";
import { SearchInput } from "./components/search";
import { FooterComponent } from "../../common/components/footer";
import "bootstrap/dist/css/bootstrap.min.css";


const style = require("./home-page.style.scss");

interface HomePageProps {
  searchValue: string;
  onSearchSubmit: () => void;
  onSearchUpdate: (newValue: string) => void;
}

export const HomePageComponent: React.StatelessComponent<HomePageProps> = props => {
  return (
    <div className={style.container}>
      {/* <div className={style.buttonLog}>
     
      </div> */}
      <img
        className={style.imaginator}
        src="https://jfkstorageqymjpzort5hho.blob.core.windows.net/logos-frontend-dq/logo-home.png" 
      ></img>
      <h3 className={style.title}>Welcome! </h3>
      <div className={style.main}>
        {/* <CaptionComponent /> */}
        <SearchInput
          searchValue={props.searchValue}
          onSearchSubmit={props.onSearchSubmit}
          onSearchUpdate={props.onSearchUpdate}
        />
        <SearchButton onClick={props.onSearchSubmit} />
      </div>
      <FooterComponent className={style.footer} />
    </div>
  );
};
