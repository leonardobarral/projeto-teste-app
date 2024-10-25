import React, { SetStateAction, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';



export const CardM3 = ({imagePath, text1,text2,text3,text4,selectable,onLongPress,selectableNumber}) => {
  const [selected, setSelected] = useState(false);
  const toggleSelected = (value: SetStateAction<boolean>) => {
    setSelected(value);
  };

  // const [backGroundColor, setBackGroundColor] = useState("#FFFFFFBD");
  // const toggleBackGroundColor = (value: SetStateAction<string>) => {
  //   if(selected){
  //     setBackGroundColor("#ADD1F4");
  //   }
  // };
  const backgroundColor = selected ? "#ADD1F4" : "#FFFFFFBD";
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]} 
    onLongPress={onLongPress}
    onPress={()=>{
      if(selectable){
        var newStatus = !selected
        toggleSelected(newStatus)
        if(newStatus){
          selectableNumber(1)
        }else{
          selectableNumber(-1)
        }

      }
    }    
    }>
      <Image
        source={imagePath}
        style={styles.image}
      />
      <View style = {styles.containerText}>
        <Text style={styles.text1}>{text1}</Text>
        <Text style={styles.text2}>{text2}</Text>
        <Text style={styles.text3}>{text3}</Text>
        <Text style={styles.text3}>{text4}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 110,
    paddingVertical : 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap:16,
    flexDirection : 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    verticalAlign: 'middle',
    shadowColor: '#2B6197BF',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10, 
  },
  image:{
    height : 85,
    width : 85,
  },

  containerText:{
    flex : 1,
    flexDirection : 'column',
    justifyContent : 'flex-start',
    alignItems : 'flex-start'
  },

  text1: {
    height: 24,
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '500',
    color: '#1C170D',
    // fontFamily: 'Plus Jakarta Sans',
    alignContent:'flex-start',
    textAlign: 'left',
  },
  text2: {
    height: 24,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: '#1C170D',
    // fontFamily: 'Plus Jakarta Sans',
    alignContent:'flex-start',
    textAlign: 'left',
  },
  text3: {
    height: 21,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    color: '#A1824A',
    // fontFamily: 'Plus Jakarta Sans',
    alignContent:'flex-start',
    textAlign: 'left',
  },

});

