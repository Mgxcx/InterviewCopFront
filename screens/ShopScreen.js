import React from "react";
import { StyleSheet, View, Text } from "react-native";

function ShopScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Hello it's ShopScreen !</Text>
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

export default ShopScreen;
