import React from "react";
import "./style.css";
import TemporaryDrawer from "./drawer";
import Button from "../Button";
import { Link } from "react-router-dom";
import Toggle from "../ToggleBtn";


const Header = ({setMode, mode}) => {
  return (
    <div className={"navbar navbar-" + mode}>
      <h1 className="logo">
        CryptoTracker<span style={{ color: "#E55604" }}>.</span>
      </h1>
      <div className="links">
      <Toggle setMode={setMode}/>
        <Link to="/">
          <p className={"link link-"+mode}>Home</p>
        </Link>
        <Link to="/compare">
          <p className={"link link-"+mode}>Compare</p>
        </Link>
        <Link to="/watchlist">
          <p className={"link link-"+mode}>Watchlist</p>
        </Link>
        <Link to="/dashboard">
          <Button
            text={"Dashboard"}
            onClick={() => console.log("button clicked")}
          />
        </Link>

        <div className="mobile-drawer">
          <TemporaryDrawer />
        </div>
      </div>
    </div>
  );
};
export default Header;
