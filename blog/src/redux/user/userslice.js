import { createSlice } from '@reduxjs/toolkit'



const initialState= {
  isloggedIn: false,
  user:{},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    setUser:(state,actions)=>
    {
        const payload=actions.payload
        state.isloggedIn=true,
        state.user=payload

    },
    removeUser:(state,actions)=>
    {
        state.isloggedIn=false,
        state.user={}
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { setUser,removeUser } = userSlice.actions

export default userSlice.reducer