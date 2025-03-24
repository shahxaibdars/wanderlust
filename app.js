const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const path = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("views engine", 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) =>{
    res.send("Hi, I am root");
});


//Index Route
app.get("/listings", async (req, res) =>{
    allListings = await Listing.find({});
    res.render("./listings/index.ejs", allListings);
});

//New Route
app.get("/listings/new", (req, res) =>{
    res.render("./listings/new.ejs");
});

//Show Route
app.get("/listings/:id", async (req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs", {listing});
});

app.post("/listings", async (req, res) =>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings")
});

app.listen(8080, () =>{
    console.log("server is listening to port 8080");
    console.log("http://localhost:8080/listings");
});