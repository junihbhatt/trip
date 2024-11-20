import React, { useState } from 'react';

const NamesInput = ({ onNamesSubmit }) => {
  const [names, setNames] = useState(['']);

  const handleAddName = () => {
    setNames([...names, '']);
  };

  const handleRemoveName = (index) => {
    const newNames = names.filter((_, i) => i !== index);
    setNames(newNames);
  };

  const handleNameChange = (index, value) => {
    const updatedNames = names.map((name, i) => i === index ? value : name);
    setNames(updatedNames);
  };

  const handleSubmit = () => {
    // Ensure there's at least one name
    if (names.length > 0 && names.every(name => name.trim())) {
      onNamesSubmit(names); // Passing the names to parent component
    } else {
      alert("Please add valid names.");
    }
  };

  return (
    <div className="space-y-2">
      {names.map((name, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(index, e.target.value)}
            placeholder="Enter name"
            className="px-3 py-2 border border-gray-300 rounded"
          />
          {index > 0 && (
            <button
              type="button"
              onClick={() => handleRemoveName(index)}
              className="text-red-500"
            >
              Delete
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddName}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add More Names
      </button>

      <button
        type="button"
        onClick={handleSubmit}
        className="bg-green-500 text-white py-2 px-4 rounded mt-4 mx-4"
      >
        Submit Names
      </button>
    </div>
  );
};

export default NamesInput;
