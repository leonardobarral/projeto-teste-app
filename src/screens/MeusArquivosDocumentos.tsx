import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { HeaderM2 } from "../components/HeaderM2";
import { LinearGradient } from "expo-linear-gradient";
import { CardM4 } from "../components/CardM4";
import { SetStateAction, useEffect, useState } from "react";
import { ButtonComponentCircleM2 } from "../components/ButtonComponentCircleM2";
import Doc from "../assets/images/Doc.png";
import Pdf from "../assets/images/Pdf.png";
import xls from "../assets/images/xls.png";
import txt from "../assets/images/txt.png";
import ppt from "../assets/images/ppt.png";
import heroicons_solid_download from "../assets/images/heroicons_solid_download.png";
import mdi_share from "../assets/images/mdi_share.png";
import { useUser } from "../context/Auth";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppStack } from "../routes/AppStack";
import { Bar } from "../components/Bar";
import firestore from "@react-native-firebase/firestore";
import {
  downloadFile,
  downloadFileTemporarioFile,
  shareFile,
} from "../../services/managerfiles";
import { Colors } from "react-native/Libraries/NewAppScreen";
import doctypes from "../components/docTypes.json";

type fileDoc = {
  id: string;
  cidade: string;
  data: string;
  uid: string;
  type: string;
  url: string;
  extencao: string;
  nome: string;
};

export default function MeusArquivosDocumentos() {
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
    if (value) {
      setTextSelection("Selecionando");
    } else {
      setTextSelection("Selecionar");
    }
  };

  const [number, setNumber] = useState(0);
  const toggleNumber = (value: number) => {
    setNumber(value + number);
    toggleVisible(value + number);
  };

  const [listAction, setListAction] = useState<[string, string][]>([]);

  const toogleListAction = (url: string, action: string, name: string) => {
    if (action === "add")
      setListAction((listAction) => [...listAction, [url, name]]);
    if (action === "remove")
      setListAction((listAction) =>
        listAction.filter(
          ([itemUrl, itemName]) => !(itemUrl === url && itemName === name)
        )
      );
  };

  useEffect(() => {
    if (listAction.length > 0) setVisible(true);
    else {
      setVisible(false);
      toggleselecting(false);
    }
    // for(let i in listAction) console.log(i," - ",listAction[i])
    if (listAction.length === 1) setVisibleButtonShare(true);
    else setVisibleButtonShare(false);
  }, [listAction]);

  const [visible, setVisible] = useState(false);
  const toggleVisible = (value: number) => {
    // console.log(true)
    if (value > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const [files, setFiles] = useState<fileDoc[]>([]);

  //lista de imagens
  const fetchImages = async () => {
    try {
      const filesCollection = firestore().collection("files");
      const snapshot = await filesCollection
        .where("uid", "==", user?.uid)
        .where("type", "==", "documento")
        .orderBy('data','desc')
        .get();

      if (!snapshot.empty) {
        const fileData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<fileDoc, "id">),
        }));
        // for (let i in fileData) console.log(i, "-", fileData[i].nome);
        setFiles(fileData);
      }
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const insets = useSafeAreaInsets();
  const headerHeight = 68 + insets.top;

  const hadleDowload = async () => {
    setloadVisible(true);
    if (listAction.length > 0) await downloadFile(listAction);
    setloadVisible(false);
  };
  const handleShareFile = async () => {
    if (listAction.length === 1) {
      const uri = await downloadFileTemporarioFile(listAction[0]);
      if (uri) await shareFile(uri);
    }
  };

  const getFileExtension = (url: string): string => {
    const match = url.match(/\.([a-zA-Z0-9]+)(\?|$)/);
    return match ? match[1] : "";
  };

  const image = (url: string) => {
    if (getFilePath(getFileExtension(url)) == "pdf") return Pdf;
    if (getFilePath(getFileExtension(url)) == "ppt") return ppt;
    if (getFilePath(getFileExtension(url)) == "txt") return txt;
    if (getFilePath(getFileExtension(url)) == "xls") return xls;
    if (getFilePath(getFileExtension(url)) == "doc") return Doc;
  };

  const getFilePath = (extension: string): string => {
    if (extension in doctypes) {
      return doctypes[extension as keyof typeof doctypes];
    }
    return "";
  };

  return (
    <LinearGradient colors={["#F7FAFC", "#8BC4FD"]} style={styles.container}>
      <View style={styles.container}>
        <View style={[styles.header, { height: headerHeight }]}>
          <HeaderM2
            title={"Documentos"}
            navigation={navigation}
            press={toggleVisibleBar}
          />
          {visibleBar && <Bar />}
        </View>

        <View style={styles.body}>
          <TouchableOpacity
            onPress={() => {
              if (!selecting) {
                toggleselecting(true);
              }
            }}
          >
            <Text style={styles.textSelection}>{textSelection}</Text>
          </TouchableOpacity>

          <View style={styles.containerList}>
            <FlatList
              contentContainerStyle={styles.containerCards}
              data={files}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CardM4
                  imagePath={item.url}
                  name={item.nome}
                  extecao={image(item.url)}
                  text1={item.nome}
                  text2={item.cidade}
                  text3={item.data}
                  // text4 = {"1 item"}
                  selecting={selecting}
                  longPress={() => toggleselecting(true)}
                  number={(it) => toggleNumber(it)}
                  action={(it) => toogleListAction(it[0], it[1], it[2])}
                />
              )}
            />
            {/* <View style = {styles.containerCards}>
              <CardM4 
                imagePath={Pdf}
                text1 = {"Enviado em 3 de novembro de 2029"}
                text2 = {"São Francisco, CA"}
                text3 = {"3 de novembro de 2029"}
                // text4 = {"1 item"}
                selecting = {selecting}
                longPress={() => toggleselecting(true)}
                number={(it) => toggleNumber(it)}
              />
              <CardM4 
                imagePath={Xls}
                text1 = {"Enviado em 3 de janeiro de 2029"}
                text2 = {"Salvador, BA"}
                text3 = {"3 de janeiro de 2029"}
                // text4 = {"1 item"}
                selecting = {selecting}
                longPress={() => toggleselecting(true)}
                number={(it) => toggleNumber(it)}
              />
            </View>  */}
          </View>
        </View>

        {visible && (
          <View style={styles.containerButtonsActions}>
            {visibleButtonShare && (
              <ButtonComponentCircleM2
                imagePath={mdi_share}
                onPress={() => handleShareFile()}
              />
            )}
            <ButtonComponentCircleM2
              imagePath={heroicons_solid_download}
              onPress={() => hadleDowload()}
            />
          </View>
        )}
      </View>
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
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={"large"} color={Colors.primary} />
          </View>
        </TouchableOpacity>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    paddingBottom: 10,
  },

  header: {
    width: "100%",
  },

  body: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "flex-start",
    top: 26,
    gap: 10,
    flex: 1,
  },

  textSelection: {
    color: "#807979",
    fontSize: 14,
    // fontFamily: 'Poppins',
    fontWeight: "500",
    lineHeight: 21,
    textAlign: "right",
    height: 21,
    width: "100%",
    right: 24,
  },
  containerList: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingBottom: 20,
    flex: 1,
  },
  containerCards: {
    width: "100%",
    flexDirection: "column",
    paddingHorizontal: 24,
  },
  containerButtonsActions: {
    position: "absolute",
    width: 75,
    height: 173,
    bottom: 50,
    gap: 23,
    right: 24,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  modal: {
    width: "100%",
    height: "100%",
  },
  modal2: {
    flex: 1,
    backgroundColor: "#ffffffc7",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 23,
  },
});
