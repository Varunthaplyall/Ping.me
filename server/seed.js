const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./src/models/user.model");

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
});

const seedUsers = [
  // Female Users
  {
    email: "emma.thompson@example.com",
    userName: "Emma Thompson",
    password: bcrypt.hashSync("123456", 10),
    profilePictureture: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "olivia.miller@example.com",
    userName: "Olivia Miller",
    password: bcrypt.hashSync("123456", 10),
    profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "sophia.davis@example.com",
    userName: "Sophia Davis",
    password: bcrypt.hashSync("123456", 10),
    profilePicture: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    email: "ava.wilson@example.com",
    userName: "Ava Wilson",
    password: bcrypt.hashSync("123456", 10),
    profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    email: "isabella.brown@example.com",
    userName: "Isabella Brown",
    password: bcrypt.hashSync("123456", 10),
    profilePicture: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    email: "mia.johnson@example.com",
    userName: "Mia Johnson",
    password: bcrypt.hashSync("123456", 10),
    profilePicture: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    email: "charlotte.williams@example.com",
    userName: "Charlotte Williams",
    password: bcrypt.hashSync("123456", 10),
    profilePicture: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    email: "amelia.garcia@example.com",
    userName: "Amelia Garcia",
    password: bcrypt.hashSync("123456", 10),
    profilePicture: "https://randomuser.me/api/portraits/women/8.jpg",
  },

  // Male Users
  {
    email: "james.anderson@example.com",
    userName: "James Anderson",
    password: bcrypt.hashSync("123456", 10),
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "william.clark@example.com",
    userName: "William Clark",
    password: bcrypt.hashSync("123456", 10),
    profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "benjamin.taylor@example.com",
    userName: "Benjamin Taylor",
    password: bcrypt.hashSync("123456", 10),
    profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "lucas.moore@example.com",
    userName: "Lucas Moore",
    password: bcrypt.hashSync("123456", 10),
    profilePicture: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "henry.jackson@example.com",
    userName: "Henry Jackson",
    password: bcrypt.hashSync("123456", 10),
    profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "alexander.martin@example.com",
    userName: "Alexander Martin",
    password: bcrypt.hashSync("123456", 10),
    profilePicture: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    email: "daniel.rodriguez@example.com",
    userName: "Daniel Rodriguez",
    password: bcrypt.hashSync("123456", 10),
    profilePicture: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
