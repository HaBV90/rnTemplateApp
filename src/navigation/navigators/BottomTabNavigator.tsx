import Icon from '@app/components/Icon';
import CreateScreen from '@app/screens/CreateScreen';
import HomeScreen from '@app/screens/home/HomeScreen';
import NotificationsScreen from '@app/screens/NotificationsScreen';
import SettingsScreen from '@app/screens/SettingsScreen';
import theme from '@app/theme';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {ParamListBase, TabNavigationState} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Animated,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const Tab = createBottomTabNavigator();

const MyTabBar = ({
  state,
  descriptors,
  navigation,
}: {
  state: TabNavigationState<ParamListBase>;
  descriptors: any;
  navigation: any;
}) => {
  const {t} = useTranslation('screens');
  return (
    <View style={styles.container}>
      {state.routes.map(
        (route: {key: string | number; name: string}, index: number) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              LayoutAnimation.spring();
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const colorBottomTab = isFocused
            ? theme.colors.red100
            : theme.colors.base60;

          const renderIcon = () => {
            switch (options.title) {
              case t('bottomTab.scan'):
                return <Icon name={'app-camera'} color={colorBottomTab} />;
              case t('bottomTab.history'):
                return <Icon name={'app-clock-bold'} color={colorBottomTab} />;
              case t('bottomTab.create'):
                return <Icon name={'app-qr'} color={colorBottomTab} />;
              case t('bottomTab.settings'):
                return <Icon name={'app-settings'} color={colorBottomTab} />;
            }
          };
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              testID={options.tabBartestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={isFocused ? styles.viewActive : styles.viewNotActive}>
              <View style={styles.iconContainer}>{renderIcon()}</View>
              <Animated.Text
                testID={'MyTabBar-content'}
                style={[isFocused ? styles.labelActive : styles.label]}>
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        },
      )}
    </View>
  );
};

const BottomTabNavigator = () => {
  const {t} = useTranslation('screens');
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.red100,
        tabBarInactiveTintColor: theme.colors.base90,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        headerTitleAlign: 'center',
        tabBarStyle: {marginBottom: 4},
      }}
      tabBar={(prop: BottomTabBarProps) => <MyTabBar {...prop} />}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: t('bottomTab.scan'),
        }}
      />
      <Tab.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{
          title: t('bottomTab.history'),
        }}
      />
      <Tab.Screen
        name="CreateScreen"
        component={CreateScreen}
        options={{
          title: t('bottomTab.create'),
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: t('bottomTab.settings'),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    color: theme.colors.base60,
    fontWeight: '400',
  },
  labelActive: {
    fontSize: 14,
    color: theme.colors.red100,
    fontWeight: '500',
  },
  iconContainer: {
    paddingVertical: 4,
  },
  viewActive: {
    flex: 1,
    // backgroundColor: theme.colors.white,
    // borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 6,
  },
  viewNotActive: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabNavigator;
