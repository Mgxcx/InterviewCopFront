import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";
import { Button, CheckBox, Header, Overlay } from "react-native-elements";
import InputOutline from "react-native-input-outline";
import AppLoading from "expo-app-loading";
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

function InterviewScreenHome({ navigation, username, onSubmitJob, onSubmitCounty }) {
  const image = require("../assets/MikeChickenLeft.png");
  const [job, setJob] = useState("");
  const [salary, setSalary] = useState("");
  const [county, setCounty] = useState("Choisissez votre région");
  const [listErrorsNewInformation, setListErrorsNewInformation] = useState([]); //les messages d'erreur sont transmis par le Back

  //état et fonction gérant l'overlay pour choisir la region
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  //pour gérer les polices expo-google-fonts
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_700Bold,
  });

  const urlBack = "https://interviewcoptest.herokuapp.com";

  //Process NewInformation : se déclenche via le bouton "suivant" après les inputs des nouvelles informations
  //ajoute ou modifie les données du user relatives à son métier, son expérience, son salaire et son département dans la BDD via le Back
  const handleSubmitNewInformation = async () => {
    const data = await fetch(`${urlBack}/update-userdata`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `usernameFromFront=${username}&jobFromFront=${job}&salaryFromFront=${salary}&countyFromFront=${county}`,
    });

    const body = await data.json();

    if (body.result === true) {
      onSubmitJob(job);
      onSubmitCounty(county);
      navigation.navigate("InterviewScreen");
    } else {
      setListErrorsNewInformation(body.error);
    }
  };

  //affichage des erreurs liées aux nouvelles informations (ou informations à modifier) du user à stocker dans la BDD
  const tabErrorsNewInformation = listErrorsNewInformation.map((error, i) => {
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
          centerComponent={<Text style={styles.title}>Entretien</Text>}
          containerStyle={styles.topbar}
        />
        <View style={styles.icoppresentation}>
          <View style={[styles.bubble, styles.bubbleOut]}>
            <View style={[styles.balloon, { backgroundColor: "#0773A3" }]}>
              <Text style={styles.text}>
                Bonjour, {username} ! {"\n"} Ravi de vous voir !{"\n"}
                Vous allez devoir répondre à une série de 10 questions !
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
            placeholder="Salaire souhaité"
            focusedColor="#0773A3"
            defaultColor="#4FA2C7"
            style={styles.input}
            onChangeText={(salary) => setSalary(salary)}
            value={salary}
          />
          <Button
            // onChangeText={(county) => setCounty(county)}
            title={county}
            onPress={toggleOverlay}
            buttonStyle={styles.regionbutton}
            // value={county}
          />
          {tabErrorsNewInformation}
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <ScrollView>
              <View style={styles.regionview}>
                <Text style={styles.regiontitle}>Sélectionnez votre région</Text>
                <CheckBox
                  title="Auvergne-Rhone-Alpes"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={county === "Auvergne-Rhone-Alpes" ? true : false}
                  onPress={() => setCounty("Auvergne-Rhone-Alpes")}
                  containerStyle={styles.checkbox}
                />
                <CheckBox
                  title="Bourgogne-Franche-Comte"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={county === "Bourgogne-Franche-Comte" ? true : false}
                  onPress={() => setCounty("Bourgogne-Franche-Comte")}
                  containerStyle={styles.checkbox}
                />
                <CheckBox
                  title="Bretagne"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={county === "Bretagne" ? true : false}
                  onPress={() => setCounty("Bretagne")}
                  containerStyle={styles.checkbox}
                />
                <CheckBox
                  title="Centre-Val de Loire"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={county === "Centre-Val de Loire" ? true : false}
                  onPress={() => setCounty("Centre-Val de Loire")}
                  containerStyle={styles.checkbox}
                />
                <CheckBox
                  title="Corse"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={county === "Corse" ? true : false}
                  onPress={() => setCounty("Corse")}
                  containerStyle={styles.checkbox}
                />
                <CheckBox
                  title="Grand Est"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={county === "Grand Est" ? true : false}
                  onPress={() => setCounty("Grand Est")}
                  containerStyle={styles.checkbox}
                />
                <CheckBox
                  title="Hauts-de-France"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={county === "Hauts-de-France" ? true : false}
                  onPress={() => setCounty("Hauts-de-France")}
                  containerStyle={styles.checkbox}
                />
                <CheckBox
                  title="Ile-de-France"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={county === "Ile-de-France" ? true : false}
                  onPress={() => setCounty("Ile-de-France")}
                  containerStyle={styles.checkbox}
                />
                <CheckBox
                  title="Normandie"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={county === "Normandie" ? true : false}
                  onPress={() => setCounty("Normandie")}
                  containerStyle={styles.checkbox}
                />
                <CheckBox
                  title="Nouvelle-Aquitaine"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={county === "Nouvelle-Aquitaine" ? true : false}
                  onPress={() => setCounty("Nouvelle-Aquitaine")}
                  containerStyle={styles.checkbox}
                />
                <CheckBox
                  title="Occitanie"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={county === "Occitanie" ? true : false}
                  onPress={() => setCounty("Occitanie")}
                  containerStyle={styles.checkbox}
                />
                <CheckBox
                  title="Pays de la Loire"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={county === "Pays de la Loire" ? true : false}
                  onPress={() => setCounty("Pays de la Loire")}
                  containerStyle={styles.checkbox}
                />
                <CheckBox
                  title="Provence-Alpes-Cote d'Azur"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={county === "Provence-Alpes-Cote d'Azur" ? true : false}
                  onPress={() => setCounty("Provence-Alpes-Cote d'Azur")}
                  containerStyle={styles.checkbox}
                />
                <CheckBox
                  title="DOM-TOM"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={county === "DOM-TOM" ? true : false}
                  onPress={() => setCounty("DOM-TOM")}
                  containerStyle={styles.checkbox}
                />
              </View>
              <Button buttonStyle={styles.regionbutton} onPress={toggleOverlay} title="OK" />
            </ScrollView>
          </Overlay>
          <Button
            icon={<Ionicons name="ios-arrow-forward" size={24} color="#FFFEFE" />}
            onPress={() => {
              handleSubmitNewInformation();
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

function mapDispatchToProps(dispatch) {
  return {
    onSubmitJob: function (job) {
      dispatch({ type: "saveJob", job });
    },
    onSubmitCounty: function (county) {
      dispatch({ type: "saveCounty", county });
    },
  };
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
    marginTop: 10,
    backgroundColor: "#0773A3",
    borderRadius: 15,
    width: 60,
  },
  checkbox: {
    width: 250,
  },
  regionview: {
    alignItems: "center",
  },
  regionbutton: {
    color: "#FFFEFE",
    fontFamily: "Montserrat_500Medium",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 29,
    alignItems: "center",
    textAlign: "center",
    letterSpacing: 0.75,
    height: 40,
    width: 200,
    marginTop: 20,
    borderRadius: 10,
    alignSelf: "center",
  },
  regionselect: {
    flexDirection: "row",
    alignItems: "center",
  },
  regiontitle: {
    color: "#0773A3",
    fontFamily: "Montserrat_700Bold",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 15,
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

export default connect(mapStateToProps, mapDispatchToProps)(InterviewScreenHome);
