import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ImageUpload() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [preview, setPreview] = useState('');
    const [rotation, setRotation] = useState(0);
    const [adjusting, setAdjusting] = useState(false);

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setMessage('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:3087/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: localStorage.getItem('token')
                },
            });

            setMessage(response.data.message);
            toast.success('Image uploaded successfully!');
            navigate('/professordash');
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'An error occurred');
            toast.error('Failed to upload image!');
        }
    };

    const handleRotate = () => {
        setRotation(rotation + 90);
    };

    const toggleAdjustMode = () => {
        setAdjusting(!adjusting);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Upload Your Image</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col items-center">
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <div className="w-48 h-48 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg">
                                {preview ? (
                                    <img 
                                        src={preview} 
                                        alt="Preview" 
                                        className={`w-full h-full object-cover rounded-lg ${adjusting ? 'transition-transform' : ''}`}
                                        style={{ transform: `rotate(${rotation}deg)` }}
                                    />
                                ) : (
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                )}
                            </div>
                        </label>
                        <input 
                            id="file-upload" 
                            type="file" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                            className="hidden" 
                        />
                    </div>
                    {preview && (
                        <div className="flex justify-center space-x-4 mt-4">
                            <button
                                type="button"
                                onClick={toggleAdjustMode}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            >
                                {adjusting ? 'Done' : 'Adjust'}
                            </button>
                            {adjusting && (
                                <button
                                    type="button"
                                    onClick={handleRotate}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    Rotate
                                </button>
                            )}
                        </div>
                    )}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Upload Image
                        </button>
                    </div>
                </form>
                {message && (
                    <p className="text-center text-lg text-gray-700 mt-4">{message}</p>
                )}
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar/>
        </div>
    );
}

export default ImageUpload;