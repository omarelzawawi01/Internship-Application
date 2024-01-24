import { useEffect, useState } from "react";
import BackGround from "../components/BackGround";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import { getUserProfile, getModules } from "../util/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserInfoContainer from "../components/UserInfoContainer";
import LoadingOverlay from "../components/LoadingOverlay";
import UserModules from "../components/UserModules";
import { ScrollView } from "react-native-gesture-handler";
function WelcomeScreen({ navigation }) {
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState();
  useEffect(() => {
    async function getUser() {
      setLoading(true);
      // console.log("WelcomeScreen: getUser---------------------------------------");
      const token = await AsyncStorage.getItem("token");
      try {
        const Profile = await getUserProfile(token);
        setUserProfile(Profile);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("WelcomeScreen  Error in getUserProfile: ");
        console.log(error);
      }
    }
    async function getAPIModules() {
      console.log("WelcomeScreen: getModules");
      setLoading(true);
      try {
        const mod = await getModules();
        setModules(mod);
        setLoading(false);
        console.log(
          "WelcomeScreen: getModules:--------------------------------------- "
        );
        // console.log(mod.MenuPermissions);
      } catch (error) {
        setLoading(false);
        console.log("WelcomeScreen Error in getModules: ");
        console.log(error);
      }
    }
    // setLoading(true);
    getUser();
    getAPIModules();
    // setLoading(false);
  }, []);
  // console.log("WelcomeScreen: modules: ", modules);
  if (loading) {
    return <LoadingOverlay message="Loading..." />;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <BackGround />
        {/* <View> */}
        <UserInfoContainer profile={userProfile} />
        {/* <Text style={{ color: "white" }}>Modules</Text> */}
        <View style={styles.outerContainer} >
          <ScrollView horizontal={false}>
            <View style={styles.moduleContainer}>
              <UserModules modules={modules} />
            </View>
          </ScrollView>
        </View>
        {/* </View> */}
      </View>
    );
  }
}
export default WelcomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "blue",
    flexDirection: "column",
    alignItems: "center",
    //     marginTop: 50,
    //     justifyContent: "center",
    // color: "red",
    resizeMode: "cover",
    // height: "100%",
    backgroundColor: "white",
  },
  moduleContainer: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  outerContainer: {
    flex: 1,
    // marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
