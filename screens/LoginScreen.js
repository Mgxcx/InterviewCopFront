import React, { useState, useEffect } from 'react';
import {Picker, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import InputOutline from 'react-native-input-outline';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold, } from '@expo-google-fonts/montserrat'


export default function LoginScreen(){
  const [secretQuestion, setSecretQuestion] = useState(null);
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize:20, marginTop:15 }}>Déjà un compte?</Text>
      <InputOutline
        placeholder="Username"
        focusedColor='blue'
        defaultColor='grey'
        style={{marginBottom:-10}}
      />
      <InputOutline
        placeholder="Mot de passe"
        focusedColor='blue'
        defaultColor='grey'
        style={{marginBottom:-5}}
      />
      <Button
        title="Se connecter"
        type="solid"
        buttonStyle={{backgroundColor: "#0773A3", borderRadius:20}}
        containerStyle = {{width: '40%', marginBottom:30, marginTop:25}}
        />
      <Text style={{ fontFamily: 'Montserrat_500Medium', fontSize:20 }}>Pas encore de compte?</Text>
      <InputOutline
        placeholder="Username"
        focusedColor='blue'
        defaultColor='grey'
        style={{marginBottom:-10}}
      />
      <InputOutline
        placeholder="Mot de passe"
        focusedColor='blue'
        defaultColor='grey'
        // style={{marginBottom:-10}}
      />
      <Picker
        selectedValue={secretQuestion}
        style={{ width: '80%', marginBottom:-25 }}
        onValueChange={itemValue => setSecretQuestion({ question: itemValue })}>
        <Picker.Item label="Quel est le nom de votre premier animal de compagnie?" value="Quel est le nom de votre premier animal de compagnie?" />
        <Picker.Item label="Quelle est la date de naissance de votre mère?" value="Quelle est la date de naissance de votre mère?" />
      </Picker>
      <InputOutline
        placeholder="Réponse"
        focusedColor='blue'
        defaultColor='grey'
        style={{marginBottom:-5}}
      />
      <Button
        title="Se connecter"
        type="solid"
        buttonStyle={{backgroundColor: "#0773A3", borderRadius:20}}
        containerStyle = {{width: '40%', marginBottom:30, marginTop:25}}
      />
    </View>
  );
}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',      
  },
});
