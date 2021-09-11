import { useEffect, useState } from "react";
import axios from 'axios';
import { toastr } from "react-redux-toastr";
import Header from "../Header/Header";
import ListContainer from "../ListContainer/ListContainer";

const ToDo = () => {
    const [todoListData, setTodoListData] = useState([]);
    const [todoUpdated, setTodoUpdated] = useState(false);
    useEffect(() => {
        axios.get('/todo')
        .then((response)=>{
            setTodoUpdated(true);
            if(response && response.data){
                setTodoListData(response.data);
            }
            else{
                toastr.error("List", 'Unable to retrieve the todo list');
            }
        }).catch((error)=>{
            setTodoUpdated(true);
            toastr.error("List", 'Unable to retrieve the todo list');
        })
    }, [])

    useEffect(() => {
        if(todoUpdated) {
            axios.post('/todo', todoListData).then().catch();
        }
        // eslint-disable-next-line
    }, [todoListData])

    const createNewList = () => {
        setTodoListData([{title: `List ${todoListData.length + 1}`, task: []}, ...todoListData])
    }

    const onListRemove = (index) => {
        const existingList = [...todoListData];
        existingList.splice(index, 1) 
        setTodoListData(existingList);
    }


    const onTodoUpdate = (index, data) => {
        const existingList = [...todoListData];
        existingList[index] = data;
        setTodoListData(existingList);
    }
    


    return (
        <>
            <Header/>
            <button className="btn btn-primary m-2" onClick={createNewList}>New List</button>
            <ListContainer todoListData={todoListData} onTodoUpdate={onTodoUpdate} onListRemove={onListRemove}/>
        </>
    )
};
export default ToDo;    