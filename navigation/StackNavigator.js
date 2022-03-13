import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";
import RouteScreen from "../screens/RouteScreen";
import TabOneScreen from "../screens/TabOneScreen";

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
  headerBackTitle: "",
};

const TabOneStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptionStyle,
      }}
    >
      <Stack.Screen name="Route Planner" component={TabOneScreen} />
      <Stack.Screen name="Map Router" component={RouteScreen} />
    </Stack.Navigator>
  );
};

export { TabOneStackNavigator };
