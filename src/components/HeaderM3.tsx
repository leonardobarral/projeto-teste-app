import React from 'react';
import { Text, StyleSheet, Image, View, ImageBackground } from 'react-native';
import { ButtonShowbar } from './ButtonShowbar';


export const HeaderM3 = ({title}) => {
  return (
    <View style={styles.view}>
      <ImageBackground
        source={require('../../assets/images/Ellipse1.jpg')}
        style={styles.image}
        resizeMode="cover"
      ></ImageBackground>
      <View style={styles.menu}>
        <View style={styles.menuUser}>
          <Image
            source={require('../../assets/images/user.jpg')}
            style={styles.imageUser}
          />
          <Text style={styles.title}>{title}</Text>
        </View>
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
  menuUser:{
    flexDirection : 'row',
    alignItems : 'center',
    alignContent:'center',
    justifyContent : 'flex-start',
    height : '100%',
    gap : 15
  },
  imageUser:{
    width : 40,
    height : 40,
    borderRadius : 20,
    alignContent : 'center'
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

