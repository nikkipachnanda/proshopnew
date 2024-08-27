// import { createSlice } from "@reduxjs/toolkit";

// const initialState = 
// {
//     userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo"))
//     : null
// }

// const authSlice = createSlice({
//     name:'auth',
//     initialState,
//     reducers:({
//         setCredentials:(state, action)=> 
//             {
//                 console.log('Payload received in setCredentials:', JSON.stringify(action.payload)); // Debugging line

//                 state.userInfo = action.payload;
//                 localStorage.setItem('userInfo', JSON.stringify(action.payload));
//                 console.log("State after setting credentials:", JSON.stringify(state.userInfo)); // Debugging line

//             },
//         logout:(state, action)=> 
//             {
//                 state.userInfo = null;
//                // localStorage.removeItem('userInfo');
//                localStorage.clear();
//             },
//     })
// })

// export const { setCredentials, logout} = authSlice.actions;

// export default authSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      // NOTE: here we need to also remove the cart from storage so the next
      // logged in user doesn't inherit the previous users cart and shipping
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;