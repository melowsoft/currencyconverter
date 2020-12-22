export interface Country {
        name: string;
        topLevelDomain: any[];
        alpha2Code: string;
        alpha3Code: string;
        callingCodes: any[];
        capital: string;
        altSpellings: any[];
        region: string;
        subregion: string;
        population: number;
        latlng: number[];
        demonym: string;
        area: number;
        gini: number;
        timezones: any[];
        borders: string[];
        nativeName: string;
        numericCode: string;
        currencies: any[];
        languages: any[];
        translations: {
            de: string;
            es:  string;
            fr:  string;
            ja:  string;
            it:  string;
            br:  string;
            pt:  string;
            nl:  string;
            hr:  string;
            fa:  string;
        };
        "flag":  string;
        regionalBlocs: any[];
        cioc:  string;
}