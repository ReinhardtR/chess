import React from "react";

export default function Form({ handleSubmit, children }) {
  const handleSubmitEvent = (event) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <div className="block text-sm font-medium text-secondary w-96">
      <form onSubmit={handleSubmitEvent} className="flex flex-col space-y-4">
        {children}
      </form>
    </div>
  );
}

Form.TextInput = ({ label, ...restProps }) => {
  return (
    <div className="mt-1 relative rounded-md shadow-sm flex flex-col space-y-0.5">
      <label className="text-xl">{label}</label>
      <input
        {...restProps}
        maxLength="20"
        className="text-xl focus:outline-none focus:ring-2 focus:ring-primary border border-neutral rounded-lg p-1 pl-2.5"
      />
    </div>
  );
};

Form.Submit = ({ value }) => {
  return (
    <input
      type="submit"
      value={value}
      className="bg-primary-gradient text-white font-bold rounded-full w-auto self-end cursor-pointer p-4 transform transition hover:scale-110 focus:outline-none focus:ring focus:ring-secondary"
    />
  );
};
