import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import api from "../services/api";
import generateLink from "../services/generate";
import Loading from "../components/Loading";

function Favorites(){

    const ids_favorites = useSelector(state => state.favorites.ids);
    const dispatch = useDispatch();

    const [characters, setCharacters] = useState([]);
    const [loadingScreen, setLoadingScreen] = useState(true);

    useEffect(() => {
       handleListFavorites().then(function(){
        setLoadingScreen(false);
       });
    }, []);

    const handleListFavorites = async function(){
        let newListFavorites = [...characters];
        const promises = ids_favorites.map(async function(value, index){
            let key = await characters.findIndex(item => item.id === value);
            if(key < 0){
                await api.get("/characters/" + value + "?" + generateLink()).then(response => {
                    newListFavorites.push(response.data.data.results[0]);
                });
            }
        });
        await Promise.all(promises);
        setCharacters(newListFavorites);
    };

    const handleRemoveFavorite = function(id){
        dispatch({
            type: "UNSET_ID",
            payload: {id: id}
        });
        let newListFavorites = characters.filter(value => value.id !== id);
        setCharacters(newListFavorites);
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
                            <button className="color-red" onClick={(e) => handleRemoveFavorite(value.id)}>Remove favorite</button>
                        </div>
                    </div>
                );
            })}
            {
                (characters.length === 0 && loadingScreen === false) 
                && 
                <div className="text-show">
                    <h3>No favorites were added!</h3>
                </div>
            }
            {loadingScreen === true && <Loading />}
        </div>
    );
}

export default Favorites;