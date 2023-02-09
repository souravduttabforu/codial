const User = require('../models/user');


module.exports.profile = function(req,res){
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id,function(err,user){
            if (user) {
                return res.render('user_profile',{
                    title:'User Profile',
                    user: user
                })
            }
            return res.redirect('/users/codial-sign-in')
        })
    }else{
        return res.redirect('/users/codial-sign-in')
    }

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

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    
    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('Error in finding user in signing up'); return}
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('Error creating User while sign in',err); return}
                return res.redirect('/users/codial-sign-in');
            })

        }else{
            // console.log('something wrong 3');
            return res.redirect('back');
        }
    })


}

//Sign in and create a session for the user
module.exports.createSession = function(req,res){
    //Steps for autentication

    //find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('Error in finding user in signing in'); return}
        
        //handle user found
        if (user) {
        //handle password which doesnot match
        if (user.password != req.body.password) {
            return res.redirect('back')
        } 
        //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile')
        }else{
            //handle user not found
            return res.redirect('back')
        }
    })
}

//Sign Out
module.exports.signOut = function(req,res){
    // User.findById(req.cookies.user_id,function(err,user){
    //     if(user){
    //         res.clearCookie("user_id");
    //         return res.redirect('/users/codial-sign-in')
    //     }
    //     console.log('having some error',err);
    // })
    // res.clearCookie(user_id,{path:'/'});
    res.clearCookie('user_id')
    console.log("Cookie cleared");
    return res.redirect('/users/codial-sign-in');
        
    }
