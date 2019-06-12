import React from 'react';

const Aside = ({ toggleClass, addNote, showSidebar, noteTitle, noteText }) => (
  <aside className='sidebar' ref={toggleClass}>
    <form onSubmit={addNote}>
      <h3>Add New Note</h3>
      <div className='close-btn' ref={toggleClass} onClick={showSidebar}>
        <i className='fa fa-times' />
      </div>
      <label htmlFor='note-title'>Title:</label>
      <input type='text' name='note-title' ref={noteTitle} />
      <label htmlFor='note-text'>Text:</label>
      <textarea name='note-text' ref={noteText} />
      <input type='submit' value='Add New Note' />
    </form>
  </aside>
);

export default Aside;
