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

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut, datos};

// ###########################################################

async function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  let body = {email: login, password: password}
  //let api = await services.post('users/login',body);
  let api = services.preubaLogin(body);
  if (api.status === 200) {
    setTimeout(() => {
      localStorage.setItem('id_token', api.body.token)
      localStorage.setItem('userId', api.body.id)
      localStorage.setItem('userName', api.body.fullName)
      localStorage.setItem('userEmail', api.body.email)
      setError(false)
      setIsLoading(false)
      dispatch({ type: 'LOGIN_SUCCESS' })

      history.push('/app/dashboard')
    }, 2000);
  } else {
    setError(true);
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
