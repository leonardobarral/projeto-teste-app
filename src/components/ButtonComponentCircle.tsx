import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

export const ButtonComponentCircle = ({imagePath, text }) => {
  return (
    <TouchableOpacity style={styles.button} >
      <Image
        source={imagePath}
        style={styles.image}
      />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 75,
    flexDirection : 'column',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
    width: 150,
    height: 150,
    padding : 10,
    shadowColor: '#2B6197BF',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10, 
    gap:10,
  },
  image:{
    height : 40,
    width : 40,
  },
  text: {
    color: '#000000',
    fontSize: 14,
    // fontFamily: 'DM_Sans',
    fontWeight: '700',
    lineHeight: 18.23,
    alignContent:'center',
    textAlign: 'center',
    height: 18,
  },
});

