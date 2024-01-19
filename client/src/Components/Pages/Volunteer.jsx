import React, { useState } from 'react';

const SearchBar = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [numOfInjured, setNumOfInjured] = useState('');
  const [numOfCasualties, setNumOfCasualties] = useState('');
  const [severity, setSeverity] = useState('');
  const [disasterReport,setdisasterReport] = useState('');
  
  const handleSearch = async () => {
    try {
      // Define your API endpoint
      const apiEndpoint = 'http://127.0.0.1:8080/generateDisasterReport';
  
      // Prepare the data to send in the request body
      const requestData = {
        type_of_disaster: selectedType,
        area_affected_sqm: selectedArea,
        num_casualties: numOfCasualties,
        num_injured: numOfInjured,
        severity: severity,
        location: selectedLocation,
      };
  
      // Make the API call using fetch
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        // Handle error scenarios
        console.error('Failed to fetch disaster report:', response.statusText);
        return;
      }
  
      // Parse the JSON response
      const responseData = await response.json();
  
      // Access the generated disaster report
      setdisasterReport(responseData.disaster_report);
  
      // Do something with the disaster report (e.g., log it)
      console.log('Generated Disaster Report:', disasterReport);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const disasterTypes = [
    'Earthquake',
    'Wildfire or Urban Fire',
    'Flood/Tsunami',
    'Cyclones',
    'Landslides',
    'Droughts',
  ];

  const inputStyle = {
    padding: '12px 16px 12px 16px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '10px',
    width: '100%', // Adjust the width as needed
  };

  const buttonStyle = {
    padding: '10px 10px 10px 10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%', // Adjust the width as needed
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Align to the left
    width: '50%', // Adjust the width as needed
    padding: '20px',
    backgroundColor: 'white', // White color for the card
    borderRadius: '8px',
    boxShadow: '10px 10px 8px rgba(0, 0, 0, 0.1)', // Added shadow
    height: 'auto', // Adjusted to make it normal height
  };

  const titleStyle = {
    fontSize: '40px',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '20px 0', // Added margin
    fontFamily: 'Roboto, sans-serif', // Set the font family
    color: '#ffff', // Set the color to a shade of blue
  };

  const filtersTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', width: '100%' }}>
      <div style={titleStyle}>Post-Disaster Decision Support System</div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={cardStyle}>
          <div style={filtersTitleStyle}>Filters</div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Type of Disaster</option>
            {disasterTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            placeholder="Area affected (sqm)"
            style={inputStyle}
          />
          <input
            type="number"
            value={numOfInjured}
            onChange={(e) => setNumOfInjured(e.target.value)}
            placeholder="No of Injured"
            style={inputStyle}
          />
          <input
            type="number"
            value={numOfCasualties}
            onChange={(e) => setNumOfCasualties(e.target.value)}
            placeholder="No of Casualties"
            style={inputStyle}
          />
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Severity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="text"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            placeholder="Location"
            style={inputStyle}
          />
          <button
            onClick={handleSearch}
            style={buttonStyle}
          >
            Search
          </button>
        </div>
        <p className='p-10 h-[500px] w-[500px] bg-white overflow-y-scroll rounded-lg ml-2'>{disasterReport}</p>
      </div>
    </div>
  );
};

export default SearchBar;