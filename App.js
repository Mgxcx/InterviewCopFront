import React from "react";
import { LogBox } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import AccountScreen from "./screens/AccountScreen";
import InterviewScreenHome from "./screens/InterviewScreenHome";
import InterviewScreen1 from "./screens/InterviewScreen1";
import AdvicesScreen from "./screens/AdvicesScreen";
import ShopScreen from "./screens/ShopScreen";
import InterviewScreen2 from "./screens/InterviewScreen2";
import InterviewScreen3 from "./screens/InterviewScreen3";
import InterviewScreen4 from "./screens/InterviewScreen4";
import InterviewScreen5 from "./screens/InterviewScreen5";
import InterviewScreen6 from "./screens/InterviewScreen6";
import InterviewScreen7 from "./screens/InterviewScreen7";
import InterviewScreen8 from "./screens/InterviewScreen8";
import InterviewScreen9 from "./screens/InterviewScreen9";
import InterviewScreen10 from "./screens/InterviewScreen10";
import InterviewScreenResult from "./screens/InterviewScreenResult";

LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const SecondStack = createStackNavigator();

const StackInterview = () => {
  return (
    <SecondStack.Navigator screenOptions={{ headerShown: false }}>
      <SecondStack.Screen name="InterviewScreenHome" component={InterviewScreenHome} />
      <SecondStack.Screen name="InterviewScreen1" component={InterviewScreen1} />
      <SecondStack.Screen name="InterviewScreen2" component={InterviewScreen2} />
      <SecondStack.Screen name="InterviewScreen3" component={InterviewScreen3} />
      <SecondStack.Screen name="InterviewScreen4" component={InterviewScreen4} />
      <SecondStack.Screen name="InterviewScreen5" component={InterviewScreen5} />
      <SecondStack.Screen name="InterviewScreen6" component={InterviewScreen6} />
      <SecondStack.Screen name="InterviewScreen7" component={InterviewScreen7} />
      <SecondStack.Screen name="InterviewScreen8" component={InterviewScreen8} />
      <SecondStack.Screen name="InterviewScreen9" component={InterviewScreen9} />
      <SecondStack.Screen name="InterviewScreen10" component={InterviewScreen10} />
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
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="PagesTab" component={PagesTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
