import { createStore, applyMiddleware, combineReducers } from "redux"

import country from "../reducers/country_reducer"
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    country
 })

 export const store = createStore(rootReducer, applyMiddleware(thunk))