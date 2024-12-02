import React, {useState} from "react";
import { useContext } from "react";
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from "../../Axios/axios"
import "./createTask.css"

function CreateTask() {
    const {dispatch} = useContext(TaskContext);
    const {userToken} = useContext(TokenContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    //const [toast, setToast] = useState("");
    const handleAdd = async(e) => {
        e.preventDefault();
        try{
            const res = await axios.post("/task/addTask", {title, description},{
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            // setToast(res.data)
            // showToast
        } catch (error){
            console.log(error)
        }
        dispatch({
            type: "ADD_TASK",
            title,
            description
        })
        setTitle("")
        setDescription("")
    }
    // const showToast = () => {
    //     const toast = document.getElementById('toast');
    //     toast.style.display = "block"
    //     setTimeout(hideToast,2000)
    // }
    // const hideToast = () => {
    //     const toast = document.getElementById('toast');
    //     toast.style.display = "none"
    // }
    
    return
}