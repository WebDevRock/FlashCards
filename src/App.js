// App.js
import React from 'react';
import './App.css';
import FlashCard from './WordWall';

function App() {
  const words = ['Who', 'is', 'it', 'Biff', 'and', 'Chip', 'Mum', 'Kipper', 'Floppy', 'a', 'No', 'it\'s', 'Dad', 'A', 'big', 'little', 'The', 'the', 'Oh']; // Add your words here

  return (
    <div className="App">
      <FlashCard words={words} />
    </div>
  );
}

export default App;
