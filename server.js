import express from "express";

const app = express();

const PORT = 5000;

app.get("/health",(req,res)=>{
    res.status(200).json({
        success : true,
        message : "working",
        timestamp : new Date().getTime()
    });
})

app.listen(PORT,()=>{
    console.log(`Server started on PORT ${PORT}`);
})