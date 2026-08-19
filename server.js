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

app.get("/me",(req,res)=>{
    // This is for test purpose only
    res.status(200).json({
        name : "Shashwat Singh",
        role : "AI Native Software Engineer"
    })
})

app.get("/greeting",(req,res)=>{

    const greetings = {
        "morning" : ["Good Morning!","Rise and Shine!","Top of the morning to you!","Wishing you a bright and beautiful morning!","Morning, sunshine!"],
        "afternoon" : ["Good Afternoon!","Hope you're having a great day!","Wishing you a productive afternoon!","Hello there!","Good day!"],
        "evening" : ["Good Evening!","Hope you had a great day!","Wishing you a relaxing evening!","Evening, friend!","Good night!"],
        "night" : ["Good Night!","Sweet dreams!","Sleep well!","Nighty night!","Rest well!"]
    }

    const currentHour = new Date().getHours();
    let greetingType = "";

    if (currentHour >= 5 && currentHour < 12) {
        greetingType = "morning";
    } else if (currentHour >= 12 && currentHour < 17) {
        greetingType = "afternoon";
    } else if (currentHour >= 17 && currentHour < 21) {
        greetingType = "evening";
    } else {
        greetingType = "night";
    }

    const randomGreeting = greetings[greetingType][Math.floor(Math.random() * greetings[greetingType].length)]; 

    res.status(200).json({
        success : true,
        message : "Greeting API",
        greeting : randomGreeting
    })
})

app.listen(PORT,()=>{
    console.log(`Server started on PORT ${PORT}`);
})