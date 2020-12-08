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
  const logo = require("../assets/MikeChickenRight.png");
  return (
    <View style={styles.container}>
      <Header
        barStyle="light-content"
        leftComponent={<Image source={logo} style={styles.logo} />}
        centerComponent={<Text style={styles.title}>InterviewCop</Text>}
        containerStyle={styles.topbar}
      />
      <Text style={styles.title}> Hello Username !</Text>
      <Button
        title="GO !"
        titleStyle={styles.textbutton}
        onPress={() => {
          navigation.navigate("Interview");
        }}
        buttonStyle={styles.button}
      />
      <Button
        title="Des conseils !"
        titleStyle={styles.textbutton}
        onPress={() => {
          navigation.navigate("Advices");
        }}
        buttonStyle={styles.button}
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
  title: {
    color: "#FFFEFA",
    fontFamily: "Montserrat_700Bold",
    fontSize: 22,
  },
  textbutton: {
    color: "#FFFEFE",
    fontFamily: "Montserrat_500Medium",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 29,
    alignItems: "center",
    textAlign: "center",
    letterSpacing: 0.75,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0773A3",
    borderRadius: 15,
    width: 140,
  },
});

export default HomeScreen;
