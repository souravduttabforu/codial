module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title : "Profile"
    })
}

module.exports.sighUp = function(req,res){
    return res.render('user_signup',{
        title : 'Codial | SignUp'
    })
}

module.exports.signIn = function(req,res){
    return res.render('user_signin',{
        title : 'Codial | SignIn'
    })
}

module.exports.create = function(){
    //ToDo later
}
module.exports.createSession = function(){
    //Todo Later
}