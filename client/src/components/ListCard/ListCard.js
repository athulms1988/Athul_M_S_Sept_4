import { useEffect, useState } from "react";
import Task from "../Task/Task";
import TaskInput from "../TaskInput/TaskInput";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Dialog from "../Dialog/Dialog";

const ListCard = ({list, onUpdate, onListRemove, index}) => {
    const [cardTitle, setCardTitle] = useState(list.title);
    const [cardTitleIsEditing, setCardTitleIsEditing] = useState(false);
    const [cardTitleEditor, setCardTitleEditor] = useState('');
    const [taskList, setTaskList] = useState(list.task);
    const [inputTaskValue, setInputTaskValue] = useState('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [dialogData, setDialogData] = useState();
    
    useEffect(() => {
        setCardTitle(list.title);
    }, [list, list.title])

    useEffect(() => {
        setTaskList(list.task);
    }, [list, list.task])

    useEffect(() => {
        onUpdate(index, {
            title: cardTitle,
            task: taskList
        })
        // eslint-disable-next-line
    }, [cardTitle, taskList])


    const changeStatus = (index, status) => {
        const existingTaskList = [...taskList];
        existingTaskList[index].status = status; 
        setTaskList(existingTaskList);
    }

    const handleKeyUp = (e) => {
        const text = e.target.value.trim();
        if (e.keyCode === 13 && text) {
            setTaskList([{description: text, status: false}, ...taskList]);
            setInputTaskValue('');
        }
    }

    const handleChange = (e) => {
        setInputTaskValue(e.target.value);
    }

    const handleTitleChange = (e) => {
        setCardTitleEditor(e.target.value);
    }

    const handleTitleKeyUp = (e) => {
        const text = e.target.value.trim();
        if (e.keyCode === 13 && text) {
            setCardTitle(text);
            setCardTitleEditor('');
            setCardTitleIsEditing(false);
        }
    }

    const onTitleEditClick = (e) => {
        setCardTitleEditor(cardTitle);
        setCardTitleIsEditing(true);
    }

    const onListDeletePrompt = (e) => {
        setDialogData({
            index,
            type: 'List',
            description: list.title,
        })
        setShowConfirmDialog(true);
    }

    const onListDelete = (confirmation) => {
        setShowConfirmDialog(false);
        if(confirmation) {
            onListRemove(index);
        }
    }

    const onTaskRemove = (index) => {
        const existingTaskList = [...taskList];
        existingTaskList.splice(index, 1) 
        setTaskList(existingTaskList);
    }

    return (
        <>
            <div className="card mt-2 mr-2 col-lg-3 col-md-4 col-sm-12">
                <div className="card-header">
                    {!cardTitleIsEditing && <><span className="card-title mr-2">{cardTitle}</span><FontAwesomeIcon icon={faEdit} onClick={onTitleEditClick} style={{cursor: 'pointer'}}/></>}
                    {cardTitleIsEditing && <TaskInput handleKeyUp={handleTitleKeyUp} handleChange={handleTitleChange} value={cardTitleEditor}/>}
                    <FontAwesomeIcon className="float-right" icon={faTrash} color="red" onClick={onListDeletePrompt} style={{cursor: 'pointer'}}/>
                </div>
                <div className="card-body">
                    <TaskInput handleKeyUp={handleKeyUp} handleChange={handleChange} value={inputTaskValue}/>
                    <ul className="list-unstyled">
                        {taskList.length === 0 &&
                            <p className="alert alert-info">No items added</p>
                        }
                        {taskList.length > 0 && taskList.map((item, index) => (
                            <Task key={index} index={index} changeStatus={changeStatus} description={item.description} status={item.status} onTaskRemove={onTaskRemove}/>
                        ))}
                    </ul>
                </div>
            </div>
            {showConfirmDialog && <Dialog dialogData={dialogData} handleChange={onListDelete}/>}
        </>
    )
}
export default ListCard;

