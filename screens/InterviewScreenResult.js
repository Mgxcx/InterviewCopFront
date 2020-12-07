import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

function InterviewScreenResult() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Hello it's InterviewScreenResult !</Text>
      <Button icon={<Ionicons name="ios-arrow-forward" size={24} color="#FFFEFE" />} buttonStyle={styles.sendbutton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  sendbutton: {
    backgroundColor: "#0773A3",
    borderRadius: 15,
    marginTop: 10,
  },
});

export default InterviewScreenResult;
