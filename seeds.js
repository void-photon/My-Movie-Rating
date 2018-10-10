var mongoose = require("mongoose");
var Movie = require("./models/movie");
var Comment = require("./models/comment");
var data=[
    {
        name:	"Kin",
        image: "https://m.media-amazon.com/images/M/MV5BZDczYzNhMDMtNmQ2Ni00ZjcwLWI1MDQtMWI1YWVkNjkzN2NhXkEyXkFqcGdeQXVyNDMzMzI5MjM@._V1_UX140_CR0,0,140,209_AL_.jpg",
        description: "Chased by a vengeful criminal, the feds and a gang of otherworldly soldiers, a recently released ex-con and his adopted teenage brother are forced to go on the run with a weapon of mysterious origin as their only protection."
    },
    {
        name:	"Operation Finale",
        image: "https://m.media-amazon.com/images/M/MV5BYzE1YjI2MjctZTY2Zi00NDBhLWIzYmMtNzMzMDgwZjE4MzUxXkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_UY209_CR0,0,140,209_AL_.jpg",
        description: "A team of secret agents set out to track down the Nazi officer who masterminded the Holocaust."
    }
    ]
function seedDB(){
    Movie.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed movies!");
        data.forEach(function(seed){
            Movie.create(seed,function(err,movie){
                if(err){
                    console.log(err);
                } else{
                    console.log("added a movie");
                    // Comment.create({
                    //     text: "bla bla bla",
                    //     author: "Homer"
                    // },function(err,comment){
                    //     if(err){
                    //         console.log(err);
                    //     }
                    //     else{
                    //         movie.comments.push(comment);
                    //         movie.save();
                    //         console.log("Created new comment");
                    //     }
                    // });
                }
            })
        })
    });
};
module.exports = seedDB;


