import React, {useState, useEffect} from "react";
import {connect} from 'react-redux'
import { View, KeyboardAvoidingView, ScrollView, StyleSheet, Text } from 'react-native';
import { Input, Button} from 'react-native-elements'
import AppLoading from 'expo-app-loading';
import { FontAwesome5 } from "@expo/vector-icons";
import socketIOClient from "socket.io-client";
import Svg, { Path } from "react-native-svg";
import { moderateScale } from "react-native-size-matters";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_400Regular_Italic,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";


const socket = socketIOClient("http://192.168.1.16:3000");

function ChatScreen(username) {

  const [currentMessage, setCurrentMessage] = useState(null);
  const [listMessage, setListMessage] = useState([]);

  //pour gérer les polices expo-google-fonts
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_700Bold,
  });

  useEffect(() => {
    socket.on('sendMessageToAll', newMessage => {
      var regexSmile = /:\)/;
      var regexSad = /:\(/;
      var regexLangue = /:\p/;
      var regexFuck = /fuck[a-z]*/i;
      var newStr = newMessage.currentMessage
      .replace(regexSmile, '\u263A')
      .replace(regexSad, '\u2639')
      .replace(regexLangue, '\uD83D\uDE1B')
      .replace(regexFuck, '\u2022\u2022\u2022')
      newMessage.currentMessage = newStr;
      setListMessage([...listMessage, newMessage]);
    } )
  },[currentMessage])

  const affichageMessages = listMessage.map( (e,i) => {
    return (
    <View key={i} style={styles.icoppresentation}>
      <View style={[styles.bubble, styles.bubbleOut]}>
        <View style={[styles.balloon, { backgroundColor: "#0773A3" }]}>
          <Text style={styles.text}>{e.currentMessage}</Text>
          <Text style={styles.smalltext}>{e.username}</Text>
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
    </View>

    )
  });

  if (!fontsLoaded) {
    return <AppLoading></AppLoading>;
  }

  return (
    < View style={{flex:1}}>
      
      <ScrollView  style={{flex:1, marginTop: 30}}>
        {affichageMessages}
      </ScrollView >

          <KeyboardAvoidingView behavior="padding" enabled>
              <Input
                  containerStyle = {{marginBottom: 5}}
                  placeholder='Tapez votre message ici'
                  onChangeText={(e)=>setCurrentMessage(e)}
                  value={currentMessage}
              />
              <Button
                  icon={
                    <FontAwesome5 name="comment" size={24} color="black" />
                  } 
                  title="Send"
                  buttonStyle={{backgroundColor: "#eb4d4b"}}
                  type="solid"
                  onPress={() => {socket.emit("sendMessage", {currentMessage, username:username.username}); setCurrentMessage('')}}
              />
          </KeyboardAvoidingView>
    </View>
  );
}

function mapStateToProps(state) {
  return { username: state.username };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  icoppresentation: {
    flexDirection: "row",
    flex: 1.5,
    alignSelf: "flex-end",
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
  text: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 15,
    color: "#FFFEFE",
    padding: 5,
  },
  smalltext: {
    fontFamily: "Montserrat_400Regular",
    fontSize:10,
    color: "#FFFEFE",
    textAlign:'right' ,
    padding: 5,
  }
});

export default connect(mapStateToProps, null)(ChatScreen);
