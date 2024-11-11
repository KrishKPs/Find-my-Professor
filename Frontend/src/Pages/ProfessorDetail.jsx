import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
    AiOutlineMail,
    AiOutlineCalendar,
    AiOutlineHome,
    AiOutlineUser,
    AiOutlineCheckCircle,
    AiOutlineSchedule,
    AiOutlineClose,
} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const generateTimeSlots = (start, end) => {
    const slots = [];

    const parseTime = (timeStr) => {
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (modifier === "PM" && hours !== 12) {
            hours += 12;
        } else if (modifier === "AM" && hours === 12) {
            hours = 0;
        }

        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    };

    const currentTime = parseTime(start);
    const endTime = parseTime(end);

    while (currentTime < endTime) {
        const slotStart = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        currentTime.setMinutes(currentTime.getMinutes() + 15);
        const slotEnd = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        slots.push(`${slotStart} - ${slotEnd}`);
    }

    return slots;
};

export default function ProfessorDetail({ data }) {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const officeHours = data.office_hours || [];

    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
        setConfirmationMessage("");
    };

    const handleConfirmAppointment = async () => {
        if (selectedSlot) {
            setLoading(true);
            const [startTime, endTime] = selectedSlot.split(" - ");
            const day = officeHours.find((hours) =>
                generateTimeSlots(hours.startTime, hours.endTime).includes(selectedSlot)
            ).day;

            try {
                const professorId = data._id;
                const professorName = data.name;
                const professorEmail = data.email;

                // Replace with actual student's email and name from your authentication or context
                const studentEmail = "your-student-email@example.com";
                const studentName = "Your Student Name";

                const response = await axios.post(`http://localhost:3087/bookappoinment/${professorId}`, {
                    student_email: studentEmail,
                    student_name: studentName,
                    professor: professorName,
                    professor_email: professorEmail,
                    day,
                    startTime,
                    endTime,
                }, {
                    headers : {
                        Authorization: localStorage.getItem('token') 
                    }
                });

                setConfirmationMessage(response.data.message || "Appointment booked successfully");
            } catch (error) {
                setConfirmationMessage(error.response?.data?.error || "Failed to book appointment");
            } finally {
                setLoading(false);
                setSelectedSlot(null);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center py-12 px-4">
            <div className="max-w-5xl w-full relative">
                <Button
                    className="mb-8 bg-gray-700 text-white hover:bg-gray-600 flex items-center space-x-2 px-4 py-2 rounded-lg"
                    onClick={() => navigate('/homepage')}
                >
                    <AiOutlineHome className="text-lg" />
                    <span className="font-medium">Back to Home</span>
                </Button>

                <Card className="relative bg-gray-800 text-gray-200 rounded-lg shadow-lg p-6 md:p-8">
                    <div className="absolute top-6 right-6">
                        <div
                            className={`flex items-center space-x-1 text-sm font-semibold ${
                                data.available === 'Available' ? 'text-green-500' : 'text-red-500'
                            }`}
                        >
                            <AiOutlineCheckCircle className="text-lg" />
                            <span>{data.available}</span>
                        </div>
                    </div>

                    <CardHeader>
                        <div className="flex items-center space-x-8">
                            <img
                                src={data.profile_photo}
                                alt="Profile"
                                className="w-28 h-28 rounded-full border-4 border-gray-700 shadow-md"
                            />
                            <div>
                                <CardTitle className="text-3xl font-bold text-white">{data.name}</CardTitle>
                                <p className="text-lg font-medium text-gray-400">{data.category}</p>
                                <p className="text-sm text-gray-500">{data.college_name}</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-start space-x-3">
                            <AiOutlineUser className="text-2xl text-gray-400" />
                            <div>
                                <h2 className="text-xl font-semibold">Major</h2>
                                <p className="text-gray-400 text-base">{data.major}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <AiOutlineCalendar className="text-2xl text-gray-400" />
                            <div>
                                <h2 className="text-xl font-semibold">Office Hours</h2>
                                {officeHours?.length > 0 ? (
                                    officeHours.map((hours, index) => (
                                        <p key={index} className="text-gray-400 text-base">
                                            {hours.day}: {hours.startTime} - {hours.endTime}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-400 text-base">No office hours available</p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <AiOutlineHome className="text-2xl text-gray-400" />
                            <div>
                                <h2 className="text-xl font-semibold">Location</h2>
                                <p className="text-gray-400 text-base">{data.location}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <AiOutlineMail className="text-2xl text-gray-400" />
                            <div>
                                <h2 className="text-xl font-semibold">Contact</h2>
                                <p className="text-gray-400 text-base">{data.email}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Button
                    className="fixed bottom-6 right-6 bg-green-600 text-white hover:bg-green-500 px-4 py-2 rounded-full flex items-center"
                    onClick={() => setOpenDialog(true)}
                >
                    <AiOutlineSchedule className="mr-2" />
                    Schedule Appointment
                </Button>

                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent className="bg-gray-800 text-white rounded-lg p-6 space-y-4 shadow-xl">
                        <DialogTitle className="text-2xl font-bold flex justify-between items-center">
                            Select a Time Slot
                            <AiOutlineClose
                                className="cursor-pointer text-red-400 hover:text-red-500"
                                onClick={() => setOpenDialog(false)}
                            />
                        </DialogTitle>
                        <div className="space-y-4">
                            {officeHours.map((hours, index) => (
                                <div key={index} className="space-y-2">
                                    <h3 className="text-lg font-semibold text-white">{hours.day}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {generateTimeSlots(hours.startTime, hours.endTime).map((slot, slotIndex) => (
                                            <Button
                                                key={slotIndex}
                                                className={`px-3 py-2 rounded-md text-sm ${
                                                    selectedSlot === slot
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-700 text-white hover:bg-gray-600'
                                                }`}
                                                onClick={() => handleSlotClick(slot)}
                                            >
                                                {slot}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {selectedSlot && (
                            <div className="mt-4">
                                <p className="text-gray-300 mb-2">Selected Slot: {selectedSlot}</p>
                                <Button
                                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md"
                                    onClick={handleConfirmAppointment}
                                    disabled={loading}
                                >
                                    {loading ? "Booking..." : "Confirm Appointment"}
                                </Button>
                            </div>
                        )}
                        {confirmationMessage && (
                            <p className="mt-4 text-green-500 font-semibold">{confirmationMessage}</p>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
