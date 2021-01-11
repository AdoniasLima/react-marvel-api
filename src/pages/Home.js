import React from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";

import "../styles/home.css";
import Characters from "./Characters";
import Favorites from "./Favorites";

function Home(){

    let { path, url } = useRouteMatch();

    return(
        <div className="home-section">
            <div className="home-header">
                <div>
                    <h1 className="title-logo">Marvel's API</h1>
                </div>
                <div className="buttons">
                    <Link to={`${url}`}><button className="color-red">All</button></Link><Link to={`${url}/favorites`}><button className="color-blue">Favorites</button></Link>
                </div>
            </div>
            <div className="home-cards">
                <Switch>
                    <Route exact path={path}>
                        <Characters />
                    </Route>
                    <Route path={`${path}/favorites`}>
                        <Favorites />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default Home;