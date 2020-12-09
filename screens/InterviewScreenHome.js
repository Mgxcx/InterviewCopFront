import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Button, Header } from "react-native-elements";
import InputOutline from "react-native-input-outline";
import { AppLoading } from "expo";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_400Regular_Italic,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import Svg, { Path } from "react-native-svg";
import { moderateScale } from "react-native-size-matters";

function InterviewScreenHome({ navigation, username }) {
  const image = require("../assets/MikeChickenLeft.png");
  const [job, setJob] = useState("");
  const [jobexp, setJobexp] = useState("");
  const [salary, setSalary] = useState("");
  const [county, setCounty] = useState("");

  //pour gérer les polices expo-google-fonts
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    //mécanique pour attendre que les polices soient chargées avant de générer le screen
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Header
          barStyle="light-content"
          centerComponent={<Text style={styles.title}>Entretien</Text>}
          containerStyle={styles.topbar}
        />
        <View style={styles.icoppresentation}>
          <View style={[styles.bubble, styles.bubbleOut]}>
            <View style={[styles.balloon, { backgroundColor: "#0773A3" }]}>
              <Text style={styles.text}>
                Bonjour, {username} ! Ravi de vous rencontrer ! Vous allez devoir répondre à une série de 10 questions !{" "}
              </Text>
              <View style={[styles.arrowContainer, styles.arrowRightContainer]}>
                <Svg
                  style={styles.arrowRight}
                  width={moderateScale(15.5, 0.6)}
                  height={moderateScale(17.5, 0.6)}
                  viewBox="32.485 17.5 15.515 17.5"
                  enable-background="new 32.485 17.5 15.515 17.5"
                >
                  <Path d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z" fill="#0773A3" x="0" y="0" />
                </Svg>
              </View>
            </View>
          </View>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.information}>
          <Text style={styles.title2}> Quelques infos sur vous avant de commencer ! </Text>
          <InputOutline
            placeholder="Métier Recherché"
            focusedColor="#0773A3"
            defaultColor="#4FA2C7"
            style={styles.input}
            onChangeText={(job) => setJob(job)}
            value={job}
          />
          <InputOutline
            placeholder="Années d'expériences pro"
            focusedColor="#0773A3"
            defaultColor="#4FA2C7"
            style={styles.input}
            onChangeText={(jobexp) => setJobexp(jobexp)}
            value={jobexp}
          />
          <InputOutline
            placeholder="Salaire souhaité"
            focusedColor="#0773A3"
            defaultColor="#4FA2C7"
            style={styles.input}
            onChangeText={(salary) => setSalary(salary)}
            value={salary}
          />
          <InputOutline
            placeholder="Département"
            focusedColor="#0773A3"
            defaultColor="#4FA2C7"
            style={styles.input}
            onChangeText={(county) => setCounty(county)}
            value={department}
          />
          <Button
            icon={<Ionicons name="ios-arrow-forward" size={24} color="#FFFEFE" />}
            onPress={() => {
              navigation.navigate("InterviewScreen1");
            }}
            buttonStyle={styles.button}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { username: state.username };
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
    marginTop: 30,
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
    marginTop: 20,
    backgroundColor: "#0773A3",
    borderRadius: 15,
    width: 60,
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
  bubble: {
    marginVertical: moderateScale(7, 2),
    width: 230,
  },
  bubbleIn: {
    marginLeft: 20,
  },
  bubbleOut: {
    marginRight: 20,
  },
  balloon: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 20,
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
  },

  arrowLeft: {
    left: moderateScale(-6, 0.5),
  },

  arrowRight: {
    right: moderateScale(-6, 0.5),
  },
});

export default connect(mapStateToProps, null)(InterviewScreenHome);
