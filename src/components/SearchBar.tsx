import React, { FC } from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, TouchableOpacity, TouchableWithoutFeedbackBase } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import country from '../reducers/country_reducer';

interface Props {
    placeholder: string;
    onChangeText: (text: string) => void;
    showDropdown: boolean;
    countries: {country: string; code: string}[];
    toogleDropdown: () => void;
    updateCountry: (country: string) => void;
    comparedCurrencySetter: (currency: string) => void;
}

const SearchBar: FC<Props> = ({ 
        placeholder,
        onChangeText,
        toogleDropdown,
         showDropdown,
         countries,
         updateCountry,
         comparedCurrencySetter
         }) => {
            
    const countrySelector = (country: {country: string; code: string}) => {
        updateCountry(country.country)
        comparedCurrencySetter(country.code)
        return toogleDropdown()
    }

    return (
        <>
        <View style={styles.wrapper}>
        <View style={styles.searchbox}>
            <View style={styles.icon}>
                <Ionicons 
                name="md-search" 
                size={22} 
                color="#555" />
            </View>
            <View>
                <TextInput
                placeholderTextColor="#555" 
                placeholder={placeholder} 
                onChangeText={onChangeText}
                onFocus={() => toogleDropdown()}
                />
            </View>
            
        </View>
        {
            showDropdown && (
                <View style={styles.dropdown}>
                    <FlatList 
                     data={countries}
                      renderItem={({item}) => <TouchableOpacity onPress={() => countrySelector(item)} style={styles.listItem}>
                      <Text>{item.country}</Text>
                   </TouchableOpacity> 
                        }
                     keyExtractor={(item) => item.country}
                    />
                    
                </View>
            )
        }
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        marginLeft: 20,
        marginRight: 20,
    },
    searchbox: {
        flexDirection: "row",
        paddingLeft: 5,
        paddingRight: 5,
        alignItems: "center",
        borderColor: "black",
        borderWidth: 0.5,
        borderRadius: 6,
        height: 50,
        marginTop: 20,
    }, 
    icon: {
        marginRight: 5
    },
    dropdown: {
        backgroundColor: "#fff",
        width: "100%",
        height: 150,
        borderRadius: 6,
        shadowColor: 'rgba(32,33,36,.28)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
    },
    listItem: {
        width: "100%",
        height: 35,
        borderBottomColor: "#eee",
        borderBottomWidth: 0.5,
        justifyContent: "center",
        display: "flex",
        paddingLeft: 10,
        paddingRight: 10
    }
})

export default SearchBar;