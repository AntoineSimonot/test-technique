import { ImageBackground, Linking, StyleSheet, TouchableOpacity } from "react-native";
import React, { FC } from "react";

interface Props{
    link: string;
    logoImg: string;
}

export const Logo: FC<Props> = ({link, logoImg}) => {

    // switch case logoImg
    let logo = '';
    switch (logoImg) {
        case 'github':
            logo = require('../assets/logo-github.png');
            break;
        case 'linkedin':
            logo = require('../assets/logo-linkedin.png');
            break;
        default:
            logo = require('../assets/logo-fiverr.png');
    }

    return (
        <ImageBackground
        source={logo}
        style={logoStyles.logo}>
        <TouchableOpacity
          onPress={() => Linking.openURL(link)}
          style={{flex: 1}}>
        </TouchableOpacity>
      </ImageBackground>
    );
}

const logoStyles = StyleSheet.create({
    logo: {
        width: 32,
        aspectRatio: 1, 
        height: undefined, 
        marginHorizontal: 10,
        marginBottom: 10,
    }
})

export default Logo;