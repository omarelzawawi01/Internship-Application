import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground } from "react-native";
import LoginForm from "../components/LoginForm";
import BackGround from "../components/BackGround";
function LoginScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <BackGround />
      <LoginForm navigation={navigation} />
    </View>
  );
}
export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "blue",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    //     marginTop: 50,
    //     justifyContent: "center",

    color: "red",
    resizeMode: "cover",
    height: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 5,
    padding: 2,
    marginBottom: 10,
    margin: 5,
    // backgroundColor: "#efd0ff",
  },
});
