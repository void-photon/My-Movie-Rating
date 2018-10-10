var express = require("express");
var router = express.Router({mergeParams: true});
var Movie  = require("../models/movie");
var Comment = require("../models/comment");
var middleware = require("../middleware");


router.get("/new",middleware.isLoggedIn,function(req,res){
    Movie.findById(req.params.id,function(err,movie){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new",{movie: movie});
        }
    })
});

router.post("/",middleware.isLoggedIn,function(req,res){
    // lookup movie using id
    Movie.findById(req.params.id,function(err, movie) {
       if(err){
           console.log("error");
           console.log(err);
       } else{
           Comment.create(req.body.comment,function(err,comment){
               if(err){
                   req.flash("error","Fail to Create Comment");
                   console.log(err);
               } else{
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   movie.comments.push(comment);
                   movie.score=(movie.score*movie.num_comment+comment.score)/(movie.num_comment+1);
                   movie.num_comment=movie.num_comment+1;
                   movie.save();
                   req.flash("success","Successfully Add a Comment");
                   res.redirect("/movies/"+movie._id);
               }
           });
       }
    });
});

router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err, foundComment) {
        if(err){
            res.redirect("back");
        } else{
            res.render("comments/edit",{movie_id:req.params.id,comment:foundComment}); 
        }
    });
});


router.put("/:comment_id",function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/movies/"+req.params.id);
        }
    });
});

router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
           res.redirect("back");
       } else{
           req.flash("success","Comment Deleted");
           res.redirect("/movies/"+req.params.id);
       }
    });
});



module.exports = router;