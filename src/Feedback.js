import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

function App() {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleSubmit = () => {
    if (currentValue === 0) {
      toast.error("Kindly provide your rating between 1-5 stars");
      return;
    }
    toast.success("Thanks for your feedback"); 
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h2>How would you rate your ride?</h2>
      <h4>Select between 1-5 stars</h4>
      <div className="d-flex">
        {stars.map((_, index) => (
          <FaStar
            key={index}
            size={24}
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            color={(hoverValue || currentValue) > index ? "orange" : "grey"}
            style={{
              marginRight: 10,
              cursor: "pointer",
            }}
          />
        ))}
      </div>
      <textarea
        placeholder="Additional feedback or Comments (If Any?"
        className="form-control"
        style={{ margin: "20px 0", minHeight: 100, width: 300 }}
      ></textarea>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default App;
