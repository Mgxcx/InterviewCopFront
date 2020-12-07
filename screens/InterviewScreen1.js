import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

function InterviewScreen1({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Hello it's InterviewScreen1 !</Text>
      <Button
        icon={<MaterialIcons name="navigate-next" size={24} color="#FFFEFE" />}
        // onPress={() => {
        //   navigation.navigate("InterviewScreen2");
        // }}
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
  sendbutton: {
    backgroundColor: "#84817a",
  },
});

export default InterviewScreen1;
