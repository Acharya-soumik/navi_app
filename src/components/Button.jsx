/* eslint-disable react/prop-types */
const Button = ({ type = "primary", onClick, text }) => {
  const enums = {
    primary: "bg-fuchsia-600",
    secondary: "bg-indigo-600",
    muted: "bg-gray-300",
    danger: "bg-red-600",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${enums[type]} border p-2 shadow text-white rounded-md`}
    >
      {text}
    </button>
  );
};

export default Button;
