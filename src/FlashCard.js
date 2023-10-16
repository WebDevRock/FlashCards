// FlashCard.js
import React, { useState, useEffect } from "react";

function FlashCard({ words }) {
  const [currentWord, setCurrentWord] = useState(randomWord(words));
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [wordCounts, setWordCounts] = useState({});

  useEffect(() => {
    const savedWordCounts = localStorage.getItem('wordCounts');
    setWordCounts(JSON.parse(savedWordCounts) || {});
  }, []);

   // Update local storage when wordCounts changes
   useEffect(() => {
    localStorage.setItem('wordCounts', JSON.stringify(wordCounts));
  }, [wordCounts]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("readingHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("readingHistory", JSON.stringify(history));
  }, [history]);

  function randomWord(wordList) {
    return wordList[Math.floor(Math.random() * wordList.length)];
  }

  const nextWord = () => {
    
    // Get the current word count from state
    const currentCount = wordCounts[currentWord] || 0;

    // Update the word count in the state
    setWordCounts({
      ...wordCounts,
      [currentWord]: currentCount + 1, // Increment the count
    });

    setHistory((prevHistory) => [
      ...prevHistory,
      { word: currentWord },
    ]);

    setCurrentWord(randomWord(words));
    
  }

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div style={styles.container}>
      {/* Display the current word */}
      <div style={styles.wordCard}>
        {currentWord}
      </div>
  
      {/* Buttons for controlling the app */}
      <button style={styles.button} onClick={nextWord}>
        Next Word
      </button>
  
      {/* Button to toggle the history view */}
      <button style={styles.button} onClick={toggleHistory}>
        {showHistory ? 'Hide Progress' : 'View Progress'}
      </button>
  
      {/* Conditional rendering of the history section */}
      {showHistory && (
        <div style={styles.grid}>
          {words.map((word) => {
            // Check if the word has a score
            const scored = wordCounts[word] > 0;
  
            return (
              <div
                key={word}
                style={{
                  ...styles.gridItem,
                  ...(scored ? {} : styles.unscored), // Apply the unscored style conditionally
                }}
              >
                {word} {scored && `: ${wordCounts[word]}`}  {/* Display the score if available */}
              </div>
            );
          })}
        </div>
      )}
  
   
  
      {/* ... any other components or features you implemented ... */}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontSize: "2em",
    backgroundColor: "#FFDDC1", // Peachy background
    fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', sans-serif", // Child-friendly font
  },
  wordCard: {
    marginBottom: "20px",
    border: "5px dotted #FF9B85", // Dotted border
    borderRadius: "15px", // Rounded edges
    padding: "20px",
    backgroundColor: "#FFEFB7", // Light yellow background
  },
  button: {
    padding: "10px 20px",
    fontSize: "1.2em",
    backgroundColor: "#FFB482", // Light orange
    border: "none",
    borderRadius: "20px", // Rounded edges
    boxShadow: "2px 2px 5px #888888", // Small shadow for depth
    marginTop: "10px",
    cursor: "pointer",
  },
  historyList: {
    listStyleType: "none",
    padding: 0,
    maxWidth: "400px",
    margin: "0 auto",
  },
  historyItem: {
    padding: "10px",
    borderBottom: "5px dotted #FF9B85", // Dotted border
    borderRadius: "10px", // Rounded edges
    marginBottom: "10px",
    backgroundColor: "#FFEFB7", // Light yellow background
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)', // defines a 5-column grid layout
    gap: '10px', // space between each item
    marginTop: '20px', // space at the top
  },
  gridItem: {
    padding: '10px',
    textAlign: 'center',
    borderRadius: '5px',
    backgroundColor: '#FFEFB7', // light yellow background for visibility
  },
  unscored: {
    opacity: 0.5, // reduces the opacity for words without scores
  },
};

export default FlashCard;
