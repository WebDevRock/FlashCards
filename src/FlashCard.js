// FlashCard.js
import React, { useState, useEffect } from "react";

function FlashCard({ words }) {
  const [currentWord, setCurrentWord] = useState(randomWord(words));
  const [history, setHistory] = useState([]);
  const [viewHistory, setViewHistory] = useState(false);
  
  
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

  function nextWord() {
    
    setHistory((prevHistory) => [
      ...prevHistory,
      { word: currentWord },
    ]);

    setCurrentWord(randomWord(words));
    
  }

  function toggleHistory() {
    setViewHistory(!viewHistory);
  }

  return (
    <div style={styles.container}>
      {viewHistory ? (
        <div>
          <h2>Reading History</h2>
          <ul style={styles.historyList}>
            {history.map((record, index) => (
              <li key={index} style={styles.historyItem}>
                <span>Word: {record.word}</span>
              </li>
            ))}
          </ul>
          <button style={styles.button} onClick={toggleHistory}>
            Back
          </button>
        </div>
      ) : (
        <>
          <h1 style={styles.word}>{currentWord}</h1>
          <button style={styles.button} onClick={nextWord}>
            Next Word
          </button>
          <div>
            
            
            <button style={styles.button} onClick={toggleHistory}>
              View History
            </button>
          </div>
        </>
      )}
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
  word: {
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
};

export default FlashCard;
