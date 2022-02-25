
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
    let task = await Task.create({
        description:req.body.description,
        completed:false
    });
    
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

//fetch all active tasks
module.exports.activeTasks = async function(req,res){
    try{
        let active_tasks = await Task.find({completed:false});
        return res.render('home',{
            tasks:active_tasks
        })

    }
    catch(err){
        console.log(err)
        return res.redirect('back');
    }

}

//fetch all completed tasks
module.exports.complatedTasks= async function(req,res){
    try{
        let completed_tasks = await Task.find({completed:true});
        return res.render('home',{
            tasks:completed_tasks
        })
    }
    catch(err){
        console.log(err)
        return res.redirect('back');
    }

}

//clear all completed tasks
module.exports.clearCompleted= async function(req,res){
    try{
          await Task.deleteMany({completed:true});
        return res.redirect('back')
    }
    catch(err){
        console.log(err)
        return res.redirect('back');
    }

}


module.exports.toggleTask= async function(req,res){
    try{
        console.log(req.body)
        let task = await Task.findByIdAndUpdate(req.params.id,{completed:req.body.toggle})
    
        if(req.xhr){
            return res.status(200).json({
                message : "ur task has been successfully toggled"
            })
        }

        return res.redirect('back');
    }catch(err){
        console.log('error in toggling task',err);
    }
    
}