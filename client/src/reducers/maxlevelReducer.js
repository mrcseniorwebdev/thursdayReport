const maxlevelReducer = (state = 1, action) => {
    switch (action.type) {
        case 'POST_ML':
            return action.data
        case 'INC_ML':
            return ++state
        default:
            return state
    }
}

export const POST_MAXLEVEL = (level) => {
    return {
        type: 'POST_ML',
        data: level
    }
}
export const INC_MAXLEVEL = () => {
    return {
        type: 'INC_ML'
    }
}

export default maxlevelReducer