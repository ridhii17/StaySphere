const mongoose = require("mongoose");
const Schema = mongoose.Schema; // bar bar na likhna pve mongoose.schema
const Review = require("./review");

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: {
    type: String,
    required: true,
  },
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8vjkIycG8WKgYLI_tkdqP9LxO5iAAX0yFWA&s",
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
