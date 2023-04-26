import { ILoginResponse } from '@/types/auth';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: ILoginResponse = {
  email: '',
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ILoginResponse>) => {
      const { email, token } = action.payload;
      Object.assign(state, { email, token });
    },

    signOutUser: (state) => {
      Object.assign(state, { email: '', token: '' });
    },
  },
});

export const { setUser, signOutUser } = authSlice.actions;

export default authSlice.reducer;
