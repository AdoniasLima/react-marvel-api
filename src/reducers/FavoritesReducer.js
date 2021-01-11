const initialState = {
    favorites_id : []
};

const FavoritesReducer = function(state = initialState, action){
    switch (action.type) {
        case "SET_FAVORITE":
            state.favorites_id.push(state.payload.id);
            break;
        default:
            break;
    }
    return state;
}

export default FavoritesReducer;