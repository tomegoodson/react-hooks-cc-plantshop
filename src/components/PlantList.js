import React from "react";
import PlantCard from "./PlantCard";

const PlantList = ({ plants, deletePlant }) => {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          deletePlant={deletePlant} // pass deletePlant prop
          image={plant.image} //  plant.image directly as the image prop
        />
      ))}
    </ul>
  );
};

export default PlantList;
