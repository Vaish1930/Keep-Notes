import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, Alert } from "react-native";
import db from "../firebase";
import KeepButton from "../KeepButton";
import KeepModal from "../KeepModal";
import KeepNote from "../KeepNote";

const KeepScreen = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [keepNotes, setKeepNotes] = useState([]);
  const [noteId, setNoteId] = useState(null);

  useEffect(() => {
    const unsubscribe = db.collection("keepNotes").onSnapshot((snapshot) => {
      setKeepNotes(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          note: doc.data().note,
        }))
      );
    });

    return () => {
      unsubscribe();
    };
  }, [db]);

  const noteHandler = (keepTitle, keepNote, mode) => {
    if (!keepTitle || !keepNote) {
      Alert.alert("Blank", "A note can't have empty title or note", [
        { text: "ok" },
      ]);
      return;
    }

    if (mode === "add") {
      // setKeepNotes((prevNotes) => [
      //   { id: new Date().toString(), title: keepTitle, note: keepNote },
      //   ...prevNotes,
      // ]);
      db.collection("keepNotes").add({
        id: new Date().toString(),
        title: keepTitle,
        note: keepNote,
      });
    } else {
      // setKeepNotes((prevNotes) =>
      //   prevNotes.map((prevNote) =>
      //     prevNote.id === noteId
      //       ? { ...prevNote, title: keepTitle, note: keepNote }
      //       : prevNote
      //   )
      // );
      db.collection("keepNotes")
        .doc(noteId)
        .update({ title: keepTitle, note: keepNote });
    }

    setIsModalVisible(false);
    setNoteId(null);
    setTitle("");
    setNote("");
  };

  const addOrEditNote = (noteData) => {
    if (noteData) {
      setNoteId(noteData.id);
      setTitle(noteData.title);
      setNote(noteData.note);
    }
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setNoteId(null);
    setNote("");
    setTitle("");
    setIsModalVisible(false);
  };

  const deleteNoteHandler = (id) => {
    if (id) {
      Alert.alert("Delete", "Are you sure you want to delete this note?", [
        {
          text: "Yes",
          onPress: () => db.collection("keepNotes").doc(id).delete(),
        },
        { text: "No" },
      ]);
    }
  };

  return (
    <View style={styles.keepScreen}>
      <FlatList
        data={keepNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <KeepNote
            noteData={item}
            openNote={() => addOrEditNote(item)}
            deleteNoteHandler={deleteNoteHandler}
          />
        )}
        numColumns={2}
      />

      <KeepModal
        isModalVisible={isModalVisible}
        setIsModalVisible={closeModal}
        titleText={title}
        noteText={note}
        noteHandler={noteHandler}
      />

      <KeepButton
        style={styles.floatingAddButtonContainer}
        color="#FBBC04"
        onButtonPress={() => addOrEditNote()}
      >
        <Text style={styles.floatingAddButtonText}>+</Text>
      </KeepButton>
    </View>
  );
};

export default KeepScreen;

const styles = StyleSheet.create({
  keepScreen: {
    flex: 1,
  },
  floatingAddButtonContainer: {
    width: 70,

    height: 70,
    borderRadius: 35,
    position: "absolute",
    bottom: 10,
    right: 10,
  },

  floatingAddButtonText: {
    color: "#fff",
    fontSize: 32,
  },
});

// {
//   /* <ScrollView contentContainerStyle={styles.keepNote}>
// {keepNotes.map((notes, index) => (
//   <KeepNote key={index} noteData={notes} />
// ))}
// </ScrollView> */
// }
