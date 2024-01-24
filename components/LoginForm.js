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
import { Ionicons } from "@expo/vector-icons";
import UsernameInput from "./UsernameInput";
import PasswordInput from "./PasswordInput";
import { UserContext } from "../store/user-context";
import { login2 } from "../util/http";
import LoadingOverlay from "./LoadingOverlay";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next, { use } from "i18next";
import { initReactI18next } from "react-i18next";
import "../locales/ar.json";
import "../locales/en.json";
import "intl-pluralrules";
import "intl-locales-supported";
import BackGround from "./BackGround";
import { unsetIsLogin,authenticate } from "../store/redux/Slices";
import { useSelector,useDispatch } from "react-redux";
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
function LoginForm({ navigation }) {
  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { t } = i18next;
  const [nextLanguage, setNextLanguage] = useState("ع");
  const [isRTL, setIsRTL] = useState(false);
  // const currentLanguage=AsyncStorage.getItem("language");
  // i18next.changeLanguage(currentLanguage);
  // const userCtx = useContext(UserContext);
  const userIsLogin=useSelector(state=>state.user.isLogin);
  const dispatch = useDispatch();
  const loginInputHandler = (enteredText) => {
    setLoginInput(enteredText);
  };
  const toggleLanguage = () => {
    setNextLanguage(nextLanguage === "ع" ? "en" : "ع");
    const newLanguage = i18next.language === "en" ? "ar" : "en";
    i18next.changeLanguage(newLanguage);
    console.log("LoginForm.js: Next language: " + nextLanguage);
    if (newLanguage === "ar") {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
    // Restart the app to apply RTL changes
    // require('react-native-restart').restart();
  };
  useEffect(() => {
    if (i18next.language === "ar") {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
  }, [i18next.language]);
  const passwordInputHandler = (enteredText) => {
    setPasswordInput(enteredText);
  };
  function differentOrganizationHandler() {
    // userCtx.unsetIsLogin(false);
    // userIsLogin=false;
    dispatch(unsetIsLogin());
  }
  async function loginSubmitHandler() {
    let loginInputtrimmed = loginInput.trim();
    let passwordInputtrimmed = passwordInput.trim();
    setIsAuthenticating(true);
    try {
      const response = await login2(loginInputtrimmed, passwordInputtrimmed);
      // userCtx.authenticate(response);
      dispatch(authenticate({id:response.data.access_token}));
      console.log("LoginForm.js: response: ");
      console.log(response);
      AsyncStorage.setItem("token", response.data.access_token);
    } catch (error) {
      setIsAuthenticating(false);
      Alert.alert(
        "Login failed",
        "Please check your credentials and try again."
      );
      console.log(error);
      console.log("error response: ");
      console.log(error.response);
    }
    setIsAuthenticating(false);
  }
  if (isAuthenticating) {
    return <LoadingOverlay message={t("loggingIn")} />;
  }
  return (
    <>
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
            onLoginInputHandler={loginInputHandler}
            placeholder={t("usernameLabel")}
            icon="person"
          />
          <PasswordInput
            passwordInput={passwordInputHandler}
            passwordd={t("passwordLabel")}
          />
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.LoginButton, styles.pressed]
                : styles.LoginButton
            }
            onPress={loginSubmitHandler}
          >
            <Text style={styles.buttonTextlogin}>{t("loginButton")}</Text>
            <Ionicons
              name="log-in"
              size={20}
              color="#FFFFFF"
              style={styles.icon}
            />
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={differentOrganizationHandler}
          >
            <Text style={styles.buttonText}>{t("DifferentOrganization")}</Text>
          </Pressable>
          <Pressable style={styles.forgotPasswordbutton}>
            <Text style={styles.password}>{t("forgotPassword")}</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
export default LoginForm;
const styles = StyleSheet.create({
  formInputContainer: {
    flex: 5,
    // marginTop: 1,
    paddingTop: 100,
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 10,
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
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 10,
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
