import ApiClient from '../api/apiClient';
import API_ENDPOINTS from '../api/apiEndPoints';

const fetchUsers = async () => {
  const res = await ApiClient.get(API_ENDPOINTS.USERS);
  return res;
};

const UserApi = {
  fetchUsers,
};

export default UserApi;
