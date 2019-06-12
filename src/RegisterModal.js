import React from 'react';

const RegisterModal = ({
  createUserModal,
  showCreateModal,
  createUser,
  createEmail,
  createPassword,
  confirmPassword
}) => (
  <div className='createUserModal modal' ref={createUserModal}>
    <div className='close' onClick={showCreateModal}>
      <i className='fa fa-times' />
    </div>
    <form onSubmit={createUser}>
      <div>
        <label htmlFor='createEmail'>Email:</label>
        <input type='text' name='createEmail' ref={createEmail} />
      </div>
      <div>
        <label htmlFor='createPassword'>Password:</label>
        <input type='password' name='createPassword' ref={createPassword} />
      </div>
      <div>
        <label htmlFor='confirmPassword'>Confirm Password:</label>
        <input type='password' name='confirmPassword' ref={confirmPassword} />
      </div>
      <div>
        <input type='submit' value='Create Account' />
      </div>
    </form>
  </div>
);

export default RegisterModal;
