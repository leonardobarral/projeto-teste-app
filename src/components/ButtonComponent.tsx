import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import {useNavigation} from '@react-navigation/native'
import { StackTypes } from '../routes';

export const ButtonComponent = ({ name,page }) => {

  const navigation = useNavigation<StackTypes>();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(page)} >
      <Text style={styles.textName}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0038E1',
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    verticalAlign: 'middle',
    width: '100%',
    height: 48,
    justifyContent: 'center'

  },
  textName: {
    color: '#ffffff',
    fontSize: 16,
    // fontFamily: 'Inter',
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'center',
    height: 24,
    alignContent:'center'
  },
});

