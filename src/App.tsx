import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GameList from '../components/GameList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GameList />} />
      {/* Add other routes here */}
    </Routes>
  );
}

export default App;