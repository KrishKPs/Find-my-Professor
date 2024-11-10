import React, { useState } from 'react';
import axios from 'axios';

function ProfessorCard({ professor, onVerificationUpdate }) {
  const [verification, setVerification] = useState(professor.verification);
  const token = localStorage.getItem('token');   

  const handleVerificationChange = async (e) => {
    const newVerificationStatus = e.target.value;
    setVerification(newVerificationStatus);

    try {
      const response = await axios.post('http://localhost:3087/updateverification', 
        {
          email: professor.email,     
          verification: newVerificationStatus     
        },
        {
          headers: {
            Authorization: `${token}`
          }    
        }
      );

      console.log(response.data); 
      alert('Verification status updated successfully');  
      onVerificationUpdate();  // Trigger refresh in AdminDashboard
    } catch (error) {
      console.error('Error updating verification:', error);
      alert('Failed to update verification status. Please try again.');
    }
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-sm">
      <img 
        src={professor.profile_photo} 
        alt={`${professor.name}'s profile`} 
        className="w-16 h-16 rounded-full mb-2"
      />
      <h2 className="text-lg font-bold">{professor.name}</h2>
      <p>Email: {professor.email}</p>
      <p>College: {professor.college_name}</p>
      <p>Category: {professor.category}</p>
      <p>Major: {professor.major}</p>
      <p>Location: {professor.location}</p>
      <p>Verification Status: {verification}</p>

      <select 
        value={verification} 
        onChange={handleVerificationChange} 
        className="mt-2 p-1 border"
      >
        <option value="Unverified">Unverified</option>
        <option value="Verified">Verified</option>
      </select>
    </div>
  );
}

export default ProfessorCard;
