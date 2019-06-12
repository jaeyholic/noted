import React, { useState, useRef } from 'react';
import { firestore } from './firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';

const NoteCard = ({ note, removeNote }) => {
  const [editing, setEditing] = useState(false);

  const noteTitle = useRef(null);
  const noteText = useRef(null);

  let editingTemp = (
    <span>
      <h4>{note.title}</h4>
      <p>{note.text}</p>
    </span>
  );

  const updateNote = async e => {
    e.preventDefault();
    const userId = firebase.auth().currentUser.uid;
    const docRef = await firestore.doc(`users/${userId}/notes/${note.id}`);
    docRef.update({
      title: noteTitle.current.value,
      text: noteText.current.value
    });
    setEditing(false);
  };

  if (editing) {
    editingTemp = (
      <form onSubmit={updateNote}>
        <div>
          <input
            type='text'
            defaultValue={note.title}
            name='title'
            ref={noteTitle}
          />
        </div>
        <div>
          <input
            type='text'
            defaultValue={note.text}
            name='text'
            ref={noteText}
          />
        </div>
        <input type='submit' value='Update Note' />
      </form>
    );
  }

  return (
    <div className='noteCard'>
      <i className='fa fa-edit' onClick={() => setEditing(true)} />
      <i className='fa fa-times' onClick={() => removeNote(note.id)} />
      {editingTemp}
    </div>
  );
};

NoteCard.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })
};

export default NoteCard;
