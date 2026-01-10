const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing");

const MONGO_URL = "mongodb://localhost:27017/StaySphere";

console.log("Seeding script started...");

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    await Listing.deleteMany({});

    initData.data = initData.map((obj) => ({
      ...obj,
      owner: "6962670729486adc51a3b7fa",
    }));

    await Listing.insertMany(initData.data);

    console.log("Database initialized with sample data");
  } catch (err) {
    console.log("Error:", err);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

main();
