import React from 'react';
import { useParams } from 'react-router-dom';

export default function dataDetail({data}) {
    const { id } = useParams();
    
    // // For now, use hardcoded data
    // const data = {
    //     name: "Dr. John Doe",
    //     email: "john.doe@example.com",
    //     category: "data",
    //     college_name: "XYZ University",
    //     profile_photo: "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    //     major: "Computer Science",
    //     location: "Building A, Room 123",
    //     office_hours: "Mon, Wed, Fri - 2:00 PM to 4:00 PM",
    //     available: "Available",
    //     verification: "Not-Verified",
    // };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 flex flex-col items-center text-gray-200 p-8">
            <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-xl p-8">
                <div className="flex items-center space-x-8">
                    <img
                        src={data.profile_photo}
                        alt="Profile"
                        className="w-32 h-32 rounded-full"
                    />
                    <div>
                        <h1 className="text-3xl font-bold">{data.name}</h1>
                        <p className="text-gray-400">{data.category}</p>
                        <p className="text-gray-500">{data.college_name}</p>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold">Major</h2>
                        <p className="text-gray-400">{data.major}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Location</h2>
                        <p className="text-gray-400">{data.location}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Office Hours</h2>
                        <p className="text-gray-400">{data.office_hours}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Availability</h2>
                        <p className="text-gray-400">{data.available}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Verification</h2>
                        <p className="text-gray-400">{data.verification}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Contact</h2>
                        <p className="text-gray-400">{data.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
