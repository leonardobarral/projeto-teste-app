import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import { TitleComponent } from '../components/TitleComponent';
import { HeaderM1 } from '../components/HeaderM1';
import { InputText } from '../components/InputText';
import { InputPassword } from '../components/InputPassword';
import {useNavigation} from '@react-navigation/native'
import { ButtonComponent } from '../components/ButtonComponent';
import { StackTypes } from '../routes';
// import { useFonts,Inter_700Bold, Inter_400Regular } from '@expo-google-fonts/inter';




export default function Login() {
  
  // const [fontsLoaded] = useFonts({
  //   Inter_400Regular,
  //   Inter_700Bold,
  // });
  // if(!fontsLoaded){
  //   return null;
  // }


  const navigation = useNavigation<StackTypes>();

  return (
    <View style = {styles.container}>

      <View style = {styles.header}>
        <HeaderM1/>
      </View>

      <View style = {styles.body}>

        <View style = {styles.containerTextWelcome}>
          <TitleComponent text={"Bem vindo de volta"}/>
        </View>

        <View style = {styles.containerInputs}>
          <InputText placeHolder={"E-mail"} keyboardType="email-address"/>
        </View>

        <View style = {styles.containerInputs}>
          <InputPassword placeHolder={"Senha"} keyboardType={"default"}/>
        </View>

        <View style = {styles.containerLinkPassword}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.linkPassword}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
        

        <View style = {styles.bodyButton}>

          <ButtonComponent name={"Entrar" } page = {"Home"}/>

          <View style = {styles.containerLinkCadastro}>

            <Text style={styles.textCadastro}>Novo aqui?</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.linkCadastro}>Cadastre-se</Text>
            </TouchableOpacity>

          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex :1,
    flexDirection: 'column',
    alignItems: 'center',
    width : '100%',
    height : '100%',
    justifyContent : 'flex-start'
  },

  header:{
    width : '100%',
    height : 260
  },

  body : {
    top:246,
    flex : 1,
    flexDirection : 'column',
    width : '100%',
    justifyContent : 'flex-start',
    position: 'absolute',
  },

  containerTextWelcome:{
    width : '100%',
    paddingTop : 20,
    paddingHorizontal : 16,
    paddingBottom : 12,
    height : 67,
    alignItems : 'center',
    justifyContent : 'center'
    
  },

  containerInputs :{
    width : '100%',
    paddingTop : 20,
    paddingHorizontal : 16,
    paddingVertical : 12,
    height : 80,
  },


  containerLinkPassword:{
    flexDirection : 'row',
    width : '100%',
    alignItems : 'flex-start',
    justifyContent : 'flex-end',
    height:31,
    paddingTop : 4,
    paddingHorizontal : 16,
    paddingBottom :12,
  },

  linkPassword:{
    color: '#A17D1C',
    fontSize: 14,
    // fontFamily: 'Inter_400Regular',
    fontWeight: '400',
    lineHeight: 21,
    textAlign: 'center',
    height: 21,
    alignContent:'center',
  },

  bodyButton : {
    width : '100%',
    marginTop : 167,
    paddingVertical : 12,
    paddingHorizontal : 16,
    flexDirection : 'column',
    justifyContent : 'flex-start',
    alignItems : 'center'

  },
  containerLinkCadastro:{
    flexDirection : 'row',
    width : '100%',
    alignItems : 'center',
    justifyContent : 'center',
    paddingHorizontal : 20,
    gap : 5,
    height : 48
  },

  textCadastro:{
    color: '#211A0A',
    fontSize: 16,
    // fontFamily: 'Inter_700Bold',
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'center',
    height: 24,
    alignContent:'center'
  },

  linkCadastro:{
    color: '#0038E1',
    fontSize: 16,
    // fontFamily: 'Inter_700Bold',
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'center',
    height: 24,
    alignContent:'center'
  },
});
