import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, Pressable, View } from "react-native";
import React from "react";
function UserModules(props) {
  const navigation = useNavigation();
  const modules = [
    {
      Name: "TicketRequest",
      DisplayName: "Ticket Request",
      key: "1003",
      path: require("../assets/6.png"),
    },
    {
      Name: "MyProfile",
      DisplayName: "My Profile",
      key: "1007",
      path: require("../assets/profile.png"),
    },
    {
      Name: "LeaveRequest",
      DisplayName: "Leave Request",
      key: "1012",
      path: require("../assets/Group885.png"),
    },
    {
      Name: "Rejoining",
      DisplayName: "Rejoining",
      key: "5555",
      path: require("../assets/rejoin.png"),
    },
    {
      Name: "MyRequests",
      DisplayName: "My Requests",
      key: "1013",
      path: require("../assets/45.png"),
    },
    {
      Name: "AdvancedPaymentRequest",
      DisplayName: "Advanced Payment Request",
      key: "1025",
      path: require("../assets/loan2.png"),
    },
    {
      Name: "LetterRequest",
      DisplayName: "Letter Request",
      key: "1033",
      path: require("../assets/Group890.png"),
    },
    {
      Name: "LeaveCancelation",
      DisplayName: "Leave Cancelation",
      key: "1035",
      path: require("../assets/Group885.png"),
    },
    {
      Name: "Checkin&Checkout",
      DisplayName: "Checkin & Checkout",
      key: "1102",
      path: require("../assets/CheckOut.png"),
    },
    {
      Name: "PermissionRequest",
      DisplayName: "Permission Request",
      key: "1082",  
      path: require("../assets/3.png"),
    },
    {
      Name: "Payslip",
      DisplayName: "Payslip",
      key: "1016",
      path: require("../assets/Payslip2.png"),
    },
  ];
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
  // console.log("props", props.modules.MenuPermissions);
  if (props) {
    return (
      <>
        {props.modules &&
          props.modules.MenuPermissions.map((item, index) => {
            let module = modules.find(
              (x) => x.key === item.Key && item.Value === "True"
            );
            if (module) {
              // console.log("module path:../assets/ ",module.path)
              return (
                <View style={styles.module} >
                  <View style={styles.container}>
                    {/* <Text style={{ color: "white" }}>{module.Name}</Text> */}
                    <Pressable
                      key={index}
                      onPress={() => {
                        navigation.navigate(module.Name);
                      }}
                      style={({ pressed }) => [
                        styles.module,
                        pressed && styles.pressed,
                      ]}
                    >
                      <Image style={styles.moduleImage} source={module.path} />
                    </Pressable>
                  </View>
                  <Text style={styles.moduleText}>{module.DisplayName}</Text>
                </View>
              );
            }
          })}
      </>
    );
    //     }
    //   });
  }
}
export default UserModules;
const styles = StyleSheet.create({
  container: {
    //     flex: 1,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    //     backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#3a3a3a",
    padding: 10,
    margin: 20,
    backgroundColor: "#3a3a3a",
  },

  module: {
    // width: 100,
    // height: 100,
    // margin: 10,
    maxWidth:90,
    alignItems: "center",
    justifyContent: "center",
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
  moduleImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  moduleText: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});
