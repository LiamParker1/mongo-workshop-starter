// Lets us read in environment variables as configuration values
// Good idea to store things like database URLs as environment variables in case you need to change
import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { Contact } from "./schema.js";

// Connect to database
await mongoose.connect(process.env.DB_URL);
console.log("Connected to database!");
console.log();

// Clear database
await Contact.deleteMany({});

// Fetch dummy data
const response = await fetch("https://randomuser.me/api/?results=5");
const data = await response.json();
// Create a bunch of contacts from the dummy data
const dummyContacts = data.results.map((r) => ({
  name: `${r.name.first} ${r.name.last}`,
  phoneNumber: r.cell,
  photoUrl: r.picture.large,
  funFact: "Lorem ipsum..."
}));

// Save all the dummy data to the database
await Contact.bulkSave(dummyContacts.map((c) => new Contact(c)));

// Disconnect when complete
await mongoose.disconnect();
console.log("Disconnected from database!");