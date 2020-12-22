import React, { useEffect, useState } from "react";
import api from "../services/api";
import generateLink from "../services/generate";

function Home(){

    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        api.get("/characters?limit=18&" + generateLink()).then(response => {
            setCharacters(response.data.data.results);
        });
    }, []);

    return(
        <div>
            <h1>Home</h1>
            <ul>
                {characters.map(function(value, index){
                    return <li key={index}>{value.name}</li>
                })}
            </ul>
        </div>
    );
}

export default Home;