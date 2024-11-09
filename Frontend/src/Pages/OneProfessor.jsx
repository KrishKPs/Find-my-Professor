import { useEffect, useState } from "react";
import ProfessorDetail from "./ProfessorDetail";
import { useParams } from "react-router-dom";
import axios from "axios";

export function OneProfessor(){

    const id = useParams();

    const[data, setData] = useState([]);

    const handleOnClick = async () => {
        const response = await axios.get(`http://localhost:3087/seeone/${id.id}`)
        setData(response.data);
     }

     useEffect(() => {
        handleOnClick();
     }, [])

    return(
        <ProfessorDetail data={data}/>
    )
}