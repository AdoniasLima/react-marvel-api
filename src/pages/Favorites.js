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

        await ids_favorites.forEach(function(value, index){
            let key = characters.findIndex(item => item.id === value);
            if(key < 0){
                api.get("/characters/" + value + "?" + generateLink()).then(response => {
                    newListFavorites.push(response.data.data.results[0]);
                });
            }
        });
        setCharacters(newListFavorites);
    };

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
                            <button className="color-red">Remove favorite</button>
                        </div>
                    </div>
                );
            })}
            {loadingScreen === true && <Loading />}
        </div>
    );
}

export default Favorites;