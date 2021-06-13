const express = require('express');
const app = express();

const path = require('path');

const database = require('./database');
const url = require('url');



app.use(express.static(path.join(__dirname,'public')));
app.get('/addAccount',(req,res)=>{
    let q = url.parse(req.url,true);
    database.createAccount(req,res,q.query);
});

app.get('/deposit',(req,res)=>{
    let q = url.parse(req.url,true);
    console.log(q.query);
    database.deposit(req,res,q.query);
});


app.get('/withdraw',(req,res)=>{
    let q = url.parse(req.url,true);
    database.withdraw(req,res,q.query);
});

app.get('/searchCustomer',(req,res)=>{
    let q = url.parse(req.url,true);
    database.customerInfo(req,res,q.query);
});



app.listen(5000,()=>{console.log("server running at port 5000...")});

