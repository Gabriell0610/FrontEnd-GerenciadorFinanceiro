/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types

import { forwardRef } from "react";

const InputComponent = forwardRef(({ label, ...props }, ref) => {
  return (
    <>
      <label className="form-label">{label}</label>
      <input {...props} ref={ref} className="form-control" />
    </>
  );
});

InputComponent.displayName = "InputComponent";

export default InputComponent;

// const InputComponent = ({
//   label,
//   placeholder,
//   value,
//   onChange,
//   type,
//   required,
// }) => {
//   return (
//     <>
//       <label className="form-label">{label}</label>
//       <input
//         className="form-control"
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         type={type}
//         required={required}
//       />
//     </>
//   );
// };

//export default InputComponent;
