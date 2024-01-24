import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function UserInfoContainer(props) {
  console.log("UserInfoContainer: props.profile: ");
  // console.log(props.profile);
  // let empName = "Miriamm Magdy Mahrous Shoukry M";
  let empName=props.profile && props.profile.EmpName;

  const empNameArray = empName ? empName.split(" ") : "";
  const firstName = empNameArray[0];
  return (
    //     <View style={{alignItems:'center',justifyContent:'center'}} >
    <View>
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfo}>
          <View style={styles.userInfoImage}>
            <Image
              source={
                props.profile.Photo
                  ? {
                      uri: `data:image/png;base64,${props.profile.Photo.Photo}`,
                    }
                  : require("../assets/profile.png")
              }
              style={styles.userInfoImage}
            />
          </View>
          <View style={styles.userInfoText}>
            {/* <Text style={styles.userInfoTextName}>{props.profile.EmpName}</Text> */}
            <Text style={styles.userInfoTextName}>{empName}</Text>
            <Text style={styles.userInfoTextEmail}>
              {props.profile.JobTile}
              {/* {"HR Manager"} */}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.userInfoTextName}>Hello {firstName}</Text>
        <Text style={styles.userInfoTextEmail}>
          What would you like to do today?
        </Text>
      </View>
    </View>
  );
}
export default UserInfoContainer;
const styles = StyleSheet.create({
  userInfoContainer: {
    backgroundColor: "#3a3a3a",
    flexDirection: "row",
    padding: 10,
    paddingHorizontal: 20,
    margin: 30,
    // height: 100,
    // width: "100%",
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#3a3a3a",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  userInfoImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: "contain",
    // backgroundColor: "red",
  },
  userInfoText: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 10,
    // backgroundColor: "red",
  },
  userInfoTextName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    // backgroundColor: "red",
  },
  userInfoTextEmail: {
    color: "#a3a5af",
    fontSize: 14,
    fontWeight: "bold",
    // backgroundColor: "red",
  },
  questionContainer: {
    //     padding: 10,
    marginHorizontal: 30,
    // height: 100,
    // width: "100%",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
});
