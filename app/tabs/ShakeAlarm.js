import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Button,
  useWindowDimensions,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import ProgressBar from "react-native-progress/Bar";
import * as Haptics from "expo-haptics";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useNavigation } from "@react-navigation/native";

const SHAKE_THRESHOLD = 2.5;
const SHAKE_COOLDOWN_MS = 250;
const SHAKE_INCREMENT = 0.01;

export default function ShakeAlarmApp() {
  const [progress, setProgress] = useState(0);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isTerminated, setIsTerminated] = useState(false);
  const lastShakeTime = useRef(0);
  const completedRef = useRef(false);

  const player = useAudioPlayer(require("./assets/alarm.mp3"));
  const status = useAudioPlayerStatus(player);
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const isFullyCompleted = progress >= 1;
  const isFinished = isTerminated || isFullyCompleted;

  useEffect(() => {
    const timer = setTimeout(() => setIsButtonEnabled(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    player.loop = true;
    if (status.isLoaded && !isFinished) {
      player.play();
    }
  }, [player, status.isLoaded, isFinished]);

  useEffect(() => {
    if (isFinished) {
      player.pause();
    }
  }, [isFinished, player]);

  useEffect(() => {
    if (isFinished) return;

    Accelerometer.setUpdateInterval(100);

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const now = Date.now();

      if (
        magnitude > SHAKE_THRESHOLD &&
        now - lastShakeTime.current >= SHAKE_COOLDOWN_MS
      ) {
        lastShakeTime.current = now;
        setProgress((previous) =>
          Math.min(1, Math.round((previous + SHAKE_INCREMENT) * 100) / 100)
        );
      }
    });

    return () => subscription.remove();
  }, [isFinished]);

  useEffect(() => {
    if (isFullyCompleted && !completedRef.current) {
      completedRef.current = true;
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );
    }
  }, [isFullyCompleted]);

  const terminate = () => {
    if (!isButtonEnabled || isFinished) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsTerminated(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headermain}>
        <View style={styles.headermaintext}>
          <Text style={styles.header}>Shake to Fill the Bar</Text>
          <Text style={styles.subHeader}>
            Shake your device to fill the progress bar and complete the task.
          </Text>
        </View>
        <View style={styles.barprogress}>
          <ProgressBar
            progress={progress}
            width={Math.min(width - 40, 335)}
            height={10}
            borderRadius={5}
            unfilledColor="#D3D3D3"
            borderWidth={0}
            color="#E19600"
          />
        </View>
      </View>

      <Image
        source={require("./assets/polar_bear_penguin.png")}
        style={styles.image}
      />

      <View style={{ marginTop: 20 }}>
        <Button
          title="Set Alarm"
          onPress={() => navigation.navigate("SetAlarm")}
        />
      </View>

      <Text style={styles.infoText}>
        {isFullyCompleted
          ? "Task complete! Alarm stopped."
          : isTerminated
          ? "Task terminated. Alarm stopped."
          : "Shake the phone to fill the progress bar."}
      </Text>

      <Pressable
        style={[
          styles.terminatebutton,
          { opacity: isButtonEnabled && !isFinished ? 1 : 0.5 },
        ]}
        onPress={terminate}
        disabled={!isButtonEnabled || isFinished}
      >
        <Text style={styles.buttonText}>
          {isFinished
            ? "Alarm stopped"
            : isButtonEnabled
            ? "Terminate task"
            : "Wait 30s..."}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  headermain: {
    width: "100%",
    minHeight: 200,
    paddingBottom: 20,
    backgroundColor: "rgba(225, 150, 0, 0.7)",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headermaintext: {
    marginTop: 24,
    paddingHorizontal: 15,
    gap: 5,
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
  barprogress: {
    alignItems: "center",
  },
  image: {
    marginTop: 50,
    width: 200,
    height: 200,
  },
  infoText: {
    fontSize: 18,
    color: "#444444",
    marginTop: 20,
    textAlign: "center",
    paddingHorizontal: 15,
  },
  terminatebutton: {
    marginTop: 20,
    backgroundColor: "#E19600",
    minHeight: 40,
    minWidth: 130,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
