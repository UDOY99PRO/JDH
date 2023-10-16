var mongoos = require("mongoose");
 
mongoos.set('strictQuery', false);
  mongoos.connect(process.env["MONGO"], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  }).then(async (a, b) => {
    await console.log(`Connected MongoDB`);
     global.mongo_conn = true;
  }).catch((err) => {
 global.mongo_conn = false;
   console.log(err)
    })

