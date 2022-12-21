import {RootStackParamList} from '@app/navigation/navigators/RootNavigator';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCallback} from 'react';

export const useResetNavigation = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{name: 'BottomTab'}],
    });
  }, [navigation]);
};
