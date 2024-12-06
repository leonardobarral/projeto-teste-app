import { StyleSheet,  View, TouchableOpacity, Text, Modal, FlatList ,KeyboardAvoidingView, Platform, Dimensions, ActivityIndicator,} from 'react-native';
import { HeaderM2 } from '../components/HeaderM2';
import { LinearGradient } from 'expo-linear-gradient';
import { CardM3 } from '../components/CardM3';
import { SetStateAction, useEffect, useState } from 'react';
import { ButtonComponentCircleM2 } from '../components/ButtonComponentCircleM2';
import img1 from "../assets/images/img1.png"
import img2 from "../assets/images/img2.png"
import heroicons_solid_download from "../assets/images/heroicons_solid_download.png"
import mdi_share from "../assets/images/mdi_share.png"
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import {  SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { AppStack } from '../routes/AppStack'
import { Bar } from '../components/Bar';
import { useUser } from '../context/Auth';
import storage from "@react-native-firebase/storage"
import firestore from "@react-native-firebase/firestore"
import { downloadFile, downloadFileTemporarioFile, downloadImage, shareFile } from "../../services/managerfiles"
import { Colors } from 'react-native/Libraries/NewAppScreen';

type fileDoc = {
  id:string,
  cidade : string,
  data : string,
  uid: string,
  type: string,
  url:string,
  extencao:string,
  name:string,
}

export default function MeusArquivosImagens() {
  const navigation = useNavigation<AppStack>();

  const{user,usuario,visibleBar,setVisibleBar} = useUser();

  // const [visibleBar, setvisibleBar] = useState(false);
  const [visibleButtonShare, setVisibleButtonShare] = useState(false);
  const [loadVisible, setloadVisible] = useState(false);
  
  const toggleVisibleBar = () => {
    setVisibleBar(!visibleBar);
  };


  const [selecting, setSelecting] = useState(false);

  const [textSelection, setTextSelection] = useState("Selecionar");

  const toggleselecting = (value: SetStateAction<boolean>) => {
    // console.log(value)
    setSelecting(value);
    if(value){
      setTextSelection("Selecionando")
    }else{
      setTextSelection("Selecionar")
    }    
  };

  const [number, setNumber] = useState(0); 
  const toggleNumber = (value: number) => {    
    setNumber(value+number);
    toggleVisible(value+number)
  };

  const [listAction , setListAction] = useState<string[]>([])

  const toogleListAction = (url:string,action:string)=>{
    if(action === 'add') setListAction((listAction ) => [...listAction , url]);
    if(action === 'remove') setListAction((listAction) => listAction.filter((element) => element !== url));
  }

  useEffect(()=>{
    if(listAction.length>0) setVisible(true)
    else {setVisible(false); toggleselecting(false);}
    // for(let i in listAction) console.log(i," - ",listAction[i])
    if(listAction.length === 1) setVisibleButtonShare(true) 
    else setVisibleButtonShare(false)

  },[listAction])

  
  
  
  const [visible, setVisible] = useState(false);
  const toggleVisible = (value:number) => {

    if(value > 0){
      setVisible(true)
    }else{
      setVisible(false)
    }
  };

  

  const [files, setFiles] = useState<fileDoc[]>([]);


  
  //lista de imagens
  const fetchImages = async () => {
    try {


      const filesCollection  = firestore().collection('files')
      const snapshot = await filesCollection.where('uid', '==',user?.uid).where('type','==','imagem').orderBy('data','desc').get();

      if (!snapshot.empty) {
        const fileData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<fileDoc, 'id'>),
        }));
        // for (let i in fileData) console.log(i,"-",fileData[i])
        setFiles(fileData);
      }
    }catch(error){
      console.error('Erro ao buscar registros:', error);
      return [];
    }
  }

  useEffect(()=>{
    fetchImages()
  },[])

  const insets = useSafeAreaInsets();
  const headerHeight = 68 + insets.top;


  const hadleDowload = async ()=>{
    setloadVisible(true)
    if(listAction.length > 0) await downloadImage(listAction)
    setloadVisible(false)
  }

  const handleShareFile = async ()=>{
    if(listAction.length === 1){
      const uri = await downloadFileTemporarioFile(listAction[0])
      if(uri) await shareFile(uri)
    } 
  }

  return (
    <LinearGradient colors={["#F7FAFC","#8BC4FD"]} style = {styles.container}>
      
      <View style = {styles.container}>

        <View style={[styles.header, {height: headerHeight }]}>
          <HeaderM2 title = {"Imagens"} navigation={navigation} press = {toggleVisibleBar}/>
          {visibleBar && <Bar/>}
        </View>

        <View style = {styles.body}>
          
          <TouchableOpacity onPress={() => {
              if(!selecting){
                toggleselecting(true);
              }
            }}>
            <Text style={styles.textSelection}>{textSelection}</Text>
          </TouchableOpacity>

          <View style = {styles.containerList}>
            <FlatList 
              contentContainerStyle ={styles.containerCards}
              data = {files}
              keyExtractor={(item)=>item.id}
              renderItem={({item})=>(
                <CardM3 
                  imagePath={item.url} 
                  text1 = {`Enviado em ${item.data}`}
                  text2 = {item.cidade}
                  text3 = {"2 de novembro de 2029"}
                  // text4 = {"1 item"}
                  selecting = {selecting}
                  longPress={() => toggleselecting(true)}
                  number={(it) => toggleNumber(it)}
                  action={(it) => toogleListAction(it[0],it[1])}
                />

              )}
            />
            {/* <View style = {styles.containerCards}>
              <CardM3 
                imagePath={img2}
                text1 = {"Enviado em 3 de junho de 2029"}
                text2 = {"São Francisco, CA"}
                text3 = {"3 de novembro de 2029"}
                // text4 = {"1 item"}
                selecting = {selecting}
                longPress={() => toggleselecting(true)}
                number={(it) => toggleNumber(it)}
              />
              <CardM3 
                imagePath={img2}
                text1 = {"Enviado em 3 de junho de 2029"}
                text2 = {"São Francisco, CA"}
                text3 = {"3 de novembro de 2029"}
                // text4 = {"1 item"}
                selecting = {selecting}
                longPress={() => toggleselecting(true)}
                number={(it) => toggleNumber(it)}
              /> 
            </View> */}

          </View>
          {/* <View style={{height:bottomPadding}}></View> */}
        </View>
        
        {visible && (<View style={styles.containerButtonsActions}>
          {visibleButtonShare && <ButtonComponentCircleM2 imagePath={mdi_share} onPress={()=>handleShareFile()}/> } 
          <ButtonComponentCircleM2 imagePath={heroicons_solid_download} onPress={()=>hadleDowload()}/>
        </View>)}
      </View>
      {/* <Load visible={loadVisible} /> */}

      <Modal
        transparent
        visible={loadVisible}
        animationType="fade"
        // onRequestClose={() => {setVisiblemodal2(false),setEmailNewPassword("")}}
      >
        <TouchableOpacity
          style={styles.modal2}
          activeOpacity={0.4}      
          // onPressOut={() => {setVisiblemodal2(false),setEmailNewPassword("")}}
        >
          <View style = {{flex:1,justifyContent : 'center',alignItems:'center'}}>
            <ActivityIndicator size = {'large'} color={Colors.primary}/>
          </View>
        </TouchableOpacity>
      </Modal>

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
    paddingBottom:10,  
  },

  header:{
    width : '100%',
  },

  body : {
    flexDirection : 'column',
    width : '100%',
    justifyContent : 'flex-start',
    top : 26,
    gap : 10,
    flex:1
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
    right:24
  },
  containerList:{
    width : '100%',
    flexDirection : 'column',
    justifyContent : 'flex-start',
    paddingBottom:20,
    flex:1
  },
  containerCards:{
    width : '100%',
    flexDirection : 'column',
    paddingHorizontal:24,
  },
  containerButtonsActions :{
    position : 'absolute',
    width : 75,
    height :173,
    bottom : 50,
    gap : 23,
    right : 24,
    flexDirection:'column',
    justifyContent: 'flex-end'
  },
  modal:{
    width : '100%',
    height : "100%"
  },
  modal2: {
    flex: 1,
    backgroundColor: '#ffffffc7',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding : 23
  },
});
