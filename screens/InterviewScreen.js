import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AppLoading } from "expo";
import { Button, Header } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

function InterviewScreen({navigation}) {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [questionList, setQuestionList] = useState();


  const urlBack = "https://interviewcoptest.herokuapp.com"; 
  
  //charge les questions (générées aléatoirement par le backend)
  useEffect( () => {
    const fetchData = async () => {
      const data = await fetch(`${urlBack}/generate-questions`);
      const body = await data.json();
      if (body.result === true) {
        // console.log(body.questionsArray);
        setQuestionList(body.questionsArray);
      }
    };
    fetchData();
  }, []);


  //incrémente le compteur questionNumber, puis redirige vers screenresult quand la question 10 a été répondue
  const handleNextQuestion = () => {
    questionNumber < 10 ? setQuestionNumber(prev => prev+1) : navigation.navigate("InterviewScreenResult");
  }

  if(!questionList) {
    return (<AppLoading></AppLoading>)
  }

  let questionDisplay = questionList[questionNumber-1];

  return (
    <View style={styles.container}>
      <Header
        barStyle="light-content"
        leftComponent={<Text style={styles.title}>{questionNumber}</Text>}
        centerComponent={<Text style={styles.title}>Entretien</Text>}
        containerStyle={styles.topbar}
      />
      <View style={styles.information}>
        <Text style={styles.title2}> {questionDisplay.question} </Text>
        <Button
          title={questionDisplay.answers[0].text}
          titleStyle={styles.textbutton}
          // onPress={() => }
          buttonStyle={styles.button}
          // TouchableComponent={TouchableHighlight}
        />
        <Button
          title={questionDisplay.answers[1].text}
          titleStyle={styles.textbutton}
          // onPress={() => }
          buttonStyle={styles.button}
        />
        <Button
          title={questionDisplay.answers[2].text}
          titleStyle={styles.textbutton}
          // onPress={() => }
          buttonStyle={styles.button}
        />
        <Button
          title={questionDisplay.answers[3].text}
          titleStyle={styles.textbutton}
          // onPress={() => }
          buttonStyle={styles.button}
        />

      </View>
      <Button
        icon={<Ionicons name="ios-arrow-forward" size={24} color="#FFFEFE" />}
        onPress={() => handleNextQuestion()}
        buttonStyle={styles.sendbutton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icoppresentation: {
    flexDirection: "row",
    flex: 1.5,
    alignSelf: "flex-end",
  },
  information: {
    flex: 4.5,
    alignItems: "center",
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
    // marginTop: 30,
    textAlign: "center",
  },
  topbar: {
    backgroundColor: "#0773A3",
    marginBottom: 10,
  },
  image: {
    width: 70,
    height: 130,
    marginTop: 30,
    marginBottom: 10,
    marginRight: 20,
  },
  button: {
    marginTop: 25,
    backgroundColor: "#4FA2C7",
    borderRadius: 15,
    width: '80%'
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
  text: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 15,
    color: "#FFFEFE",
    textAlign: "center",
    padding: 5,
  },
  input: {
    borderColor: "#0773A3",
    fontFamily: "Montserrat_500Medium",
    fontSize: 20,
    backgroundColor: "#FFFEFA",
    color: "#0773A3",
    height: 40,
    width: 280,
  },
  arrowContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1,
  },
  arrowLeftContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },

  arrowRightContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  }
});

export default InterviewScreen;
