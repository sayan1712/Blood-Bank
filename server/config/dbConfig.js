const mongoose=require('mongoose');

const mongo_url = "mongodb+srv://sayan0653:1234@cluster0.sbh23jg.mongodb.net/blood_bank_app?retryWrites=true&w=majority";
mongoose.connect(mongo_url,{ useNewUrlParser: true, useUnifiedTopology: true});


const connection=mongoose.connection;


//verify connection 
connection.on('connected' , ()=>{
    console.log('Mongo DB connection successful')
})

// verify connection error 
 connection.on('error', (err) => {
    console.log('Mongo DB connection Error', err)
 })