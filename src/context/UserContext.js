import React from "react";

import services from './../services/services'

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
    userId: !!localStorage.getItem("userId"),
    userName: !!localStorage.getItem("userName"),
    userEmail: !!localStorage.getItem("userEmail"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut, datos, registryUser};

// ###########################################################

async function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  let body = {email: login, password: password}
  let api = await services.post('auth/login', body);
  if (api.statusCode === 200) {
      localStorage.setItem('id_token', api.data.token)
      localStorage.setItem('userId', api.data.data.id)
      localStorage.setItem('userName', api.data.data.fullName)
      localStorage.setItem('userEmail', api.data.data.email)
      setError(false)
      setIsLoading(false)
      dispatch({ type: 'LOGIN_SUCCESS' })
      history.push('/app/dashboard')
  } else {
    setError(true);
    setIsLoading(false);
  }
}
async function registryUser(dispatch,name,login,passwordValue,history,setIsLoading,setError,registryError, registryTrue){
  registryTrue(false);
  registryError(false);
  setIsLoading(true);
  let body = {fullName:name, email: login, password: passwordValue}
  let api = await services.post('auth/register', body);
  if (api.statusCode === 200) {
      registryTrue(true);
      registryError(false)
      setIsLoading(false)
  } else {
    registryError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}

function datos() {
  return {    isAuthenticated: localStorage.getItem("id_token"),
  userId: localStorage.getItem("userId"),
  userName: localStorage.getItem("userName"),
  userEmail: localStorage.getItem("userEmail")
}
}
