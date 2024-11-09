import React from 'react';

import { Link } from 'react-router-dom';
import { Button } from './ui/button';

function Navbar() {
    return (
        <nav className="w-full bg-gray-800 text-gray-200 shadow-md py-4 px-6 flex justify-between items-center">
            {/* Heading */}
            <h1 className="text-2xl font-bold">
                Find My Professor
            </h1>
            
            {/* Links */}
            <div className="space-x-4">
                <Link to="/login">
                    <Button variant="ghost" className="hover:bg-gray-700">
                        Login
                    </Button>
                </Link>
                <Link to="/signup">
                    <Button variant="solid" className="bg-blue-600 hover:bg-blue-500 text-white">
                        Signup
                    </Button>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
