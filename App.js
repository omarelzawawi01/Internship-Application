import LoginScreen from "./screens/LoginScreen.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  TransitionPresets,
} from "@react-navigation/drawer";
import WelcomeScreen from "./screens/WelcomeScreen.js";
import UserContextProvider from "./store/user-context.js";
import { UserContext } from "./store/user-context.js";
import { useContext, useEffect, useState } from "react";
import { ImageBackground, StatusBar, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import DrawerContent from "./components/DrawerContent.js";
import CompanyIdScreen from "./screens/CompanyIdScreen.js";
import OpenWebScreen from "./screens/OpenWebScreen.js";
import { Provider, useSelector,useDispatch } from "react-redux";
import store from "./store/redux/store.js";
import { authenticate, setIsAuth } from "./store/redux/Slices.js";
import ImagesScreen from "./screens/ImagesScreen.js";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function NonAuthenticatedScreen() {
  // const UserCtx = useContext(UserContext);
  const userIsLogin = useSelector((state) => state.user.isLogin);
  console.log("App.js: userIsLogin: ", userIsLogin);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* {UserCtx.isLogin && <Stack.Screen name="Login" component={LoginScreen} />} */}
      <Stack.Screen name="Images" component={ImagesScreen} />
      {userIsLogin && <Stack.Screen name="Login" component={LoginScreen} />}
      {/* {!UserCtx.isLogin && (
        <Stack.Screen name="CompanyID" component={CompanyIdScreen} />
      )} */}
      {!userIsLogin && (
        <Stack.Screen name="CompanyID" component={CompanyIdScreen} />
      )}
      {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
      {/* <Stack.Screen name="DateTime" component={DateTimeScreen} /> */}
    </Stack.Navigator>
  );
}
function AuthenticatedScreen() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "black", // Set the background color here
          borderBottomColor: "black", // Set the border bottom color here
          shadowColor: "black", // Set the shadow color here
        },
        headerTintColor: "white", // Set the text color of the header
        drawerActiveBackgroundColor: "#403535",
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "#403535",
        drawerInactiveBackgroundColor: "black",
        drawerItemStyle: {
          // backgroundColor: "black",
          color: "blue",
          fontsize: 20,
        },
        backgroundColor: "black",
        // ...TransitionPresets.DrawerSlideAboveHeader, // Apply the custom transition
        drawerType: "front",
      }}
      // overlayColor="transparent"

      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={WelcomeScreen}
        options={{
          drawerActiveBackgroundColor: "#403535",
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "white",
          drawerInactiveBackgroundColor: "black",
        }}
      />
      <Drawer.Screen
        name="Web"
        component={OpenWebScreen}
        options={{
          drawerActiveBackgroundColor: "#403535",
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "white",
          drawerInactiveBackgroundColor: "black",
        }}
      />
    </Drawer.Navigator>
  );
}

function Navigation() {
  // const UserCtx = useContext(UserContext);
  let userIsAuth = useSelector((state) => state.user.isAuth);
  console.log("App.js: userIsAuth: ", userIsAuth);
  return (
    <NavigationContainer
      screenOptions={{
        // headerShown: true,
        // backgroundColor: "black",
        // headerTintColor: "#000000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {/* {console.log(UserCtx.isAuth)} */}
      {/* {UserCtx.isAuth && <AuthenticatedScreen />} */}
      {userIsAuth && <AuthenticatedScreen />}
      {/* {!UserCtx.isAuth && <NonAuthenticatedScreen />} */}
      {!userIsAuth && <NonAuthenticatedScreen />}
    </NavigationContainer>
  );
}
function Root() {
  // const userCtx = useContext(UserContext);
  const userIsAuth = useSelector((state) => state.user.isAuth);
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("App.js: useEffect: ");
    setIsReady(false);
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        // userCtx.authenticate(token);
        dispatch(authenticate({ id: token }));
        // setIsAuth();
        console.log("App.js: token: ", token);
        setIsReady(true);
        // userIsAuth = true;
      } else {
        setIsReady(true);
      }
    });
  }, []);
  if (!isReady) {
    console.log("App.js: !isReady: ");
    return <AppLoading />;
  }

  return <Navigation />;
}
export default function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const UserCtx = useContext(UserContext);
  return (
    // <UserContextProvider>
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <Root />
      {/* // </UserContextProvider> */}
    </Provider>
  );
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
  },
});
