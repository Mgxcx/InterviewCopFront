import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import InputOutline from 'react-native-input-outline';


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>Déjà un compte?</Text>
      <InputOutline
        placeholder="Username"
        focusedColor='blue'
        defaultColor='grey'
        marginBottom='10'
      />
      <InputOutline
        placeholder="Mot de passe"
        focusedColor='blue'
        defaultColor='grey'
      />
      <Button
        title="Se connecter"
        type="solid"
        buttonStyle={{backgroundColor: "#0773A3", borderRadius:20}}
        containerStyle = {{width: '40%', marginBottom:15, marginTop:15}}
        />
      <InputOutline
        placeholder="Username"
        focusedColor='blue'
        defaultColor='grey'
      />
      <InputOutline
        placeholder="Mot de passe"
        focusedColor='blue'
        defaultColor='grey'
      />
      <InputOutline
        placeholder="Réponse"
        focusedColor='blue'
        defaultColor='grey'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',      
  },
  baseText: {
    fontFamily: 'Roboto',
    fontSize:20
  },
});