import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { UserContext } from "../store/user-context.js";
import { useContext } from "react";
import LoadingOverlay from "./LoadingOverlay";
import { useNavigation } from "@react-navigation/native";
import DrawerList from "./DrawerList.js";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { logout } from "../store/redux/Slices.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
function DrawerContent(props) {
  // const userCtx = useContext(UserContext);
  const dispatch=useDispatch();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  async function handleLogout() {
    setLoading(true);
    // userCtx.logout();
    dispatch(logout());
    AsyncStorage.removeItem("token");
    setLoading(false);
  }

  if (loading) {
    return <LoadingOverlay message="Logging out..." />;
  }
  const screen = [
    {
      name: "Navigation Panel",
      key: "NavigationPanel",
      subscreen: [{ outputName: "Home", screenName: "Home", key: "0000" }],
    },
    {
      name: "Leaves",
      key: "Leaves",
      subscreen: [
        {
          outputName: "Leave Request",
          screenName: "LeaveRequest",
          key: "1012",
        },
        {
          outputName: "Leave Cancellation",
          screenName: "Leave Cancellation",
          key: "1035",
        },
        { outputName: "Leave Balance",
         screenName: "Leave Balance",
         key:"9999" 
        },
        { outputName: "Leave History", 
        screenName: "Leave History",
        key:"1234" 
      },
      ],
    },
    {
      name: "Payments",
      key: "Payments",
      subscreen: [
        {
          outputName: "Payslip",
          screenName: "Payslip",
          key: "1016",
        },
      ],
    },
    {
      name: "Advance Payment Request",
      key: "AdvancePaymentRequest",
      subscreen: [
        {
          outputName: "Advance Payment Request",
          screenName: "AdvancePaymentRequest",
          key: "1025",
        },
      ],
    },
    {
      name: "Letter Request",
      key: "LetterRequest",
      subscreen: [
        {
          outputName: "Letter Request",
          screenName: "LetterRequest",
          key: "1033",
        },
      ],
    },
    {
      name: "My Requests",
      key: "MyRequests",
      subscreen: [
        { outputName: "My Requests", screenName: "MyRequests", key: "1013" },
      ],
    },
    {
      name:"Rejoining",
      key:"Rejoining",
      subscreen:[
        {outputName:"Rejoining",
        screenName:"Rejoining",
        key:"5555"}
      ]
    },
    {
      name: "Checkin & Checkout",
      key: "Checkin&Checkout",
      subscreen: [
        {
          outputName: "Checkin & Checkout",
          screenName: "Checkin&Checkout",
          key: "1102",
        },
      ],
    },
    {
      name: "Permission Request",
      key: "PermissionRequest",
      subscreen: [
        {
          outputName: "Permission Request",
          screenName: "PermissionRequest",
          key: "1082",
        },
      ],
    },
    {
      name: "My Profile",
      key: "MyProfile",
      subscreen: [
        {
          outputName: "My Profile",
          screenName: "MyProfile",
          key: "1007",
        },
      ],
    },
  ];

  function handleSettings() {
    navigation.navigate("Settings");
  }
  function handleWeb() {
    navigation.navigate("Web");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/CSlogo.png")}
          style={styles.imagestyle}
          resizeMode="contain"
        />
      </View>
      <View style={styles.drawerContainer}>
        <DrawerContentScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          {...props}
        >
          <DrawerList screen={screen} navigation={navigation} />
        </DrawerContentScrollView>
      </View>
      <Pressable
        onPress={handleSettings}
        style={({ pressed }) =>
          pressed ? [styles.logoutButton, styles.pressed] : styles.logoutButton
        }
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.settingsText}>Settings</Text>
          <Ionicons
            name="settings"
            size={20}
            color="#FFFFFF"
            style={styles.icon}
          />
        </View>
      </Pressable>
      {/* <Pressable
        onPress={handleWeb}
        style={({ pressed }) =>
          pressed ? [styles.logoutButton, styles.pressed] : styles.logoutButton
        }
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.settingsText}>Open Web</Text>
          <Ionicons
            name="globe"
            size={20}
            color="#FFFFFF"
            style={styles.icon}
          />
        </View>
      </Pressable> */}
      <Pressable
        onPress={handleLogout}
        style={({ pressed }) =>
          pressed ? [styles.logoutButton, styles.pressed] : styles.logoutButton
        }
      >
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121111",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: "#121111",
    // padding: 2,
    alignItems: "flex-start", // Align the image to the left
    // marginLeft: 10,
    paddingHorizontal: 20,
  },
  imagestyle: {
    width: 150,
    height: 150,
    // margin: 2,
  },
  drawerContent: {
    backgroundColor: "#403535",
    color: "white",
    // fontWeight: "bold",
    // flex: 1,
    height: "100%",
    paddingVertical: 0,
  },
  logoutButton: {
    backgroundColor: "#403535",
    padding: 10,
    // paddingLeft: 20,
    // paddingBottom: 20,
  },
  pressed: {
    //     backgroundColor: "maroon",
    opacity: 0.5,
  },
  settingsText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "#403535",
  },
  logoutText: {
    color: "red",
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "#403535",
  },
  drawerContentContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  scrollView: {
    backgroundColor: "#403535",
  },
  drawerContainer: {
    height: "70%", // Set the desired height here
  },
  contentContainer: {
    paddingTop: 0, // Set the desired padding at the top
  },
});
