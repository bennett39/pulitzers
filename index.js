const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
var root = { hello: () => 'Hello world!' };

require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://bennett:" + process.env.MONGOPW + "@pulitzer39-dfmhp.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log(collection);
  // perform actions on the collection object
  client.close();
});

var app = express();
app.use(cors());
app.use(express.static('frontend/build'));
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.get('/', (req, res) => {
  res.sendFile('index.html')
});
app.listen(4000, () => console.log('Listening at localhost:4000'));
