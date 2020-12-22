import React, { FC } from 'react';
import { Text, View, StyleSheet, TextInput } from "react-native"
import { Country } from '../actions/types';

interface Props {
country: {};
convertedValue: number;
baseValueSetter: (val: number) => void;
currencyError: boolean;
rates: number;
}

const Converter: FC<Props> = ({ country, convertedValue, baseValueSetter, currencyError, rates}) => {
    
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.converter}>Converter</Text>

                <View style={styles.inputWrap}>
                    <Text style={styles.label}>United States dollars (USD)</Text>
                    <TextInput style={styles.inputBox} placeholder="Enter amount"  onChange={(text) => baseValueSetter(text.target.value) }/>
                </View>

                <View style={styles.inputWrap}>
                    <View style={styles.rateWrap}>
                    <Text style={styles.label}>{country && (country.currencies && (country.currencies.length > 0 ? country.currencies[0].name : ""))} ({country && (country.currencies && (country.currencies.length > 0 ? country.currencies[0].code : ""))})</Text>
    <Text style={styles.label}>Rate: {rates.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</Text>
                    </View>
                    {currencyError && (<Text style={styles.error}>Country Rate unavailable</Text>)}
                <TextInput style={styles.inputBox} placeholder="Enter value" value={(convertedValue).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}/>
                </View>
            </View>
        </>
    )
}

export default Converter

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 20
    },
    converter: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "600"
    },
    inputBox: {
        borderColor: "black",
        borderWidth: 0.5,
        borderRadius: 6,
        height: 60,
        paddingLeft: 5,
        textAlign: "center",
        fontSize: 15
       
    },
    inputWrap: {
        marginTop: 20,
        marginBottom: 8
    },
    label: {
        marginBottom: 5,
        fontSize: 15
    },
    error: {
        color: "red",
        marginBottom: 5
    },
    rateWrap: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
})