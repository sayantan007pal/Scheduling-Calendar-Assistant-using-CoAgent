import React, { useState } from 'react';
import Auth from './components/Auth';
import CalendarView from './components/CalendarView';
import ChatAssistant from './components/ChatAssistant';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [tokens, setTokens] = useState(null);

  return (
    <div className="container">
      {!tokens ? <Auth onAuth={setTokens} /> : <CalendarView tokens={tokens} />}
      <ChatAssistant />
      <ToastContainer />
    </div>
  );
}

export default App;
