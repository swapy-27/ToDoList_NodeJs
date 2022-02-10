const Task = require('../models/task')

module.exports.home = function(req,res){
     Task.find({},function(err,tasks){

        return res.render('home',{
            tasks:tasks
        });
    });
   


    
}


//adding new Task in database
module.exports.addTask= function(req,res){
    
    Task.create(req.body,function(err){
        if (err){
            console.log('Error in creating new task',err);
        }
    })
   
    return res.redirect('back');
}