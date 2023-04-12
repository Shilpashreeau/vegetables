//importing env var
require("dotenv").config();
//import express
const express = require("express");
const mongoose = require("mongoose");

const app = express();
//import vegetables model(data from local)
const vegetables = require("./models/vegetables");
//importing vegetable schema
const Veggie = require("./models/Vegetable");
const PORT = 3000;

//=======Middleware Configuration=====
app.set("view engine", "jsx");
app.engine("jsx", require("jsx-view-engine").createEngine());
app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});
//parses the data from request
app.use(express.urlencoded({ extended: false }));

/**
 * Landing page
 */
app.get("/", (req, res) => {
  res.send("<h1>Welcome to vegetables market !</h1>");
});
/**
 * GET all the vegetables
 */
app.get("/vegetables", (req, res) => {
 // res.render("vegetables/Index", { veggies: vegetables });
  Veggie.find({},(error,allVeggies)=>{
  res.render('vegetables/Index',{veggies:allVeggies})//{} empty objects retrieves all the data from db
  })
});
/**
 * POST veggies from the form
 */
app.post("/vegetables", (req, res) => {
  console.log(req.body);
  //if checked, req.body.readyToEat is set to 'on'
  // if (req.body.readyToEat === "on") {
  //   req.body.readyToEat = true;
  // } else {
  //   req.body.readyToEat = false;
  // }
  // vegetables.push(req.body);
  // res.redirect("/vegetables");
  Veggie.create(req.body, (error,createdVeggie)=>{
     
    res.redirect('/vegetables');//allows the user to navigate to new end point here its /vegetables
  
  })
});

/**
 *  route to create new veggie
 */
app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});



/**
 * Route to display individual vegetable
 */

app.get("/vegetables/:id", (req, res) => {  //if we use array then replace id with indexOfVeggieArray
 /* const { indexOfVeggieArray } = req.params;
  if (vegetables[indexOfVeggieArray]) {
    res.send(vegetables[indexOfVeggieArray]);
  } else {
    res.send(`Sorry there is no veggie in index:${indexOfVeggieArray}`);
  }
  res.render("vegetables/Show", {
    veggie: vegetables[req.params.indexOfVeggieArray],
  });*/
  Veggie.findById(req.params.id,(error,foundVeggie)=>{
    res.render('vegetables/Show',{veggie:foundVeggie})
    })
});

/**
 * If route mismatches render 404
 */
app.get("*", (req, res) => {
  //res.redirect('/fruits'); /*if you want to redirect to different page*/

  res.render("404");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  mongoose.set('strictQuery',true);
  mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  }) //object to access latest options from mongoose
  mongoose.connection.once('open',()=>{
  console.log("Connected to MongoDB!");
  })
});
