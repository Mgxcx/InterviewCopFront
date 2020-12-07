import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-elements";

function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Hello it's LoginScreen !</Text>
      <Button
        icon={<FontAwesome name="arrow-right" size={24} color="white" />}
        title="Se connecter"
        onPress={() => {
          navigation.navigate("PagesTab");
        }}
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
});

export default LoginScreen;
