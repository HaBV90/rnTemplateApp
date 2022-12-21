import {UserDataType} from '@app/types/user';
import {createSlice} from '@reduxjs/toolkit';

import userActions from './UserModel';

export interface UserStore {
  isLoading: boolean;
  listUser: UserDataType[] | [];
  errors: any;
  token?: string;
}

const initState: UserStore = {
  isLoading: false,
  listUser: [],
  errors: undefined,
  token: undefined,
};

const UserStoreSlice = createSlice({
  name: 'userStore',
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(userActions.onFetchUserList.pending, state => {
      state.isLoading = true;
      state.errors = undefined;
    });
    builder.addCase(userActions.onFetchUserList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listUser = action.payload;
    });
    builder.addCase(userActions.onFetchUserList.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

const userModel = {
  actions: UserStoreSlice.actions,
  reducer: UserStoreSlice.reducer,
};

export default userModel;
