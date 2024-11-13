import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [preview, setPreview] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        // Preview the uploaded image
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
        formData.append('image', file); // 'image' matches the key in the backend multer config

        try {
            const response = await axios.post('http://localhost:3087/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'An error occurred');
        }
    };

    return (
        <div>
            <h1>Image Upload</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {preview && <img src={preview} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />}
            {message && <p>{message}</p>}
        </div>
    );
}

export default ImageUpload;
