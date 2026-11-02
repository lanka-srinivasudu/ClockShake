import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable, Button } from "react-native";
import { Accelerometer } from "expo-sensors";
import ProgressBar from "react-native-progress/Bar";
import * as Haptics from "expo-haptics";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useNavigation } from "@react-navigation/native";


const ShakeAlarmApp = () => {
  const [progress, setProgress] = useState(0);
  const [isShaken, setIsShaken] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isTerminated, setIsTerminated] = useState(false);
  const [isFullyCompleted, setIsFullyCompleted] = useState(false);
  const player = useAudioPlayer(require("./assets/alarm.mp3"));
  const { isLoaded } = useAudioPlayerStatus(player);
  const navigation = useNavigation();

  useEffect(()=>{
   const timer = setTimeout(() => {
    setIsButtonEnabled(true)
   }, 30000);
   return ()=>clearTimeout(timer);
  },[]);


  async function loadAndPlaySound(){
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/alarm.mp3'),
      {
        shouldPlay: true, isLooping:true
      }
    );
    setSound(sound);
    await sound.playAsync();
  }

  
  useEffect(()=>{
    loadAndPlaySound();
    return ()=>{
      if(sound){
        sound.unloadAsync();
      }
    };
  },[]);

  useEffect(() => {
    if (isTerminated || isFullyCompleted) return;

    const subscription = Accelerometer.addListener((accelerometerData) => {
      const { x, y, z } = accelerometerData;
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      if (magnitude > 2.5) {
        setIsShaken(true);
        incrementProgress();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [isTerminated, isFullyCompleted]);



  useEffect(() => {
    if (progress === 1) {
      console.log("Process completed - Bar is full");
      setIsFullyCompleted(true);
      if (sound) {
        sound.stopAsync();
      }
    }
  }, [progress]);

  const incrementProgress = () => {
    setProgress((prevProgress) => {
      if (isTerminated || isFullyCompleted) return prevProgress;
      const newProgress = prevProgress + 0.01;
      return newProgress >= 1 ? 1 : newProgress;
    });
  };

  const Terminate = () => {
    if (!isButtonEnabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log("Process Terminated");
    setIsTerminated(true);
    if (sound) {
      sound.stopAsync();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headermain}>
        <View style={styles.headermaintext}>
          <Text style={styles.header}>Shake to Fill the Bar</Text>
          <Text style={styles.subHeader}>
            Shake your device to fill the progress bar and complete the Task.
          </Text>
        </View>
        <View style={styles.barprogress}>
          <ProgressBar
            progress={progress}
            width={335}
            height={10}
            borderRadius={5}
            unfilledColor={"#D3D3D3"}
            borderWidth={0}
            color={"#E19600"} 
          />
        </View>
      </View>

      <View>
        <Image
          source={require("./assets/polar_bear_penguin.png")}
          style={styles.image}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Button title="Set Alarm" onPress={() => navigation.navigate("SetAlarm")} />
      </View>


      <View>
        {isFullyCompleted ? (
          <Text style={styles.alarmText}>
            The bar is full! The alarm will off now!
          </Text>
        ) : isTerminated ? (
          <Text style={styles.alarmText}>
            The alarm will off now and Terminated!
          </Text>
        ) : (
          <Text style={styles.infoText}>
            Shake the phone to fill the progress bar.
          </Text>
        )}
      </View>

      <View
        style={[styles.terminatebutton, { opacity: isButtonEnabled ? 1 : 0.5 }]}
      >
        <Pressable onPress={Terminate} disabled={!isButtonEnabled}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {isButtonEnabled ? "Terminate task" : "Wait 30s..."}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: 360,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
  },
  subHeader: {
    fontSize: 20,
    color: "#444444",
    marginBottom: 20,
  },
  image: {
    marginTop: 50,
    width: 200,
    height: 200,
  },
  alarmText: {
    fontSize: 20,
    color: "#444444",
    marginTop: 20,
  },
  infoText: {
    fontSize: 18,
    color: "#444444",
    marginTop: 20,
  },
  headermaintext: {
    marginTop: 24,
    width: 360,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    gap: 5,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headermain: {
    height: 200,
    backgroundColor: "rgba(225, 150, 0, 0.7)",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  barprogress: {
    justifyContent: "center",
    alignItems: "center",
  },
  terminatebutton: {
    marginTop: 20,
    backgroundColor: "#E19600",
    height: 40,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
  },
});

export default ShakeAlarmApp;
