import { useEffect, useState } from "react";
import axios from 'axios';
import ProfessorCard from "./professorcard";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export function AdminDashboard() {
  const token = localStorage.getItem('token');
  const [professors, setProfessors] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const getUnverifiedProfessors = async () => {
    try {
      const response = await axios.get('http://localhost:3087/seeprofessor', {
        headers: {
          Authorization: `${token}`,
        },
      });
      setProfessors(response.data.unverfied_professors);
    } catch (error) {
      console.error('Error fetching professors:', error);
    }
  };

  useEffect(() => {
    getUnverifiedProfessors();
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-200 p-8">
      <header className="flex flex-col items-center pb-8 border-b border-gray-700">
        <h1 className="text-4xl font-bold text-gray-100 mb-2">Admin Dashboard</h1>
        <p className="text-lg text-gray-400">Manage unverified professors and update their verification status</p>
        <Button onClick={handleRefresh} variant="outline" className="mt-4 flex items-center gap-2 bg-gray-700 text-gray-200 hover:bg-gray-600 rounded-full px-4 py-2 transition-colors">
          <RefreshCcw className="h-5 w-5" />
          Refresh
        </Button>
      </header>

      <main className="mt-8">
        <section className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-medium text-gray-200 mb-6">Unverified Professors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {professors.length > 0 ? (
              professors.map((professor) => (
                <ProfessorCard
                  key={professor._id}
                  professor={professor}
                  onVerificationUpdate={handleRefresh}
                />
              ))
            ) : (
              <p className="text-center text-gray-400 col-span-full">No unverified professors found.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
