import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const Newaccount = ({ serverPublicKey }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!serverPublicKey) {
      console.error('Server public key not available');
      return;
    }

    const user = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname
    };

    // Encrypt the user data before sending it to the server
    const encryptedUser = crypto.publicEncrypt(
      {
        key: serverPublicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
      },
      Buffer.from(JSON.stringify(user))
    );

    fetch('http://localhost:5000/api/newuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ encryptedData: encryptedUser.toString('base64') }),
    })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 400) {
          alert('This username is in use');
        }
        throw new Error('Failed to create account');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Account created successfully:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <button type="submit">Create Account</button>
    </form>
  );
};

export default Newaccount;