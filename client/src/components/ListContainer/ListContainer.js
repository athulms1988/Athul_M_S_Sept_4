import { useEffect, useState } from "react";
import ListCard from "../ListCard/ListCard";

const ListContainer = ({todoListData, onTodoUpdate}) => {
    const [todoList, setTodoList] = useState(todoListData);

    useEffect(() => {
        setTodoList(todoListData);
    }, [todoListData]);

    const onListRemove = (index) => {
        const existingTodoList = [...todoList];
        existingTodoList.splice(index, 1) 
        setTodoList(existingTodoList);
    }

    return (
        <>
            <div className="row justify-content-start m-2">
                {todoList.map((list, index) => {
                    return <ListCard key={index} list={list} index={index} onListRemove={onListRemove} onUpdate={onTodoUpdate}/>
                })}
            </div>
        </>
    )
}
export default ListContainer;