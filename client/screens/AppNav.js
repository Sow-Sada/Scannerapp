import { StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import ProductDetail from "../components/ProductDetail";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import HomeScreen from "./HomeScreen";
import Scanner from "./Scanner";
import Search from "./Search";
import Profile from "./Profile";
import Settings from "./Settings";
import SupportScreen from "./SupportScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchStack = createStackNavigator();
const HistoryStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
function SearchStackNavigator() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#eef2e6",
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
        headerLeft: null,
      }}
    >
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={{
          headerLeft: null,
          headerShown: false,
        }}
      />
      <SearchStack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({ navigation }) => ({
          headerTitle: "Product Details",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 24,
            color: "black",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-undo-outline"
                size={24}
                color="#333"
                style={{ paddingLeft: 10 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </SearchStack.Navigator>
  );
}

function HistoryStackNavigator() {
  return (
    <HistoryStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#eef2e6",
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
      }}
    >
      <HistoryStack.Screen name="History" component={HomeScreen} />
      <HistoryStack.Screen name="Product detail" component={ProductDetail} />
    </HistoryStack.Navigator>
  );
}

export default function AppNav({ initialRouteName }) {
  return (
    <>
      <NavigationContainer independent={true}>
        <SafeAreaView style={[styles.AndroidSafeArea, styles.bg]}>
          <Tab.Navigator
            screenOptions={{
              tabBarShowLabel: false,
              tabBarActiveTintColor: "#c9d7ae",
              tabBarInactiveTintColor: "#ffffff",
              tabBarHideOnKeyboard: true,
              tabBarStyle: {
                backgroundColor: "#0c8079",
                height: Platform.OS === "ios" ? 80 : 60,
                justifyContent: "center",
                paddingTop: Platform.OS === "ios" ? 20 : 0,
                paddingBottom: Platform.OS === "ios" ? 16 : 0, // Add extra padding for iOS
                safeAreaInsets: { top: 0, bottom: 0 },
              },
              tabBarItemStyle: {
                justifyContent: "center",
                paddingVertical: 6, // Add padding to the tab bar items
              },
            }}
          >
            <Tab.Screen
              name="HomeScreen"
              component={HistoryStackNavigator}
              options={{
                headerShown: false,
                tabBarIcon: (props) => (
                  <Icon name="home" type="feather" color={props.color} />
                ),
              }}
            />
            <Tab.Screen
              name="Scanner"
              component={Scanner}
              options={{
                headerShown: false,
                tabBarIcon: (props) => (
                  <Icon name="maximize" type="feather" color={props.color} />
                ),
              }}
            />
            <Tab.Screen
              name="SearchStackNavigator"
              component={SearchStackNavigator}
              options={{
                headerShown: false,
                tabBarIcon: (props) => (
                  <Icon name="search" type="feather" color={props.color} />
                ),
              }}
            />
            <Tab.Screen
              name="Profil"
              options={{
                headerShown: false,
                tabBarIcon: (props) => (
                  <Icon name="user" type="feather" color={props.color} />
                ),
              }}
            >
              {() => (
                <SettingsStack.Navigator>
                  <SettingsStack.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                      headerStyle: {
                        backgroundColor: "#eef2e6",
                      },
                      headerTintColor: "#000",
                      headerTitleStyle: {
                        fontWeight: "bold",
                      },
                    }}
                  />
                  <SettingsStack.Screen
                    options={{
                      headerStyle: {
                        backgroundColor: "#eef2e6",
                      },
                      headerTintColor: "#000",
                      headerTitleStyle: {
                        fontWeight: "bold",
                      },
                    }}
                    name="Settings"
                    component={Settings}
                  />
                  <SettingsStack.Screen
                    options={{
                      headerStyle: {
                        backgroundColor: "#eef2e6",
                      },
                      headerTintColor: "#000",
                      headerTitleStyle: {
                        fontWeight: "bold",
                      },
                    }}
                    name="Support"
                    component={SupportScreen}
                  />
                </SettingsStack.Navigator>
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </SafeAreaView>
        <StatusBar style="auto" />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    justifyContent: "flex-end",
  },
  bg: {
    backgroundColor: "#eef2e6",
  },
});
