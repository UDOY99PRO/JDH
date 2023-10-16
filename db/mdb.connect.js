var mongoose = require("mongoose"),
 
mongoose.set('strictQuery', false);
  mongoose.connect(process.env["MONGO"], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  }).then(async (a, b) => {
    await console.log(`Connected MongoDB`);
     global.mongo_conn = true;
  }).catch((err) => {
 global.mongo_conn = false;
   console.log(err)
    })
