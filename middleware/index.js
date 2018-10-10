var Movie = require("../models/movie");
var Comment = require("../models/comment");

var middlewareObj = {};
middlewareObj.checkMovieOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        Movie.findById(req.params.id,function(err,foundMovie){
            if(err){
                res.flash("error","Movie Not Found!");
                res.redirect("back");
            } else{
                //check user
                if(foundMovie.author.id.equals(req.user._id)){
                    next(); 
                } else{
                    res.flash("error","Permission Denied!");
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error","Please login first!");
        res.redirect("back");
    }
};
middlewareObj.checkCommentOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                res.redirect("back");
            } else{
                //check user
                if(foundComment.author.id.equals(req.user._id)){
                    next(); 
                } else{
                    res.flash("error","Permission Denied");
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error","Please login first!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please login first!");
    res.redirect("/login");
};

module.exports = middlewareObj;