const mongoose = require('mongoose');

const todo = new mongoose.Schema({
    id: String,
    todoList: [
        {
            title: String,
            task: [ 
                {
                    description: String,
                    status: Boolean
                }
            ]
        }
    ]
}, {
        timestamps: {
            createdAt: 'createdAt'
        }
});

module.exports = Todo = mongoose.model('todo', todo);



