const express = require("express");
const cors = require("cors");
require(`dotenv`).config();

const app = express(); 

app.use(express.json());
app.use(cors());


const db = require('./connection');
db.connect(err => {
    if(err){
        console.error('Database connection failed:', err.message);
    }
    else{
        console.log('Connected to the database');  
    }
});


const port = process.env.PORT; 
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});



const techniciansRouter = require("./routes/technicians");
const specializationsRouter = require("./routes/specializations");
const projectsRouter = require("./routes/projects");

app.use("/technicians", techniciansRouter);
app.use("/specializations", specializationsRouter);
app.use("/projects", projectsRouter);