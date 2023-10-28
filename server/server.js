const express = require("express");
const app=express();
const port= process.env.PORT || 5000;
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const JWT_SECRET = process.env.jwt_secret || "blood_bank_app";

app.use(express.json());

const userRoute=require('./routes/userRoute');
app.use('/api/users',userRoute);

app.listen(port, () => console.log(`Node JS server Started ${port} ${JWT_SECRET}`));