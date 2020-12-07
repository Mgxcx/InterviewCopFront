import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import InputOutline from "react-native-input-outline";
import { AppLoading } from "expo";
import DropDownPicker from "react-native-dropdown-picker";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.signin}>
          <Text style={styles.text}>Déjà un compte ?</Text>
          <InputOutline
            placeholder="Username"
            focusedColor="#0773A3"
            defaultColor="#4FA2C7"
            style={styles.input}
            onChangeText={(username) => setUsername(username)}
            value={username}
          />
          <InputOutline
            placeholder="Mot de passe"
            focusedColor="#0773A3"
            defaultColor="#4FA2C7"
            style={styles.input}
            onChangeText={(password) => setPassword(password)}
            value={password}
          />
          <Text style={styles.smalltext}>Mot de passe oublié ?</Text>
          <Button title="Se connecter" type="solid" buttonStyle={styles.button} />
        </View>
        <View style={styles.signup}>
          <Text style={styles.text}>Pas encore de compte ?</Text>
          <InputOutline
            placeholder="Username"
            focusedColor="#0773A3"
            defaultColor="#4FA2C7"
            style={styles.input}
            onChangeText={(username) => setUsername(username)}
            value={username}
          />
          <InputOutline
            placeholder="Mot de passe"
            focusedColor="#0773A3"
            defaultColor="#4FA2C7"
            style={styles.input}
            onChangeText={(password) => setPassword(password)}
            value={password}
          />
          <DropDownPicker
            items={[
              {
                label: "Quel est le nom de votre premier animal de compagnie?",
                value: "Quel est le nom de votre premier animal de compagnie?",
              },
              {
                label: "Quelle est la date de naissance de votre mère?",
                value: "Quelle est la date de naissance de votre mère?",
              },
            ]}
            defaultIndex={0}
            placeholder="Choisissez une question secrète"
            style={styles.colordropdown}
            dropDownStyle={styles.colordropdown}
            containerStyle={styles.dropdown}
            labelStyle={styles.labeldropdown}
            onChangeItem={(item) => setSecretQuestion(item.value)}
            value={secretQuestion}
          />

          <InputOutline
            placeholder="Réponse"
            focusedColor="#0773A3"
            defaultColor="#4FA2C7"
            style={styles.input}
            onChangeText={(answer) => setAnswer(answer)}
            value={answer}
          />
          <Button title="Se connecter" type="solid" buttonStyle={styles.button} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
    backgroundColor: "#FFFEFA",
  },
  signin: {
    flex: 2.3,
    alignItems: "center",
  },
  signup: {
    flex: 3,
    alignItems: "center",
  },
  text: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 20,
    color: "#0773A3",
  },
  smalltext: {
    fontFamily: "Montserrat_400Regular",
    fontStyle: "italic",
    fontSize: 13,
    color: "#0773A3",
    marginTop: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0773A3",
    borderRadius: 15,
  },
  dropdown: {
    height: 40,
    width: 220,
    marginTop: 20,
  },
  labeldropdown: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 12,
    color: "#0773A3",
  },
  colordropdown: {
    borderColor: "#0773A3",
    backgroundColor: "#FFFEFA",
  },
  input: {
    borderColor: "#0773A3",
    fontFamily: "Montserrat_500Medium",
    fontSize: 20,
    backgroundColor: "#FFFEFA",
    color: "#0773A3",
    height: 40,
    width: 220,
  },
});
