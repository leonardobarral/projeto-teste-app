import React from 'react';
import { StyleSheet, Image, View, ImageBackground } from 'react-native';

export const HeaderM1 = () => {
  return (
    <View style={styles.view}>
      <ImageBackground
        source={require('../../assets/images/Ellipse2.png')}
        style={styles.image}
        resizeMode="cover"
      ></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    view: {
      alignItems: 'center',
      width: '100%',
      height: 135
  },
  image: {
    marginTop: -125,
    width: 430,
    height: 260,
    opacity : 1
  }
});

