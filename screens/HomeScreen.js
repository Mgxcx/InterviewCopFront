import React from "react";
import { StyleSheet, View, Text } from "react-native";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Hello it's HomeScreen !</Text>
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
});

export default HomeScreen;
