import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { useAlert } from 'react-alert';
import NoteCard from './NoteCard';
import firebase from 'firebase/app';
import { firestore } from './firebase';
import 'firebase/auth';
import { auth } from './firebase';
import { collectIdsAndDocs } from './utils';
import Aside from './Aside';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

const App = () => {
  //Local State
  const [notes, setNotes] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  //Alert Hook
  const alert = useAlert();

  //Refs
  const toggleClass = useRef(null);
  const noteTitle = useRef(null);
  const noteText = useRef(null);
  const overlay = useRef(null);
  const createUserModal = useRef(null);
  const createEmail = useRef(null);
  const createPassword = useRef(null);
  const confirmPassword = useRef(null);
  const userEmail = useRef(null);
  const userPassword = useRef(null);
  const loginModal = useRef(null);

  //Sidebar Drawer
  const showSidebar = e => {
    e.preventDefault();
    toggleClass.current.classList.toggle('show');
  };

  //Adding Note
  const addNote = async e => {
    e.preventDefault();
    const formItems = {
      title: noteTitle.current.value,
      text: noteText.current.value
    };
    const userId = firebase.auth().currentUser.uid;
    const docRef = await firestore
      .collection(`users/${userId}/notes`)
      .add(formItems);
    const doc = await docRef.get();
    const newNote = collectIdsAndDocs(doc);
    setNotes([newNote, ...notes]);
    noteTitle.current.value = '';
    noteText.current.value = '';
    toggleClass.current.classList.toggle('show');
  };

  //Removing Note
  const removeNote = async id => {
    const userId = firebase.auth().currentUser.uid;
    await firestore.doc(`users/${userId}/notes/${id}`).delete();
  };

  //User Account Modal
  const showCreateModal = e => {
    e.preventDefault();
    overlay.current.classList.toggle('show');
    createUserModal.current.classList.toggle('show');
  };

  //User Registration
  const createUser = e => {
    e.preventDefault();
    const email = createEmail.current.value;
    //check password match
    const password = createPassword.current.value;
    const confirm = confirmPassword.current.value;
    if (password === confirm) {
      if (password.length < 6) {
        alert.show('Password should be more than 6 characters!', {
          type: 'error'
        });
      } else {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(res => showCreateModal(e))
          .catch(error => {
            alert.show(error.message, {
              type: 'error'
            });
          });
      }
    } else {
      alert.show('Password must match!', {
        type: 'error'
      });
    }
  };

  //User Login Modal
  const showLogin = e => {
    e.preventDefault();
    overlay.current.classList.toggle('show');
    loginModal.current.classList.toggle('show');
  };

  //User Login
  const loginUser = e => {
    e.preventDefault();
    const email = userEmail.current.value;
    const password = userPassword.current.value;
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          showLogin(e);
          alert.show('successfully logged in', {
            type: 'success'
          });
        })
        .catch(error => {
          alert.show(error.message, {
            type: 'error'
          });
        });
    });
  };

  //Logout
  const logout = () => {
    auth.signOut();
  };

  useEffect(() => {
    auth.onAuthStateChanged(async user => {
      if (user) {
        const userId = user.uid;
        await firestore
          .collection(`users/${userId}/notes`)
          .get()
          .then(snapshot => {
            const notes = snapshot.docs.map(collectIdsAndDocs);
            setNotes(notes);
            setLoggedIn(true);
          });
      } else {
        setLoggedIn(false);
      }
    });
  }, [notes]);

  return (
    <div>
      <header className='mainHeader'>
        <h1>Noted</h1>
        <nav>
          {loggedIn ? (
            <span>
              <button
                onClick={showSidebar}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  marginRight: '20px'
                }}
              >
                Add New Note
              </button>
              <button
                onClick={logout}
                style={{ all: 'unset', cursor: 'pointer' }}
              >
                Logout
              </button>
            </span>
          ) : (
            <span>
              <button
                onClick={showCreateModal}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  marginRight: '20px'
                }}
              >
                Create Account
              </button>
              <button
                onClick={showLogin}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  marginRight: '20px'
                }}
              >
                Login
              </button>
            </span>
          )}
        </nav>
      </header>
      <div className='overlay' ref={overlay} />
      <section className='notes'>
        {loggedIn ? (
          notes
            .map(note => (
              <NoteCard note={note} key={note.id} removeNote={removeNote} />
            ))
            .reverse()
        ) : (
          <h2>Login to add notes!</h2>
        )}
      </section>
      <Aside
        toggleClass={toggleClass}
        noteText={noteText}
        addNote={addNote}
        showSidebar={showSidebar}
        noteTitle={noteTitle}
      />
      <LoginModal
        loginModal={loginModal}
        showLogin={showLogin}
        loginUser={loginUser}
        userEmail={userEmail}
        userPassword={userPassword}
      />
      <RegisterModal
        createUserModal={createUserModal}
        showCreateModal={showCreateModal}
        createUser={createUser}
        createEmail={createEmail}
        createPassword={createPassword}
        confirmPassword={confirmPassword}
      />
    </div>
  );
};

export default App;
