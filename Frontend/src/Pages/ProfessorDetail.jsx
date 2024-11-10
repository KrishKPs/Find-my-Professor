import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
    AiOutlineMail,
    AiOutlineCalendar,
    AiOutlineHome,
    AiOutlineUser,
    AiOutlineCheckCircle,
    AiOutlineSchedule,
} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProfessorDetail({ data }) {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [appointmentData, setAppointmentData] = useState({
        studentId: '',
        day: '',
        startTime: '',
        endTime: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const professorId = data._id; // Using the professor's ID
            const response = await axios.post(`http://localhost:3087/bookappoinment/${professorId}`, appointmentData);
            alert(response.data.message);
            setOpenDialog(false);
        } catch (error) {
            alert(error.response?.data?.error || 'Failed to book appointment');
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
                    {/* Availability Badge */}
                    <div className="absolute top-6 right-6">
                        <div
                            className={`flex items-center space-x-1 text-sm font-semibold ${data.available === "Available" ? "text-green-500" : "text-red-500"
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
                                {data.office_hours?.length > 0 ? (
                                    data.office_hours.map((hours, index) => (
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

                {/* Schedule Appointment Button */}
                <Button
                    className="fixed bottom-6 right-6 bg-green-600 text-white hover:bg-green-500 px-4 py-2 rounded-full flex items-center"
                    onClick={() => setOpenDialog(true)}
                >
                    <AiOutlineSchedule className="mr-2" />
                    Schedule Appointment
                </Button>

                {/* Dialog for Scheduling Appointment */}
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent className="bg-gray-800 text-white rounded-lg p-6 space-y-4 shadow-xl">
                        <DialogTitle className="text-2xl font-bold">Book an Appointment</DialogTitle>
                        <Input
                            name="studentId"
                            placeholder="Student ID"
                            value={appointmentData.studentId}
                            onChange={handleInputChange}
                            className="bg-gray-700 text-white"
                        />
                        <Input
                            name="day"
                            placeholder="Day (e.g., Monday)"
                            value={appointmentData.day}
                            onChange={handleInputChange}
                            className="bg-gray-700 text-white"
                        />
                        <Input
                            name="startTime"
                            placeholder="Start Time (e.g., 10:00 AM)"
                            value={appointmentData.startTime}
                            onChange={handleInputChange}
                            className="bg-gray-700 text-white"
                        />
                        <Input
                            name="endTime"
                            placeholder="End Time (e.g., 10:30 AM)"
                            value={appointmentData.endTime}
                            onChange={handleInputChange}
                            className="bg-gray-700 text-white"
                        />
                        <Button
                            onClick={handleSubmit}
                            className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg"
                        >
                            Confirm Appointment
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
