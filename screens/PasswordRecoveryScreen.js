import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, Header } from "react-native-elements";
import AppLoading from "expo-app-loading";
import DropDownPicker from "react-native-dropdown-picker";
import { connect } from "react-redux";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_400Regular_Italic,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

function PasswordRecoveryScreen({ navigation, onSubmitUsername }) {
  //états liés à l'utilisateur
  const [username, setUsername] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const logo = require("../assets/MikeChickenRight.png");
  const [listErrorsPasswordRecovery, setListErrorsPasswordRecovery] = useState([]); //les messages d'erreur sont transmis par le Back
  const [listErrorsNewPassword, setListErrorsNewPassword] = useState([]); //les messages d'erreur sont transmis par le Back

  const [userQuestionAndAnswer, setUserQuestionAndAnswer] = useState(false); //état lié à la vérification de la question secrète choisie et la réponse du user dans la BDD
  const [newPassword, setNewPassword] = useState("");

  //pour gérer les polices expo-google-fonts
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_700Bold,
  });

  const urlBack = "https://interviewcoptest.herokuapp.com";

  //Process PasswordRecovery : se déclenche via le bouton valider de la récupération de mot de passe
  //interroge la BDD via le Back, le Back vérifie que la question secrète choisie et la réponse correspondent au User et renvoie un message d'erreur le cas échéant
  const handleSubmitPasswordRecovery = async () => {
    const data = await fetch(`${urlBack}/password-recovery`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `usernameFromFront=${username}&secret_questionFromFront=${secretQuestion}&secret_question_answerFromFront=${answer}`,
    });

    const body = await data.json();

    if (body.result === true) {
      setUserQuestionAndAnswer(true);
    } else {
      setListErrorsPasswordRecovery(body.error);
    }
  };
  let newPasswordView;
  if (userQuestionAndAnswer) {
    newPasswordView = (
      <View style={styles.newpassword}>
        <InputOutline
          placeholder="New Password"
          focusedColor="#0773A3"
          defaultColor="#4FA2C7"
          style={styles.input}
          onChangeText={(newPassword) => setNewPassword(newPassword)}
          value={newPassword}
        />
        <Button
          title="Valider"
          titleStyle={styles.textbutton}
          type="solid"
          buttonStyle={styles.button}
          onPress={() => {
            handleSubmitNewPassword();
          }}
        />
      </View>
    );
  }

  //Process NewPassword : se déclenche via le bouton valider du nouveau mot de passe
  //modifie le password de la BDD via le Back
  const handleSubmitNewPassword = async () => {
    const data = await fetch(`${urlBack}/new-password`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `usernameFromFront=${username}&newPasswordFromFront=${newPassword}`,
    });

    const body = await data.json();

    if (body.result === true) {
      onSubmitUsername(username);
      navigation.navigate("PagesTab");
    } else {
      setListErrorsNewPassword(body.error);
    }
  };

  //affichage des erreurs liées au Password Recovery
  const tabErrorsPasswordRecovery = listErrorsPasswordRecovery.map((error, i) => {
    return <Text key={i}>{error}</Text>;
  });

  //affichage des erreurs liées au New Password
  const tabErrorsNewPassword = listErrorsNewPassword.map((error, i) => {
    return <Text key={i}>{error}</Text>;
  });

  if (!fontsLoaded) {
    //mécanique pour attendre que les polices soient chargées avant de générer le screen
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Header
          barStyle="light-content"
          leftComponent={<Image source={logo} style={styles.logo} />}
          centerComponent={<Text style={styles.title}>InterviewCop</Text>}
          containerStyle={styles.topbar}
        />
        <View style={styles.passwordrecovery}>
          <Text style={styles.title2}>Récupération du mot de passe</Text>

          <InputOutline
            placeholder="Username"
            focusedColor="#0773A3"
            defaultColor="#4FA2C7"
            style={styles.input}
            onChangeText={(username) => setUsername(username)}
            value={username}
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
              {
                label: "Quel est votre plat favori?",
                value: "Quel est votre plat favori?",
              },
            ]}
            defaultIndex={0}
            placeholder="Choisissez une question secrète"
            style={styles.colordropdown}
            dropDownStyle={styles.colordropdown}
            containerStyle={styles.containerdropdown}
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

          {tabErrorsPasswordRecovery}

          <Button
            title="Valider"
            titleStyle={styles.textbutton}
            type="solid"
            buttonStyle={styles.button}
            onPress={() => {
              handleSubmitPasswordRecovery();
            }}
          />
        </View>
        {newPasswordView}
        {tabErrorsNewPassword}
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitUsername: function (username) {
      dispatch({ type: "saveUsername", username });
    },
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFEFA",
  },
  passwordrecovery: {
    flex: 3,
    alignItems: "center",
  },
  newpassword: {
    flex: 2.3,
    alignItems: "center",
  },
  topbar: {
    backgroundColor: "#0773A3",
    marginBottom: 10,
  },
  title: {
    color: "#FFFEFA",
    fontFamily: "Montserrat_700Bold",
    fontSize: 22,
  },
  title2: {
    color: "#0773A3",
    fontFamily: "Montserrat_700Bold",
    fontSize: 22,
    marginTop: 30,
    marginBottom: 10,
  },
  logo: {
    width: 20,
    height: 35,
    marginLeft: 70,
  },
  text: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 18,
    color: "#0773A3",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0773A3",
    borderRadius: 15,
    width: 140,
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
  containerdropdown: {
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

export default connect(null, mapDispatchToProps)(PasswordRecoveryScreen);
