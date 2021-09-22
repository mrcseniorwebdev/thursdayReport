const syncReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INC_SYNC':
            return ++state
        default:
            return state
    }
}

export const SYNC = () => {
    return {
        type: 'INC_SYNC',
        data: null
    }
}



export default syncReducer