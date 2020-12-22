// combine reducer middleware import
import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

//import reducers
import country from './country_reducer'

const rootReducer = combineReducers({
   country
})

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))