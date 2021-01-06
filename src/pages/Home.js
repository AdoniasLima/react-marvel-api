import React, { useEffect, useState } from "react";
import api from "../services/api";
import generateLink from "../services/generate";

import "../styles/home.css";

function Home(){

    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        api.get("/characters?limit=18&" + generateLink()).then(response => {
            setCharacters(response.data.data.results);
        });
    }, []);

    return(
        <div className="home-section">
            <div className="home-header">
                <div>
                    <h1 className="title-logo">Marvel's API</h1>
                </div>
                <div>
                    
                </div>
            </div>
            <div className="home-cards">
                {characters.map(function(value, index){
                    return(
                        <div key={index} className="home-card-character">
                            <div className="home-card-character-img">
                                <img src={`${value.thumbnail.path + "." + value.thumbnail.extension}`} alt={value.name} />
                            </div>
                            <div className="home-card-character-name">
                                <h3>{value.name}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;