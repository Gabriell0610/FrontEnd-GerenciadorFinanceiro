// eslint-disable-next-line react/prop-types
const InputComponent = ({ label, placeholder, value, onChange, type }) => {
  return (
    <>
      <label>{label}</label>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
      />
    </>
  );
};

export default InputComponent;
