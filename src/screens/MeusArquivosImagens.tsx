import { StyleSheet,  View, TouchableOpacity, Text } from 'react-native';

import { HeaderM2 } from '../components/HeaderM2';
import { LinearGradient } from 'expo-linear-gradient';

import { CardM3 } from '../components/CardM3';
import { SetStateAction, useState } from 'react';
import { ButtonComponentCircleM2 } from '../components/ButtonComponentCircleM2';

import img1 from "../../assets/images/img1.png"
import img2 from "../../assets/images/img2.png"
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import {  SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { StackTypes } from '../routes';


export default function MeusArquivosImagens() {
  const navigation = useNavigation<StackTypes>();
  const [textSelection, setTextSelection] = useState("Selecionar");
  const toggleTextSelection = (value: SetStateAction<string>) => {
    setTextSelection(value);
  };

  const [selectable, setSelectable] = useState(false);
  const toggleSelectable = (value: SetStateAction<boolean>) => {
    setSelectable(value);
  };

  const [selectableNumber, setSelectableNumber] = useState(0);
  const toggleSelectableNumber = (value: number) => {
    var newValue = selectableNumber + value
    setSelectableNumber(newValue);
  };
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style = {{flex:1,paddingTop: insets.top }}>
      <LinearGradient colors={["#F7FAFC","#8BC4FD"]} style = {styles.container}>
        

        <View style = {styles.container}>

          <View style = {styles.header}>
            <HeaderM2 title = {"Imagens"} navigation={navigation}/>
          </View>

          <View style = {styles.body}>
            <TouchableOpacity onPress={() => {
              if(textSelection === "Selecionar"){
                toggleTextSelection("Selecionando")
              }
            }}>
              <Text style={styles.textSelection}>{textSelection}</Text>
            </TouchableOpacity>

            <View style = {styles.containerCards}>
            
              <CardM3 
                imagePath={img1} 
                text1 = {"Enviado em 3 de abril de 2029"}
                text2 = {"São Francisco, CA"}
                text3 = {"2 de novembro de 2029"}
                text4 = {"1 item"}
                selectable = {selectable}
                onLongPress={() => toggleTextSelection("Selecionando")}
                selectableNumber={(it: number) => toggleSelectableNumber(it)}
                />
              
              <CardM3 
                imagePath={img2}
                text1 = {"Enviado em 3 de junho de 2029"}
                text2 = {"São Francisco, CA"}
                text3 = {"3 de novembro de 2029"}
                text4 = {"1 item"}
                selectable = {selectable}
                onLongPress={() => toggleTextSelection("Selecionando")}
                selectableNumber={(it: number) => toggleSelectableNumber(it)}
              />
            
            </View>
          </View>
          {selectableNumber > 0 && (
            <View style = {styles.VontainerButtonsActions}>
              <ButtonComponentCircleM2 imagePath={"../../assets/images/heroicons-solid_download.png"}/>
              <ButtonComponentCircleM2 imagePath={"../../assets/images/mdi_share.png"}/>
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width : '100%',
    height : '100%',
    justifyContent : 'flex-start',    
  },

  header:{
    width : '100%',
    height : 68
  },

  body : {
    flexDirection : 'column',
    width : '100%',
    justifyContent : 'flex-start',
    top : 94,
    paddingHorizontal : 24,
    gap : 10,
  },

  textSelection: {
    color: '#807979',
    fontSize: 14,
    // fontFamily: 'Poppins',
    fontWeight: '500',
    lineHeight: 21,
    textAlign: 'right',
    height: 21,
    width : '100%',
  },
  containerCards:{
    width : '100%',
    gap : 10,
    flexDirection : 'column',
    justifyContent : 'flex-start',
    alignItems : 'center',
  },
  VontainerButtonsActions :{
    width : 75,
    height :173,
    top : 628,
    gap : 23,
    right : 24
  }
});
