import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SetAlarmScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Set your alarm here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SetAlarmScreen;
