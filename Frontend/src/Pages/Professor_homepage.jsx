import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FaCheckCircle, FaClock, FaUser, FaEnvelope, FaBell, FaCaretDown, FaEdit } from 'react-icons/fa';

const Trial = () => {
  const [professor, setProfessor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [ApprovedMeetings, setApprovedMeetings] = useState([]);

  useEffect(() => {
    const fetchProfessorData = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3087/getprofessor', {
        headers: { Authorization: token },
      });
      setProfessor(response.data.professor);
      setLoading(false);
    };

    const fetchAppointments = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3087/seeappoinments', {
        headers: { Authorization: token },
      });
      const appointmentsData = response.data.appoinments || [];
      setAppointments(appointmentsData);
      setPendingCount(appointmentsData.filter(appointment => appointment.status === 'Pending').length);
    };

    const fetchApprovedMeetings = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3087/seeapprovemettings', {
          headers: { Authorization: token },
        });
        setApprovedMeetings(response.data.approved_meetings || []); // Set approved meetings
      } catch (error) {
        console.error('Error fetching approved meetings:', error);
      }
    };


    fetchApprovedMeetings();
    fetchProfessorData();
    fetchAppointments();
  }, []);

  const handleApproveAppointment = async (appointmentId, studentEmail) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:3087/approveappoinment',
        { student_email: studentEmail },
        { headers: { Authorization: token } }
      );
  
      if (response.data.msg === 'Appointment Approved') {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === appointmentId
              ? { ...appointment, status: 'Approved' }
              : appointment
          )
        );
        setPendingCount((prev) => prev - 1); // Decrease the pending count after approval
        
        // Add the approved appointment to the ApprovedMeetings state
        const approvedAppointment = appointments.find(appointment => appointment._id === appointmentId);
        setApprovedMeetings((prevApproved) => [...prevApproved, approvedAppointment]);
      }
    } catch (error) {
      console.error('Error approving appointment:', error);
    }
  };

  const handleDeclineAppointment = async (appointmentId, studentEmail) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:3087/declineappoinment',
        { student_email: studentEmail },
        { headers: { Authorization: token } }
      );
  
      if (response.data.message === 'Meeting Declined') {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === appointmentId
              ? { ...appointment, status: 'Declined' }
              : appointment
          )
        );
        setPendingCount((prev) => prev - 1); // Decrease the pending count after decline
      }
    } catch (error) {
      console.error('Error declining appointment:', error);
    }
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const toggleEditMode = () => setIsEditing(!isEditing); // Toggle edit mode

  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:3087/updatedetails',
        { ...professor },
        { headers: { Authorization: token } }
      );

      if (response.data.msg === 'Professor updated') {
        setIsEditing(false); // Exit edit mode
      }
    } catch (error) {
      console.error('Error saving professor data:', error);
    }
  };

  if (loading) return <Skeleton className="w-full h-64" />;

  // Separate appointments into pending and approved
  const pendingAppointments = appointments.filter((appointment) => appointment.status === 'Pending');
  const approvedAppointments = appointments.filter((appointment) => appointment.status === 'Approved');

  return (
    <div className="bg-gradient-to-r from-blue-800 to-teal-600 min-h-screen text-white p-8 flex flex-col items-center relative">
      {/* Professor Section */}
      {professor && (
        <Card className="w-full md:w-3/4 lg:w-1/2 p-8 bg-white text-gray-900 rounded-3xl shadow-lg transform transition-all hover:scale-105 duration-300 mb-12">
          <div className="flex items-center mb-6 justify-between">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-3xl">
              <FaUser />
            </div>
            <div className="flex-grow ml-6">
              {isEditing ? (
                <input
                  type="text"
                  value={professor.name}
                  onChange={(e) => setProfessor({ ...professor, name: e.target.value })}
                  className="text-4xl font-bold text-gray-900 border-b-2 focus:outline-none"
                />
              ) : (
                <h2 className="text-4xl font-bold">{professor.name}</h2>
              )}
              <p className="text-lg font-medium text-gray-600">{professor.category}</p>
              <p className="text-sm text-gray-500">{professor.email}</p>
              <p className="text-sm text-gray-500">{professor.college_name}</p>
            </div>
            <div>
              {isEditing ? (
                <Button onClick={handleSaveChanges} className="bg-teal-600 text-white">
                  Save Changes
                </Button>
              ) : (
                <Button onClick={toggleEditMode} className="bg-yellow-600 text-white">
                  <FaEdit className="mr-2" /> Edit Info
                </Button>
              )}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Major</h3>
            {isEditing ? (
              <input
                type="text"
                value={professor.major}
                onChange={(e) => setProfessor({ ...professor, major: e.target.value })}
                className="text-gray-700"
              />
            ) : (
              <p className="text-gray-700">{professor.major}</p>
            )}
            <h3 className="text-xl font-semibold mb-2 mt-4">Location</h3>
            {isEditing ? (
              <input
                type="text"
                value={professor.location}
                onChange={(e) => setProfessor({ ...professor, location: e.target.value })}
                className="text-gray-700"
              />
            ) : (
              <p className="text-gray-700">{professor.location}</p>
            )}
            <h3 className="text-xl font-semibold mb-2 mt-4">Office Hours</h3>
            <ul className="space-y-2">
              {professor.office_hours?.map((hour) => (
                <li key={hour._id} className="text-gray-700">{hour.day}: {hour.startTime} - {hour.endTime}</li>
              ))}
            </ul>
          </div>
        </Card>
      )}

      {/* Floating Notification Bell */}
      <div
        onClick={toggleDropdown}
        className="fixed top-4 right-4 bg-teal-500 p-4 rounded-full shadow-lg cursor-pointer hover:bg-teal-600 transition-all"
      >
        <FaBell className="text-white text-3xl" />
        {pendingCount > 0 && (
          <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {pendingCount}
          </div>
        )}
      </div>

      {/* Sliding Panel for Pending Requests */}
      {showDropdown && (
        <div
          className={`fixed top-0 right-0 w-80 h-full bg-white text-black shadow-lg transform transition-all duration-300 ${showDropdown ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Pending Requests</h3>
            <Button onClick={toggleDropdown} className="bg-transparent text-black hover:text-gray-500">
              <FaCaretDown className="text-xl" />
            </Button>
          </div>

          <div className="p-4">
            {pendingAppointments.length > 0 ? (
              pendingAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="flex justify-between items-center mb-4 p-3 bg-teal-100 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-semibold">{appointment.student_name}</p>
                    <p className="text-xs">{appointment.day}: {appointment.startTime} - {appointment.endTime}</p>
                  </div>
                  <Button
                    onClick={() => handleApproveAppointment(appointment._id, appointment.student_email)}
                    className="bg-teal-600 text-xs text-white px-3 py-1 rounded-lg hover:bg-teal-700 mr-2"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleDeclineAppointment(appointment._id, appointment.student_email)}
                    className="bg-red-600 text-xs text-white px-3 py-1 rounded-lg hover:bg-red-700"
                  >
                    Decline
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No pending requests.</p>
            )}
          </div>
        </div>
      )}

      {/* Appointments Section */}
      <div className="w-full md:w-3/4 lg:w-1/2">
        <h2 className="text-3xl font-bold text-white mb-6">Appointments</h2>

        {/* Approved Appointments */}
        {ApprovedMeetings.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-green-300 mb-4">Approved Meetings</h3>
            {ApprovedMeetings.map((appointment) => (
              <Card key={appointment._id} className="mb-4 p-4 bg-white text-gray-900 rounded-xl shadow-md">
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  <p className="font-semibold text-gray-700">{appointment.day}: {appointment.startTime} - {appointment.endTime}</p>
                </div>
                <p className="text-gray-600">Student: {appointment.student_name}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trial;
