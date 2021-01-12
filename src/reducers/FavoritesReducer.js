const initialState = {
    ids : []
};

const FavoritesReducer = function(state = initialState, action){
    switch (action.type) {
        case "SET_ID":
            return {...state, ids: [...state.ids, action.payload.id]};
        case "UNSET_ID":
            return {...state, ids: state.ids.filter(item => action.payload.id !== item)};
        default:
            return state;
    }
}

export default FavoritesReducer;