import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <StatusBar
        translucent
        animated
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,0.15)"
      />
      <Text style={styles.headerText}>Keep Notes</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBBC04",
    paddingTop: StatusBar.currentHeight,
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
