import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import { X } from 'lucide-react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
    const [professors, setProfessors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [email, setEmail] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);

    const navigate = useNavigate();

    // Fetch professors data
    const getProfessors = async () => {
        try {
            const response = await axios.get('http://localhost:3087/seeallprofessor');
            setProfessors(response.data.Professors);
        } catch (error) {
            console.error("Error fetching professors:", error);
        }
    };

    useEffect(() => {
        getProfessors();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category === selectedCategory ? '' : category);
    };

    const handleProfileSelect = (profile) => {
        navigate(profile._id);
    };

    const filteredProfiles = professors.filter(profile =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === '' || profile.category === selectedCategory)
    );

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-center text-gray-200">
            {/* Navbar */}
            <nav className="sticky top-0 w-full bg-gray-800 shadow-md z-10">
                <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
                    <div className="text-2xl font-semibold">Find My Professor</div>
                    <div className="hidden md:flex space-x-6">
                        <a href="#home" className="hover:text-gray-100">Home</a>
                        <a href="#about" className="hover:text-gray-100">About</a>
                        <a href="#contact" className="hover:text-gray-100">Contact</a>
                    </div>
                    <button className="md:hidden text-gray-300 hover:text-gray-100">
                        <AiOutlineSearch size={24} />
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex flex-col items-center w-full max-w-7xl mx-auto py-16 space-y-10 px-4">
                {/* Heading */}
                <h1 className="text-4xl font-bold drop-shadow-lg">Find My Professor</h1>

                {/* Search Bar */}
                <div className="relative w-full max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Search by professor name"
                        className="w-full px-5 py-3 bg-gray-800 text-gray-200 border border-gray-600 rounded-full focus:ring-2 focus:ring-gray-600 outline-none"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button
                        onClick={() => setSearchClicked(true)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-700 text-gray-200 p-2 rounded-full hover:bg-gray-600 transition-colors"
                    >
                        <AiOutlineSearch size={20} />
                    </button>
                </div>

                {/* Category Filters */}
                <div className="flex justify-center gap-3">
                    {['Professor', 'Academic Advisor', 'Consultant'].map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategorySelect(category)}
                            className={`px-4 py-2 text-sm rounded-full transition-colors ${
                                selectedCategory === category
                                    ? 'bg-gray-600 text-white'
                                    : 'bg-gray-500 text-gray-300 hover:bg-gray-400'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Professor Cards */}
                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                    {filteredProfiles.map((profile, index) => (
                        <div
                            key={profile.id}
                            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer"
                            onClick={() => handleProfileSelect(profile)}
                        >
                            <div className="flex flex-col items-center p-6">
                                <div className="relative">
                                    <img
                                        src={profile.image || "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"}
                                        alt="profile"
                                        className="w-24 h-24 rounded-full border-4 border-gray-700 shadow-md mb-4"
                                    />
                                    {profile.category === 'Professor' && (
                                        <span className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 border-2 border-gray-800 rounded-full"></span>
                                    )}
                                </div>
                                <h2 className="text-xl font-semibold text-center text-gray-200 mb-2">
                                    {profile.name}
                                </h2>
                                <span className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-700 text-gray-200 mb-2">
                                    {profile.category}
                                </span>
                                <p className="text-gray-400 text-center">{profile.title}</p>
                                <p className="text-gray-500 text-sm text-center">{profile.college}</p>
                            </div>
                            <div className="border-t border-gray-700 flex justify-between items-center px-6 py-4">
                                <button
                                    className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-semibold py-2 px-4 rounded-full transition-colors"
                                >
                                    View Profile
                                </button>
                                <p className={`text-sm font-semibold ${
                                    profile.available === 'Available' ? 'text-green-400' : 'text-red-400'
                                }`}>
                                    {profile.available}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
