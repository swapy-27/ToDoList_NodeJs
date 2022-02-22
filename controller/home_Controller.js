const Task = require('../models/task')

module.exports.home = async function (req, res) {
    try {
        let tasks = await Task.find({});

        if (req.xhr) {
            return res.status(200).json({
                tasks: tasks,
                messgae: "List of tasks"
            })
        }


        return res.render('home', {
            tasks: tasks
        });
    }
    catch (err) {
        console.log('error in rendering ToDo-List');
        return res.status(404).json({
            message: "Error"
        })
    }

}


//adding new Task in database
module.exports.addTask = async function (req, res) {
  try{ 
    let task = await Task.create(req.body);
    
    if (req.xhr){
         res.status(200).json({
             message:'task has been created!',
             task:task
         })
  }
    
    return res.redirect('back');
  }catch(err){

  }
}

//delete tasks--> when clicking delete button 
module.exports.deleteTask = async function(req,res){
    try{
        let task = await Task.findByIdAndDelete(req.params.id);
        if (req.xhr){
            res.status(200).json({
                message:'task has been deleted!',
                taskID:task.id
            })
     }
        return res.redirect('back');
    }catch(err){
        console.log('error in deleting the task')
    }
}