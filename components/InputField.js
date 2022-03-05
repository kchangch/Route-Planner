import React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";

const InputField = ({ headerText, value, placeholder, callback }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>{headerText}</Text>
      <TextInput
        style={{
          ...styles.inputStyle,
          backgroundColor: "#e0e0e0",
          borderColor: "#666",
          color: "black",
        }}
        value={value}
        onChangeText={(text) => callback(text)}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textHeader: {
    fontSize: 18,
    fontWeight: "600",
    paddingBottom: 20,
  },
  container: {
    paddingBottom: 15,
  },
});

export default InputField;
