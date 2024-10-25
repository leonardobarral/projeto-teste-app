import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import StackComponent from './src/routes';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function App() {
  // const insets = useSafeAreaInsets();
  return (
    // <SafeAreaView style = {{flex:1,paddingTop: insets.top }}>
      <StackComponent/>
    // </SafeAreaView>
  )
}

