import axios from "axios"

import { Country } from "./types"

//Api base url
const BASE_URL = 'https://restcountries.eu/rest/v2/name'

//action types
export const FETCH_COUNTRY_DATA = "FETCH_COUNTRY_DATA"

export const loadCountry = (data: Country) => {
    return {
        type: FETCH_COUNTRY_DATA,
        payload: data
    }
}

export function  fetchCountryData(country: string){
    return async (dispatch) => {
        try {
            const response = await axios.get(`${BASE_URL}/${country}`)
            console.log(response, "this works")
        } catch (error) {
            console.log(error)
        }
    }
}