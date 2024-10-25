import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export const InputPassword = ({ placeHolder , keyboardType}) => {
  const [text, setText] = useState('');

  const [security, setVisible] = useState(true);

  const toggleSecureEntry = () => {
    setVisible(!security);
  };

  return (
    <View style={styles.containerInput}>
      <TextInput style={styles.input}
        placeholder= {placeHolder}
        value = {text}
        onChangeText = {setText}
        keyboardType={keyboardType}
        placeholderTextColor='#a17d1c8d'
        secureTextEntry ={security}
      />
      <TouchableOpacity onPress={toggleSecureEntry} style={styles.icon}>
        <Icon name={security ? 'visibility-off' : 'visibility'} size={20} color='#807979' />
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({

  containerInput :{
    width : '100%',
    flexDirection:'row'
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
  },
  icon:{
    position: 'absolute',
    right: 16,
    top: 18,
  }
});

