import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Hello it's ScreenHome !</Text>
      <Button
        title="GO !"
        titleStyle={styles.textbutton}
        onPress={() => {
          navigation.navigate("Interview");
        }}
        buttonStyle={styles.sendbutton}
      />
      <Button
        title="Des conseils !"
        titleStyle={styles.textbutton}
        onPress={() => {
          navigation.navigate("Advices");
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
    fontFamily: "Montserrat_500Medium",
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

export default HomeScreen;
