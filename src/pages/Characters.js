import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import api from "../services/api";
import generateLink from "../services/generate";
import Loading from "../components/Loading";

import "../styles/characters.css";

function Characters(){

    const ids_favorites = useSelector(state => state.favorites.ids);
    const dispatch = useDispatch();

    const [characters, setCharacters] = useState([]);
    const [loadingScreen, setLoadingScreen] = useState(true);

    useEffect(() => {
        api.get("/characters?limit=18&" + generateLink()).then(response => {
            handleFavorites(response.data.data.results, "add");
        }).then(function(){
            setLoadingScreen(false);
        });
    }, []);

    const handleFavorites = async function(list, action, id = null){
        let newList = await list.map(function(value, index){
            if(id != null && id === value.id && action === "add"){
                value.favorite = true;
            } else if(id != null && id === value.id && action === "remove"){
                value.favorite = false;
            } else if(ids_favorites.indexOf(value.id) !== -1){
                value.favorite = true;
            } else {
                value.favorite = false;
            }
            return value;
        });
        setCharacters(newList);
    }

    const handleAddFavorite = function(id){
        dispatch({
            type: "SET_ID",
            payload: {id: id}
        });
        handleFavorites(characters, "add", id);
    }

    const handleRemoveFavorite = function(id){
        dispatch({
            type: "UNSET_ID",
            payload: {id: id}
        });
        handleFavorites(characters, "remove", id);
    }

    return(
        <div>
            {characters.map(function(value, index){
                return(
                    <div key={index} className="home-card-character">
                        <div className="home-card-character-img">
                            <img src={`${value.thumbnail.path + "." + value.thumbnail.extension}`} alt={value.name} />
                        </div>
                        <div className="home-card-character-name">
                            <h3>{value.name}</h3>
                        </div>
                        <div className="home-card-character-option">
                            {value.favorite
                                ? <button className="color-red" onClick={(e) => handleRemoveFavorite(value.id)}>Remove favorite</button>
                                : <button className="color-blue" onClick={(e) => handleAddFavorite(value.id)}>Add favorite</button>
                            }
                        </div>
                    </div>
                );
            })}
            {loadingScreen === true && <Loading />}
        </div>
    );
}

export default Characters;