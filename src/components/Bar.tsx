import React, { useState } from 'react';
import { StyleSheet, Image, View, ImageBackground ,Text, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { AppStack } from '../routes/AppStack';
import { useUser } from '../context/Auth';

export const Bar = () => {
  const navigation = useNavigation<AppStack>();

  const{signOut,visibleBar,setVisibleBar} = useUser();
  const [isUnderlined1, setIsUnderlined1] = useState(false);
  const [isUnderlined2, setIsUnderlined2] = useState(false);
  const [isUnderlined3, setIsUnderlined3] = useState(false);
  const [isUnderlined4, setIsUnderlined4] = useState(false);
  const [isUnderlined5, setIsUnderlined5] = useState(false);
  const [isUnderlined6, setIsUnderlined6] = useState(false);

  const handleSignOut = async() => {
    try{
       await signOut();
    }catch (error) {
      Alert.alert("Erro ao fazer logout, tente novamente.");
    };
  }

  const handleActionLink = async (action:number) =>{
    setTimeout(() => {
      if(action === 1 || action === 2) navigation.navigate('Home')
      if(action === 3) navigation.navigate('MeusArquivosImagens'); 
      if(action === 4) navigation.navigate('MeusArquivosDocumentos'); 
      if(action === 5) navigation.navigate('User'); 
      if(action === 6) handleSignOut(); 
      setVisibleBar(false); 
    }, 200)
    

  }
  return (
    <View style = {styles.bar}>
      {/* <Text style = {styles.textBarTitle} >Opções</Text> */}
  
      <View style ={styles.lineTite}> 
        <Text style = {[styles.textBar, isUnderlined1 && styles.underlinedText]} 
          onPress={()=>{
            setIsUnderlined1(true);
            handleActionLink(1)
          }}
        >
          Home
        </Text>
      </View>
  
      <View style ={styles.line}> 
        
        <Text style = {[styles.textBar, isUnderlined2 && styles.underlinedText]} 
          onPress={()=>{
            setIsUnderlined2(true);
            handleActionLink(2)
          }}
        >
          Enviar novo arquivo
        </Text>
        
        <Text style = {[styles.textBar, isUnderlined3 && styles.underlinedText]} 
          onPress={()=>{
            setIsUnderlined3(true);
            handleActionLink(3)
          }}
        >
          Vizualizar imagens
        </Text>
        
        <Text style = {[styles.textBar, isUnderlined4 && styles.underlinedText]} 
          onPress={()=>{
            setIsUnderlined4(true);
            handleActionLink(4)
          }}
        >
          Vizualizar documentos
        </Text>

      </View>
      
      <View style ={styles.linefooter}> 
        
        <Text style = {[styles.textBar, isUnderlined5 && styles.underlinedText]} 
          onPress={()=>{
            setIsUnderlined5(true);
            handleActionLink(5) 
          }}
        >
          Perfil
        </Text>
        
        <Text style = {[styles.textBar, isUnderlined6 && styles.underlinedText]} 
          onPress={()=>{
            setIsUnderlined6(true);
            handleActionLink(6) 
          }}
        >
          Sair
        </Text>

      </View>
    </View>
  );
};




const styles = StyleSheet.create({
  bar:{
    backgroundColor : "#ffffff",
    height : 400,
    width : 250,
    top : 75,
    right: 7,
    position : 'absolute',
    zIndex: 999,
    borderRadius : 5,
    justifyContent : 'flex-start',
    // gap : 30,
    paddingHorizontal:10,
    paddingVertical : 10,

    // borderRadius: 20,
    borderWidth : 1,
    borderColor : "#00000017",

    shadowColor: '#2b6197',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.75,
    shadowRadius: 10,
    elevation: 10, 
    
  },
  underlinedText: {
    // textDecorationLine: 'underline', // Adiciona o sublinhado
    backgroundColor:'#0c61c2d4',
    color : '#fff',
    // marginLeft  : -10,
    // marginRight : 10
  },
  textBar: {
    paddingLeft: 10,
    color: '#3f444d',
    fontSize: 16,
    width:'100%',
    // fontFamily: 'DM_Sans',
    fontWeight: '600',
    lineHeight: 20,
    alignContent:'center',
    textAlign: 'left',
    height: 25,
    textAlignVertical:'center',
    borderRadius : 5
  }, 
  lineTite:{
    paddingTop: 15,
    paddingBottom:15,
    borderBottomWidth: 1 ,
    borderBottomColor: '#aea7a7'
  },
  line:{
    paddingVertical:15,
    gap:15,
    // height:'100%'
  },
  linefooter:{
    borderTopWidth: 1 ,
    borderTopColor: '#aea7a7',
    position:'absolute',
    gap:15,
    bottom:0,
    paddingTop: 15,
    paddingBottom:20,
    marginHorizontal:10,
    width:'100%'
  }
});

