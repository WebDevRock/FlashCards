// FlashCard.js
import React, { useState, useEffect } from "react";
const maxRepeats = 3

function FlashCard({ words }) {
  const [currentWord, setCurrentWord] = useState(randomWord(words));
  // const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(true);
  const [wordCounts, setWordCounts] = useState({});
  
  useEffect(() => {
    const savedWordCounts = localStorage.getItem("wordCounts");
    setWordCounts(JSON.parse(savedWordCounts) || {});
  }, []);

  // Update local storage when wordCounts changes
  useEffect(() => {
    localStorage.setItem("wordCounts", JSON.stringify(wordCounts));
  }, [wordCounts]);

  // useEffect(() => {
  //   const storedHistory = localStorage.getItem("readingHistory");
  //   if (storedHistory) {
  //     // setHistory(JSON.parse(storedHistory));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("readingHistory", JSON.stringify(history));
  // }, [history]);

  const nextWord = () => {
    // Get the current word count from state
    const currentCount = wordCounts[currentWord] || 0;

    // Update the word count in the state
    if(currentCount < maxRepeats)
    setWordCounts({
      ...wordCounts,
      [currentWord]: currentCount + 1, // Increment the count
    });

    setCurrentWord(randomWord(words));
    // console.log(currentWord)
  };


  function randomWord(wordList) {
    // wordCounts may not have initialised yet
    const countsString = localStorage.getItem("wordCounts");
    const counts = JSON.parse(countsString) || {};
    
    // only use words where the score isn't maxed
    
    const availableWords = Object.keys(counts).length > 0 ? wordList.filter(word => !(word in counts) || counts[word] < maxRepeats) : wordList;
    console.log(Object.keys(availableWords).length)
    return  availableWords[Math.floor(Math.random() * availableWords.length)];
  }

  

  const skipWord = () => {
    // Update the word count in the state
    setWordCounts({
      ...wordCounts,
      [currentWord]: 0,
    });

    setCurrentWord(randomWord(words));
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const resetWordCounts = () => {
    setWordCounts({});
    setCurrentWord(randomWord(words));
  }

  return (
    <div style={styles.container}>
      {/* Display the current word */}
      <div style={styles.wordCard}>{currentWord}</div>

      {/* Buttons for controlling the app */}
      <button style={styles.button} onClick={nextWord}>
        Next
      </button>
      {/* Buttons for controlling the app */}
      <button style={styles.button} onClick={skipWord}>
        Skip
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
                  ...(wordCounts[word] ===maxRepeats ? styles.itemComplete : {}),
                }}
              >
                <span
                  style={{
                    ...(scored ? styles.gridItemBadge : {}),
                  }}
                >
                  {scored && `${wordCounts[word]}`}
                </span>
                {/* Display the score if available */}
                {word}
              </div>
            );
          })}
        </div>
      )}
      {/* Button to toggle the history view */}
      <button style={styles.buttonSmall} onClick={toggleHistory}>
        {showHistory ? "Hide Progress" : "Show Progress"}
      </button>
      <button style={styles.buttonSmall} onClick={resetWordCounts}>Reset</button>
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
    minWidth: "100px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1em",
    backgroundColor: "#FFB482", // Light orange
    border: "none",
    borderRadius: "20px", // Rounded edges
    boxShadow: "2px 2px 5px #888888", // Small shadow for depth
    marginTop: "10px",
    cursor: "pointer",
  },
  buttonSmall: {
    padding: "10px 20px",
    fontSize: "0.5em",
    backgroundColor: "#FFB482", // Light orange
    border: "none",
    borderRadius: "20px", // Rounded edges
    boxShadow: "2px 2px 5px #888888", // Small shadow for depth
    marginTop: "10px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)", // defines a 5-column grid layout
    gap: "10px", // space between each item
    marginTop: "20px", // space at the top
  },
  gridItem: {
    position: "relative",
    padding: "10px",
    textAlign: "center",
    borderRadius: "5px",
    backgroundColor: "#FFEFB7", // light yellow background for visibility
  },
  itemComplete: {
    position: "relative",
    padding: "10px",
    textAlign: "center",
    backgroundColor: "#26b8398a",
  },

  unscored: {
    opacity: 0.3, // reduces the opacity for words without scores
  },
  gridItemBadge: {
    backgroundColor: "#26b8398a",
    borderRadius: "10px",
    color: "white",
    padding: "1px 5px",
    fontSize: "14px",
    position: "absolute",
    top: "-4px",
    right: "-4px",
  },
};

export default FlashCard;
