import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Shake from "./app/tabs/ShakeAlarm"; 
import SetAlarmScreen from "./app/tabs/SetAlarmScreen"; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ShakeAlarm" component={Shake} />
        <Stack.Screen name="SetAlarm" component={SetAlarmScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
