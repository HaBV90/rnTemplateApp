import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';

const get = async (key: string): Promise<any> => {
  try {
    return await RNSecureKeyStore.get(key);
  } catch (error) {
    return null;
  }
};

const set = async (key: string, value: string, option?: any) => {
  try {
    await RNSecureKeyStore.set(key, value, {
      accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
      ...option,
    });
    return true;
  } catch {
    return false;
  }
};

const remove = async (key: string) => {
  try {
    await RNSecureKeyStore.remove(key);
    return true;
  } catch {
    return false;
  }
};

const SecureStorage = {
  get,
  set,
  remove,
};

export default SecureStorage;
