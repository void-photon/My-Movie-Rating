var express = require("express");
var router = express.Router();
var Movie  = require("../models/movie");
var middleware = require("../middleware");



//SHOW ALL ROUTE
router.get("/",function(req,res){
    Movie.find({},function(err,movies){
       if(err){
           console.log(err);
       } else{
           res.render("movies/index",{movies:movies,currentUser:req.user});
       }
    });
});

//CREATE ROUTE
router.post("/",middleware.isLoggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.description;
    var author = {
        id:req.user._id,
        username:req.user.username
    };
    var newMovie ={name: name, image:image,description:description,author:author};
    Movie.create(
    newMovie,function(err,movie){
        if(err){
            console.log(err);
        } else{
            res.redirect("/movies");
        }
    });
    //movies.push(newmovie);
});
//NEW
router.get("/new", middleware.isLoggedIn,function(req,res){
    res.render("movies/new");
});
router.get("/:id",function(req,res){
    Movie.findById(req.params.id).populate("comments").exec(function(err,foundMovie){
        if(err){
            console.log(err);
        }else{
            res.render("movies/show",{movie:foundMovie});
            
        }
    })
});
//update
router.get("/:id/edit",middleware.checkMovieOwnership,function(req, res) {
    Movie.findById(req.params.id,function(err,foundMovie){
        if(err){
            console.log(err);
        }
        else
            res.render("movies/edit",{movie:foundMovie}); 
    });
});

router.put("/:id",middleware.checkMovieOwnership,function(req,res){
    Movie.findByIdAndUpdate(req.params.id,req.body.movie,function(err,updatedMovie){
        if(err){
            res.redirect("/movies");
        } else{
            res.redirect("/movies/"+req.params.id);
        }
    });
});
//delete
router.delete("/:id",middleware.checkMovieOwnership,function(req,res){
   Movie.findByIdAndRemove(req.params.id,function(err){
       if(err){
           res.redirect("/movies");
       } else{
           res.redirect("/movies");
       }
   });
});


module.exports = router;