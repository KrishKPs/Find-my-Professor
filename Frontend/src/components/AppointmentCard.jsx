import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AppointmentCard = ({ appointment }) => {
  const handleApprove = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3087/approveappoinment',
        { appointment_id: appointment._id },
        { headers: { Authorization: `${localStorage.getItem('token')}` } }
      );
      // Handle the approval response here (e.g., update state)
      alert(response.data.msg);
    } catch (error) {
      console.error('Error approving appointment:', error);
    }
  };

  return (
    <Card className="bg-white p-6 shadow-lg rounded-lg mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold">{appointment.student_name}</h4>
          <p className="text-sm text-gray-500">{appointment.student_email}</p>
          <p className="text-sm text-gray-500">{appointment.day}</p>
          <p className="text-sm text-gray-500">
            {appointment.startTime} - {appointment.endTime}
          </p>
        </div>
        <div className="text-right">
          <Badge className={`text-white rounded-full ${appointment.status === 'Pending' ? 'bg-yellow-500' : 'bg-green-500'}`}>
            {appointment.status}
          </Badge>
        </div>
      </div>

      <div className="mt-4">
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700 w-full"
          onClick={handleApprove}
          disabled={appointment.status !== 'Pending'}
        >
          {appointment.status === 'Pending' ? 'Approve Appointment' : 'Approved'}
        </Button>
      </div>
    </Card>
  );
};

export default AppointmentCard;
