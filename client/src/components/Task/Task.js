import './Task.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Dialog from '../Dialog/Dialog';
import { useState } from 'react';
const Task = ({description, status, changeStatus, onTaskRemove, index}) => {
    const handleChange = (e) => changeStatus(index, e.target.checked);
    const className = 'todo-item ui-state-default ' + (status === true ? 'completed' : 'pending');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [dialogData, setDialogData] = useState();
    const onTaskDelete = (e) => {
        e.preventDefault();
        setDialogData({
            index,
            type: 'Task',
            description,
            status
        })
        setShowConfirmDialog(true);
    };
    const handleDeleteTask = (confirmation) => {
        setShowConfirmDialog(false);
        if(confirmation) {
            onTaskRemove(index);
        }
    };
    return (
        <>
            <li className={className}>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" checked={status} onChange={(e) => handleChange(e)}/> {description}
                        <FontAwesomeIcon className="float-right" icon={faTrash} color="red" onClick={onTaskDelete} style={{cursor: 'pointer'}}/>
                    </label>
                </div>
            </li>
            {showConfirmDialog && <Dialog dialogData={dialogData} handleChange={handleDeleteTask}/>}
        </>
    );
}
export default Task;