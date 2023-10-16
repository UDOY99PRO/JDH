const { Schema, model } = require("mongoose");

const test = Schema({
  id: String,
  value: String,
arrayValue: {
 type: [String],
unique: true,
index: 1
},
});

var mdb = {
  test: model("test", test),
};
var pinG;
var lastPingFetched = Date.now();
global.db = {

async set(key, val) {
  if(!key || !val){ return `provide a ${key? "value" : "key" }`}
  if(val == Array){
return "Array";
  }

             await mdb?.test?.updateOne({ id: key }, {
                $set: {
                  value: val
                }
              }, { upsert: true }).catch(e => { console.log(e)}
)
  return true;
},
        async push(key, arry) {
  if(!key){
    return `provide a key`
  }
    await mdb?.test?.updateOne({ id: key }, {
                $addToSet: {
                  arrayValue: arry
                }
              }, { upsert: true }).catch(e => { console.log(e) });
  },
        async pull(key, valToRemove) {
  if (!key || valToRemove === undefined) {
    return `Provide a key and value to remove.`;
  }

  try {
    await mdb?.test?.updateOne({ id: key }, {
      $pull: {
        arrayValue: valToRemove
      }
    });

    return true;
  } catch (error) {
    return false;
  }
},

  async get(key) {
  if(!key){
    return `provide a key`
  }
     var r = await mdb?.test?.findOne({ id: key })

if(r == null){  return null;  }else{ return r.value }
  },
        async getArray(key) {
  if(!key){
    return `provide a key`
  }
     var r = await mdb?.test?.findOne({ id: key })

if(r == null){  return [];  }else{ return r.arrayValue }
  },

  async all() {

     var r = await mdb?.test?.find()

if(r == null){  return null;  }else{ return r }
  },

  async delete(key) {
     var r = await mdb?.test?.findOne({ id:key });
    if(r == null) return `${key} not found`;
await mdb?.test.deleteOne({ id: key })

    return true;

  },

  async deleteAll(pass) {
    if(pass == "db"){
await mdb?.test?.deleteMany()
return true;
    }else{
      return false;
    }
  },

  async ping() {
    if(lastPingFetched + 1000*60*15 < Date.now()){
   var lastPingFetched = Date.now();
    var db = mongoose.connection.db;
  var startTime = Date.now();
  var result = await db.command({ ping: 1 });
  var latency = Date.now() - startTime; 
    var pinG = latency;
  return latency;
  }else{
      return pinG;
    }

},
 async uptime() {
    try {
      const adminDb = mongoose.connection.db.admin();
      const serverStatus = await adminDb.serverStatus();
      const uptimeInSeconds = serverStatus.uptime;
 return uptimeInSeconds*1000;
    } catch (error) {
      console.error("Error fetching MongoDB server status:", error);
      return null;
    }
  }

}

