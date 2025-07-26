import { useState } from "react";

function letter({ id, letter, onClick }) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <li id={id} onClick={onClick}>
      {letter}
    </li>
  );
}

export default letter;
