import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

import {useNavigation} from '@react-navigation/native'
import { AppStack } from '../routes/AppStack'

export const CardM1 = ({imagePath, text ,page}) => {
  const navigation = useNavigation<AppStack>();
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
    backgroundColor: '#FFFDFD',
    paddingHorizontal: 40,
    paddingVertical : 10,
    borderRadius: 20,
    flexDirection : 'row',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
    width: '100%',
    height: 125,
    padding : 10,
    gap:15,
    shadowColor: '#2b6197',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.75,
    shadowRadius: 10,
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

