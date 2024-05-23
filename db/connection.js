const mongoose = require("mongoose");

const DB = process.env.DATABASE;

//connecting database to backend.
mongoose
  .connect(DB)
  .then(() => {
    console.log(`connection successful!`);
  })
  .catch((err) => console.log(`connection fail`));
