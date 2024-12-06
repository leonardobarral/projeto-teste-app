import {  Modal, SafeAreaView, StyleSheet, TouchableOpacity, View, Text ,Alert} from 'react-native';

import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';


import { HeaderM3 } from '../components/HeaderM3';
import { LinearGradient } from 'expo-linear-gradient';
import { ButtonComponentCircle } from '../components/ButtonComponentCircle';
import { CardM1 } from '../components/CardM1';
import Plus from "../assets/images/Plus.png"
import Camera from "../assets/images/Camera.png"
import Folder from "../assets/images/Folder.png"
import Paper from "../assets/images/Paper.png"
import { Popupcarregar } from '../components/Popupcarregar';
import { useEffect, useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Bar } from '../components/Bar';
import { useUser } from '../context/Auth';
import * as ImageManipulator from "expo-image-manipulator";
import { camera, fileImage, file } from '../../services/managerfiles';
import storage from "@react-native-firebase/storage"
import firestore from "@react-native-firebase/firestore"
import { handleError } from '../context/Auth';
import {useNavigation} from '@react-navigation/native'
import { AppStack } from '../routes/AppStack'

export default function Home() {

  const navigation = useNavigation<AppStack>();
  //carregamento de dados pessoais
  const{user,usuario,visibleBar,setVisibleBar} = useUser();
  const [name, setName] = useState(usuario.nome || 'carregando...');
  const [imagem, setImagem] = useState(usuario.imagem);

  const maskFirtsName = (name:string)=>{
    if(name) return name.split(" ")[0]
    else return name
  }
  
  useEffect(()=>{
    setName(usuario.nome)
    setImagem(usuario.imagem)
  },[usuario])


  const handleCamera = async()=>{
    const image = await camera()
    setPopupVisible(false)
    
    handleStorage(image,'imagem','')
  }

  const handleGallery = async()=>{
    const image = await fileImage()
    setPopupVisible(false)
    
    handleStorage(image,'imagem','')
  }
  
  const handleFiles = async()=>{
    setPopupVisible(false)
    const image = await file()
      
    
    if(image){
      handleStorage(image.uri,'documento',image.name)
    }
  }

  const openFolder = async (path:any) => {
    navigation.navigate(path)
  };



  //funcão de carregamento de imagem de camera:
  const handleStorage = async (image:any,type:string,name:string)=>{
    try{

      if(image){

        
        const regex = /\.([a-zA-Z0-9]+)$/;
        const match = image.match(regex);
        
        const extecao = match ? `.${match[1]}` : null;
        
        const filename = image.substring(image.lastIndexOf("/")+1)
        const filePath = image.replace('file://','')

        const newName = name ==="" ? filename : name;
        
        //configurando file
        const currentDate = new Date();
        const formattedDateTime = new Intl.DateTimeFormat('pt-BR', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit',
      }).format(currentDate);
        
        const fileDoc = {
          cidade : 'São paulo, SP'.toLocaleLowerCase(),
          data : formattedDateTime,
          uid: user?.uid,
          type: type,
          url:'',
          extencao:extecao,
          nome: newName.toLocaleLowerCase()
        }
        
        //subindo imagem
        if(filename && filePath){

          await storage().ref(`files/${filename}`).putFile(filePath).then((e)=>{
            fileDoc.url = `https://firebasestorage.googleapis.com/v0/b/teste-atauan.firebasestorage.app/o/${e.metadata.fullPath}?alt=media`.replace('files/','files%2F').replace(" ","_")
          })
        }else{
          return;
        }
        
        //sunbindo file
        const filesCollection = firestore().collection("files");
        await filesCollection.add(fileDoc);



        Alert.alert("Sucesso","Documento enviado!",
          [
            {
              text: 'Voltar',
              style: 'cancel',
            },
            {
              text: type === 'imagem'? 'Exibir imagens':'Exibir documentos',
              onPress: () => openFolder(type === 'imagem'? 'MeusArquivosImagens':'MeusArquivosDocumentos'),
            },
          ],
          { cancelable: true })
      
      }
    }catch(error){
      handleError(error)
    }
  }
  

  //barra de opções
  // const [visibleBar, setvisibleBar] = useState(false);
  const toggleVisibleBar = () => {
    setVisibleBar(!visibleBar);
  };
  
  
  //popup de carregamento de arquivos
  const [popupVisible, setPopupVisible] = useState(false);
  const toggleisPopupVisible = (value: boolean) => {
    setPopupVisible(value);
  };

  
  const insets = useSafeAreaInsets();
  const headerHeight = 68 + insets.top;
  return (

    <LinearGradient colors={["#F7FAFC","#8bc4fd"]} style = {styles.container} >
      <View style = {styles.container}>
        <View style={[styles.header, {height: headerHeight }]}>
          <HeaderM3 title = {`Olá, ${maskFirtsName(name)}`} press = {toggleVisibleBar} imagem = {imagem}/>
          {visibleBar && <Bar/>}
        </View>

        <View style = {styles.body}>

          <View style = {styles.containerVideo}>
            <ButtonComponentCircle 
            imagePath={Plus} 
            text = {"Carregar"} 
            onPress={() => toggleisPopupVisible(true)}
            />
            <ButtonComponentCircle 
            imagePath={Camera} 
            text = {"Camera"} 
            onPress={()=>handleCamera()} 
            />
          </View>
          <CardM1 
          imagePath={Folder} 
          text = {"Meus Arquivos"} 
          page = {"MeusArquivos"}/>
          <CardM1 
          imagePath={Paper} 
          text = {"Relatório de atividades"} 
          page = {"Relatorios"}/>
        </View>
      </View>


      <Modal
        transparent
        visible={popupVisible}
        animationType="fade"
        onRequestClose={() => toggleisPopupVisible(false)}
      >
        <TouchableOpacity
          style={styles.popupmodal} 
          activeOpacity={1} 
          onPressOut={() => toggleisPopupVisible(false)}
        >
          <View style={styles.popupcontainer}>
            <Popupcarregar 
            gallery = {
              handleGallery
              // ()=>{}
            } 
            files = {
              handleFiles
              // ()=>{}
              } /> 
          </View>
        </TouchableOpacity>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex :1,
    flexDirection: 'column',
    alignItems: 'center',
    width : '100%',
    height : '100%',
    justifyContent : 'space-between',
    gap :150   
  },

  header:{
    width : '100%',
    // height : 68,
  },

  body : {
    flexDirection : 'column',
    width : '100%',
    justifyContent : 'flex-start',
    gap: 20,
    paddingHorizontal : 24,
    bottom : '10%'
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
  popupmodal: {
    flex: 1,
    backgroundColor: '#0000007f',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  popupcontainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});



