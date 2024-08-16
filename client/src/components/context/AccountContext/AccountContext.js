import { createContext, useReducer } from "react";
import axios from "axios";
import {
  ACCOUNT_DETAILS_FAIL, 
  ACCOUNT_DETAILS_SUCCESS,
  ACCOUNT_CREATION_FAIL,
  ACCOUNT_CREATION_SUCCESS,
  
} from "./accountActionTypes";
import { API_URL_ACC } from "../../../utils/apiURL";

export const accountContext = createContext();

//Initial state
const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
  account: null,
  accounts: [],
  loading: false,
  error: null
};

//Reducer
const accountReducer = (state, action) => {
  const {type, payload} = action;
  switch(type) {
    //details
    case ACCOUNT_DETAILS_SUCCESS: return {
      ...state,
      account: payload,
      loading: false,
      error: null
    }
    case ACCOUNT_DETAILS_FAIL: return {
      ...state,
      account: null,
      loading: false,
      error: payload
    }
    //create
    case ACCOUNT_CREATION_SUCCESS: return {
      ...state,
      account: payload,
      loading: false,
      error: null
    }
    case ACCOUNT_CREATION_FAIL: return {
      ...state,
      account: null,
      loading: false,
      error: payload
    } 
    default: return state;
  }

}

//Provider
export const AccountContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(accountReducer, INITIAL_STATE);
  const getAccountDetailsAction = async id => {
    const config = {
      headers: {
        "Authorization": `Bearer ${state?.userAuth?.token}`,
        "Content-Type": "application/json"
      }
    }
    try {
      const res = await axios.get(`${API_URL_ACC}/${id}`, config);
      if(res?.data?.status === "success") {
        dispatch({
          type: ACCOUNT_DETAILS_SUCCESS,
          payload: res?.data?.data
        })
      }
    } catch (e) {      
      dispatch({
        type: ACCOUNT_DETAILS_FAIL,
        payload: e.response?.data?.message
      })
    }
    
  }

  const createAccountAction = async formData => {
    const config = {
      headers: {
        Authorization: `Bearer ${state?.userAuth?.token}`,
        "Content-Type": "application/json"
      }
    }
    try {
      const res = await axios.post(`${API_URL_ACC}`, formData, config);
      if(res?.data?.status === "success") {
        dispatch({
          type: ACCOUNT_CREATION_SUCCESS,
          payload: res?.data?.data
        })
      }
      //Redirect
      window.location.href = "/dashboard"; 
    } catch (e) {
      dispatch({
        type: ACCOUNT_CREATION_FAIL,
        payload: e.response?.data?.message
      })
    }    
  }

  console.log(state?.account);
  

  return <accountContext.Provider value = {
    {
      getAccountDetailsAction,
      account: state?.account,
      createAccountAction,
      error: state?.error
    }
  }>
    {children}
  </accountContext.Provider>
}


export default AccountContextProvider;