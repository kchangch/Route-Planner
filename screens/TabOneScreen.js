import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../components/InputField";
import { Button } from "react-native-elements";
import { getCoords, getDistanceMatrix } from "../api/requests";

let locations = [];
let coordinates = [];

export default function TabOneScreen({ navigation }) {
  const [origin, setOrigin] = useState("v5s1k3");
  const [destination, setDestination] = useState("v5y0k2");
  const [hasMoreStops, setHasMoreStops] = useState(false);

  const handleSubmit = async () => {
    for (let location of locations) {
      const current = await getCoords(location);
      coordinates.push({
        latitude: current.resourceSets[0].resources[0].point.coordinates[0],
        longitude: current.resourceSets[0].resources[0].point.coordinates[1],
      });
    }
    let distMatrix = (await getDistanceMatrix(coordinates)).resourceSets[0]
      .resources[0].results;
    let shortestSequence = optimizeRoutes(distMatrix);
    navigation.navigate("Map Router", {
      travelSequence: shortestSequence,
      locations: locations,
    });
  };

  const optimizeRoutes = (distMatrix) => {
    let shortestSequence = [0];
    for (let i = 0; i < locations.length - 1; i++) {
      shortestSequence.push(
        distMatrix
          .filter((dist) => {
            return (
              dist.originIndex === shortestSequence[i] &&
              !shortestSequence.includes(dist.destinationIndex)
            );
          })
          .reduce((prev, curr) => {
            return prev.travelDistance > curr.travelDistance &&
              !shortestSequence.includes(curr.destinationIndex)
              ? curr
              : prev;
          }).destinationIndex
      );
    }

    return shortestSequence;
  };

  const optimizeRoutess = (distMatrix) => {
    let shortestSequence = [0];
    let totalDistance = 0;
    let calculatedDistances = {};

    return shortestSequence;
  };

  const handleAddLocation = async () => {
    if (!hasMoreStops) {
      locations.push(origin);
      locations.push(destination);
      return;
    }
    locations.push(destination);
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <InputField
              headerText={!hasMoreStops ? "Origin" : "Extra destination"}
              value={!hasMoreStops ? origin : destination}
              callback={(text) =>
                !hasMoreStops ? setOrigin(text) : setDestination(text)
              }
              placeholder={!hasMoreStops ? "Enter origin" : "Enter destination"}
            />
            {!hasMoreStops ? (
              <InputField
                headerText={"Destination"}
                value={destination}
                callback={(text) => setDestination(text)}
                placeholder={"Enter destination"}
              />
            ) : null}
            <View>
              <Button
                containerStyle={{ borderRadius: 10 }}
                buttonStyle={{
                  paddingVertical: 15,
                  backgroundColor: "#14889F",
                }}
                titleStyle={{
                  fontWeight: "bold",
                  color: "white",
                }}
                title="Add more location"
                onPress={() => {
                  handleAddLocation();
                  setHasMoreStops(true);
                  setDestination("");
                }}
              />
            </View>
            <View style={{ paddingBottom: 15 }} />
            <View>
              <Button
                containerStyle={{ borderRadius: 10 }}
                buttonStyle={{
                  paddingVertical: 15,
                  backgroundColor: "#14889F",
                }}
                titleStyle={{
                  fontWeight: "bold",
                  color: "white",
                }}
                title="Calculate"
                onPress={() => {
                  handleAddLocation();
                  handleSubmit();
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
