import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

export const ButtonShowbar = () => {
  return (
    <TouchableOpacity style={styles.button} >
      <Icon name="menu" style={styles.icon} size = {24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height : 24
  },
  button:{}
});

