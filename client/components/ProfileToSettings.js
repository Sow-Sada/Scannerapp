import Profile from '../screens/Profile';
import {
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Platform,
  Share,
} from 'react-native';
import Settings from '../screens/Settings';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingStack = createStackNavigator();

export default function ProfileToSettingsStackNavigator() {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#eef2e6',
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
        headerLeft: null,
      }}>
      <SettingStack.Screen
        name='Profile'
        component={Profile}
        options={{
          headerLeft: null,
          headerShown: false,
        }}
      />
      <SettingStack.Screen
        name='Settings'
        component={Settings}
        options={({ navigation }) => ({
          headerTitle: 'Settings',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
            color: 'black',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name='arrow-undo-outline'
                size={24}
                color='#333'
                style={{ paddingLeft: 10 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </SettingStack.Navigator>
  );
}
