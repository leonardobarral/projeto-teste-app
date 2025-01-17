import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

import {useNavigation} from '@react-navigation/native'
import { StackTypes } from '../routes';

export const CardM2 = ({imagePath, text, page }) => {
  const navigation = useNavigation<StackTypes>();
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(page)}>
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
    paddingHorizontal: 40,
    paddingVertical : 10,
    borderRadius: 20,
    borderWidth : 1,
    flexDirection : 'column',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
    width: '100%',
    height: 100,
    padding : 10,
    shadowColor: '#2B6197BF',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10, 
  },
  image:{
    height : 50,
    width : 50,
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

