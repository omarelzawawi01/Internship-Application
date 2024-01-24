import React from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native";
import { View, Text, Image, StyleSheet } from "react-native";
import { useState } from "react";
import FastImage from "react-native-fast-image";
import WebModal from "./WebModal.js";
function ImageItem(props) {
  const [modalVisible, setModalVisible] = useState(false);
  function itemPressed() {
    setModalVisible(!modalVisible);
  }
  return (
    //     <View style={styles.container}>
    <Pressable
      style={({ pressed }) => [
        styles.listItem,
        pressed ? styles.pressed : null,
      ]}
      onPress={itemPressed}
    >
      <WebModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        url={props.uri}
      />
      {/* <View style={styles.listItem}> */}
      <Image source={{ uri: props.uri }} style={styles.image} />
      <Text style={styles.text}>{props.text}</Text>
      {/* </View> */}
    </Pressable>
    //     </View>
  );
}
export default ImageItem;
const styles = StyleSheet.create({
  image: {
    width: 130,
    height: 130,
    resizeMode: "contain",
  },
  text: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    width: 150,
    minHeight: 170,
    marginBottom: 5,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#717171",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.5,
  },
});
