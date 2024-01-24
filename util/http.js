import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const API_KEY = "AIzaSyC1fPX4jqIOmdE5k2hId9LSaHK_nlSIb18";
import queryString from 'query-string';
import { useContext } from "react";
import { UserContext } from "../store/user-context";
export async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  return token;
}

export async function createUser(email, password) {
  const token=await authenticate("signUp", email, password);
  return token;
}
export async function login(email, password) {
  const token=await authenticate("signInWithPassword", email, password);
  return token;
}
export async function login2(username,password){
  const baseUrl=await AsyncStorage.getItem("baseUrl");
  console.log("baseUrl: ");
  console.log(baseUrl);
  const url = `${baseUrl}/Login`;
  console.log("url: ");
  console.log(url);
  console.log("username: "+username);
  console.log("password: "+password);
  const bodystr=queryString.stringify({
    grant_type: 'password',
    username: username,
    Password: password,
    });
  console.log("bodystr: ");
  console.log(bodystr);
  const response = await axios.post(url, bodystr);
  console.log("response: ");
  console.log(response);
  return response;
}
export async function getUserProfile(token) {
  const accessToken=await AsyncStorage.getItem("token");
  console.log("HTTP.js getUserProfile accessToken: ");
  console.log(accessToken);
  const baseUrl=await AsyncStorage.getItem("baseUrl");
  const url = `${baseUrl}/api/AuthUserPortal/GetEmployeeProfile`;
  console.log("HTTP.js getUserProfile url: ");
  console.log(url);
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      lang:0,
    },
  });
  // console.log("HTTP.js getUserProfile response: ",response);
  // console.log(response.data);
  let profile = response.data;
  return profile;
}
export async function getModules() {
  const accessToken=await AsyncStorage.getItem("token");
  const baseUrl=await AsyncStorage.getItem("baseUrl");
  const url = `${baseUrl}/api/LeaveRequest/GetStartupValues`;
  console.log("HTTP.js getModules url: ");
  console.log(url);
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      lang:0,
    },
  });
  // console.log("HTTP.js getModules response: ");
  // console.log('response response',response);
  let modules = response.data;
  // console.log("HTTP.js getModules modules: ",modules);
  return response ? response.data : null;
}
export async function getBaseUrl(companyID) {
  // const userCtx=useContext(UserContext);
  const data = await axios.get(
    `http://csmobile.civilsoft.org/api/Configuration/GetBaseURL?companyID=${companyID}`
  );
  console.log("returned data: ");
  console.log(data);
  if (data.data.IsSuccess == false) {
    Alert.alert(
      "Data retrieval failed",
      "Please check your credentials and try again HTTP."
    );
    return;
  }
  console.log("data.data: ");
  console.log(data.data);
  AsyncStorage.setItem("baseUrl", data.data.Message);
  // userCtx.isLoginSetter();
  return data;
}
