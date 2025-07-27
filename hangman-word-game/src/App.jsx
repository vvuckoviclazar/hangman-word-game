import { useState } from "react";
import "./index.css";
import hangmanImages from "./data";
import data from "./lettersData.js";
import Letter from "./letter.jsx";

function App() {
  const [images, setImage] = useState(hangmanImages);
  const [letters, setLetters] = useState(data);

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
      <ul className="letters-list">
        {letters.map((letter) => (
          <Letter key={letter.id} id={letter.id} letter={letter.letter} />
        ))}
      </ul>
    </>
  );
}

export default App;
