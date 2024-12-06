import React from "react";
import { Alert, Linking, Platform} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';



export const camera3x4 = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();

  if (status !== "granted") {
    // console.error("Permissão de câmera negada!");
    return;
  }

  const result: any = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [3, 4],
    quality: 1,
  });

  if (!result.cancelled && result.assets[0].uri) {
    const resizedImage = await ImageManipulator.manipulateAsync(
      result.assets[0].uri,
      [],
      {
        compress: 0.2,
        format: ImageManipulator.SaveFormat.JPEG,
        maxWidth: 400,
        maxHeight: 400,
      } as any
    );

    return resizedImage.uri;
  }
  return;
}
export const camera = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();

  if (status !== "granted") {
    // console.error("Permissão de câmera negada!");
    return;
  }

  const result: any = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    // aspect: [3, 4],
    quality: 0.5,
  });

  if (!result.cancelled && result.assets[0].uri) return result.assets[0].uri;
  return;
}
export const fileImage3x4 = async () => {
  const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  const { status: cameraStatus } =
    await ImagePicker.requestCameraPermissionsAsync();
  if (mediaLibraryStatus !== "granted" || cameraStatus !== "granted") {
    Alert.alert(
      "Alerta!",
      "Necessário permissão de camera e galeria, para fotos!"
    );
    return;
  }
  const result: any = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.5,
  });
  if (result.assets[0].uri) {
    // Redimensionar a imagem proporcionalmente para ter no máximo 400 pixels de largura ou altura
    const resizedImage = await ImageManipulator.manipulateAsync(
      result.assets[0].uri,
      [],
      {
        compress: 0.2,
        format: ImageManipulator.SaveFormat.JPEG,
        maxWidth: 400,
        maxHeight: 400,
      } as any
    );

    return resizedImage.uri;
  }
  return;
}
export const fileImage = async () => {
  const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  const { status: cameraStatus } =
    await ImagePicker.requestCameraPermissionsAsync();
  if (mediaLibraryStatus !== "granted" || cameraStatus !== "granted") {
    Alert.alert(
      "Alerta!",
      "Necessário permissão de camera e galeria, para fotos!"
    );
    return;
  }

  const result: any = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    // allowsEditing: true,
    // aspect: [1, 1],
    quality: 0.5,
  });

  if (result.assets[0].uri) return result.assets[0].uri;

  return;
}


export const file = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        'application/pdf', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      ], 
      copyToCacheDirectory: true, 
      multiple: false, 
    });

    if (!result.canceled) {
      const image = result.assets[0];
      // const fileUri = uri.startsWith('content://')? await FileSystem.getContentUriAsync(uri): uri;



      return image
      // return result.assets[0].uri
    } else if (result.canceled) {
      // O usuário cancelou a seleção do arquivo
      Alert.alert('Seleção cancelada', 'Nenhum arquivo foi selecionado.');
      return;
    }
  } catch (error) {
    // console.error('Erro ao selecionar o arquivo:', error);
    Alert.alert('Erro', 'Ocorreu um erro ao tentar selecionar o arquivo.');
    return;
  }
}

export const downloadImage = async (urls:any) => {
  
   
  // setInitializing(true)
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Conceda acesso à biblioteca para salvar arquivos.');
      return;
    }

    const assets = [];

    const downloadPromises = urls.map(async (url:string) => {
      const decodedPath = decodeURIComponent(new URL(url).pathname);
      const fileName = decodedPath.split('/').pop();

      if(fileName) {
        const fileUri = FileSystem.documentDirectory + fileName;
        const response = await FileSystem.downloadAsync(url, fileUri);
        console.log(response.uri)
        
        try{
          const asset = await MediaLibrary.createAssetAsync(response.uri);
          assets.push(asset)
        }catch{
          console.log("Arquivos não midia, salvos!")
        }
        
      }
    });

    if(assets.length > 0 ){
      await MediaLibrary.createAlbumAsync('Download', assets[0], false);
      for (let i = 1; i < assets.length; i++) {
        await MediaLibrary.addAssetsToAlbumAsync([assets[i]], 'Download', false);
      }
    }

    await Promise.all(downloadPromises);

    // setInitializing(false)
    Alert.alert('Sucesso', 'Dowload realizado!');
  } catch (error) {
    // setInitializing(false)
    console.error('Erro ao fazer dowload:', error);
    Alert.alert('Erro', 'Não foi possível salvar o arquivo.');
  }
};






export const downloadFile = async (actions:[string,string][]) => {
  try {
    // Solicitar permissão para acesso à mídia
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Conceda acesso à biblioteca para salvar arquivos.');
      return;
    }

    // Criar uma pasta no diretório de downloads
    const downloadsFolder = `${FileSystem.documentDirectory}MeusDownloads/`;
    const folderInfo = await FileSystem.getInfoAsync(downloadsFolder);

    if (!folderInfo.exists) {
      await FileSystem.makeDirectoryAsync(downloadsFolder, { intermediates: true });
    }

    // Baixar arquivos para a pasta criada
    const downloadPromises = actions.map( async (item: [string,string]) => {
      const decodedPath = decodeURIComponent(new URL(item[0]).pathname);
      const fileName = item[1];
      // Alert.alert('Sucesso', `Download realizado em: ${downloadsFolder}`);
      if (fileName) {
        // const fileUri = `${downloadsFolder}${fileName}`;
        // const fileUri = `${downloadsFolder}${item[1]}`;
        const fileUri = FileSystem.documentDirectory + fileName;
        const response = await FileSystem.downloadAsync(item[0], fileUri);
        console.log('Caminho: ',response.uri)
      }
    });
    
    console.log('Caminho original: ',downloadsFolder)
    
    await Promise.all(downloadPromises);

    
    // Alert.alert('Sucesso', 'Dowload realizado!');
    Alert.alert(
      'Sucesso',
      'Download realizado! Deseja abrir a pasta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Abrir Pasta',
          onPress: () => openFolder(downloadsFolder),
        },
      ],
      { cancelable: true }
    );
  } catch (error) {
    console.error('Erro ao fazer dowload:', error);
    Alert.alert('Erro', 'Não foi possível salvar o arquivo.');
  }
};

const openFolder = async (path: string) => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Conceda acesso à biblioteca para salvar arquivos.');
      return;
    }
  try {
    if (Platform.OS === 'android') {
      // Usar Linking para abrir o gerenciador de arquivos
      // const folderUri = FileSystem.documentDirectory + 'MeusDownloads/'; // Substituir por path público, se necessário
      await Linking.openURL(path);
    } else {
      Alert.alert('Erro', 'Abrir pasta não é suportado nesta plataforma.');
    }
  } catch (error) {
    console.error('Erro ao abrir pasta:', error);
    Alert.alert('Erro', 'Não foi possível abrir a pasta.');
  }
};

export const downloadFileTemporarioFile = async (item: any) => {
  try {

    const url = typeof(item) === 'string' ? item : item[0];

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Conceda acesso à biblioteca para salvar arquivos.');
      return;
    }
    const decodedPath = decodeURIComponent(new URL(url).pathname);
    const fileName = typeof(item) === 'string' ? decodedPath.split('/').pop() : item[1];
    if(fileName) {
      const fileUri = FileSystem.documentDirectory + fileName;
      const response = await FileSystem.downloadAsync(url, fileUri);   
      return response.uri;
    }
  } catch (error) {
    console.error('Erro ao baixar o arquivo:', error);
    return null;
  }
};

export const shareFile = async (uri: string) => {
  if(uri){
    try {
      // Verifica se o dispositivo suporta compartilhamento
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Compartilhamento não disponível', 'Seu dispositivo não suporta compartilhamento.');
        console.log('Compartilhamento não disponível', 'Seu dispositivo não suporta compartilhamento.');
        return;
      }
  
      // Compartilha o arquivo
      await Sharing.shareAsync(uri);
      console.log(`Arquivo compartilhado: ${uri}`);
    } catch (error) {
      console.error('Erro ao compartilhar arquivo:', error);
      Alert.alert('Erro', 'Não foi possível compartilhar o arquivo.');
    }
  }
};

// const downloadFileTemporarioImage = async (url: string): Promise<string | null> => {
//   try {
//     const fileName = decodeURIComponent(new URL(url).pathname.split('/').pop() || '');
//     const fileUri = FileSystem.documentDirectory + fileName;

//     const response = await FileSystem.downloadAsync(url, fileUri);
//     console.log(`Arquivo baixado para: ${response.uri}`);
//     return response.uri;
//   } catch (error) {
//     console.error('Erro ao baixar o arquivo:', error);
//     return null;
//   }
// };

// export const shareImage = async (url: string) => {
//   console.log(url)
//   const uri = await downloadFileTemporarioImage(url)
//   console.log(uri)
  // if(uri){
  //   try {
  //     // Verifica se o dispositivo suporta compartilhamento
  //     if (!(await Sharing.isAvailableAsync())) {
  //       Alert.alert('Compartilhamento não disponível', 'Seu dispositivo não suporta compartilhamento.');
  //       return;
  //     }
  
  //     // Compartilha o arquivo
  //     await Sharing.shareAsync(uri);
  //     console.log(`Arquivo compartilhado: ${uri}`);
  //   } catch (error) {
  //     console.error('Erro ao compartilhar arquivo:', error);
  //     Alert.alert('Erro', 'Não foi possível compartilhar o arquivo.');
  //   }
  // }
// };