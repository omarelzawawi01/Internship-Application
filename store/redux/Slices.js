import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
          name:"user",
          initialState:{
                    isLogin:false,
                    isAuth:false,
                    baseUrl:"",
                    token:null,
          },
          reducers:{
                    authenticate(state,action){
                              state.token=action.payload;
                              state.isAuth=true;
                              state.isLogin=true;
                              // console.log("userSlice.js: authenticate: state.isAuth: ", state.isAuth);
                    },
                    logout(state){
                              state.token=null;
                              state.isAuth=false;
                    },
                    isLoginSetter(state){
                              state.isLogin=true;
                    },
                    baseUrlSetter(state,action){
                              state.baseUrl=action.payload;
                    },
                    unsetIsLogin(state){
                              state.isLogin=false;
                    },
                    setIsAuth(state){
                              state.isAuth=true;
                              // console.log("userSlice.js: setIsAuth: state.isAuth: ", state.isAuth);
                    }
          }
});
export default userSlice.reducer;
export const {authenticate,logout,isLoginSetter,baseUrlSetter,unsetIsLogin,setIsAuth}=userSlice.actions;
