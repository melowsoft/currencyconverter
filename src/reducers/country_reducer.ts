import { Country } from './../actions/types';
import { FETCH_COUNTRY_DATA } from "../actions/actions_country"
import { EmptyCountry } from '../store/empty_country';

export interface CountryState {
    country: Country
}

//initial state 
const initialState = {
    country: EmptyCountry
}

type Action = { type: "FETCH_COUNTRY_DATA", payload: string }

const country = (state: CountryState = initialState, action: Action) => {
    let data;

    return {
        ...state
    }
}

export default country