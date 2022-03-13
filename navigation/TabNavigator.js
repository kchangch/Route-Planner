import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import TabOneScreen from "../screens/TabOneScreen";
import { TabOneStackNavigator } from "./StackNavigator";
import { Icon } from "react-native-elements";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "My Planner") {
            iconName = "location-outline";
          } else if (route.name === "TabTwo") {
            iconName = "user-bounty-hunter";
          }
          return (
            <Icon
              name={iconName}
              type={"ionicon"}
              size={25}
              color={"#002C66"}
            />
          );
        },
        tabBarActiveTintColor: "#002C66",
        tabBarInactiveTintColor: "#002C66",
        // tabBarStyle: {
        //   backgroundColor: "#666",
        // },
      })}
    >
      <BottomTab.Screen name="My Planner" component={TabOneStackNavigator} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
