import { StatusBar } from 'expo-status-bar';
import React, { FC, useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, BackHandler, ScrollView } from 'react-native';

//Reducer

import { store } from './src/store/store'

//Components Impor
import Converter from './src/components/Converter';
import SearchBar from './src/components/SearchBar';

import { fetchCountryData } from "./src/actions/actions_country"
import { useSelector } from "react-redux"
import { CountryState } from './src/reducers/country_reducer';

import Context from "./src/context/country-context"

const FIXER_API_KEY = "2d39777df4aefb5276762765afc95a2d"



interface Props {

}

 const App: FC<Props> = () => {
  const [baseCurrencyValue, baseValueSetter] = useState(0)
  const [localCurrencyValue, localValueSetter] = useState(0)
  const [country, countrySetter] = useState({name: 'USA'})
  const [showDropdown, toogleDropdown] = useState(false)
  const [countryList, updateList] = useState([{country: "Nigeria"}])
  const [exchangeRate, rateSetter] = useState(0)
  const [comparedCurrency, comparedUpdate] = useState("USD")
  const [currencyError, cureencyErrorSetter] = useState(false)

  const fetchData = (country: string) => {
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(results => results.json())
    .then(data => {
      const countryData = data[0]
     return countrySetter(countryData)
    });
  }

  const fetchRates = (currency: string) => {
    fetch(`https://api.exchangeratesapi.io/latest?base=USD&symbols=${currency}`)
    .then(results => results.json())
    .then(data => {
      if(data.error){
        cureencyErrorSetter(true)
        return rateSetter(0)
      } else {
        cureencyErrorSetter(false)
        const {rates} = data
       return rateSetter(rates[currency])
      }
    });
  }

  const computeConvertion = (val: number) => {
     let finalVal = Number(val) * Number(exchangeRate)
     baseValueSetter(val)
     return localValueSetter(finalVal)
  }

  const comparedCurrencySetter = (code: string) => {
    fetchRates(code)
    return comparedUpdate(code)
  }

  React.useEffect(() => {

    fetchData(country.name)
    fetchRates(comparedCurrency)

    fetch(`https://restcountries.eu/rest/v2/all`)
      .then(results => results.json())
      .then(data => {
        let countries = data.map(item => {
          return {
            country: item.name,
            code: item.currencies[0].code
          }
        }) 
       return updateList(countries)
      });
  }, []);


  const activateDropdown = () => {
      toogleDropdown(!showDropdown)
  }

  return (
   
    <SafeAreaView style={styles.container}>
      
      <StatusBar style="auto" />
        <SearchBar
        placeholder="Search Country" 
        onChangeText={(text) => console.log(text)}
        showDropdown={showDropdown}
        toogleDropdown={activateDropdown}
        countries={countryList}
        updateCountry={fetchData}
        comparedCurrencySetter={comparedCurrencySetter}
       
        />

        <ScrollView>

      <View style={styles.wrapper}>
      <Text style={styles.country}>{country.name && country.name}</Text>
        <Image style={styles.flag} source={{
          uri: country.flag 
        }}/>
        <View style={styles.row}>
          <View>
             <Text style={styles.title}>Capital</Text>
          </View>
          <View>
     <Text style={styles.value}>{country.capital && country.capital}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View>
             <Text style={styles.title}>Population</Text>
          </View>
          <View>
  <Text style={styles.value}>{country.population && country.population.toLocaleString()}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View>
             <Text style={styles.title}>Currency</Text>
          </View>
          <View>
           <Text style={styles.value}>{country.currencies && (country.currencies.length > 0 ? country.currencies[0].name : "")} ({country.currencies && (country.currencies.length > 0 ? country.currencies[0].symbol : "")})</Text>
          </View>
        </View>

        <Converter country={country} 
        baseValue={baseCurrencyValue} 
        convertedValue={localCurrencyValue} 
        baseValueSetter={computeConvertion}  
        currencyError={currencyError}
        rates={exchangeRate}
        />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
    alignItems: "center"
  },
  country: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "700"
  },
  flag: {
    width: 100,
    height: 50,
    marginBottom: 15
  },
  row: {
   width: "100%",
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  }, 
  title: {
    fontWeight: "500",
    fontSize: 16
  }, 
  value: {
    fontSize: 16,
    fontWeight: "500",
    opacity: 0.6
  }
});
