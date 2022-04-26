const express = require("express");

const bcrypt = require("bcrypt");
const saltRounds= 10;

const jwt = require("jsonwebtoken");
const SECRET_KEY = "qwerty&#$%@!rD553Dfr4";
const cors = require("cors");

const app = express();

app.use(cors());  //cors allows two applications which are running on different domains to communicate with each other.

//middleware
const tokenVerification = (req, res, next) =>{
    console.log("In middleware");
    const tokenString = req.header("authorization");
    const token = tokenString.split(" ")[1];
    try{
        console.log("In try");
        jwt.verify(token, SECRET_KEY);
        next();
    }catch(error)
    {
        console.log("In catch");
        res.send({
            status:"Token not correct"
        })
    }
}
                                                         
//JWT Token -
//creating the token for the user -

app.post("/login", (req,res)=>{
    const token = jwt.sign(req.query, SECRET_KEY, {expiresIn:"1000000"}) //setTime for expires for your token
    //console.log(token);
    res.send({
        jwtToken : token
    })  
    const decodedUser = jwt.decode(token, SECRET_KEY);
    console.log(decodedUser);
})

app.get("/articles", tokenVerification, (req, res)=>{
    console.log("In API");
    res.send({
        articles:[
            {id:1, title:"Hollywood"},
            {id:2, title:"Bollywood"},
            {id:3, title:"Tollywood"},
        ]
    })
})


app.listen(3001, () => {
    console.log("Server is running at port 3001");
});