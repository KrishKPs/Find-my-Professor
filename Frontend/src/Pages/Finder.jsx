// src/AcademicFinder.js
import React, { useEffect, useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import axios from 'axios' ;  
    
export default function AcademicFinder() {

  const [mockProfiles, setMockProfiles] = useState([ ]) ; 



const getProfessors = async () => {

  const response = await axios.get('http://localhost:3087/seeallprofessor')  

  .then (response => {
    console.log(response.data.Professors) ;  
    setMockProfiles (response.data.Professors) ;  
  })
 .catch (error => { 
    console.log(error) ; 

 })

}


useEffect (()=>{
  getProfessors() ;    
}, [ 
])


  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
  };

  const filteredProfiles = mockProfiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || profile.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-light text-gray-800 mb-8 text-center">Find Academic Professionals</h1>
        
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, college, or expertise..."
              className="w-full p-4 pr-12 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {['Professor', 'Academic Advisor', 'Consultant'].map((category) => ( 
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
            <button className="px-4 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
              <Filter className="inline-block mr-1 h-4 w-4" />
              More Filters
            </button>
          </div>
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => ( 
            <div
              key={profile.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg cursor-pointer"
              onClick={() => handleProfileSelect(profile)}
            >
              <div className="p-6">
                <img src={profile.image || "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} alt="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-center text-gray-800">{profile.name}</h2>
                <p className="text-gray-600 text-center">{profile.title}</p>
                <p className="text-gray-500 text-sm text-center mt-1">{profile.college}</p>
                <div className="mt-4 flex justify-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    profile.category === 'Professor' ? 'bg-blue-100 text-blue-800' :
                    profile.category === 'Academic Advisor' ? 'bg-green-100 text-green-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {profile.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Profile Sidebar */}
        {selectedProfile && (
          <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl p-8 overflow-y-auto transition-transform transform translate-x-0">
            <button
              onClick={() => setSelectedProfile(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            <img src={selectedProfile.image} alt="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">{selectedProfile.name}</h2>
            <p className="text-gray-600 text-center mb-1">{selectedProfile.title}</p>
            <p className="text-gray-500 text-sm text-center mb-4">{selectedProfile.college}</p>
            <div className="mb-6 flex justify-center">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                selectedProfile.category === 'Professor' ? 'bg-blue-100 text-blue-800' :
                selectedProfile.category === 'Academic Advisor' ? 'bg-green-100 text-green-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {selectedProfile.category}
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Expertise</h3>
                <p className="text-gray-600">{selectedProfile.expertise}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Contact</h3>
                <p className="text-gray-600">email@example.com</p>
                <p className="text-gray-600">(123) 456-7890</p>
              </div>
            </div>
            <button className="mt-8 w-full bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors">
              Schedule a Meeting
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
