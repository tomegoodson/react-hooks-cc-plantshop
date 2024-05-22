import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

const App = () => {
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
      setFilteredPlants(data); //  filteredPlants with all plants data
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
      const newPlant = await response.json();
      setPlants((currentPlants) => [...currentPlants, newPlant]);
      setFilteredPlants((currentPlants) => [...currentPlants, newPlant]);
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  return (
    <div className="app">
      <Header />
      <PlantPage 
        plants={filteredPlants} 
        setFilteredPlants={setFilteredPlants}
        addPlant={addPlant} 
      />
    </div>
  );
};

export default App;
