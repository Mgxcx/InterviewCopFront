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
import ChatScreen from "./screens/ChatScreen";

import username from "./reducers/username.reducer";
import score from "./reducers/score.reducer";
import detailedscore from "./reducers/detailedscore.reducer";
import job from "./reducers/job.reducer";
import county from "./reducers/county.reducer";

import { Provider as StoreProvider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const store = createStore(combineReducers({ username, score, detailedscore, job, county }));

LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const SecondStack = createStackNavigator();
const ThirdStack = createStackNavigator();

const StackInterview = () => {
  return (
    <SecondStack.Navigator screenOptions={{ headerShown: false }}>
      <SecondStack.Screen name="InterviewScreenHome" component={InterviewScreenHome} />
      <SecondStack.Screen name="InterviewScreen" component={InterviewScreen} />
      <SecondStack.Screen name="InterviewScreenResult" component={InterviewScreenResult} />
    </SecondStack.Navigator>
  );
};

const StackAccount = () => {
  return (
    <ThirdStack.Navigator screenOptions={{ headerShown: false }}>
      <ThirdStack.Screen name="AccountScreen" component={AccountScreen} />
      <ThirdStack.Screen name="ChatScreen" component={ChatScreen} />
    </ThirdStack.Navigator>
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
      <Tab.Screen name="Account" component={StackAccount} />
      <Tab.Screen name="Interview" component={StackInterview} />
      <Tab.Screen name="Advices" component={AdvicesScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
    </Tab.Navigator>
  );
};

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    disabled: "#4FA2C7",
    placeholder: "#4FA2C7",
    text: "#4FA2C7",
    accent: "#f1c40f",
    background: "#FFFEFA",
    surface: "#4FA2C7",
    backdrop: "#0773A3",
    primary: "#0773A3",
    accent: "#4FA2C7",
  },
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryScreen} />
            <Stack.Screen name="PagesTab" component={PagesTab} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}
