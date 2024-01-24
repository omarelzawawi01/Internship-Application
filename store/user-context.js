import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

// import AsyncStorage from "@react-native-async-storage/async-storage";
export const UserContext = createContext({
  token: null,
  authenticate: () => {},
  logout: () => {},
  isAuth: false,
  baseUrl: "",
  isLogin: false,
  // getBaseUrl: () => {},
  unsetIsLogin: () => {},
  baseUrlSetter: () => {},
  isLoginSetter: () => {},
});
function UserContextProvider(props) {
  const [authToken, setAuthToken] = useState(null);
  const [baseUrl, setBaseUrl] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        setAuthToken(token);
      }
    });
  }, []);

  function authenticate(token) {
    setAuthToken("omar");
    // AsyncStorage.setItem("token", token);
  }
  function isLoginSetter() {
    setIsLogin(true);
  }
  function baseUrlSetter(baseurl) {
    setBaseUrl(baseurl);
  }
  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
    setIsLogin(true);
  }
  // async function getBaseUrl(companyID) {
  //   const data = await axios.get(
  //     `http://csmobile.civilsoft.org/api/Configuration/GetBaseURL?companyID=${companyID}`
  //   );
  //   console.log("returned data: ");
  //   console.log(data);
  //   if (data.data.IsSuccess == false) {
  //     Alert.alert(
  //       "Data retrieval failed",
  //       "Please check your credentials and try again."
  //     );
  //     return;
  //   }
  //   setBaseUrl(data.data);
  //   console.log("data.data: ");
  //   console.log(data.data);
  //   AsyncStorage.setItem("baseUrl", data.data.Message);
  //   setIsLogin(true);
  //   return data;
  // }
  function unsetIsLogin() {
    setIsLogin(false);
  }
  const contextValue = {
    token: authToken,
    authenticate: authenticate,
    logout: logout,
    isAuth: !!authToken,
    baseUrl: baseUrl,
    isLogin: isLogin,
    // getBaseUrl: getBaseUrl,
    unsetIsLogin: unsetIsLogin,
    baseUrlSetter: baseUrlSetter,
    isLoginSetter: isLoginSetter,
  };
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}
export default UserContextProvider;
