import { StyleSheet,  View, TouchableOpacity, Text, Modal, Image } from 'react-native';

import { HeaderM2 } from '../components/HeaderM2';
import { LinearGradient } from 'expo-linear-gradient';

import { CardM5 } from '../components/CardM5';
import { SetStateAction, useState } from 'react';
import { ButtonComponentCircleM2 } from '../components/ButtonComponentCircleM2';

import relatorio from "../assets/images/relatorio.png"
import Vector_filter from "../assets/images/Vector_filter.png"
import calendar from "../assets/images/calendar.png"
import iconamoon_arrow from "../assets/images/iconamoon_arrow.png"



import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import {  SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { AppStack } from '../routes/AppStack'
import { Bar } from '../components/Bar';
import { useUser } from '../context/Auth';


export default function Relatorios() {
  const navigation = useNavigation<AppStack>();
  const{user,usuario,visibleBar,setVisibleBar} = useUser();

  // const [visibleBar, setvisibleBar] = useState(false);
  
  const toggleVisibleBar = () => {
    setVisibleBar(!visibleBar);
  };

  // const [selecting, setSelecting] = useState(false);

  // const [textSelection, setTextSelection] = useState("Selecionar");

  // const toggleselecting = (value: SetStateAction<boolean>) => {
  //   // console.log(value)
  //   setSelecting(value);
  //   if(value){
  //     setTextSelection("Selecionando")
  //   }else{
  //     setTextSelection("Selecionar")
  //   }    
  // };

  // const [number, setNumber] = useState(0); 
  // const toggleNumber = (value: number) => {    
  //   setNumber(value+number);
  //   toggleVisible(value+number)
  // };
  
  
  // const [visible, setVisible] = useState(false);
  // const toggleVisible = (value:number) => {
  //   // console.log(true)
  //   if(value > 0){
  //     setVisible(true)
  //   }else{
  //     setVisible(false)
      
  //   }
  // };

  const insets = useSafeAreaInsets();
  const headerHeight = 68 + insets.top;

  return (
    <LinearGradient colors={["#F7FAFC","#8BC4FD"]} style = {styles.container}>
      

      <View style = {styles.container}>

        <View style={[styles.header, {height: headerHeight }]}>
          <HeaderM2 title = {"Relatorios"} navigation={navigation} press = {toggleVisibleBar}/>
          {visibleBar && <Bar/>}
        </View>

        <View style = {styles.body}>
          {/* <TouchableOpacity onPress={()=> toggleselecting(!selecting)}>
          <TouchableOpacity 
            onPress={() => {
              if(!selecting){
                toggleselecting(true);
              }
            }}
            >
            <Text style={styles.textSelection}>{'textSelection'}</Text>
          </TouchableOpacity> */}

          <View style = {styles.filtercontainer}>
            <View style = {styles.vectorfilter}>
              <Image
                source={Vector_filter}
                style={styles.imagevectorfilter}
              />
            </View>
            <View style = {styles.containerfilters}>
              <View style = {styles.filterdata}>
                <Text style={styles.textButton}>{'Data'}</Text>
                <Image
                  source={calendar}
                  style={styles.imagevectorfilter1}
                />
              </View>
                <View style = {styles.filtertype}>
                  <Text style={styles.textButton}>{'Tipo de arquivo'}</Text>
                  <Image
                    source={iconamoon_arrow}
                    style={styles.imagevectorfilter1}
                  />
              </View>
            </View>
          </View>


          <View style = {styles.containerCards}>
          
            <CardM5 
              imagePath={relatorio} 
              text1 = {"Enviado em 21 de abril de 2029"}
              text2 = {"PDF"}
              text3 = {"São Paulo, SP"}
              text4 = {"21 de abril de 2029"}
              text5 = {"5 itens"}
              // selecting = {selecting}
              // longPress={() => toggleselecting(true)}
              // number={(it) => toggleNumber(it)}
              />
            
            <CardM5 
              imagePath={relatorio}
              text1 = {"Enviado em 21 de dezembro de 2029"}
              text2 = {"XLS"}
              text3 = {"Rio de Janeiro, RJ"}
              text4 = {"21 de abril de 2029"}
              text5 = {"1 item"}
              // selecting = {selecting}
              // longPress={() => toggleselecting(true)}
              // number={(it) => toggleNumber(it)}
            />

          
          </View>
        </View>
        
        {/* {visible && (<View style={styles.containerButtonsActions}>
          <ButtonComponentCircleM2 imagePath={heroicons_solid_download}/>
          <ButtonComponentCircleM2 imagePath={mdi_share}/> 
        </View>)} */}
      </View>
    </LinearGradient>
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
    // height : 68
  },

  body : {
    flexDirection : 'column',
    width : '100%',
    justifyContent : 'flex-start',
    top : 26,
    paddingHorizontal : 24,
    gap : 15,
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

  filtercontainer:{
    height : 21,
    width : '100%',
    paddingHorizontal : 10,
    gap : 30,
    flexDirection : 'row',
  },
  vectorfilter:{
    height : 20,
    width : 20,
    alignItems : 'center',
    justifyContent : 'center'
  },

  imagevectorfilter:{
    width : 18.75,
    height : 10.32
  },

  containerfilters:{
    width : '100%',
    height : 21,
    flexDirection : 'row'
  },
  
  filterdata : {
    width : '43%',
    height : 21,
    backgroundColor : '#0000001A',
    flexDirection : 'row',
    gap : 10,
    paddingHorizontal : 9,
    alignItems : 'center',
    justifyContent : 'center',
    borderTopLeftRadius : 5,
    borderBottomLeftRadius : 5,
    borderColor : '#0000004D',
    borderLeftWidth : 0.5,
    borderTopWidth : 0.5,
    borderBottomWidth : 0.5,
  },
  
  filtertype : {
    // width : '57%',
    height : 21,
    backgroundColor : '#0000001A',
    flexDirection : 'row',
    gap : 10,
    paddingHorizontal : 9,
    alignItems : 'center',
    justifyContent : 'center',
    borderTopRightRadius : 5,
    borderBottomRightRadius : 5,
    borderColor : '#0000004D',
    borderRightWidth : 0.5,
    borderTopWidth : 0.5,
    borderBottomWidth : 0.5,
    borderLeftWidth : 0.5,
  },

  textButton:{
    color: '#807979',
    fontSize: 14,
    // fontFamily: 'Poppins',
    fontWeight: '500',
    lineHeight: 21,
    textAlign: 'right',
    height: 21,
  },

  imagevectorfilter1:{
    width : 15,
    height : 15
  },






  containerCards:{
    width : '100%',
    gap : 20,
    flexDirection : 'column',
    justifyContent : 'flex-start',
    alignItems : 'center',
    // backgroundColor : '#ffffff0'
  },
  containerButtonsActions :{
    position : 'absolute',
    width : 75,
    height :173,
    bottom : 50,
    gap : 23,
    right : 24,
    // backgroundColor : "#ffffff0"
  },
  modal:{
    width : '100%',
    height : "100%"
  }
});
