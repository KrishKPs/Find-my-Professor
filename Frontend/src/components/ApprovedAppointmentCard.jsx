const ApprovedAppointmentCard = ({ appointment }) => {
    return (
      <Card className="mb-4 p-4 shadow-lg border border-green-500">
        <h3 className="text-xl font-semibold text-green-600">{appointment.student_name}</h3>
        <p className="text-gray-500">{appointment.student_email}</p>
        <p className="text-gray-600">{appointment.day}: {appointment.startTime} - {appointment.endTime}</p>
        <div className="mt-2">
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">Approved</span>
        </div>
      </Card>
    );
  };
  
  export default ApprovedAppointmentCard;
  