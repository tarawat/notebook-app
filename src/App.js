import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import db, { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import firebase from "firebase";
import AddIcon from "@material-ui/icons/Add";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      console.log(user.uid, user.email, user.displayName);
      var docRef = db.collection("users").doc(user?.uid);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
          } else {
            db.collection("users")
              .doc(user.email)
              .set({})
              .then(() => {
                console.log("Document successfully written!");
              })
              .catch((error) => {
                console.error("Error writing document: ", error);
              });
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    } else {
      console.log("user kidhar hai");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.email)
        .collection("notes")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setNotes(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [user]);

  const submitNote = (e) => {
    e.preventDefault();
    console.log("submit note started");
    if (user) {
      db.collection("users").doc(user.email).collection("notes").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        title: title,
        content: content,
        user: user,
      });
    }
    setContent("");
    setTitle("");
    console.log("submit note ended");
  };

  const deleteNote = (passedTitle, passedContent) => {
    if (user) {
      var delete_query = db
        .collection("users")
        .doc(user.email)
        .collection("notes")
        .where("title", "==", passedTitle)
        .where("content", "==", passedContent);
      delete_query.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      });
    }
  };

  return (
    <div className="App">
      {user ? (
        <>
          <Header />
          <form>
            <input
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              placeholder="Title"
              value={title}
              autoFocus
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              name="content"
              placeholder="Take a note..."
              rows="3"
              value={content}
            />
            <button type="button" onClick={submitNote}>
              <AddIcon />
            </button>
          </form>
          {notes &&
            notes.map((note) => (
              <Note
                key={note.timestamp}
                title={note.title}
                content={note.content}
                onDelete={deleteNote}
              />
            ))}

          <Footer />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
