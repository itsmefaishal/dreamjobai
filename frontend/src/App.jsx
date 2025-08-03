import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import UploadForm from './components/UploadForm';
import ResponsePage from './components/ResponsePage';

function App() {
  const [response, setResponse] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/response" element={<ResponsePage response={response} />} />
        <Route path="/upload" element={<UploadForm setResponse={setResponse} />} />
      </Routes>
    </Router>
  );
}

export default App;
