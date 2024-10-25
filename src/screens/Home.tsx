import {  SafeAreaView, StyleSheet, View} from 'react-native';

import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';


import { HeaderM3 } from '../components/HeaderM3';
import { LinearGradient } from 'expo-linear-gradient';
import { ButtonComponentCircle } from '../components/ButtonComponentCircle';
import { CardM1 } from '../components/CardM1';
import Plus from "../../assets/images/Plus.png"
import Camera from "../../assets/images/Camera.png"
import Folder from "../../assets/images/Folder.png"
import Paper from "../../assets/images/Paper.png"
// import { StatusBar } from 'expo-status-bar';



export default function Home() {

  const insets = useSafeAreaInsets();
  return (

    <SafeAreaView style = {{flex:1,paddingTop: insets.top }}>

      <LinearGradient colors={["#F7FAFC","#8BC4FD"]} >

        <View style = {styles.container}>

          <View style = {styles.header}>
            <HeaderM3 title = {"Olá, Leonardo!"}/>
          </View>

          <View style = {styles.body}>

            <View style = {styles.containerVideo}>
              <ButtonComponentCircle imagePath={Plus} text = {"Carregar"}/>
              <ButtonComponentCircle imagePath={Camera} text = {"Camera"}/>
            </View>
            <CardM1 imagePath={Folder} text = {"Meus Arquivos"} page = {"MeusArquivos"}/>
            <CardM1 imagePath={Paper} text = {"Relatório de atividas"} page = {"Home"}/>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex :1,
    flexDirection: 'column',
    alignItems: 'center',
    width : '100%',
    height : '100%',
    justifyContent : 'flex-start',
    gap :150,
    
  },

  header:{
    width : '100%',
    height : 68,
  },

  body : {
    flexDirection : 'column',
    width : '100%',
    justifyContent : 'flex-start',
    gap: 20,
    paddingHorizontal : 24
  },

  containerVideo:{
    flexDirection : 'row',
    width : '100%',
    paddingHorizontal : 10,
    height : 150,
    alignItems : 'center',
    justifyContent : 'space-around',
    gap : 20,
  },
});
