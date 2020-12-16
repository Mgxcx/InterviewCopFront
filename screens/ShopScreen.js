import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Button, Header, CheckBox, Divider, Overlay } from "react-native-elements";
import AppLoading from "expo-app-loading";
import InputOutline from "react-native-input-outline";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
// import stripe from "react-native-stripe-payments";
// stripe.setOptions({
//   publishingKey:
//     "pk_test_51HfMCbAziDTXToQ4p2JJ5UtiFFrU86bjTNIwfJpoSOirMHX7RP4Lu728u5ebhttceBOzvS7QIDqbmuLDIXo6uY3k00YATDSM5x",
// });
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_400Regular_Italic,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

function ShopScreen({ username, navigation }) {
  //pour gérer les polices expo-google-fonts
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_700Bold,
  });
  const [userPackage, setUserPackage] = useState();
  const [listErrors, setListErrors] = useState();

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [price, setPrice] = useState();
  const [usernameCard, setUsernameCard] = useState();
  const [creditCardNumbers, setCreditCardNumbers] = useState();
  const [expirationMonth, setExpirationMonth] = useState();
  const [expirationYear, setExpirationYear] = useState();
  const [CVC, setCVC] = useState();
  const [informationPayment, setInformationPayment] = useState(false);
  const [errorInformationPayment, setErrorInformationPayment] = useState();
  const [packageId, setPackageId] = useState();

  const urlBack = "https://interviewcoptest.herokuapp.com";

  //charge le package du user via le Back (via la BDD)
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${urlBack}/shopfind-package?usernameFromFront=${username}`);
      const body = await data.json();
      if (body.result === true) {
        setUserPackage(body.packageDataBase);
      } else {
        setListErrors(body.error);
      }
    };
    fetchData();
  }, []);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const handleSubmitPay = () => {
    if (usernameCard && creditCardNumbers && expirationMonth && expirationMonth && CVC) {
      toggleOverlay();
      setInformationPayment(true);
      // const isCardValid = stripe.isCardValid({
      //   number: "4242424242424242",
      //   expMonth: 10,
      //   expYear: 21,
      //   cvc: "888",
      // });
      // const cardDetails = {
      //   number: creditCardNumbers,
      //   expMonth: expirationMonth,
      //   expYear: expirationYear,
      //   cvc: CVC,
      // };
      // if (cardDetails === isCardValid) {
      //   stripe
      //     .confirmPayment("client_secret_from_backend", cardDetails)
      //     .then(function (result) {
      //       if (result.error) {
      //         alert(result.error.message);
      //       }
      //     })
      //     .catch(function (error) {
      //       console.error("Error:", error);
      //     });
      // }
      if (informationPayment == true) {
        const fetchData2 = async () => {
          const data = await fetch(
            `${urlBack}/shopupdate-package?usernameFromFront=${username}&packageIdFromFront=${packageId}`
          );
          const body = await data.json();
          if (body.result === true) {
            setUserPackage(body.packageDataBase);
          } else {
            setListErrors(body.error);
          }
        };
        fetchData2();
      }
    } else {
      setErrorInformationPayment("Tous les champs n'ont pas été remplis");
    }
  };

  const handleSubmitChangePackagetoFree = () => {
    if (packageId == "5fd776ffe2b67bdc3438888b") {
      const fetchData3 = async () => {
        const data = await fetch(
          `${urlBack}/shopupdate-package?usernameFromFront=${username}&packageIdFromFront=${packageId}`
        );
        const body = await data.json();
        if (body.result === true) {
          setUserPackage(body.packageDataBase);
        } else {
          setListErrors(body.error);
        }
      };
      fetchData3();
    }
  };

  const handleSubmitChangePackageto9 = () => {
    if (packageId == "5fd777ddab2c4ddc51207488") {
      const fetchData4 = async () => {
        const data = await fetch(
          `${urlBack}/shopupdate-package?usernameFromFront=${username}&packageIdFromFront=${packageId}`
        );
        const body = await data.json();
        if (body.result === true) {
          setUserPackage(body.packageDataBase);
        } else {
          setListErrors(body.error);
        }
      };
      fetchData4();
    }
  };

  if (!fontsLoaded) {
    //mécanique pour attendre que les polices soient chargées avant de générer le screen
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Header
          barStyle="light-content"
          centerComponent={<Text style={styles.title}>Shop</Text>}
          containerStyle={styles.topbar}
        />

        {userPackage ? (
          <>
            {userPackage.name == "Free" && (
              <>
                <Text style={styles.title2}>
                  La formule {userPackage.name} à {userPackage.price} € (actuelle)
                </Text>
                <CheckBox
                  title="Parcours entretien illimité"
                  checked={true}
                  containerStyle={styles.checkbox}
                  textStyle={styles.text}
                  checkedColor="#0773A3"
                  uncheckedColor="#4FA2C7"
                />
                <Divider style={styles.divider} />
                <Text style={styles.title2}>La formule + à 9 €</Text>
                <CheckBox
                  title="Parcours entretien illimité"
                  checked={true}
                  containerStyle={styles.checkbox}
                  textStyle={styles.text}
                  checkedColor="#0773A3"
                  uncheckedColor="#4FA2C7"
                />
                <CheckBox
                  title="Rapports approfondis"
                  checked={true}
                  containerStyle={styles.checkbox}
                  textStyle={styles.text}
                  checkedColor="#0773A3"
                  uncheckedColor="#4FA2C7"
                />
                <Button
                  title="Je la veux!"
                  titleStyle={styles.textbutton}
                  onPress={() => {
                    setPrice("Payer 9,00 €");
                    setPackageId("5fd777ddab2c4ddc51207488");
                    toggleOverlay();
                  }}
                  buttonStyle={styles.button}
                />
                <Divider style={styles.divider} />
                <Text style={styles.title2}>La formule Pro à 19 €</Text>
                <CheckBox
                  title="Parcours entretien illimité"
                  checked={true}
                  containerStyle={styles.checkbox}
                  textStyle={styles.text}
                  checkedColor="#0773A3"
                  uncheckedColor="#4FA2C7"
                />
                <CheckBox
                  title="Rapports approfondis"
                  checked={true}
                  containerStyle={styles.checkbox}
                  textStyle={styles.text}
                  checkedColor="#0773A3"
                  uncheckedColor="#4FA2C7"
                />
                <CheckBox
                  title="Suivi avec un coach"
                  checked={true}
                  containerStyle={styles.checkbox}
                  textStyle={styles.text}
                  checkedColor="#0773A3"
                  uncheckedColor="#4FA2C7"
                />
                <Button
                  title="Je la veux!"
                  titleStyle={styles.textbutton}
                  onPress={() => {
                    setPrice("Payer 19,00 €");
                    setPackageId("5fd77864b6d0a5dc87b398db");
                    toggleOverlay();
                  }}
                  buttonStyle={styles.button}
                />
              </>
            )}

            {userPackage.name == "+" && (
              <>
                <Text style={styles.title2}>La formule Free à 0 €</Text>
                <CheckBox
                  title="Parcours entretien illimité"
                  checked={true}
                  containerStyle={styles.checkbox}
                  textStyle={styles.text}
                  checkedColor="#0773A3"
                  uncheckedColor="#4FA2C7"
                />
                <Button
                  title="Je la veux!"
                  titleStyle={styles.textbutton}
                  onPress={() => {
                    setPackageId("5fd776ffe2b67bdc3438888b");
                    handleSubmitChangePackagetoFree();
                  }}
                  buttonStyle={styles.button}
                />
                <Divider style={styles.divider} />
                <Text style={styles.title2}>
                  La formule {userPackage.name} à {userPackage.price} € (actuelle)
                </Text>
                <CheckBox
                  title="Parcours entretien illimité"
                  checked={true}
                  containerStyle={styles.checkbox}
                  textStyle={styles.text}
                  checkedColor="#0773A3"
                  uncheckedColor="#4FA2C7"
                />
                <CheckBox
                  title="Rapports approfondis"
                  checked={true}
                  containerStyle={styles.checkbox}
                  textStyle={styles.text}
                  checkedColor="#0773A3"
                  uncheckedColor="#4FA2C7"
                />
                <Divider style={styles.divider} />
                <Text style={styles.title2}>La formule Pro à 19 €</Text>
                <CheckBox
                  title="Parcours entretien illimité"
                  checked={true}
                  containerStyle={styles.checkbox}
                  textStyle={styles.text}
                  checkedColor="#0773A3"
                  uncheckedColor="#4FA2C7"
                />
                <CheckBox
                  title="Rapports approfondis"
                  checked={true}
                  containerStyle={styles.checkbox}
                  textStyle={styles.text}
                  checkedColor="#0773A3"
                  uncheckedColor="#4FA2C7"
                />
                <CheckBox
                  title="Suivi avec un coach"
                  checked={true}
                  containerStyle={styles.checkbox}
                  textStyle={styles.text}
                  checkedColor="#0773A3"
                  uncheckedColor="#4FA2C7"
                />
                <Button
                  title="Je la veux!"
                  titleStyle={styles.textbutton}
                  onPress={() => {
                    setPrice("Payer 19,00 €");
                    setPackageId("5fd77864b6d0a5dc87b398db");
                    toggleOverlay();
                  }}
                  buttonStyle={styles.button}
                />
              </>
            )}

            {userPackage.name == "Pro" && (
              <>
                <Text style={styles.title2}>La formule Free à 0 €</Text>
                <CheckBox
                  title="Parcours entretien illimité"
                  checked={true}
                  containerStyle={styles.checkbox}
                  textStyle={styles.text}
                  checkedColor="#0773A3"
                  uncheckedColor="#4FA2C7"
                />
                <Button
                  title="Je la veux!"
                  titleStyle={styles.textbutton}
                  onPress={() => {
                    setPackageId("5fd776ffe2b67bdc3438888b");
                    handleSubmitChangePackagetoFree();
                  }}
                  buttonStyle={styles.button}
                />
                <Divider style={styles.divider} />
                <Text style={styles.title2}>La formule + à 9 € </Text>
                <CheckBox
                  title="Parcours entretien illimité"
                  checked={true}
                  containerStyle={styles.checkbox}
                  textStyle={styles.text}
                  checkedColor="#0773A3"
                  uncheckedColor="#4FA2C7"
                />
                <CheckBox
                  title="Rapports approfondis"
                  checked={true}
                  containerStyle={styles.checkbox}
                  textStyle={styles.text}
                  checkedColor="#0773A3"
                  uncheckedColor="#4FA2C7"
                />
                <Button
                  title="Je la veux!"
                  titleStyle={styles.textbutton}
                  onPress={() => {
                    setPackageId("5fd777ddab2c4ddc51207488");
                    handleSubmitChangePackageto9();
                  }}
                  buttonStyle={styles.button}
                />
                <Divider style={styles.divider} />
                <Text style={styles.title2}>
                  La formule {userPackage.name} à {userPackage.price} € (actuelle)
                </Text>
                <CheckBox
                  title="Parcours entretien illimité"
                  checked={true}
                  containerStyle={styles.checkbox}
                  textStyle={styles.text}
                  checkedColor="#0773A3"
                  uncheckedColor="#4FA2C7"
                />
                <CheckBox
                  title="Rapports approfondis"
                  checked={true}
                  containerStyle={styles.checkbox}
                  textStyle={styles.text}
                  checkedColor="#0773A3"
                  uncheckedColor="#4FA2C7"
                />
                <CheckBox
                  title="Suivi avec un coach"
                  checked={true}
                  containerStyle={styles.checkbox}
                  textStyle={styles.text}
                  checkedColor="#0773A3"
                  uncheckedColor="#4FA2C7"
                />
              </>
            )}
            <Overlay isVisible={overlayVisible} overlayStyle={styles.overlay}>
              <View style={styles.overlay}>
                <Text style={styles.title2}>Payer par carte</Text>
                <InputOutline
                  placeholder="Nom du titulaire de la carte"
                  focusedColor="#0773A3"
                  defaultColor="#4FA2C7"
                  style={styles.input}
                  onChangeText={(usernamecard) => setUsernameCard(usernamecard)}
                  value={usernameCard}
                />
                <InputOutline
                  placeholder="Numéros de la carte"
                  focusedColor="#0773A3"
                  defaultColor="#4FA2C7"
                  style={styles.input}
                  onChangeText={(creditcardnumbers) => setCreditCardNumbers(creditcardnumbers)}
                  value={creditCardNumbers}
                />
                <InputOutline
                  placeholder="Mois d'expiration"
                  focusedColor="#0773A3"
                  defaultColor="#4FA2C7"
                  style={styles.input}
                  onChangeText={(expirationmonth) => setExpirationMonth(expirationmonth)}
                  value={expirationMonth}
                />
                <InputOutline
                  placeholder="Année d'expiration"
                  focusedColor="#0773A3"
                  defaultColor="#4FA2C7"
                  style={styles.input}
                  onChangeText={(expirationyear) => setExpirationYear(expirationyear)}
                  value={expirationYear}
                />
                <InputOutline
                  placeholder="CVC"
                  focusedColor="#0773A3"
                  defaultColor="#4FA2C7"
                  style={styles.input}
                  onChangeText={(cvc) => setCVC(cvc)}
                  value={CVC}
                />
                <Text style={styles.text}>{errorInformationPayment}</Text>
                <Button
                  title={price}
                  titleStyle={styles.textbutton2}
                  buttonStyle={styles.button2}
                  onPress={() => {
                    handleSubmitPay();
                  }}
                />
              </View>
            </Overlay>
          </>
        ) : (
          <Text style={styles.text}>{listErrors}</Text>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.username,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFFEFA",
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
  text: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 15,
    color: "#0773A3",
    padding: 5,
  },
  topbar: {
    backgroundColor: "#0773A3",
    marginBottom: 10,
  },
  textbutton: {
    color: "#FFFEFA",
    fontFamily: "Montserrat_500Medium",
    fontWeight: "600",
    fontSize: 13,
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
  button: {
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: "#0773A3",
    borderRadius: 15,
    width: 110,
  },
  button2: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#0773A3",
    borderRadius: 15,
    width: 180,
  },
  checkbox: {
    width: 250,
    padding: 0,
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  divider: {
    height: 2,
    backgroundColor: "#0773A3",
    width: 350,
  },
  overlay: {
    backgroundColor: "#FFFEFA",
    width: "90%",
    height: "85%",
    borderRadius: 20,
    opacity: 0.95,
    margin: 40,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
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
});

export default connect(mapStateToProps, null)(ShopScreen);
