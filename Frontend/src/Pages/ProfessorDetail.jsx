import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    AiOutlineMail,
    AiOutlineCalendar,
    AiOutlineHome,
    AiOutlineUser,
    AiOutlineCheckCircle,
} from 'react-icons/ai';

export default function ProfessorDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Use the provided data
    const professor = {
        name: "Yug Patel",
        email: "yug@gmail.com",
        college_name: "Middlesex",
        category: "Professor",
        profile_photo:
            "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
        major: "Computer Science",
        location: "MLksdsd Hall",
        office_hours: [
            {
                day: "Monday",
                startTime: "10:00 AM",
                endTime: "11:00 AM",
            },
        ],
        available: "Not-Available",
        verification: "Verified",
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center py-12 px-4">
            <div className="max-w-5xl w-full">
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
                            className={`flex items-center space-x-1 text-sm font-semibold ${
                                professor.available === "Available" ? "text-green-500" : "text-red-500"
                            }`}
                        >
                            <AiOutlineCheckCircle className="text-lg" />
                            <span>{professor.available}</span>
                        </div>
                    </div>

                    <CardHeader>
                        <div className="flex items-center space-x-8">
                            <img
                                src={professor.profile_photo}
                                alt="Profile"
                                className="w-28 h-28 rounded-full border-4 border-gray-700 shadow-md"
                            />
                            <div>
                                <CardTitle className="text-3xl font-bold text-white">{professor.name}</CardTitle>
                                <p className="text-lg font-medium text-gray-400">{professor.category}</p>
                                <p className="text-sm text-gray-500">{professor.college_name}</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-start space-x-3">
                            <AiOutlineUser className="text-2xl text-gray-400" />
                            <div>
                                <h2 className="text-xl font-semibold">Major</h2>
                                <p className="text-gray-400 text-base">{professor.major}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <AiOutlineCalendar className="text-2xl text-gray-400" />
                            <div>
                                <h2 className="text-xl font-semibold">Office Hours</h2>
                                {/* Map over office_hours array */}
                                {professor.office_hours.map((hours, index) => (
                                    <p key={index} className="text-gray-400 text-base">
                                        {hours.day}: {hours.startTime} - {hours.endTime}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <AiOutlineHome className="text-2xl text-gray-400" />
                            <div>
                                <h2 className="text-xl font-semibold">Location</h2>
                                <p className="text-gray-400 text-base">{professor.location}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <AiOutlineMail className="text-2xl text-gray-400" />
                            <div>
                                <h2 className="text-xl font-semibold">Contact</h2>
                                <p className="text-gray-400 text-base">{professor.email}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}