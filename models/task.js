const mongoose= require('mongoose');

const taskSchema = new mongoose.Schema({

    description:{
        type:String
    }

},{
    timestamps:true
})

const Task = mongoose.model('Task',taskSchema);

module.exports=Task;