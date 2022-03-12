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
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabOneScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map Router"
        component={RouteScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export { TabOneStackNavigator };
