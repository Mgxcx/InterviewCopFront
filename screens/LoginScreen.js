import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, Header } from "react-native-elements";
import InputOutline from "react-native-input-outline";
import { AppLoading } from "expo";
import DropDownPicker from "react-native-dropdown-picker";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_400Regular_Italic,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function LoginScreen({ navigation }) {
  //états liés au Sign-Up
  const [signUpUsername, setSignUpUsername] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [secretQuestion, setSecretQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const logo = require("../assets/MikeChickenRight.png");
  const [listErrorsSignup, setErrorsSignup] = useState([])    //les messages d'erreur sont transmis par le Back

  //états liés au Sign-In
  const [signInUsername, setSignInUsername] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [listErrorsSignin, setErrorsSignin] = useState([])    //les messages d'erreur sont transmis par le Back

  
  const [userExists, setUserExists] = useState(false)   //état lié à la vérification de l'existence du user dans la BDD 

  //pour gérer les polices expo-google-fonts
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_700Bold,
  });

  //Process SignUp : se déclenche via le bouton connecter du "pas encore de compte?"
  //interroge la BDD via le Back, le Back vérifie que le user est bien créé dans la BDD et renvoie un message d'erreur le cas échéant
  const handleSubmitSignup = async () => {
    const urlBack = "http://192.168.1.16:3000"      //URL A METTRE A JOUR AVEC L'URL D'HEROKU
    const data = await fetch(`${urlBack}/sign-up`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `usernameFromFront=${signUpUsername}&passwordFromFront=${signUpPassword}&secret_question=${secretQuestion}&secret_question_answer=${answer}`
    })

    const body = await data.json()

    if(body.result === true){
      setUserExists(true)
      
    } else {
      setErrorsSignup(body.error)
    }

  }

  //Process SignIn : se déclenche via le bouton connecter du "déjà un compte?"
  //interroge la BDD via le Back, le Back vérifie que le user existe dans la BDD et renvoie un message d'erreur le cas échéant
  const handleSubmitSignin = async () => {
    const urlBack = "http://192.168.1.16:3000"      //URL A METTRE A JOUR AVEC L'URL D'HEROKU
    const data = await fetch(`${urlBack}/sign-in`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `usernameFromFront=${signInUsername}&passwordFromFront=${signInPassword}`
    })

    const body = await data.json()

    if(body.result === true){
      setUserExists(true)      
    }  else {
      setErrorsSignin(body.error)
    }

  }

  //déclenche la redirection vers HomeScreen si le SignIn ou le SignUp a bien réussi
  useEffect(()=>{
    if(userExists){
      navigation.navigate("PagesTab");
    }
  }, [userExists])


  //affichage des erreurs liées au SignIn
  const tabErrorsSignin = listErrorsSignin.map((error,i) => {
    return(<Text>{error}</Text>)
  })

  //affichage des erreurs liées au SignUp
  const tabErrorsSignup = listErrorsSignup.map((error,i) => {
    return(<Text>{error}</Text>)
  })

  if (!fontsLoaded) {     //mécanique pour attendre que les polices soient chargées avant de générer le screen
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
        <View style={styles.signin}>
          <Text style={styles.text}>Déjà un compte ?</Text>
          <InputOutline
            placeholder="Username"
            focusedColor="#0773A3"
            defaultColor="#4FA2C7"
            style={styles.input}
            onChangeText={(username) => setSignInUsername(username)}
            value={signInUsername}
          />

          <InputOutline
            placeholder="Mot de passe"
            focusedColor="#0773A3"
            defaultColor="#4FA2C7"
            style={styles.input}
            value={signInPassword}
            onChangeText={(password) => setSignInPassword(password)}
          />

          <Text style={styles.smalltext}>Mot de passe oublié ?</Text>

          {tabErrorsSignin}

          <Button title="Se connecter" titleStyle={styles.textbutton} type="solid" buttonStyle={styles.button} onPress={() => handleSubmitSignin()} />
        </View>

        <View style={styles.signup}>
          <Text style={styles.text}>Pas encore de compte ?</Text>
          <InputOutline
            placeholder="Username"
            focusedColor="#0773A3"
            defaultColor="#4FA2C7"
            style={styles.input}
            onChangeText={(username) => setSignUpUsername(username)}
            value={signUpUsername}
          />
          <InputOutline
            placeholder="Mot de passe"
            focusedColor="#0773A3"
            defaultColor="#4FA2C7"
            style={styles.input}
            onChangeText={(password) => setSignUpPassword(password)}
            value={signUpPassword}
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
              }
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

          {tabErrorsSignup}

          <Button title="Se connecter" titleStyle={styles.textbutton} type="solid" buttonStyle={styles.button} onPress={() => handleSubmitSignup()} />
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
  topbar: {
    backgroundColor: "#0773A3",
    marginBottom: 10,
  },
  title: {
    color: "#FFFEFA",
    fontFamily: "Montserrat_700Bold",
    fontSize: 22,
  },
  logo: {
    width: 20,
    height: 35,
    marginLeft: 70,
  },
  text: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 20,
    color: "#0773A3",
  },
  smalltext: {
    fontFamily: "Montserrat_400Regular_Italic",
    fontSize: 13,
    color: "#0773A3",
    marginTop: 5,
  },
  button: {
    marginTop: 10,
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
