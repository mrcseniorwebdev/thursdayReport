const adlayoutReducer = (state = [], action) => {
    switch (action.type) {
        case 'POST_LAYOUT_SECTION':
            const copy = state.filter(elem => !((elem.type === action.data.type) && (elem.campaign === action.data.campaign)))
            return [...copy, action.data]
        case 'SET_LAYOUT':
            return [...action.data]
        case 'DELETE_LAYOUT_SECTION':
            return state.filter(elem => elem.waid !== action.data)
        // case 'UPDATE_LAYOUT_SECTION':
        //     return state.filter(elem => elem.waid !== action.data)
        default:
            return state
    }
}

export const POST_LAYOUT_SECTION = (section) => {
    return {
        type: 'POST_LAYOUT_SECTION',
        data: section
    }
}
export const SET_LAYOUT = (layout) => {
    return {
        type: 'SET_LAYOUT',
        data: layout
    }
}
export const DELETE_LAYOUT_SECTION = (id) => {
    return {
        type: 'DELETE_LAYOUT_SECTION',
        data: id
    }
}
// export const UPDATE_LAYOUT_SECTION = (type, ) => {
//     return {
//         type: 'UPDATE_LAYOUT_SECTION',
//         data: id
//     }
// }



export default adlayoutReducer