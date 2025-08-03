function Letter({ id, letter, onClick, clicked, correct }) {
  return (
    <li
      id={id}
      onClick={!clicked ? onClick : undefined}
      className={`letter ${clicked ? (correct ? "correct" : "wrong") : ""}`}
    >
      {letter}
    </li>
  );
}

export default Letter;
