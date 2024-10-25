import {  StyleSheet, View} from 'react-native';

import { HeaderM2 } from '../components/HeaderM2';
import { LinearGradient } from 'expo-linear-gradient';
import { CardM2 } from '../components/CardM2';
import {  SafeAreaView} from 'react-native';
import Gallery from "../../assets/images/Gallery.png"
import Folder from "../../assets/images/Folder.png"
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native'
import { StackTypes } from '../routes';

export default function MeusArquivos() {
  const navigation = useNavigation<StackTypes>();
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style = {{flex:1,paddingTop: insets.top }}>
      <LinearGradient colors={["#F7FAFC","#8BC4FD"]} style = {styles.container}>

        <View style = {styles.container}>

          <View style = {styles.header}>
            <HeaderM2 title = {"Meus arquivos"}  navigation = {navigation}/>
          </View>

          <View style = {styles.body}>
            <CardM2 imagePath={Gallery} text = {"Imagens"} page = {"MeusArquivosImagens"}/>
            <CardM2 imagePath={Folder} text = {"Documentos"} page = {"MeusArquivosImagens"}/>
          </View>
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
    top : 90,
    paddingHorizontal : 24,
    gap : 22,
  },
});
