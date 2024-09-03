import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [logo, setLogo] = useState(null);
  const [medicines, setMedicines] = useState([
    { name: '', dosage: '', frequency: '', duration: '' },
  ]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const removeMedicine = (index) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
  };

  return (
    <div className="App">
      <div className="prescription">
        <div className="header">
          {logo ? (
            <img src={logo} alt="Prescription Logo" className="prescription-logo" />
          ) : (
            <label htmlFor="upload-logo" className="upload-logo-label">
              Upload Logo
            </label>
          )}
          <input
            type="file"
            id="upload-logo"
            accept="image/*"
            onChange={handleLogoChange}
            style={{ display: 'none' }}
          />
        </div>
        <h2>Doctor's Prescription</h2>
        <table className="prescription-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={medicine.name}
                    onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={medicine.dosage}
                    onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={medicine.frequency}
                    onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={medicine.duration}
                    onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => removeMedicine(index)} className="remove-button">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addMedicine} className="add-button">
          Add Medicine
        </button>
      </div>
    </div>
  );
};

export default App;
