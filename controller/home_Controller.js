module.exports.home = function(req,res){
    return res.render('home')
}

module.exports.addTask= function(req,res){
    console.log(req.body)
    return res.redirect('back');
}