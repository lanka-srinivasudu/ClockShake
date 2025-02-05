import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          // backgroundColor:"transparent",
          width: "95%",
          alignItems: "center",
          justifyContent: "space-around",
          marginHorizontal: "2.5%",
          bottom: 10,
          height: 60,
          bottom: 10,
          marginHorizontal: "2.5%",
          borderRadius: 35,
          shadowColor: "#000",
          overflow: "hidden",
          position: "absolute",
          // zIndex: 1000,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveBackgroundColor: "teal",
      }}
    >

      <Tabs.Screen
      name="Home"
      options={{
        tabBarIcon: ({ focused }) => (
          <Foundation
            name="home"
            size={24}
            color={focused ? "white" : "teal"}
          />
        ),
        headerShown:false,
      }}/>

    </Tabs>
  );
};

export default Layout;
