import React from "react";
import { StyleSheet, View, Text } from "react-native";

function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Hello it's AccountScreen !</Text>
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

export default AccountScreen;
