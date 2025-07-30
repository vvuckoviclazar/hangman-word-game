import { useState } from "react";
import "./index.css";
import hangmanImages from "./data";
import data from "./lettersData.js";
import Letter from "./letter.jsx";

const words = [
  "BATMAN",
  "MATRIX",
  "JOKER",
  "AVATAR",
  "GLADIATOR",
  "INCEPTION",
  "ALIEN",
  "FROZEN",
  "TITANIC",
  "ROCKY",
];

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

function App() {
  const [images, setImage] = useState(hangmanImages);
  const [letters, setLetters] = useState(data);
  const [wordToGuess, setWordToGuess] = useState(getRandomWord());
  const [correctGuesses, setCorrectGuesses] = useState([]);

  const handleLetterClick = (letter) => {
    if (wordToGuess.includes(letter)) {
      setCorrectGuesses((prev) => [...prev, letter]);
    }
  };

  return (
    <>
      <header>
        <h1 className="header-h1">Hangman. Do (or) Die</h1>
        <p className="header-p">Guessed: wrong 0</p>
        <button className="change-btn">Change Category</button>
      </header>
      <div className="hangman-div">
        {images.map((image) => (
          <img
            key={image.id}
            id={image.id}
            src={image.image}
            className="hangman-image"
          />
        ))}
      </div>
      <span className="category-span">Guess the MOVIE:</span>
      <p className="word-display">
        {wordToGuess
          .split("")
          .map((letter) => (correctGuesses.includes(letter) ? letter : "_"))
          .join(" ")}
      </p>

      <ul className="letters-list">
        {letters.map((letter) => (
          <Letter
            key={letter.id}
            id={letter.id}
            letter={letter.letter}
            onClick={() => handleLetterClick(letter.letter)}
          />
        ))}
      </ul>
    </>
  );
}

export default App;
