const newadReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_NEW_AD':
            return action.data
        default:
            return state
    }
}

export const SHOW_NEW_AD = (show) => {
    return {
        type: 'SHOW_NEW_AD',
        data: show
    }
}



export default newadReducer