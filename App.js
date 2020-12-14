import React from "react";
import { LogBox } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import PasswordRecoveryScreen from "./screens/PasswordRecoveryScreen";
import HomeScreen from "./screens/HomeScreen";
import AccountScreen from "./screens/AccountScreen";
import InterviewScreenHome from "./screens/InterviewScreenHome";
import InterviewScreen from "./screens/InterviewScreen";
import AdvicesScreen from "./screens/AdvicesScreen";
import ShopScreen from "./screens/ShopScreen";
import InterviewScreenResult from "./screens/InterviewScreenResult";

import username from "./reducers/username.reducer";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { Provider as PaperProvider } from 'react-native-paper';

const store = createStore(combineReducers({ username }));

LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const SecondStack = createStackNavigator();

const StackInterview = () => {
  return (
    <SecondStack.Navigator screenOptions={{ headerShown: false }}>
      <SecondStack.Screen name="InterviewScreenHome" component={InterviewScreenHome} />
      <SecondStack.Screen name="InterviewScreen" component={InterviewScreen} />
      <SecondStack.Screen name="InterviewScreenResult" component={InterviewScreenResult} />
    </SecondStack.Navigator>
  );
};

const PagesTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Account") {
            iconName = "user-alt";
          } else if (route.name === "Interview") {
            iconName = "running";
          } else if (route.name === "Advices") {
            iconName = "readme";
          } else if (route.name === "Shop") {
            iconName = "store";
          }

          // You can return any component that you like here!
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#E8C518",
        inactiveTintColor: "#FFFEFA",
        activeBackgroundColor: "#0773A3",
        inactiveBackgroundColor: "#0773A3",
        showLabel: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Interview" component={StackInterview} />
      <Tab.Screen name="Advices" component={AdvicesScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryScreen} />
            <Stack.Screen name="PagesTab" component={PagesTab} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
