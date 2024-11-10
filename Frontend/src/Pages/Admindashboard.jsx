import { useEffect, useState } from "react";
import axios from 'axios';   
import ProfessorCard from "./professorcard";

export function AdminDashboard() {
  const token = localStorage.getItem('token');
  const [Professor, setProfessor] = useState([]);  
  const [refreshKey, setRefreshKey] = useState(0);  // State to trigger refresh

  const getUnverifiedProfessor = async () => {
    try {
      const response = await axios.get('http://localhost:3087/seeprofessor', {
        headers: {
          Authorization: `${token}`
        }
      });
      console.log(response.data.unverfied_professors);
      setProfessor(response.data.unverfied_professors);
    } catch (error) {
      console.error('Error fetching professors:', error);
    }
  };

  useEffect(() => {
    getUnverifiedProfessor();   
  }, [refreshKey]); // Refreshes when refreshKey changes

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);  // Increment refreshKey to trigger useEffect
  };

  return (
    <>
      <h1>Hello</h1>
      {Professor.map((professorone, index) => (
        <ProfessorCard 
          key={professorone._id} 
          professor={professorone} 
          onVerificationUpdate={handleRefresh} // Pass refresh function
        />
      ))}
    </>
  );
}
