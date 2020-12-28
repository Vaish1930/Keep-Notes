import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, View, TextInput } from "react-native";
import KeepButton from "./KeepButton";

const KeepModal = ({
  isModalVisible,
  setIsModalVisible,
  titleText,
  noteText,
  noteHandler,
}) => {
  const [title, setTitle] = useState(titleText ? titleText : "");
  const [note, setNote] = useState(noteText ? noteText : "");

  useEffect(() => {
    setTitle(titleText), setNote(noteText);
  }, [titleText, noteText]);

  const addOrUpdateNote = () => {
    noteHandler(title, note, titleText ? "edit" : "add");
    setTitle("");
    setNote("");
  };

  return (
    <Modal visible={isModalVisible} animatedtype="slide">
      <View style={styles.addKeep}>
        <KeepButton
          style={styles.cancelButton}
          onButtonPress={setIsModalVisible}
        >
          <Text style={styles.cancelButtonText}> &times;</Text>
        </KeepButton>
        <View style={styles.keepForm}>
          <Text style={styles.addKeepTitle}>
            {titleText ? "edit your note" : " Add a note"}
          </Text>
          <TextInput
            placeholder="TITLE"
            style={styles.inputTitle}
            value={title}
            onChangeText={(title) => setTitle(title)}
          />
          <TextInput
            placeholder="NOTE"
            style={styles.inputTitle}
            numberOfLines={5}
            multiline
            value={note}
            onChangeText={(note) => setNote(note)}
          />
          <KeepButton
            style={styles.addKeepButton}
            color="#FBBC04"
            onButtonPress={addOrUpdateNote}
          >
            <Text>{titleText ? "update" : "ADD"}</Text>
          </KeepButton>
        </View>
      </View>
    </Modal>
  );
};

export default KeepModal;

const styles = StyleSheet.create({
  addKeep: {
    flex: 1,
  },
  cancelButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: "flex-end",
  },
  keepForm: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 100,
    paddingHorizontal: 20,
  },

  addKeepTitle: {
    fontSize: 28,
    marginVertical: 20,
  },

  inputTitle: {
    width: "100%",
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    minHeight: 50,
    fontSize: 18,
  },
  addKeepButton: {
    marginVertical: 30,
    width: 100,
    height: 40,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 36,
  },
});
