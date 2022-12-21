import {USER_ACTION_TYPE} from '@app/constants';
import UserApi from '@app/services/user';
import {UserDataType} from '@app/types/user';
import {createAsyncThunk} from '@reduxjs/toolkit';

const onFetchUserList = createAsyncThunk(
  USER_ACTION_TYPE.FETCH_USERS,
  async (_, thunkAPI) => {
    const response = await UserApi.fetchUsers();

    if (response?.status === 200) {
      return thunkAPI.fulfillWithValue(response.data) as unknown as
        | UserDataType[]
        | [];
    } else {
      return thunkAPI.rejectWithValue(response.data);
    }
  },
);

const userActions = {
  onFetchUserList,
};

export default userActions;
