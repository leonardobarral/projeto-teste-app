import React,{useContext, createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Alert } from "react-native";
import errorMessages from './msgAlertFireBase.json';
import firestore from "@react-native-firebase/firestore";

interface AuthProviderProps {
  children: ReactNode;
}

type UsuarioType = {
  id: string,
  nome:string,
  cpf:string,
  email:string,
  telefone:string,
  dataCadastro: string,
  imagem:string,
}

interface AuthContexDate{
 user:FirebaseAuthTypes.User | null;
 usuario:UsuarioType;
 visibleBar:boolean,
 setVisibleBar:React.Dispatch<React.SetStateAction<boolean>>,
 initializing : boolean;
 setInitializing: React.Dispatch<React.SetStateAction<boolean>>
 setUser: React.Dispatch<React.SetStateAction<FirebaseAuthTypes.User | null>>;
 signUp:(email:string,password : string) => Promise<FirebaseAuthTypes.User | null | undefined>;
 signIn:(email:string,password : string) => Promise<void>;
 signOut:() => Promise<void>;
 modifyPassword:(email:string) => Promise<void>;
}

export const AuthContex = createContext<AuthContexDate>(
 {} as AuthContexDate,
);

export function useUser(){
  const context = useContext(AuthContex);
  return context;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children})=>{
  
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [usuario, setUsuario] = useState<UsuarioType>({} as UsuarioType);
  const [initializing , setInitializing] = useState(true);
  const [visibleBar , setVisibleBar] = useState(false);
  
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async(_user)=>{
      try{
        setUser(_user)
        if(_user && auth().currentUser){
          try{

            const querySnapshot = await firestore().collection("usuario").where("email", "==", _user.email).get();
            
            if (!querySnapshot.empty) {
              const usuarioData = querySnapshot.docs[0].data() as UsuarioType;
              setUsuario(usuarioData)
            }else{
              console.warn("Nenhum documento encontrado para o usuário");
              setUsuario({} as UsuarioType)
            }
          
            const userData = {
              uid : _user.uid,
              email : _user.email
            }

            AsyncStorage.setItem("@user",JSON.stringify(userData))
            setInitializing(false);
          
          }catch(error:any){
            if (__DEV__) {
            console.error("Erro ao buscar dados do Firestore:", error);
            }
          }
        }else{
          AsyncStorage.removeItem("@user")
        }
        if(initializing) setInitializing(false)
      }catch (error) {
        if (__DEV__) {
        console.error("Erro ao salvar ou remover dados do AsyncStorage:", error);
        }
      }
      
    });    
    return unsubscribe;
  },[])

  useEffect(()=>{loadFromStorage()},[])

  async function loadFromStorage(){
    const userLoged = await AsyncStorage.getItem('@user')
    if(userLoged){
      setUser(JSON.parse(userLoged) as FirebaseAuthTypes.User)
    }
  }

  async function signUp(email:string , password:string):Promise<FirebaseAuthTypes.User | null | undefined> {
    try{
      setInitializing(true)
      if(email && password){
        
        const user = await auth()
        .createUserWithEmailAndPassword(email , password)
        .then((data) => {return data.user})
        .catch((error)=>{
          setInitializing(false)
          handleError(error)
          return null;
        })
        return user;

      }else{
        handleError('email ou senha inválidos')
        if(initializing) setInitializing(false)
        return null;
      }

    }catch(error:any){
      handleError(error)
      return null;
    }finally {
      if (initializing) setInitializing(false);
    }
  }

  async function signIn(email:string , password:string):Promise<void>{
    try{
      setInitializing(true)
      if(email!=="" && password!==""){
        await auth()
        .signInWithEmailAndPassword(email , password)
        .catch(error => {
          handleError(error)
          setInitializing(false);
        })
      }else{
        setInitializing(false);
        handleError('Credenciais não inseridas.')
      }
    }catch(error:any){
      handleError(error)
      setInitializing(false);
    }finally {
      setInitializing(false);
    }
  }

  async function signOut():Promise<void>{
    try{
      await auth().signOut()
    }catch (error) {
      Alert.alert("Erro ao fazer logout, tente novamente!");
    }
  }

  async function modifyPassword(email:string):Promise<void>{
    try{
      await auth()
      .sendPasswordResetEmail(email)
      .catch(error => handleError(error))
    }catch (error) {
      Alert.alert("Erro ao modificar a senha, tente novamente!");
    }
  }

  const contextValue = {
    user,
    initializing,
    visibleBar,
    setVisibleBar,
    setUser,
    setInitializing,
    usuario,
    signUp,
    signIn,
    signOut,
    modifyPassword
  }

 return(
  <AuthContex.Provider value={contextValue}>
   {children}
  </AuthContex.Provider>
 )
}


export const handleError = (error: any) => {
  const message = errorMessages[error.code as keyof typeof errorMessages];
  if (message) {
    Alert.alert(message);
  } else {
    Alert.alert(error);
  }
};


