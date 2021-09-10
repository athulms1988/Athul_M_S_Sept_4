import { useEffect, useState } from "react";
import ListCard from "../ListCard/ListCard";

const ListContainer = ({todoListData, onTodoUpdate, onListRemove}) => {
    const [todoList, setTodoList] = useState(todoListData);

    useEffect(() => {
        setTodoList(todoListData);
    }, [todoListData]);

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