import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator,NativeStackNavigationProp } from '@react-navigation/native-stack';
import {  SafeAreaView} from 'react-native';

import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import Home from '../screens/Home';
import MeusArquivosImagens from '../screens/MeusArquivosImagens';
import MeusArquivos from '../screens/MeusArquivos';


const Stack = createNativeStackNavigator();

type StackNavigation = {
 Login : undefined,
 Cadastro : undefined,
 Home : undefined,
 MeusArquivos : undefined,
 MeusArquivosImagens : undefined
} 

export type StackTypes = NativeStackNavigationProp<StackNavigation>

export default function StackComponent() {
 return (
  <NavigationContainer>
   <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
    <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }}/>
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
    <Stack.Screen name="MeusArquivosImagens" component={MeusArquivosImagens} options={{ headerShown: false }}/>
    <Stack.Screen name="MeusArquivos" component={MeusArquivos} options={{ headerShown: false }}/>
   </Stack.Navigator>
  </NavigationContainer>
 );
}
