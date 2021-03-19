const express = require("express");
const mysql = require('mysql');
// const bodyParser = require("body-parser");
const cors = require('cors');
//const { request, response } = require("express");

const app  = express();

app.use(cors());
app.use(express.json())

 app.use(express.urlencoded({ extended: true}));

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"twitter"
})

db.connect((err)=>{
    if(!err)
    console.log("all good bud! -> DB running")
});


const port = 4000;

app.use(express.static('public'))
app.set("view engine","ejs");


app.get('/',(req,res)=>{
    // var query = 'select tweet from tweettext';

    var query = 'select * from tweettext';

    console.log("data received");
    
    db.query(query,(err,results)=>{
        if(err){
            console.log("you fucked up!")
        }
        else {
         var output =   res.json(results);
         return output;
        }
    })
    console.log(res);
    
})


app.post("/postTweet",(req,res)=>{


    console.log(req.header('Content-Type'))
    console.log("Post Request Reached");
    console.log("req" , req.body.text);
    let sendData = "Hello";
    res.send(sendData);
    
    let data = req.body;
    var sql = 'INSERT INTO tweettext SET ?';
    var sort = 'select * from tweettext order by ts desc';
        console.log(req.body);

        console.log(sql);
        
        db.query(sql,data,(err,results)=>{
            if(err){
                console.log("Tweet not saved!")
            }
            else 
            {    
               
               console.log("Tweet Saved");
                           
            }
            
          
        })   
        // setTimeout(() => {
        //     res.redirect("http://localhost:3000");
        // }, 1000);
        

});


// app.post("/postTweet",(req,res)=>{
//     console.log("hello");
//     console.log(req.body);
//     var data = req.body;
//     console.log(data);

//     res.send('data from backend');

//     var sql = `insert into tweets set ?`;
//     var sort = 'select * from tweets order by ts desc';
    
//     console.log(req.body);
//     db.query(sql,data,(err,results)=>{
//         if(err){
//             console.log("Tweet not saved!")
//         }
//         else{    
//                 db.query(sort,(err,result)=>{
//                 if (err) {throw err,
//                 console.log("Tweet saved!")
//                 }

//                 else {
//                     return result;
//                 }
//             });
//         }
    
//     })   
//     setTimeout(() => {
//         res.redirect("http://localhost:3000");
//     }, 1000);
    

// }


// )

app.listen(process.env.PORT || 4000, function(){
    console.log(`App running on ${port}`)
});