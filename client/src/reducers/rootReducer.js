import { combineReducers } from 'redux'
import webadsReducer from './webadsReducer'
import newadReducer from './newadReducer'
import syncReducer from './syncReducer'
import maxlevelReducer from './maxlevelReducer'
import adlayoutReducer from './adlayoutReducer'

export default combineReducers({
    webads: webadsReducer,
    showNewAd: newadReducer,
    sync: syncReducer,
    maxlevel: maxlevelReducer,
    adlayout: adlayoutReducer,

}) 