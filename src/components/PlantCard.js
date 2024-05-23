import React, { useState } from "react";

function PlantCard({ plant, deletePlant, updatePlant }) {
  const [isInStock, setIsInStock] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(plant.price);

  const handleStockChange = () => {
    setIsInStock(!isInStock);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setNewPrice(plant.price); // cant get this to work, setting new price 
  };

  const handlePriceChange = (e) => {
    setNewPrice(e.target.value);
  };

  const handleUpdatePlant = () => {
    updatePlant(plant.id, { ...plant, price: newPrice });
    setEditing(false);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <div className="plant-info">
        <div className="plant-details">
          <h4>{plant.name}</h4>
          {editing ? (
            <div>
              <input
                type="number"
                value={newPrice}
                onChange={handlePriceChange}
              />
              <button onClick={handleUpdatePlant}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <p>Price: {plant.price}</p>
          )}
        </div>
        <div className="button-container">
          <button
            className={isInStock ? "primary" : "out-of-stock"}
            onClick={handleStockChange}
            disabled={!isInStock}
          >
            {isInStock ? "In Stock" : "Out of Stock"}
          </button>
          <button className="delete-button" onClick={() => deletePlant(plant.id)}>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default PlantCard;
