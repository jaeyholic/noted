import React from 'react';

const LoginModal = ({
  loginModal,
  showLogin,
  loginUser,
  userEmail,
  userPassword
}) => (
  <div className='loginModal modal' ref={loginModal}>
    <div className='close' onClick={showLogin}>
      <i className='fa fa-times' />
    </div>
    <form onSubmit={loginUser}>
      <div>
        <label htmlFor='email'>Email:</label>
        <input type='text' name='email' ref={userEmail} />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' ref={userPassword} />
      </div>
      <div>
        <input type='submit' value='Login' />
      </div>
    </form>
  </div>
);

export default LoginModal;
