const mongoose = require('mongoose');

mongoose.connect(process.env.mongodb_url)
  .then(() =>{
    console.log("Connected to DB")
  })

  .catch((err)=>{
    console.log(err)
  })