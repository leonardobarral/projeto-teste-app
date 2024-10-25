import React, { useState } from 'react';
import {  StyleSheet, TextInput, View } from 'react-native';

export const InputText = ({ placeHolder , keyboardType }) => {
  const [text, setText] = useState('');
  return (
    <View style={styles.containerInput}>
      <TextInput style={styles.input}
        placeholder= {placeHolder}
        value = {text}
        onChangeText = {setText}
        keyboardType={keyboardType}
        placeholderTextColor='#a17d1c8d'

      />
    </View>
  );
};


const styles = StyleSheet.create({

  containerInput :{
    width : '100%'
  },
  
  input:{
    height: 56,
    borderColor: '#FEF4D8',
    borderWidth: 1,
    borderRadius: 12, 
    padding: 16,
    width : '100%',
    backgroundColor : '#FEF4D8',
    color : '#A17D1C',
    // fontFamily : 'Inter',
    fontWeight : '400',
    fontSize : 16,
    lineHeight : 24,
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
  }
});

