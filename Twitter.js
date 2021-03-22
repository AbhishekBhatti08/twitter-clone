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
    host:"us-cdbr-east-03.cleardb.com",
    user:"b47ffc2610cb5a",
    password:"b79cc952",
    database:"heroku_04bd7909d09f388"
})

// mysql://b47ffc2610cb5a:b79cc952@us-cdbr-east-03.cleardb.com/heroku_04bd7909d09f388?reconnect=true


//Code from online to debug issues- starts

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db);


db.connect((err)=>{
    if(!err) {
    console.log("all good bud! -> DB running")}

    else if(err) {                                    
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); 
      }
});

connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

const Port = process.env.PORT || 4000;

app.use(express.static('public'))
app.set("view engine","ejs");


app.get('/',(req,res)=>{
    // var query = 'select tweet from tweettext';

    var query = 'select * from heroku_04bd7909d09f388.tweettext';

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
    var sql = 'INSERT INTO heroku_04bd7909d09f388.tweettext SET ?';
    // var sort = 'select * from heroku_04bd7909d09f388.tweettext order by ts desc';
        console.log(req.body);

        console.log(sql);
        
        setInterval(()=>{ db.query(sql,data,(err,results)=>{
            if(err){
                console.log("Tweet not saved!")
            }
            else 
            {    
               
               console.log("Tweet Saved");
                           
            }
            
          
        })},5000)   
        

});


app.listen(process.env.PORT || 4000, ()=>{
    console.log(`App running on ${Port}`)
});