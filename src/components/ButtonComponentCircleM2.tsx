import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

export const ButtonComponentCircleM2 = ({imagePath}) => {
  return (
    <TouchableOpacity style={styles.button} >
      <Image
        source={imagePath}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#D9D9D978',
    borderRadius: 37.5,
    flexDirection : 'column',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
    width: 75,
    height: 75,
    
    shadowColor: '#00000040',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, 
   
  },
  image:{
    height : 30,
    width : 30,
  },

});

