import { useState, useEffect } from "react";
import "./index.css";
import hangmanImages from "./data";
import Letter from "./letter.jsx";
import Btn from "./btn.jsx";
import { choseCategory, categories } from "./choseCategory.js";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lettersArray = alphabet.split("").map((letter, index) => ({
  id: index + 1,
  letter,
}));

function App() {
  const [images] = useState(hangmanImages);
  const [letters, setLetters] = useState(lettersArray);
  const [wordToGuess, setWordToGuess] = useState("");
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isEasyMode, setIsEasyMode] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  const isWinner = wordToGuess
    .split("")
    .filter((char) => char !== " ")
    .every((letter) => correctGuesses.includes(letter));

  const isLoser = wrongGuesses >= 6 || (!isEasyMode && timeLeft === 0);

  const handleLetterClick = (letter) => {
    const isCorrect = wordToGuess.includes(letter);

    if (isCorrect) {
      setCorrectGuesses((prev) => [...prev, letter]);
    } else {
      setWrongGuesses((prev) => prev + 1);
    }

    setLetters((prevLetters) =>
      prevLetters.map((l) =>
        l.letter === letter ? { ...l, clicked: true, correct: isCorrect } : l
      )
    );
  };

  const handleCategorySelect = (category) => {
    const randomWord = getRandomWordFromCategory(category);
    setWordToGuess(randomWord);
    setCorrectGuesses([]);
    setModalVisible(false);
    setSelectedCategory(category);
    setWrongGuesses(0);
    setLetters(
      alphabet.split("").map((letter, index) => ({
        id: index + 1,
        letter,
        clicked: false,
        correct: false,
      }))
    );

    if (!isEasyMode) {
      setTimeLeft(30);
      setTimerActive(true);
    }
  };

  const getRandomWordFromCategory = (category) => {
    const wordsInCategory = categories[category];
    return wordsInCategory[Math.floor(Math.random() * wordsInCategory.length)];
  };

  useEffect(() => {
    if (!timerActive || isEasyMode) return;

    if (timeLeft === 0) {
      setTimerActive(false);
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, timerActive, isEasyMode]);

  const resetGame = () => {
    setCorrectGuesses([]);
    setWrongGuesses(0);
    setWordToGuess("");
    setModalVisible(true);
    setSelectedCategory("");
    setTimerActive(false);
    setLetters(
      alphabet.split("").map((letter, index) => ({
        id: index + 1,
        letter,
        clicked: false,
        correct: false,
      }))
    );
  };

  return (
    <>
      <header>
        <h1 className="header-h1">Hangman. Do (or) Die</h1>
        <p className="header-p">
          Guessed: wrong {wrongGuesses}
          {!isEasyMode && timerActive && (
            <p className="red-timer">Time left: {timeLeft}s</p>
          )}
        </p>
        <button className="change-btn" onClick={resetGame}>
          Change Category
        </button>
      </header>

      <div className="hangman-div">
        <img
          src={images[wrongGuesses]?.image}
          className="hangman-image"
          alt="Hangman"
        />
      </div>

      <span className="category-span">
        {selectedCategory && `Guess the ${selectedCategory.toUpperCase()}:`}
      </span>

      <p className="word-display">
        {wordToGuess
          .split("")
          .map((letter) =>
            letter === " "
              ? " "
              : correctGuesses.includes(letter)
              ? letter
              : "_"
          )
          .join(" ")}
      </p>

      {isWinner || isLoser ? (
        <div className="end-message">
          <h2>{isWinner ? "You Won!" : "You Lost!"}</h2>
        </div>
      ) : (
        <ul className="letters-list">
          {letters.map((letter) => (
            <Letter
              key={letter.id}
              id={letter.id}
              letter={letter.letter}
              clicked={letter.clicked}
              correct={letter.correct}
              onClick={() => handleLetterClick(letter.letter)}
            />
          ))}
        </ul>
      )}

      <div className="reset-btn-wrapper">
        <button className="reset-btn" onClick={resetGame}>
          Reset
        </button>
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <h1 className="modal-h1">Choose Mode:</h1>
              <div className="chose-mode-div">
                <Btn
                  onClick={() => {
                    setIsEasyMode(true);
                    setTimerActive(false);
                  }}
                  style={{ backgroundColor: isEasyMode ? "red" : "" }}
                >
                  EASY
                </Btn>
                <Btn
                  onClick={() => {
                    setIsEasyMode(false);
                    setTimeLeft(30);
                    setTimerActive(true);
                  }}
                  style={{ backgroundColor: !isEasyMode ? "red" : "" }}
                >
                  HARD
                </Btn>
              </div>

              <h1 className="modal-h1">Choose Category:</h1>
              <div className="chose-category-div">
                {choseCategory.map((chose) => (
                  <Btn key={chose} onClick={() => handleCategorySelect(chose)}>
                    {chose.toUpperCase()}
                  </Btn>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
