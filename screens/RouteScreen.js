import React from "react";
import { View, Text } from "react-native";

const RouteScreen = ({ route, navigation }) => {
  const { travelSequence, locations } = route.params;
  let bestSequence = [];

  travelSequence.forEach((index) => {
    bestSequence.push(locations[index]);
  });

  console.log("sequence", travelSequence);
  console.log("best", bestSequence);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default RouteScreen;
