require('dotenv').config();
const appRoutes = require('./routes/router')

const express = require('express');
const PORT  = process.env.PORT || 8000 ;

const app = express();

app.use(express.json());

//routes
app.use('/api' , appRoutes)
app.listen(PORT,()=>{
    console.log(`server has been started at http://localhost: ${PORT}`)  
})