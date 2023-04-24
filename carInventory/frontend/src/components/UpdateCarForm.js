//Import React and the useState hook
import React, { useState } from "react";

// Define a functional component called UpdateCarForm that takes in two props: car and handleUpdate
function UpdateCarForm({ car = {}, handleUpdate }) {
  // Destructure the car object and create five state variables with initial values from the car object properties
  const [make, setMake] = useState(car.make);
  const [model, setModel] = useState(car.model);
  const [year, setYear] = useState(car.year);
  const [owner, setOwner] = useState(car.owner);
  const [registrationNumber, setRegistrationNumber] = useState(
    car.registrationNumber
  );

  // Define a function called handleSubmit that takes in an event object
  const handleSubmit = (e) => {
    // Prevent the default behavior of the form submission
    e.preventDefault();
    // Call the handleUpdate function and pass in a new car object with updated properties
    handleUpdate({
      ...car,
      make,
      model,
      year,
      owner,
      registrationNumber,
    });
  };

  // Return a form element with input fields for updating the car properties and a submit
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Make:
        <input
          type="text"
          value={make}
          onChange={(e) => setMake(e.target.value)}
        />
      </label>
      <label>
        Model:
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
      </label>
      <label>
        Year:
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </label>
      <label>
        Registration Number:
        <input
          type="text"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
        />
      </label>
      <label>
        Owner:
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
      </label>

      <button type="submit">Update Car</button>
    </form>
  );
}

export default UpdateCarForm;
