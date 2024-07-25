import { createSlice } from '@reduxjs/toolkit'

const initialState = {

        user : null,
        token : null ,
        threads : []
        

}
  
const AuthSlice =  createSlice(
    {
        name : 'auth',
        initialState,
        reducers : {
            setAuth : (state,action)=>{
                    state.user =  action.payload.user,
                    state.token = action.payload.token    
            },
            logOut : (state)=>{
                state.token = null,
                state.user = null
            },
           setThread :  (state,action)=>{
            state.threads = action.payload
           }
        }
    }
)

export const {setAuth,logOut} = AuthSlice.actions
export  default AuthSlice.reducer