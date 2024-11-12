import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const timer = setTimeout(() => {
        navigate('/homepage');
      }, 5000);
  
      return () => clearTimeout(timer); // Cleanup to avoid memory leaks
    }, [navigate]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-24 h-24 border-4 border-t-transparent border-green-500 rounded-full animate-spin-slow"></div>
        {/* Inner Ring */}
        <div className="absolute w-16 h-16 border-4 border-b-transparent border-green-400 rounded-full animate-spin-reverse"></div>
        {/* Dot */}
        <div className="absolute w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
      </div>

      <p className="mt-6 text-2xl font-bold text-green-300 animate-fade-in">
        Loading... Please Wait
      </p>

      <style jsx>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;
