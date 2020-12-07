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


LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
            iconName = "store-alt";
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
      <Tab.Screen name="Interview" component={InterviewScreenHome} />
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
        <Stack.Screen name="InterviewScreen1" component={InterviewScreen1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
