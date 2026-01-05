const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing");

const MONGO_URL = "mongodb://localhost:27017/StaySphere";

console.log("Seeding script started...");

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
    await Listing.deleteMany({}); 
    await Listing.insertMany(initdata);
    console.log("Database initialized with sample data");
  } catch (err) {
    console.log("Error:", err);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}
main();
