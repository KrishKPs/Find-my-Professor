import { useEffect, useState } from "react";
import ProfessorDetail from "./ProfessorDetail";
import { useParams } from "react-router-dom";
import axios from "axios";

export function OneProfessor(){

    const id = useParams();
    

    const[data, setData] = useState({});

    const handleOnClick = async () => {
        try {
            const response = await axios.get(`http://localhost:3087/seeone/${id.id}`);
            if (response.data && response.data.professor) {
                setData(response.data.professor);
            } else {
                console.error("Professor data not found");
            }
        } catch (error) {
            console.error("Error fetching professor details:", error);
        }
    };

     useEffect(() => {

        console.log(id.id);
        
        handleOnClick();

     }, [])

    return(
        <ProfessorDetail data={data}/>
    )
}