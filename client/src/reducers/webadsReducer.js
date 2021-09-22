const webadsReducer = (state = [], action) => {
    switch (action.type) {
        case 'POST_AD':
            return [...state, action.data]
        case 'SET_ADS':
            return [...action.data]
        case 'DELETE_AD':
            return state.filter(elem => elem.id !== action.data)
        default:
            return state
    }
}

export const POST_AD = (ad) => {
    return {
        type: 'POST_AD',
        data: ad
    }
}
export const SET_ADS = (ads) => {
    return {
        type: 'SET_ADS',
        data: ads
    }
}
export const DELETE_AD = (id) => {
    return {
        type: 'DELETE_AD',
        data: id
    }
}



export default webadsReducer