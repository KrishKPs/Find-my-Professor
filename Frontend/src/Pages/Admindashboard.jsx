import { useEffect, useState } from "react";
import axios from 'axios';   

export function AdminDashboard() {
    const token = localStorage.getItem('token');

    const [Professor , setProfessor] = useState([]) ;    

    const getUnverifiedProfessor = async () => {
        const response = await axios.get('http://localhost:3087/seeprofessor', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data.unverfied_professors);
            setProfessor(response.data.unverfied_professors);
        })  
    };

    useEffect(() => {
        getUnverifiedProfessor();   
    }, [])

    return (
        <>
            <h1>Admin Dashboard</h1>
        </>
    );
}
