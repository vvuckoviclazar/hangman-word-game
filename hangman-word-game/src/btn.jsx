function Btn({ children, onClick }) {
  const baseClass = "modal-btns";

  const finalClass = `${baseClass} `;

  return (
    <button className={finalClass} onClick={onClick}>
      {children}
    </button>
  );
}

export default Btn;
