import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

function OpenWebScreen() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: "https://www.google.com" }}
      />
    </View>
  );
}
export default OpenWebScreen;
