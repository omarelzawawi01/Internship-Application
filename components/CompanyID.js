import { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  KeyboardAvoidingView,
  I18nManager,
} from "react-native";
import RNRestart from "react-native-restart";
import { Restart } from "fiction-expo-restart";
import { Ionicons } from "@expo/vector-icons";
import UsernameInput from "../components/UsernameInput";
import { UserContext } from "../store/user-context";
import LoadingOverlay from "../components/LoadingOverlay";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackGround from "../components/BackGround";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-http-backend";
import "../locales/ar.json";
import "../locales/en.json";
import "intl-pluralrules";
import "intl-locales-supported";
import { getBaseUrl } from "../util/http";
// import {Updates} from 'expo';
import * as Updates from "expo-updates";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isLoginSetter,baseUrlSetter } from "../store/redux/Slices";
// i18next
//   .use(XHR)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: 'en',
//     debug: true,
//     detection: {
//       order: ['localStorage', 'navigator'],
//     },
//     backend: {
//       loadPath: '/../locales/{{lng}}.json', // Adjust the path to your language files
//     },
//   });
i18next.use(initReactI18next).init({
  fallbackLng: "en",
  debug: true, // Set to false in production
  resources: {
    en: {
      translation: require("../locales/en.json"),
    },
    ar: {
      translation: require("../locales/ar.json"),
    },
  },
});

function CompanyID({ navigation }) {
  const [companyId, setCompanyId] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [nextLanguage, setNextLanguage] = useState("ع");
  const userIsLogin=useSelector(state=>state.user.isLogin);
  const dispatch = useDispatch();
  const userBaseUrl=useSelector(state=>state.user.baseUrl);
  const [isRTL, setIsRTL] = useState(false);
  // const userCtx = useContext(UserContext);
  const { t } = i18next;
  // AsyncStorage.getItem("language").then((value) => {
  //   if (value === "ar") {
  //     setNextLanguage("ع");
  //   } else {
  //     setNextLanguage("en");
  //   }
  // });
  const companyIdnputHandler = (enteredText) => {
    setCompanyId(enteredText);
  };
  useEffect(() => {
    // Check the current language and set RTL accordingly
    if (i18next.language === "ar") {
      setIsRTL(true);
    } else {
      setIsRTL(false);
    }
  }, [i18next.language]);
  const handleReload = async () => {
    // Trigger a reload of the app
    await Updates.reloadAsync();
  };
  const toggleLanguage = () => {
    setNextLanguage(nextLanguage === "ع" ? "en" : "ع");
    const newLanguage = i18next.language === "en" ? "ar" : "en";
    i18next.changeLanguage(newLanguage);
    AsyncStorage.setItem("language", newLanguage);
    console.log("Next language: " + nextLanguage);
    if (newLanguage === "ar") {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
    // Restart the app to apply RTL changes
    // require('react-native-restart').restart();
    // RNRestart.restart();
    // Updates.reloadAsync();
    // handleReload();
    // Restart();
  };
  async function formSubmitHandler() {
    let companyIdtrimmed = companyId.trim();
    console.log("companyIdtrimmed: " + companyIdtrimmed);
    // const userIsLogin=useSelector(state=>state.user.isLogin);
    // const dispatch = useDispatch();
    // const userBaseUrl=useSelector(state=>state.user.baseUrl);
    console.log("CompanyIdScreen.js:  userIsLogin: ");
    setIsAuthenticating(true);
    try {
      console.log("CompanyIdScreen.js:  before getBaseUrl");
      const data = await getBaseUrl(companyIdtrimmed);
      console.log("CompanyIdScreen.js:  data: ");
      console.log(data);
      //       AsyncStorage.setItem("companyData", JSON.stringify(data));
      // userCtx.baseUrlSetter(data.data.Message);
      // userBaseUrl.baseUrlSetter(data.data.Message);
      dispatch(baseUrlSetter({id: data.data.Message}));
      dispatch(isLoginSetter());
      // userCtx.isLoginSetter();
      // userIsLogin=true;
      setIsAuthenticating(false);
    } catch (error) {
      setIsAuthenticating(false);
      Alert.alert(
        "Data retrieval failed",
        "Please check your credentials and try again."
      );
    }
    // setIsAuthenticating(false);
  }
  if (isAuthenticating) {
    return <LoadingOverlay message={t("fetchingData")} />;
  }
  console.log("i18next.language: ");
  console.log(i18next.language);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.upperContainer}>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.languageButton, styles.pressed]
              : styles.languageButton
          }
          onPress={toggleLanguage}
        >
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="globe"
              size={18}
              color="green"
              style={styles.languageIcon}
            />
            <Text style={styles.languageText}>{nextLanguage}</Text>
          </View>
        </Pressable>
      </View>
      <KeyboardAvoidingView
        style={styles.formInputContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Image
          source={require("../assets/CSlogo.png")}
          style={styles.imagestyle}
          resizeMode="contain"
        />
        <View>
          <UsernameInput
            onLoginInputHandler={companyIdnputHandler}
            icon="key"
            placeholder={t("organizationId")}
          />
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.LoginButton, styles.pressed]
                : styles.LoginButton
            }
            onPress={formSubmitHandler}
          >
            <Text style={styles.buttonTextlogin}>{t("nextButton")}</Text>
            <Ionicons
              name="arrow-forward-outline"
              size={20}
              color="#FFFFFF"
              style={styles.icon}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
export default CompanyID;
const styles = StyleSheet.create({
  formInputContainer: {
    flex: 5,
    // marginTop: 1,
    paddingTop: 150,
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 10,
    // backgroundColor:"red",
  },

  imagestyle: {
    width: 200,
    height: 200,
    margin: 1,
  },
  LoginButton: {
    width: "92%",
    padding: 10,
    // marginTop: 20,
    backgroundColor: "green",
    // backgroundColor: "light",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 5,
    marginLeft: 4,
  },
  buttonTextlogin: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    flex: 1,
    marginLeft: 10,
  },
  button: {
    //     width: "sretch",
    padding: 10,
    // backgroundColor: "#120438",
    alignItems: "center",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    justifyContent: "space-around",
    borderRadius: 5,
    margin: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
  },
  password: {
    color: "#fff",
    // fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
  },
  icon: {
    width: 20, // Adjust the width of the icon as needed
    height: 20, // Adjust the height of the icon as needed
    marginLeft: 10,
    marginRight: 10,
  },
  forgotPasswordbutton: {
    width: "auto",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 8,
  },
  pressed: {
    backgroundColor: "darkgreen",
    opacity: 0.5,
  },
  upperContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "red",
    width: "100%",
    // height: "100%",
    // marginTop: 50,
    // justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  languageButton: {
    //     width: "sretch",
    padding: 10,
    // backgroundColor: "#120438",
    // alignItems: "center",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    // justifyContent:"space-evenly",
    borderRadius: 5,
  },
  languageIcon: {
    // width: 20, // Adjust the width of the icon as needed
    // height: 20, // Adjust the height of the icon as needed
  },
  languageText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
});
