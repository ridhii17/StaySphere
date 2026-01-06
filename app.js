const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

//momgodb
const MONGO_URL = "mongodb://localhost:27017/StaySphere";
async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

//view engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public"))); // serve static files css work

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Index route
app.get("/listings", async (req, res) => {
  try {
    const listings = await Listing.find({}); // fetch all listings
    res.render("listings/index", { listings });
  } catch (err) {
    console.log(err);
    res.send("Error fetching listings");
  }
});

//new route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show", { listing });
});

//create route
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect(`/listings`);
});

//edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing });
});

//update route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, req.body.listing);
  res.redirect(`/listings/${id}`); // redirect to show page
});

//delete route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

// app.get("/testlistings", async (req, res) => {
//   let samplelistings = new Listing({
//     title: "Cozy Cottage",
//     description: "A cozy cottage in the countryside.",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwHRnZ-PbzuRF7AlFkLDQfi602S8DGc60fxQ&s",
//     price: 1200,
//     location: "Countryside",
//     country: "USA",
//   });
//   await samplelistings.save();
//   res.send("Test listing created!");
// });

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
