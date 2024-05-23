import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await fetch("http://localhost:6001/plants");
      const data = await response.json();
      setPlants(data);
      setFilteredPlants(data); // set filteredPlants initially with all plants
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  const addPlant = async (newPlantData) => {
    try {
      const response = await fetch("http://localhost:6001/plants", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(newPlantData),
      });
      const data = await response.json();
      setPlants([...plants, data]);
      setFilteredPlants([...plants, data]); // update filteredPlants when adding a new plant
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  const deletePlant = async (id) => {
    try {
      await fetch(`http://localhost:6001/plants/${id}`, {
        method: "DELETE",
      });
      const updatedPlants = plants.filter((plant) => plant.id !== id);
      setPlants(updatedPlants);
      setFilteredPlants(updatedPlants); // update filteredPlants after deleting a plant
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };

  return (
    <main>
      <NewPlantForm addPlant={addPlant} /> {/* pass addPlant function as prop */}
      <Search plants={plants} setFilteredPlants={setFilteredPlants} /> {/* pass plants and setFilteredPlants as props */}
      <PlantList plants={filteredPlants} deletePlant={deletePlant} /> {/* pass deletePlant function as prop */}
    </main>
  );
}

export default PlantPage;
