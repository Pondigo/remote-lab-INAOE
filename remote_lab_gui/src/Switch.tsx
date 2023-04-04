import React from "react";

const Checkbox = () => {
  const handleChange = () => {};

  return (
    <>
      <input
        type="checkbox"
        id="switch"
        className="hidden"
        onChange={handleChange}
      />
      <label
        htmlFor="switch"
        className="block w-10 h-6 rounded-full bg-gray-400"
      >
        <div className="w-6 h-6 rounded-full bg-white shadow-md transform -translate-x-1/2 -translate-y-1/2 transition"></div>
      </label>
      <style>{`
        input[type="checkbox"].hidden:checked + label div {
          background-color: #dbe8f8;
          transform: translate(100%, -50%);
        }
        input[type="checkbox"].hidden + label div {
          transition: all 0.3s ease;
        }
        input[type="checkbox"].hidden:checked + label {
          background-color: #a5b6c7;
        }
        input[type="checkbox"].hidden:focus + label {
          box-shadow: 0 0 2px 3px #94a3b8;
        }
      `}</style>
    </>
  );
};

export default Checkbox;
