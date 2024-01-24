import {
          StyleSheet,
          TextInput,
          View,
        } from "react-native"
  import Icon from "react-native-vector-icons/FontAwesome";
  import {Ionicons} from "@expo/vector-icons";
  
  function UsernameInput(props) {
    return (
      <View style={styles.inputContainer}>
        {/* <Image source={require("./assets/profile.png")} style={styles.icon} /> */}
        <Ionicons name={props.icon}  size={20} color="#FFFFFF" style={styles.icon} />
        <TextInput
          onChangeText={props.onLoginInputHandler}
          style={styles.inputText}
          placeholder={props.placeholder}
          placeholderTextColor="#CCCCCC"
        />
      </View>
    );
  }
  
  export default UsernameInput;
  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      borderWidth: 1,
      borderColor: "#ffffff",
      borderRadius: 5,
      padding: 2,
      marginBottom: 10,
      margin: 5,
      // backgroundColor: "#efd0ff",
    },
    inputText: {
      // borderWidth: 1,
      // borderColor: "#efd0ff",
      width: "80%",
      padding: 10,
      color: "white", // Set text color for input text
      borderRadius: 6,
      margin: 1,
    },
    icon: {
      width: 20, // Adjust the width of the icon as needed
      height: 20, // Adjust the height of the icon as needed
      marginLeft: 10,
      marginRight: 10,
    },
  });
  