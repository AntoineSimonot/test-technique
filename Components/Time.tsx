import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";

interface Props{
    uniteValue: number;
    uniteName: string;
    border: boolean;
}

export const Time: FC<Props> = ({ uniteValue, uniteName, border }) => {
    return (
        // if border == false add class
        <View style={[timeStyles.time, border === false ? {} : timeStyles.border]}> 
            <Text style={[timeStyles.text, timeStyles.uniteValue]}>{uniteValue}</Text>
            <Text style={timeStyles.text}>{uniteName}</Text>
        </View>
    );
}

const timeStyles = StyleSheet.create({
    text: {
        color: '#EEEEEE',
        textAlign: 'center',
    },
    uniteValue: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    time: {
        width: '25%',
    },
    border: {
        borderRightWidth: 1,
        borderRightColor: '#00ADB5',
    }
})

export default Time;