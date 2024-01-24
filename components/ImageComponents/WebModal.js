import React from "react";
import { Pressable } from "react-native";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { Modal } from "react-native";
import { Alert } from "react-native";
import { WebView } from "react-native-webview";
function WebModal(props) {
  // console.log("WebModal.js: Props.uri",props.url)
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        props.setModalVisible(!props.modalVisible);
      }}
    >
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ flex: 1,width:'100%' }}>
            <WebView source={{ uri: props.url }} />
          </View>
          <Pressable
            style={(pressed) => [
              styles.button,
              styles.buttonClose,
              pressed ? styles.pressed : null,
            ]}
            onPress={() => props.setModalVisible(!props.modalVisible)}
          >
            <Text style={styles.textStyle}>Hide</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
export default WebModal;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonClose: {
    backgroundColor: "#403535",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.5,
  },
});
