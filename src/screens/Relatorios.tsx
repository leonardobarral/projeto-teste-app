import { StyleSheet,  View, TouchableOpacity, Text, Modal, Image, FlatList, ActivityIndicator, Button, TextInput, TouchableWithoutFeedback, Pressable, Alert } from 'react-native';

import { HeaderM2 } from '../components/HeaderM2';
import { LinearGradient } from 'expo-linear-gradient';

import { CardM5 } from '../components/CardM5';
import { SetStateAction, useEffect, useState } from 'react';
import { ButtonComponentCircleM2 } from '../components/ButtonComponentCircleM2';

import relatorio from "../assets/images/relatorio.png"
import Vector_filter from "../assets/images/Vector_filter.png"
import calendar from "../assets/images/calendar.png"
import iconamoon_arrow from "../assets/images/iconamoon_arrow.png"

import firestore from "@react-native-firebase/firestore"



import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import {  SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { AppStack } from '../routes/AppStack'
import { Bar } from '../components/Bar';
import { fileDoc, handleError, records, useUser } from '../context/Auth';
import { file } from '../../services/managerfiles';

import { Dropdown } from "react-native-element-dropdown";

import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NotFoundFile } from '../components/NotFoundFile';


export default function Relatorios() {
  const navigation = useNavigation<AppStack>();
  const{user,usuario,visibleBar,setVisibleBar} = useUser();

  const [files, setFiles] = useState<fileDoc[]>([]);
  const [originalFiles, setOriginalFiles] = useState<fileDoc[]>([]);
  const [filesOk, setFilesOk] = useState(false);
  const [reports, setReports] = useState<records[]>([]);
  
  const [notFoundFile, setNotFoundFile] = useState(false);
  const [spiner, setSpiner] = useState(false);

  const [showOrder, setShowOrder] = useState(false);
  const [show, setShow] = useState(false);
  const [showTipo, setShowTipo] = useState(false);
  
  const [order, setOrder] = useState("");

  const [filterType, setFilterType] = useState("");
  const [showMin, setShowMin] = useState(false);
  const [showMax, setShowMax] = useState(false);
  const [filterDataMin, setFilterDataMin] = useState("");
  const [filterDataMax, setFilterDataMax] = useState("");
  const [alertData1, setAlertData1] = useState(false);
  const [alertData2, setAlertData2] = useState(false);
  const [ultimaData, setUltimaData] = useState("");
  const [nextFilterDataMin, setNextFilterDataMin] = useState("");
  const [nextFilterDataMax, setNextFilterDataMax] = useState("");

  // const [visibleBar, setvisibleBar] = useState(false);
  
  const toggleVisibleBar = () => {
    setVisibleBar(!visibleBar);
  };

  useEffect(()=>{if(show) setShowOrder(false),setShowTipo(false)},[show])
  useEffect(()=>{if(showOrder) setShow(false),setShowTipo(false)},[showOrder])
  useEffect(()=>{if(showTipo) setShow(false),setShowOrder(false)},[showTipo])

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

  //lista de imagens
  const fetchRegisters = async () => {
    setSpiner(true)
    try {
      const filesCollection  = firestore().collection('files')
      let query = filesCollection
        .where('uid', '==', user?.uid)
        .where('status', '==', true)
        .orderBy('dataCadastro', 'desc');
      if(filterType !== "") query = query.where('type', '==', filterType);

      const snapshot = await query.get();

      if (!snapshot.empty) {
        const fileData = snapshot.docs.map((doc) => {
          const data = doc.data() as Omit<fileDoc, 'id'>
          const formattedDataCadastro = data.dataCadastro.split(' ')[0];
          const formattedDataCriacao = data.dataCriacao.split(' ')[0];
          return {
              id: doc.id,
              ...data,
              dataCadastro: formattedDataCadastro,
              dataCriacao: formattedDataCriacao
            }
          }
        )
        for (let i in fileData) console.log(i,"-",fileData[i])
        setOriginalFiles(fileData); 
        if((filterDataMin||filterDataMax)&&!alertData2&&!alertData1) await filterData(fileData,filterDataMin,filterDataMax)
        else {
          setFiles(fileData); 
          setFilesOk(true)
        }
      }else{
        setFiles([]);
      }
    }catch(error){
      console.error('Erro ao buscar registros:', error);
      return [];
    }
  } 
  

  const filterData = async (filesnew:fileDoc[],dmin:string,dmax:string)=>{
    setSpiner(true)
    let newFiles = filesnew;
    console.log("antes",newFiles)
    if(!alertData2&&!alertData1){
      if(dmin)
        newFiles = newFiles.filter((elemento)=>{
          return new Date(elemento.dataCriacao.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")) >= new Date(dmin.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1"))
        })
      if(dmax) 
        newFiles = newFiles.filter((elemento)=>{
         return new Date(elemento.dataCriacao.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")) <= new Date(dmax.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1"))
        }) 
      console.log("depois",newFiles)

      if(files.length == 0) setNotFoundFile(true)
    
      setFiles(newFiles)
      setFilesOk(true)
      
    }
  }

  const handleFilterApply=(dmin:string,dmax:string)=>{
    filterData(originalFiles,dmin,dmax)
  }




  useEffect(()=>{ 
    fetchRegisters() 
  },[filterType])
  // useEffect(()=>{ 
  //   fetchRegisters() 
  // },[])


  useEffect(()=>{ 
    if(nextFilterDataMax && nextFilterDataMin){
      const desigual = nextFilterDataMin.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1") > nextFilterDataMax.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")
      if(ultimaData == 'dataMin' && desigual) setAlertData1(true),setAlertData2(false)
      else if(ultimaData == 'dataMax' && desigual) setAlertData2(true),setAlertData1(false)
      else{setAlertData2(false),setAlertData1(false)}
    }
  },[nextFilterDataMax,nextFilterDataMin])

  useEffect(()=>{
    if(alertData1)setNextFilterDataMin("")
    if(alertData2)setNextFilterDataMax("")
  },[alertData1,alertData2])

  const handleFiltertype = ((value:string)=>{ 
    if(filterType == value) setFilterType("")
    else setFilterType(value)
  })
  


  useEffect(()=>{
    if(filesOk){
      const groupedFiles = Object.values(
        files.reduce((acc, file) => { 
            const key = `${file.dataCriacao}-${file.dataCadastro}-${file.type}-${file.cidade}`;
    
            if (!acc[key]) {
                acc[key] = {
                    id:key,
                    dataCadastro: file.dataCadastro,
                    dataCriacao: file.dataCriacao,
                    type: file.type,
                    cidade: file.cidade,
                    quantidade: 0,
                    uf:file.uf,
                    timestamp: new Date(file.dataCriacao.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")).getTime()
                };
            }
            acc[key].quantidade += 1;
    
            return acc;
        }, {} as Record<string, records>)
    );

    console.log(groupedFiles)

    if(order == 'asc') groupedFiles.sort((a,b)=> a.timestamp - b.timestamp) //(antigo → novo)
    if(order == 'desc') groupedFiles.sort((a,b)=> b.timestamp - a.timestamp) //(novo → antigo)
    
    setReports(groupedFiles)
    setSpiner(false)
    
    }
  },[filesOk,files,order])

  const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho','julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

  const parseDate = (date:string)=> {
    const [day, month, year] = date.split('/');
    return {day:day,month:meses[parseInt(month)-1],year:year}
  } 

  
  


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
              <TouchableOpacity style={{width:50,height:30,alignItems:'center',justifyContent:'center',flexDirection:'row'}} onPress={()=>{setShowOrder(!showOrder)}}>
                <View style={styles.imagevectorfilter}>
                  <View style={styles.imagevectorfilter2}></View>
                  <View style={styles.imagevectorfilter3}></View>
                  <View style={styles.imagevectorfilter4}></View>
                </View>
              </TouchableOpacity>
              {showOrder&&(
                <View style={styles.boxOrder}>
                  <TouchableOpacity style = {styles.filterOrder} onPress={()=>{setShowOrder(false),setOrder("asc")}}>
                    <Text style={styles.textButtonOrder}>Ordenar por Data Crescente</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style = {styles.filterOrder} onPress={()=>{setShowOrder(false),setOrder("desc")}}>
                    <Text style={styles.textButtonOrder}>Ordenar por Data Decrescente</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>




            <View style = {styles.containerfilters}>
              <TouchableOpacity style = {styles.filterdata} onPress={()=>{
                  setNextFilterDataMin(filterDataMin)
                  setNextFilterDataMax(filterDataMax)
                  setShow(!show)
                }}>
                <Text style={styles.textButton}>{'Data'}</Text>
                <Image
                  source={calendar}
                  style={styles.imagevectorfilter1}
                />
              </TouchableOpacity>
                
              {show && (

                <View style={styles.boxData}>

                  <View style={styles.boxDataFilter}>
                    <TouchableOpacity style={!alertData1?styles.inputLikeButton:styles.inputLikeButtonAlert} onPress={() => setShowMin(true)}>
                      <Text style={nextFilterDataMin ? styles.textSelected : styles.placeholder}>
                        {nextFilterDataMin ? nextFilterDataMin : 'Data Mínima'}
                      </Text>
                    </TouchableOpacity>

                    <View style={styles.barr}></View>

                    <TouchableOpacity style={!alertData2?styles.inputLikeButton:styles.inputLikeButtonAlert} onPress={() => setShowMax(true)}>
                      <Text style={nextFilterDataMax ? styles.textSelected : styles.placeholder}>
                        {nextFilterDataMax ? nextFilterDataMax : 'Data Máxima'}
                      </Text>
                    </TouchableOpacity>

                  </View>

                  { alertData1?
                    <View style={styles.msgAlert}><Text style={{color:"#ff0000",fontWeight:"600"}}>Data selecionada maior que data máxima!</Text></View>
                  :alertData2?
                    <View style={styles.msgAlert}><Text style={{color:"#ff0000",fontWeight:"600"}}>Data selecionada menor que data mínima!</Text></View>
                  :null
                  }

                  <View style={styles.filterDataBottonsSends}>

                    <TouchableOpacity style={styles.btnVoltar} onPress={()=>{setShow(false),setAlertData1(false),setAlertData2(false),handleFilterApply(filterDataMin,filterDataMax)}}>
                      <Text style={{color: '#807979',fontWeight:'500', width:"100%", textAlign:"center",fontSize:20}}>Voltar</Text>
                    </TouchableOpacity>

                    {(nextFilterDataMin||nextFilterDataMax)&&(
                      <TouchableOpacity style={styles.btnLimpar} onPress={()=>{setNextFilterDataMin(""),setNextFilterDataMax(""),setAlertData1(false),setAlertData2(false)}}>
                        <Text style={{color:"#ffffff",fontWeight:'500', width:"100%", textAlign:"center",fontSize:20}}>Limpar</Text>
                      </TouchableOpacity>
                    )}
                    
                    {((alertData1||alertData2 || (nextFilterDataMin==""&&nextFilterDataMax==""))&&filterDataMin==""&&filterDataMax=="")?
                      <TouchableOpacity style={styles.btnAplicarDesable} disabled={true}>
                        <Text style={{color:"#ffffff",fontWeight:'500', width:"100%", textAlign:"center",fontSize:20}}>Aplicar</Text>
                      </TouchableOpacity>
                    :
                      <TouchableOpacity style={styles.btnAplicar} onPress={()=>{
                        setFilterDataMin(nextFilterDataMin)
                        setFilterDataMax(nextFilterDataMax)
                        setAlertData1(false)
                        setAlertData2(false)
                        handleFilterApply(nextFilterDataMin,nextFilterDataMax)
                        setShow(false)
                      }}>
                        <Text style={{color:"#ffffff",fontWeight:'500', width:"100%", textAlign:"center",fontSize:20}}>Aplicar</Text>
                      </TouchableOpacity>}

                  </View>



                  {showMin && (<DateTimePicker
                    value={nextFilterDataMin!=""?new Date(nextFilterDataMin.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")):new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowMin(false);
                      if (selectedDate) {
                        setUltimaData("dataMin")
                        const formattedDate = new Intl.DateTimeFormat('pt-BR').format(selectedDate);
                        setNextFilterDataMin(formattedDate);
                      }
                    }}
                  />)}
                  {showMax && (<DateTimePicker
                    value={nextFilterDataMax!=""?new Date(nextFilterDataMax.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")):new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowMax(false);
                      if (selectedDate) {
                        setUltimaData("dataMax")
                        const formattedDate = new Intl.DateTimeFormat('pt-BR').format(selectedDate);
                        setNextFilterDataMax(formattedDate);
                      }
                    }}
                  />)}
                </View>

              )}



              <TouchableOpacity style = {styles.filtertype} onPress={()=>{setShowTipo(!showTipo)}}>
                <Text style={styles.textButton}>{filterType?filterType=="imagem"?"Imagens":"Documentos":'Tipo'}</Text>
                <Image
                  source={iconamoon_arrow}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
              {showTipo&&(
                <View style={styles.boxTipo}>
                  <TouchableOpacity style = {styles.filterOrder} onPress={()=>{ handleFiltertype("documento"),setShowTipo(false)}}>
                    <Text style={styles.textButtonOrder}>Documentos</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style = {styles.filterOrder} onPress={()=>{ handleFiltertype("imagem"),setShowTipo(false)}}>
                    <Text style={styles.textButtonOrder}>Imagens</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>


          <View style = {styles.containerList}>
            {spiner?<ActivityIndicator size="large" />:            
            files.length==0?<NotFoundFile value="Nenhum dado disponível para os filtros selecionados!" />:
            <FlatList 
              contentContainerStyle ={styles.containerCards}
              data = {reports}
              keyExtractor={(item)=>item.id}
              renderItem={({item})=>(

                <CardM5 
                  imagePath={relatorio}
                  text1 = {`Enviado em ${parseDate(item.dataCadastro).day} de ${parseDate(item.dataCadastro).month} de ${parseDate(item.dataCadastro).year}`} 
                  text2 = {item.type=="imagem"?"imagens":"documentos"}
                  text3 = {`${item.cidade.charAt(0).toUpperCase() + item.cidade.slice(1).toLowerCase()}, ${item.uf.toUpperCase()}`}
                  text4 = {`criado em ${parseDate(item.dataCriacao).day} de ${parseDate(item.dataCriacao).month} de ${parseDate(item.dataCriacao).year}`}
                  text5 = {`${item.quantidade} ${item.quantidade > 1?"itens":"item"}`}
                  // selecting = {selecting}
                  // longPress={() => toggleselecting(true)}
                  // number={(it) => toggleNumber(it)}
                />

              )}
            />}
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
    paddingBottom:10,    
  },

  header:{
    width : '100%',
    // height : 68
  },

  body : {
    flexDirection : 'column',
    width : '100%',
    justifyContent : 'flex-start',
    top : 16,
    gap : 10,
    flex:1
  },

  // textSelection: {
  //   color: '#807979',
  //   fontSize: 14,
  //   // fontFamily: 'Poppins',
  //   fontWeight: '500',
  //   lineHeight: 30,
  //   textAlign: 'right',
  //   height: 30,
  //   width : '100%',
  //   right:28
  // },

  filtercontainer:{
    height: 30,
    width : '100%',
    paddingHorizontal : 10,
    position:'relative',
    // gap : 30,
    flexDirection : 'row',
    // backgroundColor:"#00ff00",
    justifyContent:'space-between'
  },
  vectorfilter:{
    height : '100%',
    width : "10%",
    alignItems : 'center',
    justifyContent : 'center',
    // backgroundColor:"#000000",
  },
  containerfilters:{
    width : '85%',
    height : 30,
    flexDirection : 'row',
    // backgroundColor:"#ad0a0a",
  },

  imagevectorfilter:{ 
    width : 45.5,
    height : 30,
    flexDirection:'column',
    justifyContent:'space-around',
    // alignContent:'center',
    alignItems:'center',
    // backgroundColor:"#b60000"
  },

  imagevectorfilter2:{
    width:"90%",
    height:5,
    backgroundColor:"#9c9c9c",
    borderRadius:2.5,
  },
  imagevectorfilter3:{
    width:"75%",
    height:5,
    backgroundColor:"#9c9c9c",
    borderRadius:2.5,
  },
  imagevectorfilter4:{
    width:"60%",
    height:5,
    backgroundColor:"#9c9c9c",
    borderRadius:2.5,
  },

  
  filterdata : {
    width : '40%',
    height : 30,
    backgroundColor : '#0000001A',
    flexDirection : 'row',
    gap : 10,
    paddingHorizontal : 9,
    alignItems : 'center',
    justifyContent : 'space-between',
    borderTopLeftRadius : 5,
    borderBottomLeftRadius : 5,
    borderColor : '#0000004D',
    borderLeftWidth : 0.5,
    borderTopWidth : 0.5,
    borderBottomWidth : 0.5,
  },
  filterOrder : {
    width : '100%',
    height : 30,
    backgroundColor : '#0000001A',
    flexDirection : 'row',
    // gap : 10,
    paddingHorizontal : 5,
    alignItems : 'center',
    justifyContent : 'flex-start',
    // borderRadius : 5,
    // borderColor : '#0000004D',
    // borderWidth : 0.5,
  },

  filterDataBottonsSends:{
    width:'100%',
    // height:80,
    flexDirection:"row",
    justifyContent:'space-between',
    alignContent:'center',
    paddingHorizontal:10,
    paddingBottom:10,
    // backgroundColor:"#ff0000",
    alignItems:"center",
    gap:10
  },

  btnVoltar:{
    backgroundColor:"#c5c7c5d3", 
    paddingVertical:5, 
    paddingHorizontal:10,
    borderRadius:5,
    width:"30%",
  },

  btnLimpar:{
    backgroundColor:"#9e630cd3", 
    paddingVertical:5, 
    paddingHorizontal:10,
    borderRadius:5,
    width:"30%",
  },
  btnAplicar:{
    backgroundColor:"#04bf10d4", 
    paddingVertical:5, 
    paddingHorizontal:10,
    borderRadius:5,
    width:"30%",
  },
  btnAplicarDesable:{
    backgroundColor:"#04bf103b", 
    paddingVertical:5, 
    paddingHorizontal:10,
    borderRadius:5,
    width:"30%",
  },

  boxData: {
    position: 'absolute', 
    top: 40,             
    left: "-15%",    
    width: "115%",
    flexDirection: 'column',
    justifyContent: 'center',
    // paddingHorizontal: 20,
    // paddingVertical: 20,
    backgroundColor: '#ffffff',
    zIndex: 99999999,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
    borderColor : '#0000004D',
    borderWidth : 0.5,
    // alignItems:'center'
  },
  boxOrder: {
    position: 'absolute', 
    top: 40,             
    left: 0,    
    width: 350,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 2,
    paddingVertical: 2,
    backgroundColor: '#ffffff',
    zIndex: 99999,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
    borderColor : '#0000004D',
    borderWidth : 0.5,
    // alignItems:'center'
    gap:2
  },
  boxTipo: {
    position: 'absolute', 
    top: 40,             
    left: "40%",    
    width: "60%",
    // height:100,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 2,
    paddingVertical: 2,
    backgroundColor: '#ffffff',
    zIndex: 99999,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
    borderColor : '#0000004D',
    borderWidth : 0.5,
    // alignItems:'center'
    gap:2
  },

  boxDataFilter: {
    // position: 'absolute', 
    // top: 25,             
    // left: "-10%",    
    width: "100%",
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    // backgroundColor: '#ffffff',
    // zIndex: 99999,
    // borderBottomEndRadius: 5,
    // borderBottomStartRadius: 5,
    // borderColor : '#0000004D',
    // borderWidth : 0.5,
    alignItems:'center'
  },


  barr:{
    width:"10%",
    height:2,
    backgroundColor:"#0000004D",
    borderRadius:1
  },

  inputLikeButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    width:"42%",
    height:"100%"
  },
  inputLikeButtonAlert: {
    borderWidth: 1,
    borderColor: '#ff0000',
    borderRadius: 5,
    padding: 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    width:"42%",
    height:"100%"
  },



  textSelected: {
    fontSize: 20,
    color: '#625c5c',
    textAlign:"center",
    fontWeight:'600',
  },
  placeholder: {
    fontSize: 20,
    color: '#978c6d8d',
    textAlign:"center",
    fontWeight:'600',
  },

  msgAlert:{
    paddingHorizontal:20,
    // paddingBottom:20,
    top:-10,
  },
  
  filtertype : {
    width : '60%',
    height : 30,
    backgroundColor : '#0000001A',
    flexDirection : 'row',
    gap : 10,
    paddingHorizontal : 9,
    alignItems : 'center',
    justifyContent : 'space-between',
    borderTopRightRadius : 5,
    borderBottomRightRadius : 5,
    borderColor : '#0000004D',
    borderRightWidth : 0.5,
    borderTopWidth : 0.5,
    borderBottomWidth : 0.5,
    borderLeftWidth : 0.5,
  },

  placeholderStyle: {
    fontSize: 22,
    color: '#807979',
    fontWeight:'500',
    lineHeight: 30,
    textAlign: 'left',
    height: 30,
  },
  selectedTextStyle: {
    fontSize: 22,
    color: '#807979',
    fontWeight:'500',
    lineHeight: 30,
    textAlign: 'left',
    height: 30,

  },
  iconStyle: {
    width: 30,
    height: 30,
  },

  dropdownItem: {
    padding: 10,
    backgroundColor: '#9690901a', // Cor de fundo personalizada
    height:50,
    alignItems:"center",
    alignContent:'flex-start',
    justifyContent:'flex-start'
  },
  dropdownItemSelected: {
    padding: 10,
    backgroundColor: '#0000001a', // Cor de fundo personalizada
    height:50,
    alignItems:"center",
    alignContent:'flex-start',
    justifyContent:'flex-start',
    borderColor:'#ffffff1a',
    borderWidth:2
  },
  
  dropdownItemText: {
    width:'100%',
    fontSize: 24,
    color: '#807979',
    fontWeight:'500',
    lineHeight: 30,
    textAlign: 'left',
    height: 30,
  },


  textButton:{
    color: '#807979',
    fontSize: 22,
    // fontFamily: 'Poppins',
    fontWeight: '500',
    lineHeight: 30,
    textAlign: 'right',
    height: 30,
  },

  textButtonOrder:{
    color: '#807979',
    fontSize: 20,
    // fontFamily: 'Poppins',
    fontWeight: '500',
    lineHeight: 30,
    textAlign: 'right',
    height: 30,
  },

  imagevectorfilter1:{
    width : 20,
    height : 20
  },

  containerList:{
    width : '100%',
    flexDirection : 'column',
    justifyContent : 'flex-start',
    paddingBottom:20,
    flex:1,
    zIndex:1
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
  }
});
