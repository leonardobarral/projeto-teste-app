import { StyleSheet, View, TouchableOpacity, Text ,ScrollView, Alert} from 'react-native';


import { ButtonComponent } from '../components/ButtonComponent';
import { TitleComponent } from '../components/TitleComponent';
import { HeaderM1 } from '../components/HeaderM1';
import { InputText } from '../components/InputText';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import {useNavigation} from '@react-navigation/native'
import {AuthStack} from '../routes/AuthStack'
import { useState } from 'react';
import {validarCPF,validarEmail} from '../context/Validador'
import {useUser} from '../context/Auth'




export default function Cadastro() {
    const{signUp} = useUser();
    const navigation = useNavigation<AuthStack>();

    const [nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [focusNome,setFocusNome]=useState(false)
    const [focusCpf,setFocusCpf]=useState(false)
    const [focusEmail,setFocusEmail]=useState(false)
    const [focusTelefone,setFocusTelefone]=useState(false)
    const [focusPassword,setFocusPassword]=useState(false)
    const [focusConfirmPassword,setFocusCPassword]=useState(false)

    const handlefocus=()=>{
        setFocusNome(false)
        setFocusCpf(false)
        setFocusEmail(false)
        setFocusTelefone(false)
        setFocusPassword(false)
        setFocusCPassword(false)
    }

    const sanitizeInput = (input: string) => {
        const trimmedInput = input.trim();
        if (trimmedInput.includes("@")) {
          return trimmedInput;
        }
        return trimmedInput.replace(/[^\d]/g,"");
    };

      //verifica se é um e-mail ou um cpf
    const sanitizeInputCpf = (input: string) => {
        const trimmedInput = input.trim().replace(/\D/g, "");
        return trimmedInput;

    };
    //busca por e-mail a partir de um cpf
    const cpfUtilizado = async (cpf: string) => {
        const ncpf = sanitizeInputCpf(cpf)
        const usersRef = firestore().collection("usuario");
        const querySnapshot = await usersRef.where("cpf", "==", ncpf).get();
        if (querySnapshot.empty) {
        return false;
        }
        return true;
    };

    const validarCampos = async () => {
        if (!nome.trim()) {
          Alert.alert("Erro", "O campo Nome é obrigatório.");
          setFocusNome(true)
          return false;
        }
        if (!cpf.trim() || !validarCPF(cpf)) {
          Alert.alert("Erro", "CPF inválido ou não informado.");
          setFocusCpf(true)
          return false;
        }
        // if (await cpfUtilizado(cpf)) {
        //   Alert.alert("Erro", "CPF já utilizado em uma conta existente");
        //   setFocusCpf(true)
        //   return false;
        // }
        if (!email.trim() || !validarEmail(email)) {
          Alert.alert("Erro", "E-mail inválido ou não informado.");
          setFocusEmail(true)
          return false;
        }
        if (!telefone.trim()) {
          Alert.alert("Erro", "O campo Telefone é obrigatório.");
          setFocusTelefone(true)
          return false;
        }
        if (!password.trim() || password.length < 6) {
          Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
          setFocusPassword(true)
          return false;
        }
        if (password !== confirmPassword) {
          Alert.alert("Erro", "As senhas não conferem.");
          setFocusCPassword(true)
          return false;
        }
        return true; 
      };



    const handleCadastro = async () =>{
        try{
            if(await validarCampos()){

                const userCredential = await signUp(email,password);  
                if(userCredential){
                    
                    const currentDate = new Date();
                    
                    
                    const formattedDate = new Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'}).format(currentDate);
                    
                    const userObjeto ={
                        uid: userCredential.uid,
                        nome:nome.trim(),
                        cpf:sanitizeInput(cpf),
                        email:sanitizeInput(email),
                        telefone:sanitizeInput(telefone.trim()),
                        dataCadastro: formattedDate.trim(),
                        imagem:''
                    }
    
                    const userCollectionRef = firestore().collection("usuario");
                    await userCollectionRef.doc(userCredential.uid).set(userObjeto);
                    await auth().currentUser?.sendEmailVerification()

                    Alert.alert(
                        "Conta Cadastrado com sucesso!",
                        "Foi enviado uma mensagem de confirmação de cadastro para o e-mail cadastrado!"
                    );
                
                }else{
                    Alert.alert("Erro de cadastro, tente novemente.");
                    
                }
            }
        }catch(error){
            Alert.alert("Erro de cadastro, tente novemente.");
            if (__DEV__) {
                console.error("Erro durante o cadastro:", error);
            }
        }

    }

    return (
        <View style = {styles.container}>

            <View style = {styles.header}>
                <HeaderM1/>
            </View>

            <View style = {styles.containerTextWelcome}>
                <TitleComponent text={"Crie sua conta"}/>
            </View> 
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={true} style = {styles.body}>

                <View style = {styles.containerInputs}>
                    <InputText placeHolder={"Nome"} focus = {focusNome} steFocus={()=>{handlefocus()}} keyboardType={"default"}  onChangeText={(it:string)=>setNome(it)}/>
                </View>
                <View style = {styles.containerInputs}>
                    <InputText placeHolder={"CPF"} focus = {focusCpf} steFocus={()=>{handlefocus()}} keyboardType={"number-pad"} onChangeText={(it:string)=>setCPF(it)}/>
                </View>
                <View style = {styles.containerInputs}>
                    <InputText placeHolder={"E-mail"} focus = {focusEmail} steFocus={()=>{handlefocus()}} keyboardType={"email-address"} onChangeText={(it:string)=>setEmail(it)}/>
                </View>
                <View style = {styles.containerInputs}>
                    <InputText placeHolder={"Telefone"} focus = {focusTelefone} steFocus={()=>{handlefocus()}} keyboardType={"phone-pad"} onChangeText={(it:string)=>setTelefone(it)}/>
                </View>
                <View style = {styles.containerInputs}>
                    <InputText placeHolder={"Senha"} focus = {focusPassword} steFocus={()=>{handlefocus()}} keyboardType={"default"} onChangeText={(it:string)=>setPassword(it)}/>
                </View>
                <View style = {styles.containerInputs}>
                    <InputText placeHolder={"Confirmar Senha"} focus = {focusConfirmPassword} steFocus={()=>{handlefocus()}} keyboardType={"default"} onChangeText={(it:string)=>setConfirmPassword(it)}/>
                </View>                            
            </ScrollView>

            <View style = {styles.bodyButton}>

                <ButtonComponent name={"Cadastrar"} press={ () => {
                    handleCadastro()                    
                    }}/>

                <View style = {styles.containerLinkLogin}>

                    <Text style={styles.textLogin}>Já possui uma conta?</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.linkLogin}>Entrar</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flexDirection: 'column',
        alignItems: 'center',
        width : '100%',
        height : '100%',
        justifyContent : 'flex-start',
        backgroundColor : '#FFFFFF'
    },
    header:{
        width : '100%',
        height : 80,
        top : -80
    },
    body : {
        top:150,
        flex : 1,
        flexDirection : 'column',
        width : '100%',
        // justifyContent : 'flex-start',
        position: 'absolute',
        bottom : 145
        // bottom : 200
    },
    containerTextWelcome:{
        width : '100%',
        paddingTop : 20,
        paddingHorizontal : 16,
        paddingBottom : 12,
        height : 67,
        alignItems : 'center',
        justifyContent : 'center',
        position : 'relative',
        top : 0
    },
    containerInputs :{
        width : '100%',
        paddingHorizontal : 16,
        paddingVertical : 12,
        height : 80,
    },
    bodyButton : {
        width : '100%',
        marginTop : 0,
        height : 125,
        paddingTop : 33,
        paddingHorizontal : 16,
        paddingBottom : 12,
        flexDirection : 'column',
        justifyContent : 'flex-start',
        alignItems : 'center',
        gap : 5,
        position: 'absolute',
        bottom : 20
    
    },
    containerLinkLogin:{
        flexDirection : 'column',
        width : '100%',
        alignItems : 'center',
        justifyContent : 'center',
        paddingHorizontal : 20,
        height : 48
    },
        textLogin:{
        color: '#211A0A',
        fontSize: 16,
        // fontFamily: 'Inter',
        fontWeight: '700',
        lineHeight: 24,
        textAlign: 'center',
        height: 24,
        alignContent:'center'
    },
    linkLogin:{
        color: '#0038E1',
        fontSize: 16,
        // fontFamily: 'Inter',
        fontWeight: '700',
        lineHeight: 24,
        textAlign: 'center',
        height: 24,
        alignContent:'center'
    },
});