import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./app/tabs/Home";
import Shake from "./app/tabs/Shake";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Home /> */}
      <Shake />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
