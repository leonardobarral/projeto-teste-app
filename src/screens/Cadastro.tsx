import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';


import { ButtonComponent } from '../components/ButtonComponent';
import { TitleComponent } from '../components/TitleComponent';
import { HeaderM1 } from '../components/HeaderM1';
import { InputPassword } from '../components/InputPassword';

import {useNavigation} from '@react-navigation/native'
import { StackTypes } from '../routes';
import { InputText } from '../components/InputText';

export default function Cadastro() {
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
                    <InputText placeHolder={"Nome"} keyboardType={"default"}/>
                </View>
                <View style = {styles.containerInputs}>
                    <InputText placeHolder={"CPF"} keyboardType={"number-pad"}/>
                </View>
                <View style = {styles.containerInputs}>
                    <InputText placeHolder={"E-mail"} keyboardType={"email-address"}/>
                </View>
                <View style = {styles.containerInputs}>
                    <InputText placeHolder={"Telefone"} keyboardType={"phone-pad"}/>
                </View>
                <View style = {styles.containerInputs}>
                    <InputText placeHolder={"Senha"} keyboardType={"default"}/>
                </View>
                <View style = {styles.containerInputs}>
                    <InputText placeHolder={"Confirmar Senha"} keyboardType={"default"}/>
                </View>

                <View style = {styles.bodyButton}>

                    <ButtonComponent name={"Cadastrar"} page={"Login"}/>

                    <View style = {styles.containerLinkLogin}>

                        <Text style={styles.textLogin}>Já possui uma conta?</Text>

                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.linkLogin}>Entrar</Text>
                        </TouchableOpacity>

                    </View>
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
        justifyContent : 'flex-start'
    },
    header:{
        width : '100%',
        height : 260
    },
    body : {
        top:123,
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
        paddingTop : 10,
        paddingHorizontal : 16,
        paddingVertical : 12,
        height : 80,
    },
    bodyButton : {
        width : '100%',
        marginTop : 0,
        height : 125,
        paddingVertical : 12,
        paddingHorizontal : 16,
        flexDirection : 'column',
        justifyContent : 'flex-start',
        alignItems : 'center',
        gap : 5,
    
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