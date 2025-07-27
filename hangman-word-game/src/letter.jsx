import { useState } from "react";

function Letter({ id, letter, onClick }) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <li id={id} onClick={onClick}>
      {letter}
    </li>
  );
}

export default Letter;
