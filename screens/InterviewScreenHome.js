import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

function InterviewScreenHome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Hello it's InterviewScreenHome !</Text>
      <Button
        icon={<Ionicons name="ios-arrow-forward" size={24} color="#FFFEFE" />}
        onPress={() => {
          navigation.navigate("InterviewScreen1");
        }}
        buttonStyle={styles.sendbutton}
      />
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
  textbutton: {
    color: "#FFFEFE",
    // fontFamily: Montserrat,
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 29,
    alignItems: "center",
    textAlign: "center",
    letterSpacing: 0.75,
  },
  sendbutton: {
    backgroundColor: "#0773A3",
    borderRadius: 20,
    marginTop: 10,
  },
});

export default InterviewScreenHome;
