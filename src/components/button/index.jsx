const buttonComponent = ({ onClick, type, disabled, value, variant }) => {
  return (
    <button
      className={`btn ${variant}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default buttonComponent;
