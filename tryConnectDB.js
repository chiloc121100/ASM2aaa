
const { MongoClient, ServerApiVersion } = require('mongodb');

const accUN = "baohung";
const accPW = "baohung";
const uri = "mongodb+srv://"
+ accUN + ":" + accPW + 
"@web.wpiq3kr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, 
    { useNewUrlParser: true, 
        useUnifiedTopology: true, 
        serverApi: ServerApiVersion.v1 
    });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log(err);
  client.close();
});

console.log("... thay gi chua ?! ");