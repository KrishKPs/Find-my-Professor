import { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaEdit, FaBell } from 'react-icons/fa';

const ProfessorHomepage = () => {
  const [professor, setProfessor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchProfessorData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

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

    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3087/seeappoinments', {
          headers: { Authorization: `${token}` },
        });
        setAppointments(response.data.appointments);
        setPendingRequests(response.data.appointments.filter(app => app.status === 'Pending').length);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchProfessorData();
    fetchAppointments();
  }, []);

  const handleBellClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
<nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
  <h1 className="text-xl font-semibold">Professor Dashboard</h1>
  <div className="relative">
    <FaBell className="text-2xl cursor-pointer" onClick={handleBellClick} />
    {pendingRequests > 0 && (
      <Badge className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 text-xs transform translate-x-1/2 -translate-y-1/2">
        {pendingRequests}
      </Badge>
    )}
    {isDropdownOpen && (
      <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-10">
        <h3 className="text-lg font-semibold mb-2">Pending Appointments</h3>
        {appointments.length > 0 ? (
          <ul>
            {appointments
              .filter(app => app.status === 'Pending') // Only show pending appointments
              .map((appointment) => (
                <li key={appointment._id} className="border-b py-2">
                  <p><strong>Student:</strong> {appointment.student_name}</p>
                  <p><strong>Day:</strong> {appointment.day}</p>
                  <p><strong>Time:</strong> {appointment.startTime} - {appointment.endTime}</p>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-500">No pending appointments.</p>
        )}
      </div>
    )}
  </div>
</nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        <Card className="bg-white p-6 shadow-lg rounded-xl">
          <div className="flex items-center mb-6">
            <Avatar src={professor.profile_photo} alt={professor.name} className="w-24 h-24 mr-6" />
            <div className="flex-grow">
              {isEditing ? (
                <input
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
      </main>
    </div>
  );
};

export default ProfessorHomepage;
