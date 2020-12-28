import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";

const KeepNote = ({ noteData, openNote, deleteNoteHandler }) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version > 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.keepNote}>
      <TouchableComponent
        style={{ flex: 1 }}
        onPress={openNote}
        onLongPress={() => deleteNoteHandler(noteData.id)}
      >
        <View style={styles.keepNoteContainer}>
          <Text style={styles.noteTitle}>{noteData.title}</Text>
          <Text style={styles.noteText} numberOfLines={10}>
            {noteData.note}
          </Text>
        </View>
      </TouchableComponent>
    </View>
  );
};

export default KeepNote;

const styles = StyleSheet.create({
  keepNote: {
    overflow: "hidden",
    width: "44%",
    borderColor: "#ccc",
    borderWidth: 1,

    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: "3%",
  },
  keepNoteContainer: {
    padding: 10,
  },
  noteTitle: {
    marginVertical: 5,
    fontSize: 20,
    fontWeight: "600",
    color: "#888",
  },
  noteText: {
    marginVertical: 5,
    color: "#888",
  },
});
