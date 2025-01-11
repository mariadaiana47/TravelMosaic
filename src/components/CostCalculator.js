import React, { useState } from "react";

const CostCalculator = () => {
  const [destinationCost, setDestinationCost] = useState("");
  const [days, setDays] = useState("");
  const [foodCost, setFoodCost] = useState("");
  const [transportCost, setTransportCost] = useState("");
  const [totalCost, setTotalCost] = useState(null);

  const handleCalculate = () => {
    const total =
      parseFloat(destinationCost) +
      parseFloat(foodCost) * days +
      parseFloat(transportCost);

    setTotalCost(total);
  };

  return (
    <div className="cost-calculator-container">
      <form className="cost-calculator-form" onSubmit={(e) => e.preventDefault()}>
        <h2 className="cost-calculator-title">Calculator costuri călătorie</h2>
        <input
          type="number"
          className="cost-calculator-input"
          placeholder="Cost destinație (€)"
          value={destinationCost}
          onChange={(e) => setDestinationCost(e.target.value)}
        />
        <input
          type="number"
          className="cost-calculator-input"
          placeholder="Număr de zile"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
        <input
          type="number"
          className="cost-calculator-input"
          placeholder="Cost mâncare (€)"
          value={foodCost}
          onChange={(e) => setFoodCost(e.target.value)}
        />
        <input
          type="number"
          className="cost-calculator-input"
          placeholder="Cost transport (€)"
          value={transportCost}
          onChange={(e) => setTransportCost(e.target.value)}
        />
        <button className="cost-calculator-button" onClick={handleCalculate}>
          Calculează
        </button>
      </form>

      {totalCost !== null && (
        <div className="cost-summary">
          <h3>Sumar costuri:</h3>
          <p>
            <strong>Cost destinație:</strong> {destinationCost} €
          </p>
          <p>
            <strong>Cost mâncare total:</strong> {foodCost * days} €
          </p>
          <p>
            <strong>Cost transport:</strong> {transportCost} €
          </p>
          <p>
            <strong>Cost total:</strong> {totalCost} €
          </p>
        </div>
      )}
    </div>
  );
};

export default CostCalculator;
