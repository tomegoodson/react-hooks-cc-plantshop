import React, { useState } from "react";

function Search({ plants, setFilteredPlants }) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  
    const filteredPlants = plants.filter((plant) =>
      plant.name.toLowerCase().includes(value)
    );
    setFilteredPlants(filteredPlants);
  };

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
