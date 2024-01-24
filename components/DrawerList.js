import { DrawerItem } from "@react-navigation/drawer";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getModules } from "../util/http";
import { useEffect,useState } from "react";
function DrawerList({ screen, navigation }) {
  const [modules, setModules] = useState();
  const modules2 = [
    { Key: "1003", Value: "False" },
    { Key: "1007", Value: "False" },
    { Key: "1012", Value: "True" },
    { Key: "5555", Value: "True" },
    { Key: "1013", Value: "True" },
    { Key: "1016", Value: "True" },
    { Key: "1025", Value: "True" },
    { Key: "1033", Value: "True" },
    { Key: "1035", Value: "True" },
    { Key: "1082", Value: "True" },
    { Key: "1083", Value: "True" },
    { Key: "1102", Value: "False" },
    { Key: "1501", Value: "False" },
  ];
  useEffect(() => {
    async function getAPIModules() {
      console.log("DrawerList: getModules");
      try {
        const mod = await getModules();
        setModules(mod);
        console.log("DrawerList: getModules:--------------------------------------- ");
        // console.log(mod.MenuPermissions);
      } catch (error) {
        console.log("DrawerList Error in getModules: ");
        console.log(error);
      }
    }
    getAPIModules();
  }, []);
  return screen.map((item, index) => {
    // console.log("DrawerList: itemkey: ", item.key),
    currentsubScreen = item.subscreen.filter((subitem) => {
      let module = modules && modules.MenuPermissions.find(
        (x) => (x.Key === subitem.key && x.Value === "True") || subitem.key === "0000"
      );
      if (module) {
        return subitem;
      }
    });
    if (currentsubScreen.length > 0) {
      return (
        <View key={item.key} style={styles.categoryContainer}>
          <Text style={styles.TabStyle}>{item.name}</Text>
          {item.subscreen.map(
            (
              subitem,
              subindex // Added curly braces here
            ) => {
              let subs = modules && modules.MenuPermissions.find(
                (x) => (x.Key === subitem.key && x.Value === "True") || subitem.key === "0000"
              );
              if (subs) {
                return (
                  // console.log("DrawerList: subitemkey: ", subitem.screenName),
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }} key={subitem.key} >
                      <DrawerItem
                        //I want to add a random key
                        key={subitem.key}
                        label={subitem.outputName}
                        labelStyle={styles.drawerItemLabel}
                        onPress={() => {
                          navigation.navigate(subitem.screenName);
                        }}
                        //   style={{ m }}
                      />
                    </View>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={12}
                      color="#717171"
                      style={{ marginTop: 17, right: 10 }}
                    />
                  </View>
                );
              }
            }
          )}
        </View>
      );
    }
  });
}
export default DrawerList;
const styles = StyleSheet.create({
  TabStyle: {
    letterSpacing: 2,
    fontWeight: "bold",
    fontSize: 12,
    color: "#717171",
    marginLeft: 5,
  },
  drawerItemLabel: {
    color: "white", // Customize the color of the text
    fontSize: 14, // Customize the font size
    // fontWeight: "bold", // Customize the font weight
    marginLeft: 2, // Add left margin to the labels for spacing
    //     backgroundColor: "#403535",
  },
  categoryContainer: {
    backgroundColor: "#242323",
    paddingTop: 5,
    paddingLeft: 5,
    margin: 1,
  },
});
