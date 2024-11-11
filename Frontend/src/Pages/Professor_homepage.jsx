import { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaEdit } from 'react-icons/fa';

const ProfessorHomePage = () => {
  const [professor, setProfessor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfessorData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        console.log (token); 

        const response = await axios.get('http://localhost:3087/getprofessor', {

          
          headers: { Authorization: `${token}` },
        });

        setProfessor(response.data.professor);
      } catch (err) {
        console.error('Error fetching professor data:', err);
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfessorData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <Card className="bg-white p-6 shadow-lg rounded-xl">
        <div className="flex items-center mb-6">
          <Avatar src={professor.profile_photo} alt={professor.name} className="w-24 h-24 mr-6" />
          <div className="flex-grow">
            {isEditing ? (
              <Input
                name="name"
                value={professor.name}
                onChange={(e) => setProfessor({ ...professor, name: e.target.value })}
                className="text-3xl font-semibold text-gray-800 bg-transparent border-b-2 border-gray-300 focus:ring-0"
              />
            ) : (
              <h2 className="text-3xl font-semibold text-gray-800">{professor.name}</h2>
            )}
            <p className="text-gray-600">{professor.category}</p>
            <p className="text-gray-500">{professor.email}</p>
            <p className="text-gray-400">{professor.college_name}</p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Major</h3>
          <p className="text-gray-600">{professor.major}</p>

          <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">Location</h3>
          <p className="text-gray-600">{professor.location}</p>

          <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">Office Hours</h3>
          <ul>
            {professor.office_hours.map((hour) => (
              <li key={hour._id} className="text-gray-600">
                {hour.day}: {hour.startTime} - {hour.endTime}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 text-right">
          {isEditing ? (
            <Button onClick={() => setIsEditing(false)} className="bg-blue-600 text-white hover:bg-blue-700">
              Save Changes
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="bg-yellow-600 text-white hover:bg-yellow-700">
              <FaEdit className="mr-2" /> Edit Info
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProfessorHomePage;
