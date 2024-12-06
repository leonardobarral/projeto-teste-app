import React, { SetStateAction, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

type Props = {
  imagePath: any;
  text1: string;
  text2: string;
  text3: string;
  // text4: string;
  selecting: boolean;
  longPress?: () => void;
  number?: (value: number) => void;
  action?: (it:[string,string]) => void;
};



export const CardM3 = ({
  imagePath, 
  text1,
  text2,
  text3,
  // text4,
  selecting,
  longPress,
  number,
  action
}:Props) => {
  
  const [status, setStatus] = useState(false);
  const toggleStatus = (value: boolean) => {
    setStatus(value);
    if(value &&  action){
      action([imagePath,'add'])
    }
    if(!value &&  action){
      action([imagePath,'remove'])
    }
  };
  // const toggleStatus = (value: boolean) => {
  //   setStatus(value);
  //   if(value && number){
  //     number(+1)
  //   }
  //   if(!value && number){
  //     number(-1)
  //   }
  // };
  
  const backgroundColor = status ? "#ADD1F4" : "#f4eeee";


  return (
    <TouchableOpacity 
    style={[styles.button, { backgroundColor }]} 

    onPress={()=>{
      if(selecting){
        if(status) toggleStatus(false)
        else(toggleStatus(true))
      }
    }}
    
    onLongPress={()=>{
      if(selecting){
        toggleStatus(!status)
      }
      if(!selecting){
        if(longPress)longPress()
          toggleStatus(true)
      }
    
    }}
    >
      <View style={styles.container}>
        
        
        <Image
          source={typeof(imagePath) == 'number'?imagePath: {uri: `${imagePath}` }}
          style={styles.image}
        />
        <View style = {styles.containerText}>
          <Text style={styles.text1} numberOfLines={2} ellipsizeMode="tail">{text1}</Text>
          <Text style={styles.text2}>{text2}</Text>
          <Text style={styles.text3}>{text3}</Text>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.75,
    shadowRadius: 12,
    elevation: 12, 
    marginBottom:10,
    marginTop:10,
    // marginHorizontal:20,
    // position:'relative'
  },

  container : {
    width : '100%',
    height : 90,
    flexDirection : 'row',
    columnGap :16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical : 'auto',
  },

  image:{
    height : 85,
    width : 85,
  },

  containerText:{
    flex : 1,
    flexDirection : 'column',
    justifyContent : 'flex-start',
    alignItems : 'flex-start',
    height : '100%'
  },

  text1: {
    height: 24,
    fontSize: 14,
    lineHeight: 20,
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

