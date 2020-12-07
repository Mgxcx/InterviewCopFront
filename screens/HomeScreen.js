import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";

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
});

export default HomeScreen;
