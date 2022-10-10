const express = require('express');
const app = express();
const port = 3000;
const hostname = '0.0.0.0';
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// connection
mongoose.connect("mongodb+srv://kishan123:kishan123@cluster0.9jp2tkn.mongodb.net/?retryWrites=true&w=majority");
mongoose.connection.on('error',err=>{
  console.log('Error');
});
mongoose.connection.on('connected',connected=>{
  console.log('Success!');
});


// routes
const registerUserRoute = require('./api/routes/register.js');
const loginUserRoute = require('./api/routes/login.js');
const taskRoute = require('./api/routes/task.js');
const statusRoute = require('./api/routes/status.js');


//paerser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/register',registerUserRoute);
app.use('/login',loginUserRoute);
app.use('/task',taskRoute);
app.use('/status',statusRoute);

app.use((req,res,next)=>{
  res.status(500).json({
    msg: "bad request"
  });
});

app.listen(process.env.PORT || port,() => {
  console.log(`TrackIt app listening on port ${port}`)
})