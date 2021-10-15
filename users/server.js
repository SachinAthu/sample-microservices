const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

//Import routes
UsersRoute = require('./Routes/Users');


//initialize middlewear
const app = express();


//body parser middlewear
app.use(bodyParser.json());
app.use(cors());

//get the mongodb url
const db = require("./config/keys").mongoURI_old;
const Users = require("./Models/Users");


//Connect to mongoose
const connectMongoDB = () => {
  mongoose
  .connect(db,{
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useFindAndModify: false,
      socketTimeoutMS: 30000,
  })
  .then(()=>console.log('MongoDB is connected'))
  .catch(err => {
    console.log('MongoDB initial connection failed - reconnecting in 5 seconds\n' , err)
    setTimeout(connectMongoDB, 5000)
  });
}
connectMongoDB()


//get routes from controllers
app.use("",UsersRoute)


//Serve static assets if you are in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));