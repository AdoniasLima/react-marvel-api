import React from "react";
import { Link } from "react-router-dom";

import "../styles/start.css";

function Start(){
    return(
        <div className="container">
            <h1 className="title-logo">Marvel's API</h1>
            <Link to="/home" className="link-start">
                Start
            </Link>
        </div>
    );
} 

export default Start;