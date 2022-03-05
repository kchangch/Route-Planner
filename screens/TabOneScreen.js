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
import { getCoords } from "../api/requests";

export default function TabOneScreen({ navigation }) {
  const [origin, setOrigin] = useState("");
  const [locations, setLocations] = useState([]);

  const appendInput = (location) => {
    setLocations((oldArray) => [...oldArray, location]);
  };

  const handleSubmit = async () => {
    // const myCoords_start = await getCoords(origin);
    // console.log(myCoords_start);
    // const myCoords_end = await getCoords(destination);
    // console.log(myCoords_end);
    for (dest of locations) {
      console.log(await getCoords(dest));
    }
    // console.log("my coords", myCoords);
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <InputField
              headerText={"Origin"}
              value={origin}
              callback={(text) => appendInput(text)}
              placeholder={"Enter origin"}
            />
            <InputField
              headerText={"Destination"}
              value={origin}
              callback={(text) => appendInput(text)}
              placeholder={"Enter destination"}
            />
            f
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
                onPress={handleSubmit}
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
