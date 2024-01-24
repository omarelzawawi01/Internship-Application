import { StyleSheet, Text, TextInput, View, Pressable ,} from "react-native";
import { useState } from "react";
// import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
function PasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={styles.inputContainer}>
      {/* <Image source={require("./assets/lock.jpg")} style={styles.icon} /> */}
      <Ionicons name="lock-closed" size={20} color="#FFFFFF" style={styles.icon} />
      <TextInput
        onChangeText={props.passwordInput}
        style={styles.inputText}
        placeholder={props.passwordd ? props.passwordd : "Password *"}
        placeholderTextColor="#CCCCCC"
        secureTextEntry={!showPassword}
      />
      <Pressable
        style={styles.showPasswordButton}
        onPress={togglePasswordVisibility}
      >
        <Ionicons
          name={showPassword ? "eye" : "eye-off"}
          size={20}
          color="#FFFFFF"
          
        />
      </Pressable>
    </View>
  );
}
export default PasswordInput;
const styles = StyleSheet.create({
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
  icon: {
    width: 20, // Adjust the width of the icon as needed
    height: 20, // Adjust the height of the icon as needed
    marginLeft: 10,
    marginRight: 10,
  },
  inputText: {
    // borderWidth: 1,
    // borderColor: "#efd0ff",
    width: "80%",
    padding: 10,
    color: "white", // Set text color for input text
    borderRadius: 1,
    margin: 1,
  },
  showPasswordButton: {
    width: 20, // Adjust the width of the icon as needed
    marginRight: 10,
  },
});
