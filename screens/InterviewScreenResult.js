import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Button, Header, Overlay } from "react-native-elements";
import { Rating } from "react-native-ratings";
import AppLoading from "expo-app-loading";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { VictoryBar, VictoryChart, VictoryPie } from "victory-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_400Regular_Italic,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

function InterviewScreenResult({ username, navigation, score, detailedscore, job, county }) {
  const image = require("../assets/MikeChickenLeft.png");
  const [rating, setRating] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayVisible2, setOverlayVisible2] = useState(false);
  const [overlayVisible3, setOverlayVisible3] = useState(false);
  const [overlayVisible4, setOverlayVisible4] = useState(false);
  const [listErrorsNewTrophy, setListErrorsNewTrophy] = useState([]);
  const [lastTrophy, setLastTrophy] = useState("");
  const [salary, setSalary] = useState("Aucune donnée disponible");
  const [categoriesScores, setCategoriesScores] = useState();
  let trophy;
  //pour gérer les polices expo-google-fonts
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_700Bold,
  });

  const urlBack = "https://interviewcoptest.herokuapp.com";

  useEffect(() => {
    //gestion des résultats par catégorie dans les statistiques détaillées
    var categories = [
      "Parler de soi",
      "Storytelling",
      "Préparatifs de l’entretien",
      "Projection dans l’entreprise",
      "Négociation",
    ];

    var categoriesScores = categories.map((category) => {
      let indices = [];
      var idx = detailedscore.category.indexOf(category);
      while (idx != -1) {
        indices.push(idx);
        idx = detailedscore.category.indexOf(category, idx + 1);
      }

      let scoreCategory;
      if (indices.length > 0) {
        scoreCategory = indices.map((indice) => {
          let indiceScore = detailedscore.score[indice];
          return indiceScore;
        });
      }

      let numberPointsFalse;
      let numberPointsMax;
      let sumScoreCategory;
      if (typeof scoreCategory != "undefined") {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        sumScoreCategory = scoreCategory.reduce(reducer);
        numberPointsMax = indices.length * 10;
        numberPointsFalse = numberPointsMax - sumScoreCategory;
      }
      return {
        category,
        sumScoreCategory,
        numberPointsMax,
        numberPointsFalse,
      };
    });
    //déclenche le setCategoriesScores au chargement de la page pour récupérer les scores détaillées enregistrés dans Redux
    // pour pouvoir l'afficher dans les statistiques détaillées
    setCategoriesScores(categoriesScores);

    //gestion du score 5 étoiles
    let newScore5Star = score / 10 / 2;
    //déclenche le setRating au chargement de la page pour récupérer le dernier score enregistré dans Redux
    // pour pouvoir l'afficher ici dans InterviewScreenResult
    setRating(newScore5Star);

    //calcul du salaire d'embauche en récupérant les infos stockées dans redux et en appelant la route du back correspondante
    const calculateSalary = async () => {
      const data = await fetch(`${urlBack}/scrape-salary?job=${job}&county=${county}`);
      const body = await data.json();
      if (body.result === true) {
        setSalary(body.salary);
      }
    };
    calculateSalary();
  }, []);

  //Process NewTrophy : se déclenche via le bouton "suivant" après les conseils suite au dernier entretien
  //récupère le dernier trophée gagné dans la BDD via le Back pour pouvoir le montrer à l'utilisateur
  const handleSubmitNewTrophy = async () => {
    const data = await fetch(`${urlBack}/interviewfind-lasttrophy`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `usernameFromFront=${username}`,
    });

    const body = await data.json();

    if (body.result === true) {
      setLastTrophy(body.lastTrophyToShow); //on stocke dans un état le trophée récupéré du back
      setListErrorsNewTrophy(body.error);
    }
  };

  // vérification du nombre du trophée stocké précédemment dans l'état pour pouvoir attribuer une image de trophée en fonction
  if (lastTrophy.number) {
    if (lastTrophy.number == 1) {
      trophy = require("../assets/badgeparfait.png");
    } else if (lastTrophy.number == 2) {
      trophy = require("../assets/badgepresqueparfait.png");
    } else {
      trophy = require("../assets/badgeaparfaire.png");
    }
  }

  //affichage des erreurs liées au nouveau trophée du user récupéré de la BDD
  const tabErrorsNewTrophy = listErrorsNewTrophy.map((error, i) => {
    return <Text key={i}>{error}</Text>;
  });

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };
  const toggleOverlay2 = () => {
    setOverlayVisible2(!overlayVisible2);
  };
  const toggleOverlay3 = () => {
    setOverlayVisible3(!overlayVisible3);
  };

  const toggleOverlay4 = () => {
    setOverlayVisible4(!overlayVisible4);
  };

  if (!fontsLoaded) {
    //mécanique pour attendre que les polices soient chargées avant de générer le screen
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Header
          barStyle="light-content"
          centerComponent={<Text style={styles.title}>Résultat</Text>}
          containerStyle={styles.topbar}
        />
        <Text style={styles.title2}>Mon score</Text>
        <Rating
          type="custom"
          imageSize={38}
          readonly
          fractions={1}
          startingValue={rating}
          ratingBackgroundColor="#0773A3"
          ratingColor="#E8C518"
          tintColor="#FFFEFA"
        />
        <Button
          title="Statistiques détaillées"
          titleStyle={styles.textbutton}
          buttonStyle={styles.button2}
          onPress={toggleOverlay}
        />
        <Overlay isVisible={overlayVisible} overlayStyle={styles.overlay}>
          <View style={styles.overlay}>
            <Text style={styles.title}>Résultats par question</Text>
            <VictoryChart
              padding={{ top: 5, bottom: 40, left: 50, right: 50 }}
              domainPadding={20}
              height={180}
              width={340}
            >
              <VictoryBar
                style={{
                  data: { fill: "#E8C518", stroke: "#0773A3", strokeWidth: 1 },
                }}
                data={[
                  { x: "q1", y: detailedscore.score[0] },
                  { x: "q2", y: detailedscore.score[1] },
                  { x: "q3", y: detailedscore.score[2] },
                  { x: "q4", y: detailedscore.score[3] },
                  { x: "q5", y: detailedscore.score[4] },
                  { x: "q6", y: detailedscore.score[5] },
                  { x: "q7", y: detailedscore.score[6] },
                  { x: "q8", y: detailedscore.score[7] },
                  { x: "q9", y: detailedscore.score[8] },
                  { x: "q10", y: detailedscore.score[9] },
                ]}
                cornerRadius={5}
              />
            </VictoryChart>
            <Text style={styles.title}>Résultats par catégorie</Text>
            <VictoryPie
              data={[
                {
                  x: `Parler de soi \n ${categoriesScores[0].sumScoreCategory}/${categoriesScores[0].numberPointsMax}`,
                  y: categoriesScores[0].sumScoreCategory,
                },
                {
                  x: " ",
                  y: categoriesScores[0].numberPointsFalse,
                },
                {
                  x: `Storytelling \n ${categoriesScores[1].sumScoreCategory}/${categoriesScores[1].numberPointsMax}`,
                  y: categoriesScores[1].sumScoreCategory,
                },
                { x: " ", y: categoriesScores[1].numberPointsFalse },
                {
                  x: `Préparatifs \n ${categoriesScores[2].sumScoreCategory}/${categoriesScores[2].numberPointsMax}`,
                  y: categoriesScores[2].sumScoreCategory,
                },
                { x: " ", y: categoriesScores[2].numberPointsFalse },
                {
                  x: `Projection \n ${categoriesScores[3].sumScoreCategory}/${categoriesScores[3].numberPointsMax}`,
                  y: categoriesScores[3].sumScoreCategory,
                },
                { x: " ", y: categoriesScores[3].numberPointsFalse },
                {
                  x: `Négociation \n ${categoriesScores[4].sumScoreCategory}/${categoriesScores[4].numberPointsMax}`,
                  y: categoriesScores[4].sumScoreCategory,
                },
                { x: " ", y: categoriesScores[4].numberPointsFalse },
              ]}
              height={200}
              padding={{ top: 50, bottom: 50, left: 40, right: 40 }}
              colorScale={[
                "#ED1C24",
                "#ED1C24CC",
                "#E8C518",
                "#E8C518CC",
                "#208C58",
                "#208C58CC",
                "#0773A3",
                "#0773A3CC",
                "#333333",
                "#333333CC",
              ]}
              cornerRadius={0}
            />
            <Button title="Ok" titleStyle={styles.textbutton2} buttonStyle={styles.button} onPress={toggleOverlay} />
          </View>
        </Overlay>
        <Text style={styles.text}>Votre salaire d'embauche : {salary} bruts annuel</Text>
        <View style={styles.icop}>
          <Text style={styles.texticop}>
            Bravo {username} ! C'était un entretien rondement mené !{"\n"}
            Vous devriez vous perfectionner sur :
          </Text>
          <Image source={image} style={styles.image} />
        </View>
        <Button
          title="Conseil n°4: Comment parler de ses échecs ? "
          titleStyle={styles.textbutton}
          buttonStyle={styles.button3}
          onPress={toggleOverlay2}
        />
        <Overlay isVisible={overlayVisible2} overlayStyle={styles.overlay}>
          <View style={styles.overlay}>
            <Text style={styles.title}>Conseil n°4.....</Text>
            <Button title="Ok" titleStyle={styles.textbutton2} buttonStyle={styles.button} onPress={toggleOverlay2} />
          </View>
        </Overlay>
        <Button
          title="Conseil n°6: Quels sont les défauts inavouables ? "
          titleStyle={styles.textbutton}
          buttonStyle={styles.button3}
          onPress={toggleOverlay3}
        />
        <Overlay isVisible={overlayVisible3} overlayStyle={styles.overlay}>
          <View style={styles.overlay}>
            <Text style={styles.title}>Conseil n°6.....</Text>
            <Button title="Ok" titleStyle={styles.textbutton2} buttonStyle={styles.button} onPress={toggleOverlay3} />
          </View>
        </Overlay>
        <Button
          icon={<Ionicons name="ios-arrow-forward" size={24} color="#FFFEFA" />}
          buttonStyle={styles.button}
          onPress={() => {
            toggleOverlay4();
            handleSubmitNewTrophy();
          }}
        />
        <Overlay isVisible={overlayVisible4} overlayStyle={styles.overlay}>
          <View style={styles.overlay}>
            <Text style={styles.title}>
              Vous avez gagné le trophée {"\n"} {lastTrophy.name}
            </Text>
            <Image source={trophy} style={styles.trophy} />
            {tabErrorsNewTrophy}
            <Button
              title="Mon compte"
              titleStyle={styles.textbutton2}
              buttonStyle={styles.button4}
              onPress={() => {
                navigation.navigate("Account");
                toggleOverlay4();
              }}
            />
          </View>
        </Overlay>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.username,
    score: state.score,
    detailedscore: state.detailedscore,
    job: state.job,
    county: state.county,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFFEFA",
  },
  icop: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#FFFEFA",
    fontFamily: "Montserrat_700Bold",
    fontSize: 22,
    textAlign: "center",
  },
  title2: {
    color: "#0773A3",
    fontFamily: "Montserrat_700Bold",
    fontSize: 22,
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center",
  },
  topbar: {
    backgroundColor: "#0773A3",
    marginBottom: 10,
  },
  image: {
    width: 70,
    height: 130,
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#0773A3",
    borderRadius: 15,
    width: 60,
  },
  button2: {
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: "#0773A3",
    borderRadius: 15,
    width: 180,
  },
  button3: {
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: "#0773A3",
    borderRadius: 15,
    width: 320,
    height: 50,
  },
  button4: {
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: "#0773A3",
    borderRadius: 15,
    width: 200,
    height: 50,
  },
  textbutton: {
    color: "#FFFEFA",
    fontFamily: "Montserrat_500Medium",
    fontWeight: "600",
    fontSize: 11,
    lineHeight: 29,
    alignItems: "center",
    textAlign: "center",
    letterSpacing: 0.75,
  },
  textbutton2: {
    color: "#FFFEFA",
    fontFamily: "Montserrat_500Medium",
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 29,
    alignItems: "center",
    textAlign: "center",
    letterSpacing: 0.75,
  },
  text: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 15,
    color: "#0773A3",
    padding: 5,
  },
  texticop: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 15,
    color: "#0773A3",
    width: 260,
    textAlign: "center",
  },
  overlay: {
    backgroundColor: "#4FA2C7",
    width: "90%",
    height: "85%",
    borderRadius: 20,
    opacity: 0.95,
    margin: 40,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  trophy: {
    width: 130,
    height: 130,
  },
});

export default connect(mapStateToProps, null)(InterviewScreenResult);
