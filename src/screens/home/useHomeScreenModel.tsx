import {RootState, useAppDispatch} from '@app/store';
import UserActions from '@app/store/user/UserModel';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

const useHomeScreenModel = () => {
  const dispatch = useAppDispatch();

  const {isLoading, listUser} = useSelector((state: RootState) => state.users);

  const handleFetchUserList = () => {
    dispatch(UserActions.onFetchUserList());
  };

  useEffect(() => {
    handleFetchUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    isLoading,
    listUser,
  };
};
export default useHomeScreenModel;
