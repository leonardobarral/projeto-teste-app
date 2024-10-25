import React from 'react';
import {  Text, StyleSheet, View, ImageBackground } from 'react-native';
import { ButtonBack } from './ButtonBack';
import { ButtonShowbar } from './ButtonShowbar';


export const HeaderM2 = ({title,navigation}) => {
  return (
    <View style={styles.view}>
      <ImageBackground
        source={require('../../assets/images/Ellipse1.jpg')}
        style={styles.image}
        resizeMode="cover"
      ></ImageBackground>
      <View style={styles.menu}>
        <ButtonBack navigation={navigation}/>
        <Text style={styles.title}>{title}</Text>
        <ButtonShowbar/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex : 1,
    flexDirection : 'column',
    alignItems : 'center' ,
    width: '100%',
    height: 68,
    position: 'relative',
    overflow: 'hidden',
    borderBottomEndRadius: 10,
    borderBottomStartRadius : 10,
  },
  image: {
    position: 'relative',
    // marginTop: -192,
    width: '100%',
    height: 68,
    opacity : 1
  },
  menu:{
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    position: 'absolute',
    width : '100%',
    height : 68,
    paddingVertical : 14,
    paddingHorizontal : 24
  },
  title:{
    // fontFamily : 'Poppins-Regular',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    textAlign: 'center',
    alignContent:'center',
    flex : 1
  }
});

