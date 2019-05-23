var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
var root = { hello: () => 'Hello world!' };

var app = express();
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
