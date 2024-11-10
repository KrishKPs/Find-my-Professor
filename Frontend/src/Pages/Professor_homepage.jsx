import { useState } from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FaCheck, FaTimes, FaEdit, FaPlus } from 'react-icons/fa';

// Dummy data for the professor and pending requests
const professorData = {
  name: "Dr. John Doe",
  email: "john.doe@example.com",
  category: "Professor of Computer Science",
  college_name: "XYZ University",
  profile_photo: "https://www.example.com/path/to/profile.jpg",
  major: "Computer Science",
  location: "Building A, Room 101",
  office_hours: [
    { day: 'Monday', startTime: '10:00 AM', endTime: '12:00 PM' },
    { day: 'Wednesday', startTime: '2:00 PM', endTime: '4:00 PM' },
  ],
  available: "Available",
};

const pendingRequestsData = [
  {
    id: "1",
    studentName: "Alice Johnson",
    studentEmail: "alice.johnson@example.com",
    day: "Monday",
    startTime: "10:00 AM",
    endTime: "10:30 AM",
    status: "pending",
  },
  {
    id: "2",
    studentName: "Bob Smith",
    studentEmail: "bob.smith@example.com",
    day: "Wednesday",
    startTime: "11:00 AM",
    endTime: "11:30 AM",
    status: "pending",
  }
];

const ProfessorHomePage = () => {
  const [professor, setProfessor] = useState(professorData);
  const [pendingRequests, setPendingRequests] = useState(pendingRequestsData);
  const [isEditing, setIsEditing] = useState(false);  // Toggle edit mode
  const [newOfficeHour, setNewOfficeHour] = useState({ day: '', startTime: '', endTime: '' });

  // Handle changes to professor details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfessor((prevProfessor) => ({
      ...prevProfessor,
      [name]: value,
    }));
  };

  // Handle office hours day/time changes
  const handleOfficeHourChange = (e) => {
    const { name, value } = e.target;
    setNewOfficeHour((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOfficeHour = () => {
    if (newOfficeHour.day && newOfficeHour.startTime && newOfficeHour.endTime) {
      setProfessor((prevProfessor) => ({
        ...prevProfessor,
        office_hours: [...prevProfessor.office_hours, newOfficeHour],
      }));
      setNewOfficeHour({ day: '', startTime: '', endTime: '' });
    }
  };

  // Handle availability change
  const handleAvailabilityChange = (e) => {
    setProfessor((prevProfessor) => ({
      ...prevProfessor,
      available: e.target.checked ? 'Available' : 'Unavailable',
    }));
  };

  const handleApproveRequest = (appointmentId) => {
    setPendingRequests(prev => prev.map(req => req.id === appointmentId ? { ...req, status: 'approved' } : req));
  };

  const handleDeclineRequest = (appointmentId) => {
    setPendingRequests(prev => prev.filter(req => req.id !== appointmentId));
  };

  const handleSaveChanges = () => {
    // You can replace this with an API call to save the professor's updated details
    console.log('Professor details saved:', professor);
    setIsEditing(false);  // Exit edit mode after saving
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Professor Details Section (Editable) */}
        <Card className="bg-white p-6 shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center mb-6">
            <Avatar src={professor.profile_photo} alt={professor.name} className="w-24 h-24 mr-6" />
            <div className="flex-grow">
              {isEditing ? (
                <Input
                  name="name"
                  value={professor.name}
                  onChange={handleInputChange}
                  className="text-3xl font-semibold text-gray-800 bg-transparent border-b-2 border-gray-300 focus:ring-0"
                />
              ) : (
                <h2 className="text-3xl font-semibold text-gray-800">{professor.name}</h2>
              )}

              <p className="text-gray-600">
                {isEditing ? (
                  <Input
                    name="category"
                    value={professor.category}
                    onChange={handleInputChange}
                    className="bg-transparent border-b-2 border-gray-300 focus:ring-0"
                  />
                ) : (
                  professor.category
                )}
              </p>
              <p className="text-gray-500">
                {isEditing ? (
                  <Input
                    name="email"
                    value={professor.email}
                    onChange={handleInputChange}
                    className="bg-transparent border-b-2 border-gray-300 focus:ring-0"
                  />
                ) : (
                  professor.email
                )}
              </p>
              <p className="text-gray-400">{professor.college_name}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Location</h3>
            {isEditing ? (
              <Input
                name="location"
                value={professor.location}
                onChange={handleInputChange}
                className="bg-transparent border-b-2 border-gray-300 focus:ring-0"
              />
            ) : (
              <p className="text-gray-600">{professor.location}</p>
            )}

            <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">Major</h3>
            {isEditing ? (
              <Input
                name="major"
                value={professor.major}
                onChange={handleInputChange}
                className="bg-transparent border-b-2 border-gray-300 focus:ring-0"
              />
            ) : (
              <p className="text-gray-600">{professor.major}</p>
            )}

            <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">Office Hours</h3>
            {isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <select
                    name="day"
                    value={newOfficeHour.day}
                    onChange={handleOfficeHourChange}
                    className="border border-gray-300 rounded-md px-4 py-2"
                  >
                    <option value="">Select Day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                  </select>
                  <input
                    type="time"
                    name="startTime"
                    value={newOfficeHour.startTime}
                    onChange={handleOfficeHourChange}
                    className="border border-gray-300 rounded-md px-4 py-2"
                  />
                  <input
                    type="time"
                    name="endTime"
                    value={newOfficeHour.endTime}
                    onChange={handleOfficeHourChange}
                    className="border border-gray-300 rounded-md px-4 py-2"
                  />
                  <Button
                    onClick={handleAddOfficeHour}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    <FaPlus className="mr-2" /> Add
                  </Button>
                </div>
                <div className="mt-4">
                  <ul>
                    {professor.office_hours.map((hour, index) => (
                      <li key={index} className="text-gray-600">
                        {hour.day}: {hour.startTime} - {hour.endTime}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <ul>
                {professor.office_hours.map((hour, index) => (
                  <li key={index} className="text-gray-600">
                    {hour.day}: {hour.startTime} - {hour.endTime}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Availability Toggle */}
          <div className="mt-4 flex items-center">
            <Label htmlFor="available">Available</Label>
            {isEditing ? (
              <input
                id="available"
                type="checkbox"
                checked={professor.available === 'Available'}
                onChange={handleAvailabilityChange}
                className="ml-2"
              />
            ) : (
              <span className="ml-2 text-gray-600">{professor.available}</span>
            )}
          </div>

          {/* Edit/Save Button */}
          <div className="mt-8 text-right">
            {isEditing ? (
              <Button onClick={handleSaveChanges} className="bg-blue-600 text-white hover:bg-blue-700">
                Save Changes
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-yellow-600 text-white hover:bg-yellow-700">
                <FaEdit className="mr-2" /> Edit Info
              </Button>
            )}
          </div>
        </Card>

        {/* Pending Appointment Requests Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Pending Appointment Requests</h2>
          {pendingRequests.length === 0 ? (
            <div className="text-gray-500">No pending requests at the moment.</div>
          ) : (
            pendingRequests.map((request) => (
              <Card key={request.id} className="mb-6 bg-white p-6 shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{request.studentName}</h3>
                    <p className="text-gray-500">{request.studentEmail}</p>
                    <p className="text-gray-600">{request.day} | {request.startTime} - {request.endTime}</p>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => handleApproveRequest(request.id)}
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
                      <FaCheck className="mr-2" /> Approve
                    </Button>
                    <Button
                      onClick={() => handleDeclineRequest(request.id)}
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      <FaTimes className="mr-2" /> Decline
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Label>Status: </Label>
                  <Badge className={request.status === 'approved' ? 'bg-green-300' : 'bg-yellow-300'}>
                    {request.status}
                  </Badge>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessorHomePage;
