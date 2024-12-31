import React, { useState } from 'react';
import { getAuthUrl, fetchTokens } from '../api';

export default function Auth({ onAuth }) {
  const [authUrl, setAuthUrl] = useState('');

  const handleLogin = async () => {
    const url = await getAuthUrl();
    setAuthUrl(url);
  };

  const handleCallback = async () => {
    const code = new URLSearchParams(window.location.search).get('code');
    const tokens = await fetchTokens(code);
    onAuth(tokens);
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Google</button>
      {authUrl && <a href={authUrl}>Authenticate</a>}
      <button onClick={handleCallback}>Complete Authentication</button>
    </div>
  );
}
