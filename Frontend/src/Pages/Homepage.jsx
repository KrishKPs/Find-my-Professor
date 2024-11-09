import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import { X } from 'lucide-react'; // Close icon for profile sidebar
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

    const headingRef = useRef(null);
    const searchBarRef = useRef(null);
    const categoryRef = useRef(null);
    const cardsRef = useRef([]);

    // Fetch professors data
    const getProfessors = async () => {
        try {
            const response = await axios.get('http://localhost:3087/seeallprofessor');
            setProfessors(response.data.Professors);
            if (response.data.Professors.length > 0) {
                setEmail(response.data.Professors[0].email);
            }
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
        navigate(profile.name);
    };

    const filteredProfiles = professors.filter(profile =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === '' || profile.category === selectedCategory)
    );

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-center">
            {/* Navbar */}
            <nav className="w-full bg-gray-800 shadow-md">
                <div className="max-w-8xl px-6 mx-auto py-3 flex items-center justify-between">
                    <div className="text-2xl font-semibold text-gray-200">Find My Professor</div>
                    <div className="hidden md:flex space-x-6">
                        <a href="#home" className="text-gray-300 hover:text-gray-100 transition-colors">Home</a>
                        <a href="#about" className="text-gray-300 hover:text-gray-100 transition-colors">About</a>
                        <a href="#contact" className="text-gray-300 hover:text-gray-100 transition-colors">Contact</a>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button className="text-gray-300 hover:text-gray-100 transition-colors">
                            <AiOutlineSearch size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Centered Content Wrapper */}
            <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto mt-52 space-y-8">

                {/* Heading */}
                <div ref={headingRef}>
                    <h1 className="text-5xl font-bold text-gray-200 tracking-wide drop-shadow-lg">
                        Find My Professor
                    </h1>
                </div>

                {/* Search Bar */}
                <div ref={searchBarRef} className="relative w-full max-w-md">
                    <input 
                        type="text" 
                        placeholder="Search by professor name" 
                        className="w-full px-6 py-3 text-lg bg-gray-800 text-gray-200 border border-gray-600 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-600"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button 
                        onClick={() => setSearchClicked(true)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-gray-200 p-2 rounded-full hover:bg-gray-600 transition-colors flex items-center justify-center"
                    >
                        <AiOutlineSearch className="text-2xl" />
                    </button>
                </div>

                {/* Category Filters */}
                <div ref={categoryRef} className="flex flex-wrap gap-2">
                    {['Professor', 'Academic Advisor', 'Consultant'].map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategorySelect(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                selectedCategory === category
                                    ? 'bg-gray-600 text-gray-200'
                                    : 'bg-gray-500 text-gray-300 hover:bg-gray-400'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Display Professor Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProfiles.map((profile, index) => (
                        <div
                            key={profile.id}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
                            onClick={() => handleProfileSelect(profile)}
                        >
                            <div className="p-6 flex flex-col items-center">
                                <img
                                    src={profile.image || "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"}
                                    alt="profile"
                                    className="w-24 h-24 rounded-full mb-4"
                                />
                                <h2 className="text-xl font-semibold text-center text-gray-200 mb-2">
                                    {profile.name}
                                </h2>
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-600 text-gray-200 mb-2">
                                    {profile.category}
                                </span>
                                <p className="text-gray-400 text-center">{profile.title}</p>
                                <p className="text-gray-500 text-sm text-center">{profile.college}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detailed Profile Sidebar */}
                {selectedProfile && (
                    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-gray-800 shadow-2xl p-8 overflow-y-auto transition-transform transform translate-x-0">
                        <button
                            onClick={() => setSelectedProfile(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <img
                            src={selectedProfile.image || "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"}
                            alt="profile"
                            className="w-32 h-32 rounded-full mx-auto mb-4"
                        />
                        <h2 className="text-2xl font-semibold text-center text-gray-200 mb-2">{selectedProfile.name}</h2>
                        <p className="text-gray-400 text-center mb-1">{selectedProfile.title}</p>
                        <p className="text-gray-500 text-sm text-center mb-4">{selectedProfile.college}</p>
                        <div className="mb-6 flex justify-center">
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                                selectedProfile.category === 'Professor' ? 'bg-gray-600 text-gray-200' :
                                selectedProfile.category === 'Academic Advisor' ? 'bg-gray-500 text-gray-200' :
                                'bg-gray-400 text-gray-800'
                            }`}>
                                {selectedProfile.category}
                            </span>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium text-gray-300 mb-2">Expertise</h3>
                                <p className="text-gray-400">{selectedProfile.expertise || "Not provided"}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-300 mb-2">Contact</h3>
                                <p className="text-gray-400">{selectedProfile.email || email}</p>
                                <p className="text-gray-400">{selectedProfile.phone_number || "No phone number available"}</p>
                            </div>
                        </div>
                        <button className="mt-8 w-full bg-gray-700 text-gray-200 py-2 px-4 rounded-full hover:bg-gray-600 transition-colors">
                            Schedule a Meeting
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
