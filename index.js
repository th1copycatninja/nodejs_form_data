const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/getquery",(req,res)=>{
    console.log(req.body);
    return res.status(200).send(req.body)
})
app.listen("4000",()=>console.log("running is running on port 4000"));