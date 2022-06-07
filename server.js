// import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const Room = require('./models/Rooms');
const Message = require('./models/Message');
const User = require('./models/User')
const roomGenerator = require('./util/roomIdGenerator.js');
const Bcrypt = require("bcryptjs");

// import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');
const registerHandler = require('./controllers/register.js');
const loginHandler = require('./controllers/login.js');

const app = express();
app.use(cookieParser());
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const db = config.get('mongoURI');

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// set up stylesheets route

// TODO: Add server side code

// Create controller handlers to handle requests at each endpoint
app.post("/create", function(req, res){
    var id = roomGenerator.roomIdGenerator()
    const newRoom = new Room({
        name: req.body.roomName,
        id: id
    })
    newRoom.save().then(console.log("room added"))
    .catch(e => console.log(e))
    res.redirect("/" + req.body.roomName + "/" + id);
})

// POST request for new messages
app.post("/createText", function(req, res){

    var newMessage = new Message({
        name: "",
        date: Date.now(),
        roomID: "",
        message: ""
    })

    if(req.body.name != "null") {
        newMessage = new Message({
            name: req.body.name,
            date: Date.now(),
            roomID: req.body.roomID,
            message: req.body.chatMessage
        })
        console.log("roomID = " + newMessage.roomID)
        newMessage.save().then(console.log("message added"))
        .catch(e => console.log(e))
        //res.redirect("back")
    }
})

app.post("/editText", function(req, res){
  Message.findByIdAndUpdate(req.body._id, { message: req.body.editMessage }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated User : ", docs);
    }
  });
})

app.post("/deleteText", function(req, res){
  //Message.deleteOne( {"_id": ObjectId("60c42dd2038e2132e84c465f") } );
  Message.findByIdAndDelete(req.body._id, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        console.log("Deleted : ", docs);
    }
  })
})


app.post("/createUser", function(req, res){
    if(req.body.username != "null" && req.body.password != "null") {
      try{
        req.body.password = Bcrypt.hashSync(req.body.password, 10)
        const newUser = new User({
            username: req.body.username,
            age: req.body.age,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: req.body.password
        })
        res.cookie("username", newUser.username)
        // document.cookie = "username="+newUser.username
        // console.log(document.cookie)
        newUser.save().then(console.log("user created"))
        .catch(e => console.log(e))

        res.redirect("/home")

      } catch(error) {
        res.status(500).send(error)
      }


    }
})

app.get('/getuser', (req, res)=>{
//shows all the cookies
res.send(req.cookies);
});

app.post("/loginUser", function(req, res){
    if(req.body.username != "null" && req.body.password != "null") {
      try{
        req.body.password = Bcrypt.hashSync(req.body.password, 10)
        if(User.findOne({username: req.body.username, password: req.body.password}) != "null") {
          // console.log("Login Successful")
          // document.cookie = "username="+req.body.username
          res.cookie("username", req.body.username)
          res.redirect("/home")
        }
        else{
          res.redirect("/login")
        }
        // console.log(document.cookie)
      } catch(error) {
        res.status(500).send(error)
      }
    }
})

app.post("/redirectToRegister", function(req, res){
  try{
    res.redirect("/register")
  } catch(error) {
    res.status(500).send(error)
  }
})

app.post("/redirectToLogin", function(req, res){
  try{
    res.redirect("/")
  } catch(error) {
    res.status(500).send(error)
  }
})

app.post("/logout", function(req, res){
  try{
    res.clearCookie("username");
    res.redirect("/login")
  } catch(error) {
    res.status(500).send(error)
  }
})


app.get("/getroom", function(req, res){
    Room.find().lean().then(items => {
        res.json(items)
    })
})

app.get("/:roomID/messages", function(req, res){
    Message.find({roomID: req.params.roomID}).lean().then(items => {
        res.json(items)
    })
})

app.get('/', loginHandler.loginUser);
app.get('/login', loginHandler.loginUser);
app.get('/register', registerHandler.registerUser);
app.get('/home', homeHandler.getHome);
app.get('/:roomName/:id', roomHandler.getRoom);  //localhost:8080/room1/zknas


// NOTE: This is the sample server.js code we provided, feel free to change the structures

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
