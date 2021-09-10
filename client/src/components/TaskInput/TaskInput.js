import React from 'react';

function InputBox({value, handleChange, handleKeyUp}) {

    return (
        <input autoFocus
            type="text"
            className="form-control add-todo"
            value={value}
            onKeyUp={handleKeyUp}
            onChange={handleChange}
            placeholder="Add New"
        />
    );
}

export default InputBox;
