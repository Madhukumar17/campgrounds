const mongoose = require("mongoose");
const { descriptors, places } = require("./seedHelpers");
const cities = require("./cities");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/Yelp-Camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "65da49912c678a95a6f0b1f9",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, natus amet sed adipisci, quasi voluptatem rem iusto incidunt odio molestiae ratione eveniet quas beatae? Accusamus doloremque impedit veritatis vel aliquam!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dh2lhzaha/image/upload/v1709789909/yelpCamp/b8cwoowfoqjbscgi1ztp.jpg",
          filename: "yelpCamp/b8cwoowfoqjbscgi1ztp",
        },
        {
          url: "https://res.cloudinary.com/dh2lhzaha/image/upload/v1709789880/yelpCamp/vzobf5teptzhbq9no3xv.jpg",
          filename: "yelpCamp/vzobf5teptzhbq9no3xv",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
