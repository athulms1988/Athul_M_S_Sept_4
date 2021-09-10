import { useEffect, useState } from "react";
import axios from 'axios';
import { toastr } from "react-redux-toastr";
import Header from "../Header/Header";
import ListContainer from "../ListContainer/ListContainer";

const ToDo = () => {
    const [todoListData, setTodoListData] = useState([]);
    useEffect(() => {
        axios.get('/todo')
        .then((response)=>{
            if(response && response.data){
                setTodoListData(response.data);
            }
            else{
                toastr.error("List", 'Unable to retrieve the todo list');
            }
        }).catch((error)=>{
            toastr.error("List", 'Unable to retrieve the todo list');
        })
    }, [])

    const createNewList = () => {
        setTodoListData([{title: `List ${todoListData.length + 1}`, task: []}, ...todoListData])
    }

    const onTodoUpdate = () => {
        debugger
    }

    return (
        <>
            <Header/>
            <button className="btn btn-primary m-2" onClick={createNewList}>New List</button>
            <ListContainer todoListData={todoListData} onTodoUpdate={onTodoUpdate}/>
        </>
    )
};
export default ToDo;    