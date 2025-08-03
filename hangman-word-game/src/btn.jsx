function Btn({ children, onClick, style }) {
  const baseClass = "modal-btns";
  return (
    <button className={baseClass} onClick={onClick} style={style}>
      {children}
    </button>
  );
}

export default Btn;
